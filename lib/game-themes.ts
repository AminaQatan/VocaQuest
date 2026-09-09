export type GameTheme={name:string;setting:string;sky:string;floor:string;edge:string;block:string;accent:string;hazard:string;hazardName:string;glow:string;};
export const gameThemes:GameTheme[]=[
 {name:'Tool Detective',setting:'The tool workshop',sky:'#bdded4',floor:'#76543d',edge:'#b8d39c',block:'#967353',accent:'#277c59',hazard:'⚙️',hazardName:'rolling gears',glow:'#e5f2c3'},
 {name:'Workshop in Action',setting:'The busy training workshop',sky:'#b7d9eb',floor:'#375972',edge:'#7cbbd5',block:'#547d98',accent:'#2880ab',hazard:'⚙️',hazardName:'moving gears',glow:'#c8edff'},
 {name:'Safety Mission',setting:'The safety training zone',sky:'#f4d5ae',floor:'#806348',edge:'#f2c260',block:'#b88943',accent:'#cf8b28',hazard:'🚧',hazardName:'safety barriers',glow:'#fff0b6'},
 {name:'Time Traveller',setting:'The clockwork workshop',sky:'#b8a4db',floor:'#4d416e',edge:'#b39be1',block:'#806caa',accent:'#8362b8',hazard:'🌀',hazardName:'time swirls',glow:'#e5d3ff'},
 {name:'Made in Oman Quest',setting:'The Omani craft market',sky:'#f1dcb5',floor:'#97724c',edge:'#d7b572',block:'#bb8a55',accent:'#b7743d',hazard:'📦',hazardName:'market crates',glow:'#ffedc1'},
 {name:'Master of Instructions',setting:'The model-building studio',sky:'#c3e8e8',floor:'#4b7670',edge:'#9acdbc',block:'#6b9b91',accent:'#318f86',hazard:'🚧',hazardName:'workshop barriers',glow:'#d4fff4'},
];
export function gameTheme(unit:number){return gameThemes[unit-1]||gameThemes[0]}
const sceneRows=[{y:0,h:408},{y:408,h:411},{y:819,h:435}];
export function sceneRect(unit:number,width:number,height:number){const row=sceneRows[Math.floor((unit-1)/2)]||sceneRows[0];return {x:(unit-1)%2*width/2,y:row.y/1254*height,w:width/2,h:row.h/1254*height};}
export function atlasStyle(unit:number){const r=sceneRect(unit,1254,1254);return {backgroundImage:`url(${SCENE_ATLAS})`,backgroundSize:`200% ${1254/r.h*100}%`,backgroundPosition:`${(unit-1)%2*100}% ${r.y/(1254-r.h)*100}%`};}
export const SCENE_ATLAS='/art/unit-worlds.png';
export const WORKER_ATLAS='/art/worker-sprites.png';
