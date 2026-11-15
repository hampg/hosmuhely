const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const c=vm.createContext({window:{}});for(const f of ['grammar-data.js','grammar-ui.js'])vm.runInContext(fs.readFileSync('dist/'+f,'utf8'),c);
const ui=c.window.grammarUI,qs=c.window.grammarData.flat(),counts={};
for(const q of qs){
 counts[q.ui]=(counts[q.ui]||0)+1;
 if(q.ui==='choice')continue;
 const expected=q.ui==='input'||q.ui==='repair'?q.expected:q.ui==='build'?q.parts:q.ui==='segment'?ui.boundaries(q):q.labels;
 assert.ok(ui.judge(q,expected).correct,q.id+' known correct answer');
 const wrong=q.ui==='input'||q.ui==='repair'?'hibás':q.ui==='segment'?[1]:['Képző','Képző','Képző'];
 assert.ok(!ui.judge(q,wrong).correct,q.id+' known wrong answer');
 assert.ok(ui.judge(q,wrong).display.length>0);
 if(q.ui==='input'||q.ui==='repair')assert.ok(ui.judge(q,'  '+q.expected.toUpperCase().replace(/\.$/,'')+'  ').correct,'Whitespace/case/period tolerance');
}
assert.equal(Object.keys(counts).length,7);
assert.equal(counts.choice,100);assert.equal(counts.input,130);assert.equal(counts.repair,40);assert.equal(counts.build,80);assert.equal(counts.segment,50);assert.equal(counts.label,50);assert.equal(counts.pair,50);
const schedule=ui.schedule(qs,a=>[...a],[]);assert.equal(new Set(schedule.map(q=>q.id)).size,500);
for(let i=1;i<100;i++)assert.notEqual(schedule[i].ui,schedule[i-1].ui,'First 100 mix interaction formats');
const repairs=qs.filter(q=>q.ui==='repair');assert.ok(repairs.every(q=>q.text.includes('Javítsd')));
assert.ok(repairs.find(q=>q.expected==='Három ház van.'));
assert.ok(qs.some(q=>q.expected==='olvasott'));assert.ok(qs.some(q=>q.expected==='szebb'));assert.ok(qs.some(q=>q.expected==='könyvem'));
assert.ok(qs.filter(q=>q.ui==='label').some(q=>q.labels.includes('Képző')));
console.log('PASS: 7 feladatforma, 400 interaktív megoldás + hibás válasz ellenőrzése, elfogadott szövegváltozatok, 500-as változatos sorozat.',counts);
