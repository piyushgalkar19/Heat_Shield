import {CITIES,NCORE,LIVE,setLive,dscore,level,km} from './data.js';
export const slug=t=>t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const D=[],meta={fallback:true,updated:null};
const finish=()=>{for(const a of D){a.lat=a.c[1];a.lng=a.c[0]}for(const a of D){let m=60;for(const b of D)if(a!==b)m=Math.min(m,km(a,b));a.r=Math.max(3,Math.min(30,m*.45))}};
// Until public/districts.json exists, the monitor runs on the 33 state and UT capitals already in the app.
D.push(...CITIES.slice(0,NCORE).map(c=>({id:c.id,n:c.n,s:c.s,c:c.c})));finish();
// Districts load from a saved browser copy, then from public/districts.json (built by scripts/build-districts.mjs).
const PK=['NAME_2','dtname','DISTRICT','district','District','DIST_NAME','dist_name','dt_name','D_NAME','name','Name'],SK=['NAME_1','stname','STATE','ST_NM','state','State','STATE_NAME','st_nm','STATE_UT','st_name','S_NAME'];
const pick=(p,ks)=>{for(const k of ks)if(p[k])return String(p[k]).trim();return''};
const centre=g=>{let best=null,ba=-1;for(const poly of g.type==='Polygon'?[g.coordinates]:g.type==='MultiPolygon'?g.coordinates:[]){let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(const[x,y]of poly[0]){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)}const a=(x1-x0)*(y1-y0);if(a>ba){ba=a;best=[+((x0+x1)/2).toFixed(3),+((y0+y1)/2).toFixed(3)]}}return best};
const fromGeo=j=>(j.features||[]).map(f=>{const p=f.properties||{},c=f.geometry&&centre(f.geometry);return c&&[pick(p,SK),pick(p,PK),c[0],c[1]]}).filter(r=>r&&r[0]&&r[1]);
const tc=t=>t.toLowerCase().replace(/(^|[\s(\/-])([a-z])/g,(m,p,q)=>p+q.toUpperCase()).replace(/ (And|Of)\b/g,w=>w.toLowerCase()).replace(/[<>&"`]/g,'');
const apply=a=>{const seen=new Set();D.length=0;for(const[s,n,x,y]of a){if(n.length<3||/\bDNH\b/i.test(s))continue;let id=slug(s+'-'+n);for(let k=2;seen.has(id);k++)id=slug(s+'-'+n)+'-'+k;seen.add(id);D.push({id,n:tc(n),s:tc(s),c:[x,y]})}finish();meta.fallback=false;return true};
const KEY='hs-districts-v3';
export async function loadDistricts(){
 try{const c=JSON.parse(localStorage.getItem(KEY)||'null');if(Array.isArray(c)&&c.length>400)return apply(c)}catch{}
 let a=null;
 try{const r=await fetch('/districts.json');if(r.ok){const j=await r.json();if(Array.isArray(j)&&j.length>40)a=j}}catch{}
 if(!a)return false;try{localStorage.setItem(KEY,JSON.stringify(a))}catch{}return apply(a)}
const wait=ms=>new Promise(r=>setTimeout(r,ms)),LK='hs-live-v1',TTL=30*60*1000;
export const cfg={gap:10500};
// Open-Meteo takes up to 100 points per call and allows about 600 points a minute, so batches are spaced out.
// Results are cached for 30 minutes so a page reload does not use up the free quota. onBatch lets the page fill in as data arrives.
export async function fetchLive(list,force,onBatch){
 if(!list.length)return 0;
 let fresh=false;
 if(!force)try{const c=JSON.parse(localStorage.getItem(LK)||'null');if(c&&Date.now()-c.at<TTL){fresh=true;for(const id in c.d)setLive(id,c.d[id]);meta.updated=new Date(c.at)}}catch{}
 const need=fresh?list.filter(d=>!(LIVE[d.id]&&LIVE[d.id].t)):list;let ok=0;
 for(let i=0;i<need.length;i+=100){const b=need.slice(i,i+100);let got=0;
  for(let a=0;a<2&&!got;a++){if(a)await wait(3000);
   try{const u='https://api.open-meteo.com/v1/forecast?latitude='+b.map(c=>c.c[1].toFixed(3))+'&longitude='+b.map(c=>c.c[0].toFixed(3))+'&hourly=temperature_2m,relative_humidity_2m,soil_temperature_0cm&timezone=auto&forecast_days=3';
    let r=await(await fetch(u)).json();r=Array.isArray(r)?r:[r];
    r.forEach((d,j)=>{if(d.hourly&&d.hourly.temperature_2m&&b[j]){setLive(b[j].id,{t:d.hourly.temperature_2m,rh:d.hourly.relative_humidity_2m,st:d.hourly.soil_temperature_0cm});got++}})}catch{}}
  ok+=got;if(got&&onBatch){meta.updated=new Date();onBatch()}
  if(i+100<need.length)await wait(cfg.gap)}
 if(ok){meta.updated=new Date();try{const d={};for(const x of list){const L=LIVE[x.id];if(L&&L.t)d[x.id]={t:L.t,rh:L.rh,st:L.st}}localStorage.setItem(LK,JSON.stringify({at:Date.now(),d}))}catch{}}
 return ok||(fresh?1:0)}
export const rank=h=>D.map(d=>({d,...dscore(LIVE[d.id],h)})).filter(x=>x.score!=null);
export function states(h){const m={};for(const x of rank(h))(m[x.d.s]=m[x.d.s]||{s:x.d.s,id:slug(x.d.s),items:[]}).items.push(x);
 return Object.values(m).map(g=>{g.items.sort((a,b)=>b.score-a.score);g.avg=Math.round(g.items.reduce((t,x)=>t+x.score,0)/g.items.length);g.top=g.items[0];g.ext=g.items.filter(x=>level(x.score)==='Extreme').length;return g}).sort((a,b)=>b.avg-a.avg)}
export const toCSV=h=>'state,district,lat,lng,score,level,temp_c,wetbulb_c,hour\n'+rank(h).sort((a,b)=>b.score-a.score).map(x=>[x.d.s,x.d.n,x.d.lat.toFixed(4),x.d.lng.toFixed(4),x.score,level(x.score),x.T,x.wb,h].map(v=>/[",\n]/.test(v)?'"'+String(v).replace(/"/g,'""')+'"':v).join(',')).join('\n');
