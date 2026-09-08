const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const filename = path.resolve(__dirname, '../src/components/journeyPath.ts');
const compiled = new Module(filename, module);
compiled.filename = filename;
compiled.paths = Module._nodeModulePaths(path.dirname(filename));
compiled._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, filename);
const { buildTrail, pointOnTrail, closestStation, caseAnchor, trailOutline, scrollToTrailY, passedStops } = compiled.exports;
const stations = [
  { id: 'basecamp', x: 810, y: 490, exitY: 680 },
  { id: 'work', x: 250, y: 1230, exitY: 1580 },
  { id: 'nvidia-lab', x: 810, y: 2140, exitY: 2410 },
];
test('duplicate arrival points do not pinch trail edges', () => {
  const clean = [{x:0,y:0},{x:0,y:40},{x:40,y:80},{x:40,y:120}];
  const repeated = clean.flatMap(point => [point, point, point]);
  for (const irregular of [true,false]) assert.equal(trailOutline(repeated,34,irregular),trailOutline(clean,34,irregular));
  assert.equal(trailOutline([{x:1,y:1},{x:1,y:1}],34),'');
});
test('stop celebrations cross downward thresholds only, including the final arrival', () => {
  assert.deepEqual(passedStops(stations,490,513),[]);
  assert.deepEqual(passedStops(stations,490,514).map(s=>s.id),['basecamp']);
  assert.deepEqual(passedStops(stations,2200,490),[]);
  assert.deepEqual(passedStops(stations,490,2140).map(s=>s.id),['basecamp','work','nvidia-lab']);
  assert.deepEqual(passedStops(stations,2140,2140),[]);
});

test('trail reaches every station and clamps before/after the journey', () => {
  const points = buildTrail(stations);
  for (const {x,y} of stations) assert.deepEqual(pointOnTrail(points,y),{x,y});
  assert.deepEqual(pointOnTrail(points,-100),{x:810,y:490});
  assert.deepEqual(pointOnTrail(points,99999),{x:810,y:2140});
  assert.deepEqual(pointOnTrail([],0),{x:0,y:0});
});
test('horizontal travel occurs only below the preceding section', () => {
  const points = buildTrail(stations);
  for(let i=1;i<points.length;i++) {
    assert.ok(points[i].y >= points[i-1].y);
    if(points[i].x !== points[i-1].x) {
      const before = stations.filter(p => p.y < points[i].y).at(-1);
      assert.ok(points[i-1].y >= before.exitY);
    }
  }
});
test('resize and disclosure expansion use updated measured coordinates', () => {
  const mobile = stations.map(p=>({...p,x:26}));
  assert.ok(buildTrail(mobile).every(p=>p.x === 26));
  const expanded = stations.map((p,i)=>({...p,y:p.y+(i ? 1600:0),exitY:p.exitY+1600}));
  const points = buildTrail(expanded);
  assert.deepEqual(pointOnTrail(points,2830),{x:250,y:2830});
});
test('reversing direction and large jumps produce deterministic on-trail positions', () => {
  const points = buildTrail(stations);
  const ys = [500,600,745,1200,1850,2100];
  const forward = ys.map(y=>pointOnTrail(points,y));
  assert.deepEqual([...ys].reverse().map(y=>pointOnTrail(points,y)).reverse(),forward);
  for(const p of forward) assert.ok(Number.isFinite(p.x) && p.x>=250 && p.x<=810);
});
test('reduced motion snaps to a destination, not an interpolated crossing', () => {
  assert.equal(closestStation(stations,1300).id,'work');
  assert.equal(closestStation(stations,99999).id,'nvidia-lab');
  assert.equal(closestStation([],100),undefined);
});
test('legacy case anchors select disclosures without hijacking other navigation', () => {
  for(const id of ['ai-valley','nvidia','pearle']) assert.equal(caseAnchor('#'+id),id);
  assert.equal(caseAnchor('#case-studies'),'ai-valley');
  for(const id of ['#world','#work','#about','#toolkit','#contact','#unknown']) assert.equal(caseAnchor(id),undefined);
});
test('homepage retains unique destination/disclosure anchors and external links', () => {
  const home = fs.readFileSync(path.resolve(__dirname,'../src/components/PortfolioHomepage.tsx'),'utf8');
  for(const id of ['world','work','case-studies','ai-valley','nvidia','pearle','about','toolkit','contact'])
    assert.equal((home.match(new RegExp(`id="${id}"`,'g'))||[]).length,1,id);
  for(const href of ['https://aivalley.io/events','/Courtney_Ko_Resume.pdf','https://paca-plate.vercel.app/','https://pacalife.app/','https://paca-money.vercel.app/']) assert.ok(home.includes(href),href);
  assert.ok(!home.includes('<OpacaWorldHero'));
  assert.ok(!home.includes('world-destinations'));
});
test('desktop arrivals bypass buildings before turning into the clearing', () => {
  const route=buildTrail(stations.map(p=>({...p,approachX:540})));
  for(let y=900;y<1182;y+=8) assert.equal(pointOnTrail(route,y).x,540);
  assert.deepEqual(pointOnTrail(route,1230),{x:250,y:1230});
  const outline=trailOutline(route,64,true);
  assert.ok(outline.startsWith('M') && outline.endsWith(' Z'));
  assert.ok(!outline.includes('NaN'));
});
test('event, resume, contact and disclosure analytics keep their classification', () => {
  const file=path.resolve(__dirname,'../src/components/portfolioAnalytics.ts');
  const mod=new Module(file,module);
  mod._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,file);
  const action=mod.exports.portfolioLinkAction;
  assert.equal(action('https://aivalley.io/events'),'events_click');
  assert.equal(action('/trips/ai-valley-events/'),'events_click');
  assert.equal(action('/Courtney_Ko_Resume.pdf'),'resume_click');
  assert.equal(action('mailto:courtneythko@gmail.com'),'email_click');
  assert.equal(action('https://www.linkedin.com/in/courtney-ko-720b63103/'),'linkedin_click');
  for(const id of ['#ai-valley','#nvidia','#pearle','#case-studies']) assert.equal(action(id),'case_study_click');
  assert.equal(action('#world'),null);
});
test('production landscape is a local square PNG with genuine alpha', () => {
  const png=fs.readFileSync(path.resolve(__dirname,'../public/journey-atlas.png'));
  assert.equal(png.readUInt32BE(16),1254);
  assert.equal(png.readUInt32BE(20),1254);
  assert.equal(png[25],6);
});
test('page endpoints reach Basecamp and Contact, including short pages and overscroll', () => {
  assert.equal(scrollToTrailY(0,5000,500,5400),500);
  assert.equal(scrollToTrailY(5000,5000,500,5400),5400);
  assert.equal(scrollToTrailY(2500,5000,500,5400),2950);
  assert.equal(scrollToTrailY(-100,5000,500,5400),500);
  assert.equal(scrollToTrailY(6000,5000,500,5400),5400);
  assert.equal(scrollToTrailY(0,0,500,5400),500);
});
