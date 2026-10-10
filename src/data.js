// Locations are REAL (approximate neighbourhood centres). Scores are MODELLED from a rough
// profile per area (density, greenery, vulnerability, traffic), not measurements.
export const FACTORS=[
{k:'weather',n:'Weather',w:.10,d:'Forecast air temperature for the chosen hour.',why:'Forecast air temperature is high at this hour.',act:'Send a heat alert and open cooling centres early.'},
{k:'humidity',n:'Humidity and wet-bulb',w:.15,d:'How well sweat can cool the body. Wet-bulb readings above 31 C are dangerous.',why:'Humid air stops sweat from cooling the body.',act:'Send a humidity warning and extend cooling centre hours.'},
{k:'surface',n:'Surface heat',w:.20,d:'Pavement and roof temperature from satellite land-surface readings.',why:'Dark pavement and roofs hold heat.',act:'Add cool roofs and shaded pavement.'},
{k:'form',n:'Urban form',w:.15,d:'Tree canopy, building density and open space.',why:'Few trees and tightly packed buildings.',act:'Plant street trees and add shade structures.'},
{k:'air',n:'Air quality',w:.10,d:'Ozone and fine particles, which add strain on the lungs and heart.',why:'Poor air adds strain during heat.',act:'Issue air alerts and cut traffic idling.'},
{k:'exposure',n:'Exposure',w:.30,d:'Residents who are old, young, work outdoors or lack cooling at home.',why:'Many residents are old, young or lack cooling at home.',act:'Run door-to-door checks and place a cooling centre within 500 m.'}];
export const CITIES=[
{id:'delhi',n:'Delhi',s:'National Capital Territory',c:[77.209,28.6139],w:76,h:30},
{id:'mumbai',n:'Mumbai',s:'Maharashtra',c:[72.8777,19.076],w:58,h:74},
{id:'ahmedabad',n:'Ahmedabad',s:'Gujarat',c:[72.5714,23.0225],w:78,h:36},
{id:'hyderabad',n:'Hyderabad',s:'Telangana',c:[78.4867,17.385],w:66,h:40},
{id:'chennai',n:'Chennai',s:'Tamil Nadu',c:[80.2707,13.0827],w:68,h:70},
{id:'pune',n:'Pune',s:'Maharashtra',c:[73.8567,18.5204],w:60,h:38}];
const MORE=[['agartala','Agartala','Tripura',91.2868,23.8315,54,66],['aizawl','Aizawl','Mizoram',92.7176,23.7271,36,62],['bengaluru','Bengaluru','Karnataka',77.5946,12.9716,54,45],['bhopal','Bhopal','Madhya Pradesh',77.4126,23.2599,68,40],['bhubaneswar','Bhubaneswar','Odisha',85.8245,20.2961,68,60],['chandigarh','Chandigarh','Chandigarh (UT)',76.7794,30.7333,66,38],['daman','Daman','Dadra and Nagar Haveli and Daman and Diu (UT)',72.8397,20.3974,56,70],['dehradun','Dehradun','Uttarakhand',78.0322,30.3165,50,45],['gangtok','Gangtok','Sikkim',88.6138,27.3389,26,60],['guwahati','Guwahati','Assam',91.7362,26.1445,52,66],['gurugram','Gurugram','Haryana',77.0266,28.4595,74,32],['imphal','Imphal','Manipur',93.9368,24.817,42,62],['itanagar','Itanagar','Arunachal Pradesh',93.6053,27.0844,40,60],['jaipur','Jaipur','Rajasthan',75.7873,26.9124,74,32],['jammu','Jammu','Jammu and Kashmir (UT)',74.857,32.7266,68,42],['kavaratti','Kavaratti','Lakshadweep (UT)',72.6358,10.5626,55,78],['kohima','Kohima','Nagaland',94.1086,25.6751,32,58],['kolkata','Kolkata','West Bengal',88.3639,22.5726,62,72],['leh','Leh','Ladakh (UT)',77.5771,34.1526,22,25],['lucknow','Lucknow','Uttar Pradesh',80.9462,26.8467,72,40],['ludhiana','Ludhiana','Punjab',75.8573,30.901,70,38],['nagpur','Nagpur','Maharashtra',79.0882,21.1458,78,38],['panaji','Panaji','Goa',73.8278,15.4909,56,72],['patna','Patna','Bihar',85.1376,25.5941,66,50],['portblair','Port Blair','Andaman and Nicobar Islands (UT)',92.7265,11.6234,50,75],['puducherry','Puducherry','Puducherry (UT)',79.8083,11.9416,66,70],['raipur','Raipur','Chhattisgarh',81.6296,21.2514,72,42],['ranchi','Ranchi','Jharkhand',85.3096,23.3441,58,50],['shillong','Shillong','Meghalaya',91.8933,25.5788,28,60],['shimla','Shimla','Himachal Pradesh',77.1734,31.1048,30,45],['thiruvananthapuram','Thiruvananthapuram','Kerala',76.9366,8.5241,56,72],['visakhapatnam','Visakhapatnam','Andhra Pradesh',83.2185,17.6868,66,68]];
CITIES.push(...MORE.map(([id,n,s,x,y,w,h])=>({id,n,s,c:[x,y],w,h})));
export const NCORE=CITIES.length;
// name, lat, lng, density, greenery, vulnerability, traffic (0-1)
const Z={
delhi:[['Connaught Place',28.6315,77.2167,.85,.35,.1,.85],['Chandni Chowk',28.6506,77.2303,1,.02,.7,.9],['Karol Bagh',28.6519,77.1909,.92,.08,.45,.85],['Dwarka',28.5823,77.05,.55,.3,.2,.5],['Rohini',28.7383,77.0822,.6,.25,.3,.6],['Saket',28.5245,77.2066,.6,.4,.1,.55],['Lajpat Nagar',28.5677,77.2433,.88,.1,.35,.8],['Okhla',28.5355,77.275,.75,.1,.65,.85],['Seelampur',28.67,77.27,.95,.04,.9,.85],['Vasant Kunj',28.52,77.158,.45,.55,.15,.4],['Janakpuri',28.6219,77.0878,.65,.25,.2,.55],['Mayur Vihar',28.6086,77.2958,.75,.15,.35,.7]],
mumbai:[['Dharavi',19.043,72.8553,.98,.03,.95,.75],['Bandra West',19.0596,72.8295,.8,.2,.15,.7],['Andheri East',19.1136,72.8697,.85,.12,.4,.85],['Colaba',18.9067,72.8147,.75,.25,.2,.55],['Kurla',19.0726,72.8845,.92,.08,.65,.9],['Borivali',19.2307,72.8567,.65,.45,.2,.55],['Worli',19.0176,72.8156,.8,.18,.3,.65],['Govandi',19.0553,72.9154,.9,.06,.85,.85],['Powai',19.1176,72.906,.55,.45,.1,.45],['Thane West',19.2183,72.9781,.7,.35,.3,.6],['Ghatkopar',19.086,72.9081,.88,.1,.5,.8],['Mulund',19.1726,72.9565,.65,.35,.2,.55]],
ahmedabad:[['Navrangpura',23.0366,72.56,.7,.25,.15,.65],['Maninagar',22.9967,72.603,.8,.12,.45,.7],['Satellite',23.0286,72.5093,.6,.25,.1,.55],['Naroda',23.077,72.654,.65,.15,.55,.8],['Vastral',22.9965,72.662,.6,.12,.55,.65],['Bopal',23.033,72.465,.4,.3,.1,.4],['Paldi',23.01,72.56,.75,.2,.25,.65],['Gomtipur',23.0145,72.6155,.95,.05,.9,.85],['Ranip',23.095,72.56,.6,.15,.35,.6],['Vatva',22.9667,72.65,.6,.08,.7,.9],['Sabarmati',23.07,72.58,.65,.3,.35,.6],['Thaltej',23.051,72.503,.5,.3,.1,.45]],
hyderabad:[['Charminar',17.3616,78.4747,1,.03,.8,.85],['Banjara Hills',17.4126,78.4482,.55,.4,.1,.5],['HITEC City',17.4435,78.3772,.55,.25,.08,.6],['Secunderabad',17.4399,78.4983,.8,.18,.3,.75],['Gachibowli',17.4401,78.3489,.45,.3,.1,.5],['Begumpet',17.444,78.465,.7,.22,.3,.7],['Kukatpally',17.4948,78.3996,.72,.18,.35,.7],['LB Nagar',17.3457,78.5522,.75,.12,.5,.75],['Uppal',17.4058,78.5591,.65,.15,.4,.65],['Jubilee Hills',17.4325,78.4071,.45,.5,.1,.4],['Mehdipatnam',17.395,78.44,.85,.1,.45,.8],['Dilsukhnagar',17.3688,78.5247,.88,.08,.45,.8]],
chennai:[['T. Nagar',13.0418,80.2341,.95,.08,.3,.85],['Anna Nagar',13.085,80.2101,.65,.35,.1,.55],['Adyar',13.0012,80.2565,.6,.45,.12,.5],['Velachery',12.9815,80.218,.72,.18,.3,.65],['Tondiarpet',13.1262,80.2875,.9,.05,.85,.85],['Royapuram',13.113,80.2954,.88,.05,.8,.8],['Egmore',13.0732,80.2609,.85,.1,.25,.8],['Mylapore',13.0368,80.2676,.78,.2,.22,.65],['Guindy',13.0067,80.2206,.62,.4,.2,.7],['Perambur',13.1186,80.233,.78,.1,.55,.75],['Sholinganallur',12.901,80.2279,.5,.2,.15,.55],['Tambaram',12.9249,80.1,.6,.3,.3,.5]],
pune:[['Shivajinagar',18.5308,73.8475,.75,.3,.35,.7],['Kothrud',18.5074,73.8077,.65,.35,.2,.45],['Hadapsar',18.5089,73.926,.7,.2,.45,.65],['Kharadi',18.5515,73.94,.55,.25,.15,.5],['Hinjewadi',18.5912,73.7389,.45,.2,.2,.55],['Viman Nagar',18.5679,73.9143,.6,.3,.2,.55],['Swargate',18.5018,73.8636,.9,.12,.5,.85],['Pimpri',18.6279,73.8009,.75,.15,.5,.75],['Koregaon Park',18.5362,73.894,.5,.55,.1,.4],['Katraj',18.4575,73.8677,.6,.3,.45,.55],['Baner',18.559,73.7868,.5,.35,.12,.45],['Pune Camp',18.5136,73.8786,.8,.3,.35,.7]]};
let s=7;const rnd=()=>(s=(s*16807)%2147483647)/2147483647,cl=v=>Math.max(5,Math.min(98,v)),slug=t=>t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const km=(a,b)=>Math.hypot((a.lng-b.lng)*111.32*Math.cos(a.lat*Math.PI/180),(a.lat-b.lat)*110.57);
export const zones=[],loaded={},base=Object.fromEntries(CITIES.map(c=>[c.id,c]));
// hexagon radius (km) = 45% of the distance to the nearest neighbour, so shapes never overlap
export function addZones(cid,list){const c=base[cid],out=[];for(const[n,lat,lng,d,g,lo,t]of list){const q=()=>(rnd()-.5)*10;
 out.push({id:cid+'-'+slug(n),n,city:cid,lat,lng,weather:cl(c.w+d*4+q()/2),humidity:cl(c.h+q()),surface:cl(28+52*d-26*g+q()),form:cl(24+55*d-38*g+q()),air:cl(26+38*t+12*d+q()),exposure:cl(20+58*lo+12*d+q())})}
 for(const a of out){let m=9;for(const b of out)if(a!==b)m=Math.min(m,km(a,b));a.r=Math.max(.35,Math.min(.95,m*.45))}
 zones.push(...out);loaded[cid]=1;const m=k=>out.reduce((x,z)=>x+z[k],0)/(out.length||1);c.s0=m('surface');c.a0=m('air');return out}
