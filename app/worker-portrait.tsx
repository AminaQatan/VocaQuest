'use client';
import {useEffect,useRef} from 'react';
import {loadWorkerSprite} from '@/lib/worker-sprite';
export default function WorkerPortrait({className}:{className?:string}){const ref=useRef<HTMLCanvasElement>(null);useEffect(()=>{let active=true;loadWorkerSprite().then(({image,frames})=>{if(!active||!ref.current)return;const c=ref.current,ctx=c.getContext('2d');if(!ctx)return;const b=frames[0],h=c.height,w=b.w/b.h*h;ctx.clearRect(0,0,c.width,c.height);ctx.drawImage(image,b.x,b.y,b.w,b.h,(c.width-w)/2,0,w,h)}).catch(()=>{});return()=>{active=false}},[]);return <canvas ref={ref} width={180} height={240} className={className} role="img" aria-label="Worker explorer in a white hard hat, blue overalls and brown boots, holding a spanner"/>}
