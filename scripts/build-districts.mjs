// Usage: node scripts/build-districts.mjs districts.geojson  ->  public/districts.json
// Works with common India district GeoJSON files (e.g. datta07/INDIAN-SHAPEFILES, guneetnarula/indian-district-boundaries).
import fs from 'node:fs';
const pick=(p,ks)=>{for(const k of ks)if(p[k])return String(p[k]).trim();return''};
const DK=['NAME_2','dtname','DISTRICT','district','District','DIST_NAME','dist_name','dt_name','name','Name'],SK=['NAME_1','stname','STATE','ST_NM','state','State','STATE_NAME','st_nm','STATE_UT','st_name'];
const polys=g=>g.type==='Polygon'?[g.coordinates]:g.type==='MultiPolygon'?g.coordinates:[];
const f=process.argv[2];if(!f){console.error('Give a GeoJSON path');process.exit(1)}
const out=[],bad=[];let skip=0;
for(const ft of JSON.parse(fs.readFileSync(f,'utf8')).features){const p=ft.properties||{},n=pick(p,DK),s=pick(p,SK);
 let best=null,ba=-1;for(const poly of polys(ft.geometry||{})){const r=poly[0];let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(const[x,y]of r){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)}const a=(x1-x0)*(y1-y0);if(a>ba){ba=a;best=[(x0+x1)/2,(y0+y1)/2]}}
 if(!n||!s||!best){skip++;continue}
 // The datta07 file has 8 districts cut to one or two letters and one stray island polygon; drop them rather than show wrong names.
 if(n.length<3||/\bDNH\b/i.test(s)){bad.push(s+' / '+n);continue}out.push([s,n,+best[0].toFixed(3),+best[1].toFixed(3)])}
fs.mkdirSync('public',{recursive:true});fs.writeFileSync('public/districts.json',JSON.stringify(out));
if(bad.length)console.log('Dropped bad source rows: '+bad.join('; '));
console.log(out.length+' districts written to public/districts.json'+(skip?` (${skip} skipped: missing name, state or geometry; check the property names)`:''));
