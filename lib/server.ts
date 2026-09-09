import {env} from 'cloudflare:workers';
import type {ChatGPTUser} from '@/app/chatgpt-auth';
export function database(){const db=(env as unknown as {DB?:D1Database}).DB;if(!db)throw new Error('Saved progress is temporarily unavailable. Please try again.');return db;}
export function audioBucket(){const bucket=(env as unknown as {BUCKET?:R2Bucket}).BUCKET;if(!bucket)throw new Error('Recording storage is temporarily unavailable.');return bucket;}
export async function isTeacher(user:ChatGPTUser|null){const email=(env as unknown as {TEACHER_EMAIL?:string}).TEACHER_EMAIL;return !!(email&&user&&email.toLowerCase()===user.email.toLowerCase());}
export function json(data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store'}})}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');return !origin||origin===new URL(req.url).origin}
