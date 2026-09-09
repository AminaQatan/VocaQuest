import {getChatGPTUser} from '@/app/chatgpt-auth';
import {database,json,sameOrigin} from '@/lib/server';
import {units,modeCounts,isCorrect,selectQuestionIds,type Mode} from '@/lib/curriculum';
type Run={id:string;user_id:string;unit:number;mode:Mode;question_ids:string;answers:string|null;score:number|null;completed_at:string|null};
export async function POST(req:Request){try{
 if(!sameOrigin(req))return json({error:'Invalid request origin.'},403);
 const user=await getChatGPTUser();if(!user)return json({error:'Please sign in to save your adventure.'},401);
 const data=await req.json() as {action:string;unit:number;mode:Mode;id:string;answers:string[];writing:string};const db=database();
 if(data.action==='start'){
  if(!Number.isInteger(data.unit)||data.unit<1||data.unit>6||!Object.hasOwn(modeCounts,data.mode))return json({error:'Choose a valid world and mode.'},400);
  const profile=await db.prepare('SELECT user_id FROM profiles WHERE user_id=?').bind(user.userId).first();if(!profile)return json({error:'Save your player name and email first.'},400);
  if(data.unit>1){const best=await db.prepare('SELECT MAX(score) AS best FROM runs WHERE user_id=? AND unit=? AND completed_at IS NOT NULL').bind(user.userId,data.unit-1).first<{best:number|null}>();if((best?.best??0)<60)return json({error:'Earn 60% in the previous world to unlock this adventure.'},403)}
  const questionIds=selectQuestionIds(units[data.unit-1],modeCounts[data.mode]);const id=crypto.randomUUID();
  await db.prepare('INSERT INTO runs(id,user_id,unit,mode,question_ids,created_at) VALUES(?,?,?,?,?,?)').bind(id,user.userId,data.unit,data.mode,JSON.stringify(questionIds),new Date().toISOString()).run();return json({id,questionIds});
 }
 const run=await db.prepare('SELECT * FROM runs WHERE id=? AND user_id=?').bind(String(data.id||''),user.userId).first<Run>();if(!run)return json({error:'This adventure could not be found.'},404);
 if(data.action==='finish'){
  if(run.completed_at)return json({id:run.id,score:run.score});
  const ids=JSON.parse(run.question_ids) as number[];if(!Array.isArray(data.answers)||data.answers.length!==ids.length||data.answers.some(a=>typeof a!=='string'||a.length>300))return json({error:'Please complete every question before saving.'},400);
  const correct=ids.reduce((n,id,i)=>n+Number(isCorrect(units[run.unit-1].questions[id],data.answers[i])),0);const score=Math.round(correct/ids.length*100);
  await db.prepare('UPDATE runs SET answers=?,score=?,completed_at=? WHERE id=? AND user_id=? AND completed_at IS NULL').bind(JSON.stringify(data.answers),score,new Date().toISOString(),run.id,user.userId).run();
  const saved=await db.prepare('SELECT score FROM runs WHERE id=?').bind(run.id).first<{score:number}>();return json({id:run.id,score:saved?.score??score});
 }
 if(data.action==='writing'){
  if(!run.completed_at)return json({error:'Complete the adventure first.'},400);
  if(typeof data.writing!=='string'||data.writing.trim().length<10||data.writing.length>3000)return json({error:'Write your sentences (up to 3,000 characters) before submitting.'},400);
  if(data.writing.trim().split(/\n/).filter(line=>line.trim()).length!==2)return json({error:'Please write exactly two lines.'},400);
  await db.prepare('UPDATE runs SET writing=?,feedback=NULL,rubric=NULL,teacher_comment=NULL WHERE id=? AND user_id=?').bind(data.writing.trim(),run.id,user.userId).run();return json({saved:true});
 }
 return json({error:'Unknown action.'},400);
 }catch(e){console.error(e);return json({error:'We could not save this change. Your answers are still on this screen. Please retry.'},503)}}
