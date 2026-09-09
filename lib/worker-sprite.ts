import {WORKER_ATLAS} from './game-themes';
export type SpriteBounds={x:number;y:number;w:number;h:number};
type WorkerSprite={image:HTMLCanvasElement;frames:SpriteBounds[]};
let pending:Promise<WorkerSprite>|null=null;
// The sprite sheet uses a magenta key. Resolve it in the renderer; keep the source art intact.
export function loadWorkerSprite():Promise<WorkerSprite>{
 if(pending)return pending;
 pending=new Promise<WorkerSprite>((resolve,reject)=>{const image=new Image();image.onerror=()=>reject(new Error('Worker sprite unavailable'));image.onload=()=>{
 try{const canvas=document.createElement('canvas');canvas.width=image.naturalWidth;canvas.height=image.naturalHeight;const ctx=canvas.getContext('2d',{willReadFrequently:true});if(!ctx)throw new Error('Canvas unavailable');ctx.drawImage(image,0,0);const data=ctx.getImageData(0,0,canvas.width,canvas.height),pixels=data.data;
 for(let i=0;i<pixels.length;i+=4){const r=pixels[i],g=pixels[i+1],b=pixels[i+2];if(r>130&&b>120&&g<r*.62&&g<b*.62)pixels[i+3]=0;}
 ctx.putImageData(data,0,0);const cw=Math.floor(canvas.width/2),ch=Math.floor(canvas.height/2);
 const frames=Array.from({length:4},(_,i)=>{const ox=i%2*cw,oy=Math.floor(i/2)*ch;let left=cw,top=ch,right=0,bottom=0;for(let y=1;y<ch-1;y++)for(let x=1;x<cw-1;x++){if(pixels[((oy+y)*canvas.width+ox+x)*4+3]>24){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y)}}return right>left?{x:ox+left,y:oy+top,w:right-left+1,h:bottom-top+1}:{x:ox,y:oy,w:cw,h:ch}});
 resolve({image:canvas,frames});}catch(error){reject(error)}};image.src=WORKER_ATLAS;}).catch(error=>{pending=null;throw error});return pending;
}
