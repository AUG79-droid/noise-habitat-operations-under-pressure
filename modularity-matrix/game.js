import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const $ = id => document.getElementById(id);
const viewport = $('viewport');
const boot = $('boot'), startBtn = $('start'), loadState = $('load-state');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07111b);
scene.fog = new THREE.FogExp2(0x07111b, .018);

const camera = new THREE.PerspectiveCamera(52, innerWidth/innerHeight, .1, 240);
camera.position.set(0, 5.1, 10.8);
const renderer = new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
viewport.appendChild(renderer.domElement);

const clock = new THREE.Clock();
let mixer=null, runner=null, runnerVisual=null, gameReady=false, playing=false, paused=true;
let lane=1, laneX=0, stage=0, stageT=0, score=0, debt=0, retroNeed=1, retroDone=0;
let spawned=[], gates=[];
const lanes=[-3.2,0,3.2];
const worldSpeed=8.4;

const missions=[
 {no:'MISSION 01',chip:'BUILD',title:'Build the mission-computing module',text:'Collect exactly CHASSIS, COMPUTE and I/O.',why:'Separating functions into replaceable modules preserves options for future repair and upgrade.',list:['CHASSIS','COMPUTE','I/O'],duration:15,lesson:['MODULARITY','A modular subsystem separates functions so one technology can change without replacing the whole assembly.','TRACEABILITY','Configuration and material records support later repair, reuse and engineering decisions.']},
 {no:'MISSION 02',chip:'INTERFACES',title:'Keep the architecture open',text:'Choose STANDARD INTERFACE. Avoid PROPRIETARY LOCK-IN.',why:'Modules are only truly replaceable when their interfaces are controlled and accessible.',list:['STANDARD INTERFACE'],duration:10,lesson:['CONTROLLED INTERFACES','Common or well-controlled interfaces can reduce unnecessary redesign during future upgrades.','ENGINEERING TRADE-OFF','Standardisation is not an absolute rule: safety, performance and configuration control still govern the design.']},
 {no:'MISSION 03',chip:'ACCESS',title:'Design for future intervention',text:'Choose REVERSIBLE FASTENERS. Avoid BONDED ENCLOSURE.',why:'Access and joining methods can determine whether future maintenance is local or invasive.',list:['REVERSIBLE FASTENERS'],duration:10,lesson:['DESIGN FOR DISASSEMBLY','Accessible interfaces and reversible joining can preserve future intervention options.','NOT A BAN ON BONDING','Bonding can be technically appropriate. The learning point is to evaluate through-life consequences deliberately.']},
 {no:'YEAR 15',chip:'RETROFIT',title:'Technology has moved on',text:'Replace OLD COMPUTE only. Leave KEEP modules installed.',why:'The value of modular design becomes visible when a fast-changing technology needs refresh.',list:['REQUIRED REPLACEMENTS'],duration:16,lesson:['LOCALISE THE CHANGE','A good architecture lets a technology refresh affect the smallest practical part of the system.','DESIGN DEBT','Earlier shortcuts increase how much hardware must be disturbed fifteen years later.']},
 {no:'MISSION 05',chip:'RECOVERY',title:'Keep component value in use',text:'Collect REUSE and REPAIR. Avoid premature DISPOSAL.',why:'End-of-use is not automatically end-of-life when condition, safety and evidence support a higher-value route.',list:['REUSE','REPAIR'],duration:15,lesson:['EVIDENCE FIRST','Reuse and repair require condition, configuration and traceability evidence.','NO AUTOMATIC GREEN CLAIM','The preferred route depends on the real life-cycle comparison, not a generic circularity label.']}
];

const state={picked:new Set(),stageDone:false};
function mat(color,rough=.45,metal=.25,emissive=0){return new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal,emissive,emissiveIntensity:emissive?0.55:0});}
const M={floor:mat(0x263746,.72,.08),steel:mat(0x334a5d,.48,.55),dark:mat(0x0c1a25,.55,.35),cyan:mat(0x38dfff,.35,.3,0x0a6070),lime:mat(0x91f75c,.4,.2,0x315e19),amber:mat(0xffc95c,.42,.25,0x5b3b07),red:mat(0xff526d,.4,.22,0x5d0b17),blue:mat(0x4b8cff,.38,.25,0x112b62)};
function box(w,h,d,material,x=0,y=0,z=0){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;return m;}
function cylinder(r,h,material,x=0,y=0,z=0){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,18),material);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;return m;}

