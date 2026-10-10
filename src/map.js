import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
const STY={std:'https://tiles.openfreemap.org/styles/liberty',light:'https://tiles.openfreemap.org/styles/positron'};
const ring=z=>{const R=[];for(let i=0;i<=6;i++){const a=(60*i+30)*Math.PI/180;R.push([z.lng+z.r/(111.32*Math.cos(z.lat*Math.PI/180))*Math.cos(a),z.lat+z.r/110.57*Math.sin(a)])}return[R]};
export function createMap(host,onPick,onFail){
 const t=document.createElement('canvas');if(!(t.getContext('webgl2')||t.getContext('webgl')))return null;
 const rm=matchMedia('(prefers-reduced-motion: reduce)');let ready=false,bound=false,fc={type:'FeatureCollection',features:[]},orb=false,hold=0;
 const map=new maplibregl.Map({container:host,style:STY.std,center:[78.5,21.5],zoom:3.6,maxPitch:75,attributionControl:{compact:true}});
 map.addControl(new maplibregl.NavigationControl({visualizePitch:true}),'bottom-right');
 map.addControl(new maplibregl.GeolocateControl({trackUserLocation:false}),'bottom-right');
 map.on('style.load',()=>{ready=true;const S=map.getStyle(),L=S.layers,src=Object.keys(S.sources).find(k=>S.sources[k].type==='vector');
  let ext=L.find(l=>l.type==='fill-extrusion')?.id;
  if(!ext&&src){map.addLayer({id:'b3d',type:'fill-extrusion',source:src,'source-layer':'building',minzoom:13,paint:{'fill-extrusion-color':'#d6d9d9','fill-extrusion-height':['coalesce',['get','render_height'],8],'fill-extrusion-base':['coalesce',['get','render_min_height'],0],'fill-extrusion-opacity':.92}},L.find(l=>l.type==='symbol')?.id);ext='b3d'}
  map.addSource('zones',{type:'geojson',data:fc});
  map.addLayer({id:'z-fill',type:'fill',source:'zones',paint:{'fill-color':['get','c'],'fill-opacity':['case',['==',['get','sel'],1],.7,.46]}},ext);
  map.addLayer({id:'z-line',type:'line',source:'zones',paint:{'line-color':'#fff','line-opacity':.9,'line-width':['case',['==',['get','sel'],1],3.5,1.2]}},ext);
  if(!bound){bound=true;map.on('click','z-fill',e=>onPick(e.features[0].properties.id));
  map.on('mouseenter','z-fill',()=>map.getCanvas().style.cursor='pointer');map.on('mouseleave','z-fill',()=>map.getCanvas().style.cursor='')}});
 map.on('error',()=>{if(!ready&&onFail)onFail()});
 ['mousedown','touchstart','wheel'].forEach(e=>map.on(e,()=>hold=performance.now()+8000));
 (function loop(){if(orb&&!rm.matches&&ready&&performance.now()>hold)map.setBearing(map.getBearing()+.03);requestAnimationFrame(loop)})();
 return{
  update(list){fc={type:'FeatureCollection',features:list.map(({z,c,sel})=>({type:'Feature',properties:{id:z.id,c,sel},geometry:{type:'Polygon',coordinates:z.ring||(z.ring=ring(z))}}))};map.getSource('zones')?.setData(fc)},
  go(v,pad,orbit){const o={center:v.c,zoom:v.z,pitch:v.p,bearing:v.b,padding:pad||{left:0,right:0,top:0,bottom:0}};orb=orbit;hold=performance.now()+3000;rm.matches?map.jumpTo(o):map.flyTo({...o,duration:2600,essential:true})},
  style(n){map.setStyle(STY[n])},
  marker(el,ll){return new maplibregl.Marker({element:el}).setLngLat(ll).addTo(map)}}}
