'use strict';
window.grammarUI=(()=>{
 const names={choice:'Felismerés',input:'Szóalkotás',repair:'Mondatjavító',build:'Szócédulák',segment:'Szóvágó',label:'Szóelemcímkék',pair:'Két mondat, két döntés'};
 const normal=s=>String(s).normalize('NFC').trim().toLocaleLowerCase('hu-HU').replace(/\s+/g,' ').replace(/[.!?]+$/,'');
 const boundaries=q=>q.parts.slice(0,-1).map((_,i)=>[...q.parts.slice(0,i+1).join('')].length);
 function judge(q,value){
  const ui=q.ui||'choice';let correct=false,display='';
  if(ui==='input'||ui==='repair'){display=String(value).trim();correct=normal(display)===normal(q.expected)}
  if(ui==='build'){display=value.join(' + ');correct=JSON.stringify(value)===JSON.stringify(q.parts)}
  if(ui==='label'||ui==='pair'){display=value.map(v=>v||'—').join(' + ');correct=JSON.stringify(value)===JSON.stringify(q.labels)}
  if(ui==='segment'){
   const cuts=[...value].sort((a,b)=>a-b);correct=JSON.stringify(cuts)===JSON.stringify(boundaries(q));
   display=[...q.word].map((c,i)=>c+(cuts.includes(i+1)?' + ':'')).join('');
  }
  return {correct,display:display||'Üres válasz'};
 }
 function render(q,{esc,shuffle}){
  const ui=q.ui;let inside='';
  if(ui==='input'||ui==='repair')inside=`<label for="typedAnswer">${ui==='repair'?'A javított mondatod':'A megoldásod'}</label><input id="typedAnswer" type="text" autocomplete="off" spellcheck="false" autocapitalize="off" placeholder="${ui==='repair'?'Írd le a helyes mondatot…':'Írd be a szóalakot…'}"><p class="small">Az ékezetek számítanak; a kis- és nagybetűk, illetve a mondatvégi pont nem.</p>`;
  if(ui==='build'){
   const tiles=shuffle([...q.parts,...(q.decoys||[])]);
   inside=`<p class="small">Kattints a cédulákra sorrendben! A kirakott cédulára kattintva visszateheted.</p><div id="tileTarget" class="tile-target" aria-label="Kirakott szó" aria-live="polite"></div><div class="tile-source">${tiles.map((t,i)=>`<button type="button" class="word-tile" data-tile="${i}" data-piece="${esc(t)}">${esc(t)}</button>`).join('')}</div>`;
  }
  if(ui==='segment')inside=`<p class="small">A kis ollók jelölik a lehetséges határokat. Kijelölés után újra kattintva törölhetsz.</p><div class="cut-word" aria-label="Szóelemek határai">${[...q.word].map((c,i,a)=>`<span>${esc(c)}</span>${i<a.length-1?`<button type="button" data-cut="${i+1}" aria-label="Határ a(z) ${i+1}. betű után" aria-pressed="false">✂</button>`:''}`).join('')}</div>`;
  if(ui==='label'||ui==='pair'){
   const items=ui==='pair'?q.example.split('\n'):q.parts;
   inside=`<div class="role-slots">${items.map((p,i)=>`<label>${ui==='pair'?`${i+1}. mondat: `:''}<b>${esc(p)}</b><select data-slot="${i}" aria-label="${i+1}. ${ui==='pair'?'mondat toldalékának szerepe':'szóelem típusa'}"><option value="">Válassz…</option>${(ui==='pair'?['Képző','Jel','Rag']:['Szótő','Képző','Jel','Rag']).map(v=>`<option>${v}</option>`).join('')}</select></label>`).join('')}</div>`;
  }
  return `<form id="interactiveAnswer" class="interactive-answer"><fieldset><legend>${names[ui]}</legend>${inside}<button class="button check-answer" type="submit">Válasz rögzítése →</button><p id="inputHint" class="small" aria-live="polite"></p></fieldset></form>`;
 }
 function bind(q,{submit,esc}){
  let chosen=[],cuts=new Set();const form=document.querySelector('#interactiveAnswer');
  document.querySelectorAll('[data-tile]').forEach(b=>b.onclick=()=>{b.disabled=true;chosen.push({id:b.dataset.tile,text:b.dataset.piece});paint()});
  function paint(){
   document.querySelector('#tileTarget').innerHTML=chosen.length?chosen.map((v,i)=>`<button type="button" class="word-tile selected-tile" data-remove="${i}" aria-label="${esc(v.text)} cédula visszavétele">${esc(v.text)} ×</button>`).join(''):'<span class="small">Ide kerül a szavad…</span>';
   document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{const [back]=chosen.splice(+b.dataset.remove,1);document.querySelector(`[data-tile="${back.id}"]`).disabled=false;paint()});
  }
  if(q.ui==='build')paint();
  document.querySelectorAll('[data-cut]').forEach(b=>b.onclick=()=>{const pos=+b.dataset.cut;if(cuts.has(pos))cuts.delete(pos);else cuts.add(pos);b.setAttribute('aria-pressed',String(cuts.has(pos)))});
  form.onsubmit=e=>{
   e.preventDefault();let value;
   if(q.ui==='input'||q.ui==='repair')value=document.querySelector('#typedAnswer').value;
   if(q.ui==='build')value=chosen.map(v=>v.text);
   if(q.ui==='segment')value=[...cuts];
   if(q.ui==='pair'||q.ui==='label')value=[...document.querySelectorAll('[data-slot]')].map(s=>s.value);
   if((typeof value==='string'&&!value.trim())||(Array.isArray(value)&&(!value.length||value.some(v=>v==='')))){document.querySelector('#inputHint').textContent='Előbb állítsd össze a válaszodat!';return}
   form.querySelector('fieldset').disabled=true;submit(judge(q,value));
  };
 }
 function schedule(pool,shuffle,recent=[]){
  const pending=shuffle(pool).sort((a,b)=>Number(recent.includes(a.id))-Number(recent.includes(b.id))),out=[];
  while(pending.length){
   const last=out.at(-1),families=out.slice(-3).map(q=>q.family);
   let i=pending.findIndex(q=>(!last||q.ui!==last.ui)&&!families.includes(q.family));
   if(i<0)i=pending.findIndex(q=>!last||q.ui!==last.ui);
   if(i<0)i=0;out.push(pending.splice(i,1)[0]);
  }
  return out;
 }
 return {names,judge,render,bind,schedule,boundaries};
})();
