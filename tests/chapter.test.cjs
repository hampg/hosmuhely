const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const elements=new Map(),saved=new Map();
function element(key){if(!elements.has(key))elements.set(key,{innerHTML:'',textContent:'',hidden:true,value:'',style:{},classList:{toggle(){}},focus(){},scrollIntoView(){},after(){}});return elements.get(key)}
const context=vm.createContext({window:{addEventListener(){}},location:{hash:""},document:{querySelector:element,querySelectorAll:()=>[]},localStorage:{getItem:k=>saved.get(k)??null,setItem:(k,v)=>saved.set(k,v)},console,Blob,URL,setTimeout,confirm:()=>false});
for(const f of ['chapter-data.js','grammar-data.js','app.js'])vm.runInContext(fs.readFileSync('dist/'+f,'utf8'),context);
const run=s=>vm.runInContext(s,context);
assert.equal(run('bank.length'),10);
assert.equal(run("bank.filter(g=>g.subject==='literature').reduce((n,g)=>n+g.qs.length,0)"),90);
assert.equal(run('grammar.flat().length'),500);
assert.equal(run('new Set(grammar.flat().map(q=>q.text+q.example)).size'),500);
assert.equal(run("bank.filter(g=>g.subject==='literature').length"),6);
assert.equal(run("bank.filter(g=>g.subject==='grammar').length"),4);
assert.equal(run('chapter.lessons.length'),14);
for(let lesson=1;lesson<=13;lesson++)assert.ok(run(`allChapterQuestions().some(x=>x.lesson===${lesson})`));
assert.ok(!run('JSON.stringify(bank).includes("Toldi")'));
assert.ok(!run('JSON.stringify(bank).includes("fehér ló")'));
for(const g of run('bank'))for(const q of g.qs){assert.ok(q.text&&q.example&&q.why);assert.ok(q.options.length>=2);assert.equal(new Set(q.options).size,q.options.length);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length)}
for(let id=0;id<10;id++){
 run(`start(${id},'test')`);
 const n=run('state.qs.length');assert.equal(n,Math.min(20,run(`bank[${id}].qs.length`)));assert.equal(run('new Set(state.qs.map(x=>x.text+x.example)).size'),n);
 for(let i=0;i<n;i++){run('answer(state.qs[state.index].answer)');run('answer(state.qs[state.index].answer)');assert.equal(run('state.answers.length'),i+1);assert.ok(!element('#feedback').innerHTML.includes('Helyes válasz:'));element('#next').onclick()}
 assert.ok(element('#play').innerHTML.includes('100%'));assert.equal(saved.get('hosmuhely:best-v4:'+id+':all'),'100');
}
for(let lesson=1;lesson<=13;lesson++){
 run(`start(2,'practice',allChapterQuestions().filter(x=>x.lesson===${lesson}),'${lesson}')`);
 const length=run('state.qs.length');assert.ok(length>0&&length<=20);
 for(let i=0;i<length;i++){run('answer((state.qs[state.index].answer+1)%state.qs[state.index].options.length)');assert.ok(element('#feedback').innerHTML.includes('Tankönyvi háttér:'));element('#next').onclick()}
 assert.ok(element('#play').innerHTML.includes('0%'));assert.ok(element('#retry').onclick);element('#retry').onclick();assert.equal(run('state.mode'),'practice');assert.equal(run('state.qs.length'),length);assert.ok(run(`state.qs.every(x=>x.lesson===${lesson})`));
}
// Entire 500-question test, beyond the old 8-question limit.
run("start(9,'test',undefined,'all',500)");
assert.equal(run('state.qs.length'),500);
for(let i=0;i<500;i++){run('answer(state.qs[state.index].answer)');element('#next').onclick()}
assert.ok(element('#play').innerHTML.includes('500 / 500'));
assert.ok(element('#play').innerHTML.includes('100%'));
run("start(9,'practice',undefined,'all',50)");assert.equal(run('state.qs.length'),50);
run("answer((state.qs[0].answer+1)%state.qs[0].options.length)");element('#next').onclick();run('endRound()');
assert.equal(run('state.qs.length'),1);assert.ok(run('state.partial'));
element('#retry').onclick();assert.equal(run('state.qs.length'),1);
run("start(3,'practice',grammar[0].filter(q=>q.kind==='képző'),'képző','all')");assert.equal(run('state.qs.length'),60);
assert.ok(run("state.qs.every(q=>q.kind==='képző')"));
run("start(9,'test',undefined,'all',1)");assert.equal(run('state.qs.length'),1);
console.log('PASS: 500 különböző nyelvtani feladat; 90 irodalmi feladat; külön tárgyak; teljes 500-as teszt; szűrés, pontozás, lezárás és hibaismétlés.');