for(const c of CITIES.slice(0,6))addZones(c.id,Z[c.id]);
// For cities outside the first six: profile is ESTIMATED from distance to the centre plus a name hash.
const hs=t=>{let h=7;for(const ch of t)h=(h*31+ch.charCodeAt(0))%1009;return h/1009},k=(v,a,b)=>Math.max(a,Math.min(b,v));
export const profile=(c,p)=>{const dd=km({lat:c.c[1],lng:c.c[0]},p),d=k(.95-dd/12+(hs(p.n)-.5)*.3,.2,1);return[p.n,p.lat,p.lng,d,k(.12+dd/22+(hs(p.n+'g')-.5)*.3,.03,.7),k(.15+hs(p.n+'l')*.65,.05,.95),k(.85*d+.15*hs(p.n+'t'),.1,1)]};
const curve=h=>.3+.7*Math.exp(-(((h-15)/4)**2));
// Live hourly weather per city (Open-Meteo). Falls back to the modelled curve when empty.
export const LIVE={};export const setLive=(id,p)=>{const o={...LIVE[id],...p};if(p.t){o._n=0;o._d=null;o._hot=0}return LIVE[id]=o};
const tw=(T,R)=>T*Math.atan(.151977*Math.sqrt(R+8.313659))+Math.atan(T+R)-Math.atan(R-1.676331)+.00391838*R**1.5*Math.atan(.023101*R)-4.686035;
// trees = added canopy points. Illustrative: -1.2 surface heat, -0.8 urban form per point.
export function calc(z,h,t=0){const c=curve(h),L=LIVE[z.city],T=L&&L.t&&L.rh&&L.rh[h]!=null?L.t[h]:null,R=T!=null?Math.min(99,Math.max(5,L.rh[h])):null,b=base[z.city],
 f={weather:T!=null?cl(z.weather-b.w+(T-20)/26*100):z.weather*c,humidity:T!=null?cl(z.humidity-b.h+(tw(T,R)-15)/17*100):z.humidity*(.6+.4*c),surface:L&&L.st&&L.st[h]!=null?Math.max(0,cl(z.surface-b.s0+(L.st[h]-20)/35*100)-1.2*t):Math.max(0,z.surface-1.2*t)*c,form:Math.max(0,z.form-.8*t),air:L&&L.aqi&&L.aqi[h]!=null?cl(z.air-b.a0+Math.min(100,L.aqi[h]/2)):z.air,exposure:z.exposure};
 let sum=0;for(const x of FACTORS)sum+=x.w*f[x.k];const dur=durOf(L);
 return{f,dur,score:Math.round(sum+10*dur),top:FACTORS.map(x=>[x,x.w*f[x.k]]).sort((p,q)=>q[1]-p[1]).slice(0,2).map(p=>p[0])}}
