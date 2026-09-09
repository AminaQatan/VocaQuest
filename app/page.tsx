import GameApp from './game-app';
import { getChatGPTUser } from './chatgpt-auth';
import { isTeacher } from '@/lib/server';
export const dynamic = 'force-dynamic';
export default async function Page() {
  const user = await getChatGPTUser();
  return <GameApp user={user ? {name:user.displayName,email:user.email} : null} teacher={await isTeacher(user)} />;
}