function buildFactory(){
 const floor=box(18,.25,220,M.floor,0,-.14,-85);scene.add(floor);
 for(let z=8;z>-185;z-=8){const stripe=box(17.5,.015,.09,new THREE.MeshBasicMaterial({color:0x496170,transparent:true,opacity:.25}),0,.0,z);scene.add(stripe);}
 for(const x of [-9,9]){for(let z=8;z>-190;z-=12){const post=box(.42,5.8,.42,M.steel,x,2.8,z);scene.add(post);const light=box(2.8,.06,.22,new THREE.MeshBasicMaterial({color:0xc8f6ff}),x>0?6.1:-6.1,5.4,z);scene.add(light);const rack=box(2.8,1.5,3.6,M.dark,x>0?11:-11,.75,z-2);scene.add(rack);for(let q=0;q<3;q++){const bin=box(.65,.45,.75,[M.cyan,M.amber,M.blue][q],x>0?10.2+q*.75:-11.7+q*.75,1.15,z-1.2);scene.add(bin);}}}
 for(let z=0;z>-170;z-=22){const beam=box(18.2,.34,.35,M.steel,0,5.4,z);scene.add(beam);}
 for(const x of [-6.9,6.9]){const rail=box(1.25,.55,170,M.dark,x,.55,-75);scene.add(rail);for(let z=5;z>-155;z-=2.3){const r=cylinder(.17,1.02,M.steel,x,.92,z);r.rotateZ(Math.PI/2);scene.add(r);}}
 for(let i=0;i<4;i++){const g=new THREE.Group();g.userData.agv=true;g.userData.offset=i*37;const w1=cylinder(.23,.25,M.dark,-.58,.17,.65);w1.rotateZ(Math.PI/2);const w2=cylinder(.23,.25,M.dark,.58,.17,.65);w2.rotateZ(Math.PI/2);g.add(box(1.35,.48,2.1,M.amber,0,.38,0),box(.9,.5,1.0,M.dark,0,.8,.25),w1,w2);g.position.set(i%2?7.1:-7.1,0,-20-i*32);scene.add(g);}
 for(let i=0;i<6;i++){const x=i%2?7.9:-7.9,z=-12-i*26;scene.add(cylinder(.55,.35,M.dark,x,.2,z));const arm1=box(.34,2.4,.34,M.blue,x,1.5,z);arm1.rotation.z=i%2?-.42:.42;scene.add(arm1);const arm2=box(.28,1.8,.28,M.amber,x+(i%2?-.72:.72),2.65,z);arm2.rotation.z=i%2?.65:-.65;scene.add(arm2);}
 scene.add(new THREE.HemisphereLight(0xbfeeff,0x17202a,1.35));
 const sun=new THREE.DirectionalLight(0xe9f7ff,4.4);sun.position.set(6,12,9);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-16;sun.shadow.camera.right=16;sun.shadow.camera.top=16;sun.shadow.camera.bottom=-8;scene.add(sun);
 for(const x of [-6,0,6]){const p=new THREE.PointLight(x===0?0x7beaff:0xffc66a,18,18,2);p.position.set(x,4.6,-8);scene.add(p);}
}

function makeFallbackRunner(){
 const g=new THREE.Group();g.add(box(1.0,1.35,.58,M.blue,0,1.7,0),box(1.06,.44,.62,M.amber,0,1.8,-.03));
 const head=new THREE.Mesh(new THREE.SphereGeometry(.38,20,16),new THREE.MeshStandardMaterial({color:0xd7a477,roughness:.6}));head.position.y=2.65;head.castShadow=true;g.add(head);
 const helmet=new THREE.Mesh(new THREE.SphereGeometry(.43,20,12,0,Math.PI*2,0,Math.PI/2),M.amber);helmet.position.y=2.83;g.add(helmet);
 const l1=box(.28,1.15,.3,M.blue,-.28,.62,0),l2=box(.28,1.15,.3,M.blue,.28,.62,0);l1.name='legL';l2.name='legR';g.add(l1,l2);
 const a1=box(.24,1.05,.26,M.blue,-.68,1.75,0),a2=box(.24,1.05,.26,M.blue,.68,1.75,0);a1.name='armL';a2.name='armR';g.add(a1,a2);return g;
}

