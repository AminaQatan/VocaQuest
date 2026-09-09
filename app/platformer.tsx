'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,ArrowUp,Accessibility,Flag,FastForward,Gamepad2,RefreshCw} from 'lucide-react';
import {gameTheme,SCENE_ATLAS,sceneRect} from '@/lib/game-themes';
import {loadWorkerSprite,type SpriteBounds} from '@/lib/worker-sprite';
import {createPlayer,stepPlayer,FLOOR,PLAYER_HEIGHT,PLAYER_WIDTH} from '@/lib/platform-motion';
type Props={unit:number;total:number;answered:number;paused:boolean;onCheckpoint:()=>void;onEnd:()=>void;onCoin:()=>void;onHit:()=>void};
export default function Platformer(props:Props){
 const canvas=useRef<HTMLCanvasElement>(null),live=useRef(props);live.current=props;
 const keys=useRef({left:false,right:false,jump:false,sprint:false}),player=useRef(createPlayer()),lock=useRef(false);
 const [ready,setReady]=useState(false),[assetError,setAssetError]=useState(false),[loadKey,setLoadKey]=useState(0),[controller,setController]=useState(false);
 const theme=gameTheme(props.unit);
 useEffect(()=>{if(!props.paused)lock.current=false;else keys.current={left:false,right:false,jump:false,sprint:false}},[props.paused,props.answered]);
 useEffect(()=>{
 const c=canvas.current;if(!c)return;const ctx=c.getContext('2d');if(!ctx)return;
 const resize=new ResizeObserver(()=>{c.width=Math.max(320,Math.min(1400,Math.round(c.getBoundingClientRect().width)));});resize.observe(c);
 const art=new Image();let sprite:HTMLCanvasElement|null=null,frames:SpriteBounds[]=[],loaded=0,active=true;setReady(false);setAssetError(false);
 const success=()=>{loaded++;if(active&&loaded===2)setReady(true)};const failed=()=>{if(active)setAssetError(true)};
 art.onload=success;art.onerror=failed;art.src=SCENE_ATLAS;loadWorkerSprite().then(data=>{sprite=data.image;frames=data.frames;success()}).catch(failed);
 let frame=0,last=0,animationTime=0,cam=0,padJump=false,hasPad=false;const coins=new Set<number>(),p=player.current;
 const clear=()=>{keys.current={left:false,right:false,jump:false,sprint:false};p.vx=0};
 const down=(e:KeyboardEvent)=>{if(live.current.paused)return;const valid=['ArrowLeft','ArrowRight','ArrowUp',' ','a','d','w','A','D','W','Shift'];if(valid.includes(e.key)){e.preventDefault();if(['ArrowLeft','a','A'].includes(e.key))keys.current.left=true;if(['ArrowRight','d','D'].includes(e.key))keys.current.right=true;if(['ArrowUp',' ','w','W'].includes(e.key)&&!e.repeat)keys.current.jump=true;if(e.key==='Shift')keys.current.sprint=true}};
 const up=(e:KeyboardEvent)=>{if(['ArrowLeft','a','A'].includes(e.key))keys.current.left=false;if(['ArrowRight','d','D'].includes(e.key))keys.current.right=false;if(e.key==='Shift')keys.current.sprint=false};
 const visibility=()=>{if(document.hidden)clear()};window.addEventListener('keydown',down);window.addEventListener('keyup',up);window.addEventListener('blur',clear);document.addEventListener('visibilitychange',visibility);
 const platforms=Array.from({length:props.total},(_,i)=>({x:315+i*510,y:i%2?250:258,w:145}));
 const draw=(time:number)=>{
 const dt=Math.min((time-last)/1000||0,.032);last=time;const v=live.current,W=c.width,H=c.height,goal=610+(v.total-1)*510+260;
 let pad:Gamepad|null=null;try{pad=Array.from(navigator.getGamepads?.()||[]).find(g=>g?.connected)||null}catch{}
 if(!!pad!==hasPad){hasPad=!!pad;if(active)setController(hasPad)}
 const pressed=!!pad?.buttons[0]?.pressed,padWantsJump=pressed&&!padJump;padJump=pressed;
 if(!v.paused&&!lock.current&&loaded===2&&!document.hidden){
  animationTime+=dt;
  const padAxis=pad?.axes[0]||0,dpad=Number(!!pad?.buttons[15]?.pressed)-Number(!!pad?.buttons[14]?.pressed);
  const axis=Number(keys.current.right)-Number(keys.current.left)||dpad||(Math.abs(padAxis)>.17?padAxis:0);
  stepPlayer(p,{axis,sprint:keys.current.sprint||!!pad?.buttons[1]?.pressed||!!pad?.buttons[2]?.pressed,jump:keys.current.jump||padWantsJump},dt,platforms,goal);keys.current.jump=false;
  for(let i=0;i<v.total;i++){
   const hx=275+i*510+(v.unit===3||v.unit===6?0:Math.sin(animationTime*1.3+i)*22);
   if(Math.abs(p.x+15-hx)<28&&p.y+PLAYER_HEIGHT>307&&p.invincible===0){p.invincible=1.8;live.current.onHit();p.vy=-300;p.ground=false;p.x=Math.max(20,p.x-28)}
   for(let j=0;j<3;j++){const id=i*3+j,cx=342+i*510+j*38,cy=platforms[i].y-35;if(!coins.has(id)&&Math.hypot(p.x+15-cx,p.y+35-cy)<38){coins.add(id);live.current.onCoin()}}
  }
  if(v.answered<v.total&&p.x>=565+v.answered*510){lock.current=true;clear();live.current.onCheckpoint()}
  if(v.answered===v.total&&p.x>=goal-24){lock.current=true;clear();live.current.onEnd()}
 }
 cam=Math.max(0,Math.min(goal-W+180,p.x-W*.28));ctx.clearRect(0,0,W,H);ctx.fillStyle=theme.sky;ctx.fillRect(0,0,W,H);
 if(art.complete&&art.naturalWidth){const {x:sx,y:sy,w:sw,h:sh}=sceneRect(v.unit,art.naturalWidth,art.naturalHeight),bw=Math.max(W*1.25,H*1.5),bh=bw*sh/sw,off=-(cam*.18%bw);ctx.drawImage(art,sx,sy,sw,sh,off,FLOOR-bh,bw,bh);ctx.drawImage(art,sx,sy,sw,sh,off+bw,FLOOR-bh,bw,bh)}
 ctx.fillStyle=theme.floor;ctx.fillRect(0,FLOOR,W,H-FLOOR);ctx.fillStyle=theme.edge;ctx.fillRect(0,FLOOR,W,8);ctx.fillStyle=theme.block;for(let x=-(cam%48);x<W;x+=48){ctx.fillRect(x,355,32,11);ctx.fillRect(x+13,379,25,9)}
 ctx.textAlign='center';ctx.textBaseline='middle';
 for(const platform of platforms){const x=platform.x-cam;if(x< -160||x>W+160)continue;ctx.fillStyle=theme.block;ctx.fillRect(x,platform.y,platform.w,19);ctx.fillStyle=theme.edge;ctx.fillRect(x,platform.y,platform.w,6)}
 for(let i=0;i<v.total;i++){
  const x=600+i*510-cam;
  if(x>-70&&x<W+70){const solved=i<v.answered;ctx.fillStyle=solved?theme.accent:'#ffdf75';ctx.strokeStyle=solved?theme.floor:'#ae7b20';ctx.lineWidth=3;ctx.fillRect(x-22,267,44,44);ctx.strokeRect(x-22,267,44,44);ctx.fillStyle=solved?'#fff':'#745319';ctx.font='bold 27px Trebuchet MS';ctx.fillText(solved?'✓':'?',x,290);ctx.fillStyle=theme.floor;ctx.font='bold 13px Trebuchet MS';ctx.fillText(''+(i+1),x,323)}
  const hx=275+i*510+(v.unit===3||v.unit===6?0:Math.sin(animationTime*1.3+i)*22)-cam;if(hx>-50&&hx<W+50){ctx.font='32px Arial';ctx.fillText(theme.hazard,hx,321)}
  for(let j=0;j<3;j++){const id=i*3+j,cx=342+i*510+j*38-cam,cy=platforms[i].y-35;if(!coins.has(id)&&cx>-20&&cx<W+20){ctx.fillStyle='#ffcf52';ctx.strokeStyle='#bd8019';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(cx,cy,7+Math.abs(Math.sin(animationTime*4))*5,14,0,0,Math.PI*2);ctx.fill();ctx.stroke()}}
 }
 const flag=goal-cam;ctx.fillStyle='#fff';ctx.fillRect(flag,216,5,122);ctx.strokeStyle='#202020';ctx.lineWidth=1;ctx.strokeRect(flag,216,5,122);for(let row=0;row<3;row++)for(let column=0;column<5;column++){ctx.fillStyle=(row+column)%2?'#111111':'#ffffff';ctx.fillRect(flag+5+column*10,216+row*10,10,10)}ctx.strokeStyle='#111111';ctx.strokeRect(flag+5,216,50,30);
 if(sprite&&frames.length&&(p.invincible===0||Math.floor(animationTime*10)%2===0)){
  const moving=Math.abs(p.vx)>12,index=!p.ground?3:moving?(Math.floor(animationTime*(Math.abs(p.vx)>260?12:9))%2?2:1):0,b=frames[index];
  const height=82,width=b.w/b.h*height,bob=p.ground&&moving?Math.sin(animationTime*18)*1.3:0;
  ctx.save();ctx.translate(p.x-cam+PLAYER_WIDTH/2,p.y+PLAYER_HEIGHT+bob);if(p.facing<0)ctx.scale(-1,1);
  ctx.shadowColor='#172e362b';ctx.shadowBlur=4;ctx.shadowOffsetY=2;ctx.drawImage(sprite,b.x,b.y,b.w,b.h,-width/2,-height,width,height);ctx.restore();
 }
 frame=requestAnimationFrame(draw);
 };frame=requestAnimationFrame(draw);
 return()=>{active=false;resize.disconnect();cancelAnimationFrame(frame);window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);window.removeEventListener('blur',clear);document.removeEventListener('visibilitychange',visibility)};
 },[props.total,props.unit,loadKey]);
 const hold=(direction:'left'|'right'|'sprint',pressed:boolean)=>{keys.current[direction]=pressed};
 return <div className="platform-wrap" style={{'--unit-color':theme.accent} as React.CSSProperties}><canvas ref={canvas} width={900} height={400} tabIndex={0} aria-label={`${theme.setting}. Move left or right with the arrow keys, jump with Space and run faster with Shift. Touch and compatible game controllers are also supported.`}/><div className="game-scenery-label"><Gamepad2 size={16}/>{theme.setting}</div>{!ready&&!assetError&&<span className="scene-loading">Loading your character and world…</span>}{assetError&&<div className="game-scene-error"><p>Your character or world could not load. Check your connection and try again.</p><button className="primary-button" onClick={()=>setLoadKey(n=>n+1)}><RefreshCw size={17}/>Reload game art</button></div>}<div className="game-control-row"><div className="move-controls">{(['left','right'] as const).map(dir=><button key={dir} aria-label={'Move '+dir} className="control-key" disabled={props.paused||!ready} onPointerDown={e=>{e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);hold(dir,true)}} onPointerUp={()=>hold(dir,false)} onPointerCancel={()=>hold(dir,false)} onLostPointerCapture={()=>hold(dir,false)}>{dir==='left'?<ArrowLeft/>:<ArrowRight/>}</button>)}</div><span className="keyboard-hint">MOVE ← → · JUMP SPACE · RUN SHIFT</span><div className="action-controls"><button className="control-key sprint-key" disabled={props.paused||!ready} aria-label="Hold to run faster" onPointerDown={e=>{e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);hold('sprint',true)}} onPointerUp={()=>hold('sprint',false)} onPointerCancel={()=>hold('sprint',false)} onLostPointerCapture={()=>hold('sprint',false)}><FastForward size={18}/></button><button className="control-key jump-key" disabled={props.paused||!ready} onPointerDown={e=>{e.preventDefault();keys.current.jump=true}} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();keys.current.jump=true}}} aria-label="Jump"><ArrowUp/> Jump</button></div></div>{controller&&<p className="controller-hint">Controller connected · Stick / D-pad to move · Cross / A to jump · Circle / B or Square / X to run</p>}<button className="text-button assist-button" disabled={props.paused||!ready} onClick={()=>{player.current.x=props.answered<props.total?565+props.answered*510:610+(props.total-1)*510+260;player.current.vx=0;}}>{props.answered<props.total?<Accessibility size={16}/>:<Flag size={16}/>} {props.answered<props.total?'Go to next challenge (no jumping needed)':'Go to finish flag'}</button></div>
}