// Heat duration (0-1): hot hours in the next 72 h plus warm nights. Adds up to 10 points to the risk score.
export function durOf(L){if(!L||!L.t||!L.rh||L.t.length<48)return 0;if(L._n===L.t.length&&L._d!=null)return L._d;let hot=0,nights=0;
 for(let i=0;i<L.t.length;i++){const R=Math.min(99,Math.max(5,L.rh[i]));if(L.t[i]>=35||tw(L.t[i],R)>=28)hot++}
 for(let k=1;k<L.t.length/24;k++){const a=L.t.slice(k*24,k*24+6);if(a.length&&Math.min(...a)>=27)nights++}
 L._n=L.t.length;L._hot=hot;return L._d=Math.min(1,hot/36)*.7+Math.min(1,nights/2)*.3}
export const hotHours=id=>{durOf(LIVE[id]);return LIVE[id]&&LIVE[id]._hot||0};
export const level=s=>s<45?'Low':s<58?'Moderate':s<70?'High':'Extreme';
const RAMPS={risk:['#fbe8a6','#f4b860','#e8743b','#c23b2a','#7a1b1b'],surface:['#dfe2e3','#b4babc','#858c8f','#5a6164','#30363a'],people:['#d8e8e8','#9fc4c4','#5f9a9a','#2c7474','#0b5c5c']};
const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
export function ramp(l,t){const a=RAMPS[l],p=Math.min(.999,Math.max(0,t))*(a.length-1),i=Math.floor(p),u=p-i,A=hx(a[i]),B=hx(a[i+1]);return'#'+A.map((v,j)=>Math.round(v+(B[j]-v)*u).toString(16).padStart(2,'0')).join('')}
// District-level heat index: live weather drives it; form, air and exposure stay neutral (50) until district data exists.
export function dscore(L,h){const T=L&&L.t&&L.rh&&L.rh[h]!=null?L.t[h]:null;if(T==null)return null;const R=Math.min(99,Math.max(5,L.rh[h])),w=cl((T-20)/26*100),f={weather:w,humidity:cl((tw(T,R)-15)/17*100),surface:L.st&&L.st[h]!=null?cl((L.st[h]-20)/35*100):w,form:50,air:50,exposure:50};let s=0;for(const x of FACTORS)s+=x.w*f[x.k];const du=durOf(L);return{score:Math.round(s+10*du),T:Math.round(T),wb:Math.round(tw(T,R))}}

// Illustrative intervention effects on the factor scores (points) and relative cost. Not validated; replace with local evidence.
export const INTERV=[{k:'trees',n:'Plant street trees',fx:{surface:-12,form:-8},cost:3},{k:'roofs',n:'Cool roofs',fx:{surface:-10},cost:4},{k:'centre',n:'Cooling centre within 500 m',fx:{exposure:-12},cost:2},{k:'checks',n:'Door-to-door checks and alerts',fx:{exposure:-8},cost:1}];
export function plan(z,h){const b=calc(z,h);return INTERV.map(i=>{const f={...b.f};for(const k in i.fx)f[k]=Math.max(0,f[k]+i.fx[k]);let s=0;for(const x of FACTORS)s+=x.w*f[x.k];const gain=b.score-Math.round(s+10*b.dur);return{i,gain,per:gain/i.cost}}).sort((p,q)=>q.per-p.per)}
