const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const elements=new Map(),saved=new Map();
function element(key){if(!elements.has(key))elements.set(key,{innerHTML:'',textContent:'',hidden:true,value:'',style:{},classList:{toggle(){}},focus(){},scrollIntoView(){}});return elements.get(key)}
const context=vm.createContext({window:{},document:{querySelector:element,querySelectorAll:()=>[]},localStorage:{getItem:k=>saved.get(k)??null,setItem:(k,v)=>saved.set(k,v)},console,Blob,URL,setTimeout,confirm:()=>false});
for(const f of ['chapter-data.js','app.js'])vm.runInContext(fs.readFileSync('dist/'+f,'utf8'),context);
const run=s=>vm.runInContext(s,context);
assert.equal(run('bank.length'),9);
assert.equal(run('bank.reduce((n,g)=>n+g.qs.length,0)'),114);
assert.equal(run('chapter.lessons.length'),14);
for(let lesson=1;lesson<=13;lesson++)assert.ok(run(`allChapterQuestions().some(x=>x.lesson===${lesson})`));
assert.ok(!run('JSON.stringify(bank).includes("Toldi")'));
assert.ok(!run('JSON.stringify(bank).includes("fehér ló")'));
for(const g of run('bank'))for(const q of g.qs){assert.ok(q.text&&q.example&&q.why);assert.ok(q.options.length>=2);assert.equal(new Set(q.options).size,q.options.length);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length)}
for(let id=0;id<9;id++){
 run(`start(${id},'test')`);
 assert.equal(run('state.qs.length'),8);assert.equal(run('new Set(state.qs.map(x=>x.text+x.example)).size'),8);
 for(let i=0;i<8;i++){run('answer(state.qs[state.index].answer)');run('answer(state.qs[state.index].answer)');assert.equal(run('state.answers.length'),i+1);assert.ok(!element('#feedback').innerHTML.includes('Helyes válasz:'));element('#next').onclick()}
 assert.ok(element('#play').innerHTML.includes('100%'));assert.equal(saved.get('hosmuhely:best-v2:'+id+':all'),'100');
}
for(let lesson=1;lesson<=13;lesson++){
 run(`start(2,'practice',allChapterQuestions().filter(x=>x.lesson===${lesson}),'${lesson}')`);
 const length=run('state.qs.length');assert.ok(length>0&&length<=8);
 for(let i=0;i<length;i++){run('answer((state.qs[state.index].answer+1)%state.qs[state.index].options.length)');assert.ok(element('#feedback').innerHTML.includes('Tankönyvi háttér:'));element('#next').onclick()}
 assert.ok(element('#play').innerHTML.includes('0%'));assert.ok(element('#retry').onclick);element('#retry').onclick();assert.equal(run('state.mode'),'practice');assert.equal(run('state.qs.length'),length);assert.ok(run(`state.qs.every(x=>x.lesson===${lesson})`));
}
console.log('PASS: 114 kérdés; 14 leckelink; 9 hibátlan tesztkör; 13 leckeszűrés, javítás és hibaismétlés.');