async function loadRunner(){
 loadState.textContent='Loading animated engineer…';
 try{const gltf=await new GLTFLoader().loadAsync('https://raw.githubusercontent.com/hukasu/bevy-modular-characters/main/assets/SciFi.gltf');const g=gltf.scene;g.scale.setScalar(.72);g.rotation.y=Math.PI;g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true}});if(gltf.animations?.length){mixer=new THREE.AnimationMixer(g);const clip=gltf.animations.find(a=>/run|walk/i.test(a.name))||gltf.animations[0];mixer.clipAction(clip).reset().play();}return g;}catch(err){console.warn('Animated model unavailable; using fallback.',err);loadState.textContent='Animated model unavailable — using built-in engineer.';return makeFallbackRunner();}
}

function canvasLabel(text,good=true){const c=document.createElement('canvas');c.width=768;c.height=256;const x=c.getContext('2d');x.fillStyle=good?'#142b24':'#32151d';x.fillRect(0,0,c.width,c.height);x.strokeStyle=good?'#a4ff67':'#ff617d';x.lineWidth=14;x.strokeRect(12,12,c.width-24,c.height-24);x.fillStyle='#fff';x.font='900 66px Inter,Arial';x.textAlign='center';x.textBaseline='middle';const lines=text.split('|');lines.forEach((s,i)=>x.fillText(s,384,108+i*72));const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshBasicMaterial({map:t,transparent:true});}
function tagSprite(text,color='#fff'){const c=document.createElement('canvas');c.width=512;c.height=128;const x=c.getContext('2d');x.fillStyle='rgba(3,10,16,.88)';x.roundRect(8,8,496,112,24);x.fill();x.strokeStyle=color;x.lineWidth=6;x.stroke();x.fillStyle='#fff';x.font='900 43px Arial';x.textAlign='center';x.textBaseline='middle';x.fillText(text,256,64);const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true}));sp.scale.set(3.2,.8,1);return sp;}
function pickup(label,type='good',laneIdx=1,z=-35){const g=new THREE.Group();g.userData={kind:'pickup',label,type,hit:false};const material=type==='good'?M.cyan:type==='need'?M.amber:type==='neutral'?M.blue:M.red;g.add(box(1.25,.78,1.55,material,0,.75,0));g.add(box(.9,.08,1.64,new THREE.MeshBasicMaterial({color:type==='bad'?0xff7b8d:0xb7f6ff}),0,1.16,0));const s=tagSprite(label,type==='bad'?'#ff617d':'#9cff67');s.position.set(0,2.0,0);g.add(s);g.position.set(lanes[laneIdx],0,z);scene.add(g);spawned.push(g);return g;}
function gate(left,right,z=-42){const g=new THREE.Group();g.userData={kind:'gate',hit:false,left,right};const make=(x,choice)=>{const gg=new THREE.Group();gg.add(box(3.0,4.4,.35,choice.good?M.lime:M.red,0,2.2,0));const panel=new THREE.Mesh(new THREE.PlaneGeometry(2.7,1.3),canvasLabel(choice.label.replace(' ','|'),choice.good));panel.position.set(0,2.55,.2);gg.add(panel);gg.position.x=x;return gg;};g.add(make(-3.15,left),make(3.15,right));g.position.z=z;scene.add(g);gates.push(g);return g;}
function clearObjects(){for(const o of [...spawned,...gates])scene.remove(o);spawned=[];gates=[];}
function initMission(){clearObjects();state.picked=new Set();state.stageDone=false;stageT=0;retroDone=0;if(stage===0){[['CHASSIS','good',0],['CUSTOM BOX','bad',2],['COMPUTE','good',2],['OPAQUE LOT','bad',0],['I/O','good',1],['CUSTOM BOX','bad',0]].forEach((v,i)=>pickup(v[0],v[1],v[2],-25-i*13));}else if(stage===1){gate({label:'STANDARD INTERFACE',good:true},{label:'PROPRIETARY LOCK-IN',good:false},-45);}else if(stage===2){gate({label:'REVERSIBLE FASTENERS',good:true},{label:'BONDED ENCLOSURE',good:false},-45);}else if(stage===3){retroNeed=1+Math.min(3,Math.floor(debt/10));const seq=[];for(let i=0;i<retroNeed;i++)seq.push(['OLD COMPUTE','need',i%3]);seq.push(['KEEP','neutral',2],['KEEP','neutral',0],['KEEP','neutral',1]);seq.forEach((v,i)=>pickup(v[0],v[1],v[2],-24-i*14));missions[3].list=[`${retroNeed} REQUIRED REPLACEMENT${retroNeed>1?'S':''}`];}else{[['REUSE','good',0],['DISPOSAL','bad',2],['REPAIR','good',2],['DISPOSAL','bad',0],['REUSE','good',1]].forEach((v,i)=>pickup(v[0],v[1],v[2],-25-i*14));}updateMissionUI();}
function updateMissionUI(){const m=missions[stage];$('mission-no').textContent=m.no;$('mission-chip').textContent=m.chip;$('mission-title').textContent=m.title;$('mission-text').textContent=m.text;$('why-text').textContent=m.why;$('checklist').innerHTML=m.list.map(v=>`<div class="check ${state.picked.has(v)?'done':''}"><i></i><span>${v}</span></div>`).join('');$('score').textContent=String(score).padStart(4,'0');$('debt').textContent=debt;}
function feedback(text,good=true){const e=$('feedback');e.textContent=text;e.style.color=good?'#a4ff67':'#ff8497';e.classList.add('show');clearTimeout(feedback.t);feedback.t=setTimeout(()=>e.classList.remove('show'),900);}
function correct(label,points=150){score+=points;state.picked.add(label);feedback(`✓ ${label}  +${points}`,true);updateMissionUI();}
function wrong(text,amount=10){debt+=amount;feedback(`✕ ${text}  DESIGN DEBT +${amount}`,false);updateMissionUI();}
function missionComplete(){if(state.stageDone)return;state.stageDone=true;paused=true;const L=missions[stage].lesson;$('lesson-kicker').textContent=stage===3?'YEAR 15 REVIEW':'MISSION COMPLETE';$('lesson-title').textContent=L[0];$('lesson-text').textContent=L[1];$('lesson-points').innerHTML=`<div class="lesson-point"><b>${L[2]}</b><span>${L[3]}</span></div>`;$('continue').textContent=stage===missions.length-1?'SEE FINAL RESULT':`CONTINUE TO ${stage===2?'YEAR 15':`MISSION ${String(stage+2).padStart(2,'0')}`}`;$('lesson').classList.add('active');}
$('continue').onclick=()=>{$('lesson').classList.remove('active');if(stage===missions.length-1){finish();return;}stage++;paused=false;initMission();};
function finish(){playing=false;paused=true;const grade=debt===0?'RETROFIT-READY ARCHITECT':debt<=10?'LIFE-CYCLE DESIGNER':'DAY-1 OPTIMISER';$('grade').textContent=grade;$('f-score').textContent=score;$('f-debt').textContent=debt;$('f-retro').textContent=retroNeed;$('final-copy').textContent=debt===0?'Your architecture preserved localised retrofit paths and higher-value recovery options.':debt<=10?'The subsystem remained upgradeable, but one shortcut increased future intervention effort.':'Several Day-1 shortcuts increased the amount of hardware that had to be disturbed at Year 15.';$('finish').classList.add('active');}
function stageIsDone(){if(stage===0)return ['CHASSIS','COMPUTE','I/O'].every(x=>state.picked.has(x));if(stage===1)return state.picked.has('STANDARD INTERFACE')||stageT>12;if(stage===2)return state.picked.has('REVERSIBLE FASTENERS')||stageT>12;if(stage===3)return retroDone>=retroNeed;return state.picked.has('REUSE')&&state.picked.has('REPAIR');}
function collide(){for(const o of spawned){if(o.userData.hit)continue;if(o.position.z>6&&Math.abs(o.position.x-laneX)<1.25){o.userData.hit=true;o.visible=false;const {label,type}=o.userData;if(stage===0){if(['CHASSIS','COMPUTE','I/O'].includes(label)&&!state.picked.has(label))correct(label);else wrong(label);}else if(stage===3){if(type==='need'){retroDone++;correct(`${retroDone}/${retroNeed} OLD COMPUTE`,180);}else wrong('UNNECESSARY REPLACEMENT',8);}else if(stage===4){if(label==='REUSE'||label==='REPAIR')correct(label);else wrong('PREMATURE DISPOSAL');}}}for(const g of gates){if(g.userData.hit)continue;if(g.position.z>5){g.userData.hit=true;g.visible=false;const choice=laneX<0?g.userData.left:g.userData.right;if(choice.good)correct(choice.label,220);else wrong(choice.label,10);}}}
function animateEnvironment(dt,elapsed){scene.traverse(o=>{if(o.userData?.agv){o.position.z=12-((elapsed*5+o.userData.offset)%175);}});for(const o of spawned){o.position.z+=worldSpeed*dt;o.rotation.y+=dt*.7;}for(const g of gates){g.position.z+=worldSpeed*dt;}if(runner){runner.position.x=THREE.MathUtils.damp(runner.position.x,laneX,10,dt);runner.position.y=.02+Math.sin(elapsed*10)*.025;if(!mixer){const l=runner.getObjectByName('legL'),r=runner.getObjectByName('legR'),a=runner.getObjectByName('armL'),b=runner.getObjectByName('armR'),s=Math.sin(elapsed*10)*.55;if(l){l.rotation.x=s;r.rotation.x=-s;a.rotation.x=-s;b.rotation.x=s;}}}camera.position.x=THREE.MathUtils.damp(camera.position.x,laneX*.18,3,dt);camera.lookAt(laneX*.08,1.2,-4.5);}
function loop(){requestAnimationFrame(loop);const dt=Math.min(clock.getDelta(),.04),elapsed=clock.elapsedTime;if(mixer)mixer.update(dt);if(playing&&!paused){stageT+=dt;animateEnvironment(dt,elapsed);collide();$('progress').style.width=`${Math.min(100,stageT/missions[stage].duration*100)}%`;if(stageIsDone()&&stageT>2.1)missionComplete();}renderer.render(scene,camera);}
function move(d){if(!playing||paused)return;lane=Math.max(0,Math.min(2,lane+d));laneX=lanes[lane];}
addEventListener('keydown',e=>{if(e.code==='ArrowLeft'||e.code==='KeyA')move(-1);if(e.code==='ArrowRight'||e.code==='KeyD')move(1);});
$('left').onpointerdown=e=>{e.preventDefault();move(-1);};$('right').onpointerdown=e=>{e.preventDefault();move(1);};
let touchX=null;renderer.domElement.addEventListener('pointerdown',e=>touchX=e.clientX);renderer.domElement.addEventListener('pointerup',e=>{if(touchX==null)return;const dx=e.clientX-touchX;if(Math.abs(dx)>30)move(dx>0?1:-1);touchX=null;});
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});

try{buildFactory();runnerVisual=await loadRunner();runner=new THREE.Group();runner.add(runnerVisual);runner.position.set(0,0,2.5);scene.add(runner);gameReady=true;loadState.textContent='Game ready · animated engineer with built-in fallback';startBtn.disabled=false;}catch(err){console.error(err);loadState.textContent='Game ready in compatibility mode';runner=makeFallbackRunner();runner.position.set(0,0,2.5);scene.add(runner);gameReady=true;startBtn.disabled=false;}
startBtn.onclick=()=>{if(!gameReady)return;boot.classList.remove('active');playing=true;paused=false;initMission();clock.getDelta();};
loop();