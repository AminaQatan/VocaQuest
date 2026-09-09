export const FLOOR=338,PLAYER_HEIGHT=70,PLAYER_WIDTH=30;
export type Player={x:number;y:number;vx:number;vy:number;ground:boolean;facing:1|-1;coyote:number;jumpBuffer:number;invincible:number;};
export type Platform={x:number;y:number;w:number};
export function createPlayer():Player{return {x:70,y:FLOOR-PLAYER_HEIGHT,vx:0,vy:0,ground:true,facing:1,coyote:.1,jumpBuffer:0,invincible:0}}
export function stepPlayer(p:Player,input:{axis:number;sprint:boolean;jump:boolean},dt:number,platforms:Platform[],end:number){
 const axis=Math.abs(input.axis)>.17?Math.max(-1,Math.min(1,input.axis)):0;
 const target=axis*(input.sprint?360:240);p.vx+=(target-p.vx)*Math.min(1,dt*(axis?15:20));
 if(Math.abs(p.vx)<1)p.vx=0;if(axis)p.facing=axis<0?-1:1;
 if(p.ground)p.coyote=.1;else p.coyote=Math.max(0,p.coyote-dt);
 p.jumpBuffer=input.jump?.12:Math.max(0,p.jumpBuffer-dt);
 if(p.jumpBuffer>0&&p.coyote>0){p.vy=-510;p.ground=false;p.coyote=0;p.jumpBuffer=0}
 p.x=Math.max(20,Math.min(end+60,p.x+p.vx*dt));const bottom=p.y+PLAYER_HEIGHT;
 p.vy+=1300*dt;p.y+=p.vy*dt;p.ground=false;
 if(p.y+PLAYER_HEIGHT>=FLOOR){p.y=FLOOR-PLAYER_HEIGHT;p.vy=0;p.ground=true}
 for(const platform of platforms){if(p.x+PLAYER_WIDTH>platform.x&&p.x<platform.x+platform.w&&bottom<=platform.y+4&&p.y+PLAYER_HEIGHT>=platform.y&&p.vy>=0){p.y=platform.y-PLAYER_HEIGHT;p.vy=0;p.ground=true}}
 p.invincible=Math.max(0,p.invincible-dt);return p;
}
