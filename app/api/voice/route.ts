import {getChatGPTUser} from '@/app/chatgpt-auth';
import {audioBucket, database, isTeacher, json, sameOrigin} from '@/lib/server';

type VoiceRun = {id: string; user_id: string; unit: number; completed_at: string | null; voice_key: string | null; voice_mime: string | null};
const allowedTypes = new Set(['audio/webm', 'audio/ogg', 'audio/mp4', 'audio/wav', 'audio/x-wav']);

export async function GET(req: Request) {
  try {
    const user = await getChatGPTUser();
    if (!user) return json({error: 'Sign in to listen to this recording.'}, 401);
    const id = new URL(req.url).searchParams.get('id');
    if (!id || id.length > 100) return json({error: 'Choose a saved recording.'}, 400);
    const run = await database().prepare('SELECT id,user_id,voice_key,voice_mime FROM runs WHERE id=?').bind(id).first<VoiceRun>();
    if (!run || (run.user_id !== user.userId && !await isTeacher(user))) return json({error: 'Recording not found.'}, 404);
    if (!run.voice_key) return json({error: 'No recording has been uploaded.'}, 404);
    const audio = await audioBucket().get(run.voice_key);
    if (!audio) return json({error: 'This recording is unavailable.'}, 404);
    return new Response(audio.body, {headers: {'Content-Type': run.voice_mime || 'audio/webm', 'Content-Length': String(audio.size), 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff'}});
  } catch (error) {
    console.error('Voice playback failed', error);
    return json({error: 'Your recording could not be loaded. Please retry.'}, 503);
  }
}

export async function POST(req: Request) {
  try {
    if (!sameOrigin(req)) return json({error: 'Invalid request origin.'}, 403);
    const user = await getChatGPTUser();
    if (!user) return json({error: 'Sign in before uploading your recording.'}, 401);
    if (Number(req.headers.get('content-length')) > 13 * 1024 * 1024) return json({error: 'Keep recordings under 12 MB.'}, 413);
    const form = await req.formData();
    const id = form.get('id'), file = form.get('audio');
    const duration = Number(form.get('duration'));
    if (typeof id !== 'string' || id.length > 100 || !(file instanceof File) || !file.size || file.size > 12 * 1024 * 1024 || !allowedTypes.has(file.type.split(';')[0]) || !Number.isFinite(duration) || duration < 1 || duration > 65) {
      return json({error: 'Record up to 60 seconds, then try uploading again.'}, 400);
    }
    const db = database();
    const run = await db.prepare('SELECT id,user_id,unit,completed_at,voice_key FROM runs WHERE id=? AND user_id=?').bind(id, user.userId).first<VoiceRun>();
    if (!run?.completed_at) return json({error: 'Finish your own adventure before uploading.'}, 404);
    const bucket = audioBucket(), key = `voice/${run.id}/${crypto.randomUUID()}`;
    await bucket.put(key, await file.arrayBuffer(), {httpMetadata: {contentType: file.type}});
    try {
      // Compare the previous key so overlapping uploads cannot orphan recordings.
      const saved = await db.prepare('UPDATE runs SET voice_key=?,voice_mime=?,voice_transcript=NULL,voice_score=NULL,voice_duration=? WHERE id=? AND user_id=? AND voice_key IS ?')
        .bind(key, file.type, Math.round(duration), id, user.userId, run.voice_key).run();
      if (!saved.meta.changes) {
        await bucket.delete(key);
        return json({error: 'This response changed while uploading. Refresh your progress before trying again.'}, 409);
      }
    } catch (error) {
      await bucket.delete(key);
      throw error;
    }
    if (run.voice_key) await bucket.delete(run.voice_key).catch(error => console.error('Previous audio cleanup failed', error));
    return json({saved: true});
  } catch (error) {
    console.error('Voice upload failed', error);
    return json({error: 'Your recording could not be saved. It is still available here; please retry.'}, 503);
  }
}
