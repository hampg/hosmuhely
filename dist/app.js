'use strict';
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const storage={get(k,f){try{return JSON.parse(localStorage.getItem('hosmuhely:'+k))??f}catch{return f}},set(k,v){try{localStorage.setItem('hosmuhely:'+k,JSON.stringify(v));return true}catch{return false}}};
const q=(text,example,options,answer,why)=>({text,example,options,answer,why});
const genres=['Epika','Líra','Dráma'],forms=['Verses','Prózai'];
const bank=[
{title:'Műnemnyomozó',icon:'↗',desc:'Elmesél, kibont vagy megjelenít? Találd meg a szöveg műnemét!',tag:'IRODALOM',qs:[
q('Melyik műnemhez illik ez a saját szövegpélda?','A fiú hajnalban elindult a várhoz. Az úton egy sebesült vándorral találkozott.',genres,0,'Egy elbeszélő eseményeket mond el. Ez epikai alaphelyzet.'),
q('Mi a hangsúly ebben a szövegben?','Oly üres ma minden út,\nbennem is csak csönd lapul.',genres,1,'A beszélő lelkiállapota, magánya kerül előtérbe: líra.'),
q('Melyik műnemre jellemző ez a részlet?','ANNA: Nem hagylak itt!\nMÁRK: Menj, amíg lehet!\n(Anna visszalép az ajtóból.)',genres,2,'A szereplők megszólalásai és cselekvései jelenítik meg a helyzetet. A zárójel színpadi utasítás.'),
q('Melyik műnembe soroljuk a Lúdas Matyit?','Fazekas Mihály verses története Matyi és Döbrögi konfliktusát beszéli el.',genres,0,'A Lúdas Matyi történetet mesél el: epika. Verses formája ettől külön kérdés.'),
q('Hová tartozik egy hősi monda?','Egy király tetteit elbeszélő, csodás elemeket tartalmazó történet.',genres,0,'A monda epikai műfaj: történetet beszél el.'),
q('Melyik műnemre jellemző?','Színpadra szánt mű, konfliktussal, párbeszédekkel és szereplői cselekvésekkel.',genres,2,'A dráma a történetet megjeleníti. Nem minden hétköznapi beszélgetés dráma.'),
q('Melyik műnemre utal?','A lírai beszélő az otthona iránti vágyakozását fejezi ki.',genres,1,'Az érzés és lelkiállapot kibontása a lírára jellemző.'),
q('Melyik műnem alapjegyét látod?','A narrátor elmondja, hogyan jutott be a hős a várba.',genres,0,'A narrátor elbeszélő: történetet közvetít.'),
q('Melyik műnemre utal az előadásmód?','A szereplő döntése a szemünk előtt, párbeszéd és színpadi cselekvés közben születik meg.',genres,2,'A történet a szereplők cselekvésében és beszédében bontakozik ki.'),
q('Melyik műnem a legjellemzőbb?','Nem események sorát ismerjük meg, hanem a beszélő örömét és reményeit.',genres,1,'A belső élmény és érzés áll középpontban: líra.') ]},
{title:'Forma ≠ műnem',icon:'≈',desc:'Versben is lehet történetet mesélni. Válaszd szét a két kérdést!',tag:'IRODALOM',qs:[
q('Milyen a forma?','A kapu nyílt, a hős belépett,\nmeglátta ott a régi képet.',forms,0,'A saját példa verssorokra tagolt és rímel; a forma verses, a történetmondás epikai.'),
q('Milyen a forma?','A király maga elé hívatta a vándort. Megkérdezte tőle, honnan érkezett.',forms,1,'Folyamatos mondatokból álló prózai történet.'),
q('Melyik állítás igaz?','A Lúdas Matyi műneme epika. Milyen a formája? ',forms,0,'Az epikai mű lehet verses. A Lúdas Matyi elbeszélő költemény.'),
q('Kell-e minden versbe rím?','Egy vers sorai nem rímelnek egymással.',['Igen, rím nélkül nincs vers','Nem, létezik rímtelen vers'],1,'A rím nem kötelező feltétele a verses formának.'),
q('Mit tudunk biztosan?','Egy szöveg verses formájú.',['Biztosan lírai','A műneméhez a tartalmát és előadásmódját is meg kell nézni'],1,'A forma önmagában nem dönti el a műnemet.'),
q('Milyen a forma?','A tó fölött ma szürke fény lebeg. A parton állok, és hiányzik az otthonom.',forms,1,'A saját példát folyamatos prózai mondatokként írtuk meg. Ettől még érzéseket fejezhet ki.'),
q('Melyik a forma neve?','Epika · monda · prózai',['Epika','Monda','Prózai'],2,'Epika: műnem. Monda: műfaj. Prózai: forma.'),
q('Melyik a műnem neve?','Epika · elbeszélő költemény · verses',['Epika','Elbeszélő költemény','Verses'],0,'A műnem a legnagyobb csoport: itt az epika.') ]},
{title:'Hősök aktái',icon:'✳',desc:'Ismerd fel az első fejezet hőseit, döntéseit és történeteit!',tag:'HŐSÖK',qs:[]},
{title:'Toldalékválogató',icon:'+k',desc:'Alkoss szóalakokat, javíts mondatokat, építs új szavakat, és ismerd fel a toldalékokat!',tag:'NYELVTAN',qs:[]},
{title:'Szószerelő',icon:'✂',desc:'Ollóval jelöld a határokat, rakj sorrendbe szócédulákat, és címkézd fel a szóelemeket!',tag:'NYELVTAN',qs:[]},
{title:'Csavaros párok',icon:'?!',desc:'Ugyanaz a betű, más feladat. Kapd el a megtévesztő példákat!',tag:'VEGYES',qs:[]}
];
// Literature and grammar have separate banks and navigation.
const formerMixedLiterature=[
q('Melyik nem műnem?','Epika · ballada · dráma',['Epika','Ballada','Dráma'],1,'A ballada műfaj, az epika és a dráma műnem.'),
q('Melyik párosítás lehetséges?','Gondolj a Lúdas Matyira!',['Epika + verses forma','Csak líra + verses forma'],0,'Az epika formája lehet verses és prózai is.'),
q('A lírai beszélő mindig azonos a költővel?','A versben egy „én” beszél.',['Igen, mindig','Nem feltétlenül'],1,'A lírai beszélő megalkotott hang is lehet.'),
q('Mitől dráma egy mű?','Válaszd a pontosabb meghatározást!',['Attól, hogy a hős mindig helyesen cselekszik','Szereplői cselekvésekkel és megszólalásokkal jelenít meg egy történetet'],1,'Az önazonos cselekvés értelmezési kérdés, nem műnemi feltétel.')];
bank[0].qs.push(...formerMixedLiterature);
const grammar=window.grammarData;
bank[3].qs=grammar[0];bank[4].qs=grammar[1];
bank[5]={title:'Csavaros toldalékok',icon:'?!',tag:'NYELVTAN',desc:'Két mondat, két önálló döntés. Ne a végződést, hanem a mondatbeli szerepét figyeld!',qs:grammar[2]};
const chapter = window.chapterData;
bank[2].qs=chapter.groups[0];bank[2].chapter=true;
for(const [i,title,icon,desc] of [
[1,'Fogalomlabor','Aa','Legenda, epigramma, balladai homály, motívum: fejtsd meg a fogalmakat!'],
[2,'Ritmusműhely','ᴗ —','Rövid vagy hosszú? Jambus, daktilus és hexameter, apró lépésekben.'],
[3,'Művek útlevele','↔','Műnem, műfaj és forma: állítsd ki az olvasmányok útlevelét!']
])bank.push({title,icon,desc,tag:'HŐSÖK',chapter:true,qs:chapter.groups[i]});
bank.forEach(g=>g.subject=g.tag==='NYELVTAN'?'grammar':'literature');
bank.push({title:'Változatos műhelykör',icon:'500',tag:'NYELVTAN',subject:'grammar',desc:'Hétféle feladat váltakozik: építs, vágj, címkézz, írj, javíts és dönts! 500 példa egy helyen.',qs:grammar.flat()});
const grammarTypes={'képző':'Képző','jel':'Jel','rag':'Rag','elemzés':'Szóelemek elemzése','t-pár':'A -t két szerepe','k-pár':'A -k két szerepe'};
let activeSubject='literature';
const subjectOfHash=()=>location.hash.startsWith('#nyelvtan')?'grammar':'literature';
function setSubject(subject,keepArena=false){
 activeSubject=subject;
 document.querySelectorAll('[data-subject]').forEach(el=>el.hidden=el.dataset.subject!==subject);
 document.querySelectorAll('[data-subject-link]').forEach(el=>{const current=el.dataset.subjectLink===subject;el.classList.toggle('active',current);if(current)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current')});
 if(!keepArena)$('#arena').hidden=true;
}
window.addEventListener('hashchange',()=>setSubject(subjectOfHash()));
const lessonURL=n=>'https://www.nkp.hu/tankonyv/irodalom_6_nat2020/'+chapter.lessons.find(l=>l.id===n).slug;
const sourceLink=x=>x.lesson===undefined?'':`<p class="small source"><a target="_blank" rel="noopener" href="${lessonURL(x.lesson)}">Tankönyvi háttér: ${esc(chapter.lessons.find(l=>l.id===x.lesson).title)} ↗</a></p>`;
const allChapterQuestions=()=>bank.filter(g=>g.chapter).flatMap(g=>g.qs);
function lessonMap(){
 $('#lessonmap').innerHTML=chapter.lessons.map(l=>`<article class="lesson"><span class="eyebrow">${l.id===0?'RAJT':String(l.id).padStart(2,'0')} / ${esc(l.terms)}</span><h3>${esc(l.title)}</h3><p>${esc(l.summary)}</p><div class="lessonlinks"><a target="_blank" rel="noopener" href="${lessonURL(l.id)}">Lecke az NKP-n ↗</a>${l.id>0?`<button class="plain" data-lesson="${l.id}">Ezt gyakorlom →</button>`:'<a href="#jatekok">Játékot választok →</a>'}</div></article>`).join('');
 document.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>setup(2,String(b.dataset.lesson)));
 $('#questionTotal').textContent=bank.filter(g=>g.subject==='literature').reduce((n,g)=>n+g.qs.length,0);
}

let state=null;const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function cards(){
 for(const [subject,target] of [['literature','#games'],['grammar','#grammarGames']]){
  let count=0;$(target).innerHTML=bank.map((g,i)=>({g,i})).filter(({g})=>g.subject===subject).map(({g,i})=>{
   count++;let best=storage.get('best-v9:'+i+':all',null);
   return `<button class="gamecard" data-game="${i}"><span class="cardtop"><span>${String(count).padStart(2,'0')} / ${g.tag}</span><span>${g.qs.length} FELADAT</span></span><span class="icon">${g.icon}</span><span class="card-art art-${i}" aria-hidden="true"></span><h3>${g.title}</h3><p>${g.desc}</p><span class="cardbottom"><span>${best===null?'KEZDHETJÜK?':`LEGJOBB TESZT: ${best}%`}</span><span class="arrow">↗</span></span></button>`;
  }).join('');
 }
 document.querySelectorAll('[data-game]').forEach(b=>b.onclick=()=>setup(+b.dataset.game));
}
function show(){ $('#arena').hidden=false;$('#arena').scrollIntoView({behavior:'smooth',block:'start'});}
function setup(id,scope='all'){
 const g=bank[id];setSubject(g.subject,true);state={id,scope};
 const home=g.subject==='grammar'?$('#nyelvtan'):$('#jatekok');home.after($('#arena'));
 $('#modeLabel').textContent=g.title;$('#counter').textContent='';$('#progress div').style.width='0';
 const selection=g.chapter?`<div class="lessonfilter"><label for="lessonFilter">Mit gyakorolnál?</label><select id="lessonFilter"><option value="all">A játék teljes feladatbankja (${g.qs.length} feladat)</option>${chapter.lessons.filter(l=>l.id>0).map(l=>`<option value="${l.id}" ${String(l.id)===scope?'selected':''}>${esc(l.title)}</option>`).join('')}</select><p class="small">Leckét választva az összes irodalmi fejezetjáték ide tartozó feladatait kapod.</p></div>`:g.subject==='grammar'?`<div class="lessonfilter"><label for="grammarFilter">Feladattípus</label><select id="grammarFilter"><option value="all">Minden típus ebben a játékban</option>${[...new Set(g.qs.map(x=>x.kind||'elemzés'))].map(kind=>`<option value="${kind}">${grammarTypes[kind]}</option>`).join('')}</select><label for="grammarStyle">Hogyan gyakorolnál?</label><select id="grammarStyle"><option value="all">Váltakozó feladatok</option>${[...new Set(g.qs.map(x=>x.ui||'choice'))].map(ui=>`<option value="${ui}">${window.grammarUI.names[ui]}</option>`).join('')}</select></div>`:'';
 $('#play').innerHTML=`<p class="eyebrow">${g.subject==='grammar'?'NYELVTAN':'IRODALOM'} · A TE TEMPÓDBAN</p><h2>${g.title}</h2><p>${g.desc}</p>${selection}<div class="round-settings"><label for="roundCount">Hány feladat legyen a körben?</label><input id="roundCount" type="number" min="1" max="${g.qs.length}" value="${Math.min(20,g.qs.length)}"><div class="count-shortcuts"><button data-count="20">20</button><button data-count="50">50</button><button data-count="100">100</button><button data-count="all">Mind</button></div><p id="poolInfo" class="small" aria-live="polite"></p></div><div class="modepick"><label><input type="radio" name="mode" value="practice" checked> Gyakorlás · azonnali magyarázattal</label><label><input type="radio" name="mode" value="test"> Teszt · javítás a végén</label></div><p class="small">Nincs nyolcas korlát: 1-től a kiválasztott bank összes feladatáig választhatsz. Egy körön belül nincs ismétlés. A rögzített válaszokkal a kört közben is lezárhatod.</p><button class="button" id="start">Indulhat! ↗</button>`;
 const pool=()=>{let items=g.chapter&&$('#lessonFilter').value!=='all'?allChapterQuestions().filter(x=>String(x.lesson)===$('#lessonFilter').value):g.subject==='grammar'&&$('#grammarFilter').value!=='all'?g.qs.filter(x=>(x.kind||'elemzés')===$('#grammarFilter').value):g.qs;if(g.subject==='grammar'&&$('#grammarStyle').value!=='all')items=items.filter(x=>(x.ui||'choice')===$('#grammarStyle').value);return items};
 const update=()=>{const n=pool().length;$('#start').disabled=n===0;$('#roundCount').max=Math.max(1,n);$('#roundCount').value=Math.max(1,Math.min(n,Number($('#roundCount').value)||1));$('#poolInfo').textContent=n?`${n} elérhető feladat · most ${$('#roundCount').value} feladatot választottál.`:'Ehhez a témához és feladatformához együtt nincs példa. Válassz másik szűrőt.'};
 if(g.chapter)$('#lessonFilter').onchange=update;
 if(g.subject==='grammar'){$('#grammarFilter').onchange=update;$('#grammarStyle').onchange=update;}
 $('#roundCount').onchange=update;
 document.querySelectorAll('[data-count]').forEach(b=>b.onclick=()=>{$('#roundCount').value=b.dataset.count==='all'?pool().length:Math.min(+b.dataset.count,pool().length);update()});
 update();$('#start').onclick=()=>{update();const chosen=g.chapter?$('#lessonFilter').value:g.subject==='grammar'?$('#grammarFilter').value:'all';start(id,$('input[name=mode]:checked').value,pool(),chosen,Number($('#roundCount').value))};show();
}
function start(id,mode,questions,scope='all',count=20){
 const pool=questions||bank[id].qs;if(!pool.length)return;
 const limit=count==='all'?pool.length:Math.max(1,Math.min(pool.length,Math.floor(Number(count)||20)));
 const ordered=bank[id].subject==='grammar'?window.grammarUI.schedule(pool,shuffle,storage.get('recentGrammar',[])):shuffle(pool);state={id,mode,scope,qs:ordered.slice(0,limit).map(x=>({...x})),index:0,answers:[],responses:[]};render();
}
function render(){
 const s=state,x=s.qs[s.index],interactive=x.ui&&x.ui!=='choice';
 $('#counter').textContent=`${s.index+1} / ${s.qs.length}`;$('#modeLabel').textContent=bank[s.id].title+' · '+(s.mode==='test'?'Teszt':'Gyakorlás');$('#progress div').style.width=`${s.index/s.qs.length*100}%`;
 const opts=shuffle(x.options.map((text,i)=>({text,i})));
 $('#play').innerHTML=`<p class="eyebrow">${interactive?window.grammarUI.names[x.ui]:'FIGYELD MEG, AZTÁN VÁLASSZ!'}</p><h2>${esc(x.text)}</h2><div class="stimulus">${esc(x.example)}</div>${interactive?window.grammarUI.render(x,{esc,shuffle}):`<div class="choices">${opts.map(o=>`<button class="choice" data-answer="${o.i}">${esc(o.text)}</button>`).join('')}</div>`}<div id="feedback" aria-live="polite"></div><button id="endRound" class="plain end-round">Kör lezárása az eddigi válaszokkal</button>`;
 if(interactive)window.grammarUI.bind(x,{esc,submit:r=>answer(r.correct?x.answer:-1,r.display)});
 else document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>answer(+b.dataset.answer));
 $('#endRound').onclick=endRound;
}
function answer(a,submittedText){let s=state,x=s.qs[s.index];if(s.answers.length>s.index)return;s.answers.push(a);s.responses.push(submittedText??x.options[a]??'Nincs válasz');if(x.id)storage.set('recentGrammar',[...storage.get('recentGrammar',[]).filter(id=>id!==x.id),x.id].slice(-100));let correct=a===x.answer;document.querySelectorAll('[data-answer]').forEach(b=>{b.disabled=true;if(s.mode==='practice'){b.classList.toggle('correct',+b.dataset.answer===x.answer);b.classList.toggle('wrong',+b.dataset.answer===a&&!correct)}});$('#feedback').innerHTML=(s.mode==='practice'?`<div class="feedback"><h3>${correct?'Ez az! ✳':'Ezt most kibogozzuk.'}</h3><b>Helyes válasz: ${esc(x.options[x.answer])}</b><p>${esc(x.why)}</p>${sourceLink(x)}</div>`:'<p>Válasz rögzítve. A magyarázatot a kör végén látod.</p>')+`<div class="actions"><button class="button" id="next">${s.index+1===s.qs.length?'Eredményem':'Következő'} →</button></div>`;$('#next').onclick=()=>{if(s.answers.length!==s.index+1)return;s.index++;if(s.index===s.qs.length)finish();else render()};$('#next').focus({preventScroll:true});}
function endRound(){if(!state.answers.length){$('#arena').hidden=true;return}state.partial=state.answers.length<state.qs.length;state.qs=state.qs.slice(0,state.answers.length);finish();}
function finish(){let s=state,wrong=s.qs.filter((x,i)=>x.answer!==s.answers[i]),score=s.qs.length-wrong.length,pct=Math.round(score/s.qs.length*100);if(s.mode==='test'&&!s.partial){let key='best-v9:'+s.id+':'+s.scope;let best=storage.get(key,0);storage.set(key,Math.max(best,pct));cards()}$('#counter').textContent='Kész!';$('#progress div').style.width='100%';$('#play').innerHTML=`<p class="eyebrow">EGY KÖRREL ELŐRÉBB</p><h2>${wrong.length?'Már látod, mit érdemes még gyakorolni.':'Ezt szépen összeraktad! ✳'}</h2><div class="result"><strong style="font-size:40px">${score} / ${s.qs.length}</strong><p>${pct}% · ${s.mode==='test'?'teszt':'gyakorlás'}${s.partial?' · korábban lezárt kör':''} · ${wrong.length} újragyakorolható feladat</p></div><div class="actions"><button class="button" id="again">Új kör ↗</button>${wrong.length?'<button class="choice" id="retry">A hibáimat gyakorlom</button>':''}<button class="plain" id="download">Eredmény letöltése (.txt)</button></div><h3>A köröd, magyarázatokkal</h3>${s.qs.map((x,i)=>`<div class="review"><span class="pill">${x.answer===s.answers[i]?'✓ SIKERÜLT':'↻ MÉG GYAKOROLD'}</span><p><b>${esc(x.text)}</b><br>${esc(x.example)}<br>Válaszod: ${esc(s.responses[i])}<br>Helyes: <b>${esc(x.options[x.answer])}</b><br>${esc(x.why)}</p>${sourceLink(x)}</div>`).join('')}`;$('#again').onclick=()=>setup(s.id,s.scope);if(wrong.length)$('#retry').onclick=()=>start(s.id,'practice',wrong,s.scope,'all');$('#download').onclick=()=>{let text=bank[s.id].title+'\n'+score+'/'+s.qs.length+' ('+pct+'%)\n\n'+s.qs.map((x,i)=>x.text+'\n'+x.example+'\nVálaszod: '+s.responses[i]+'\nHelyes: '+x.options[x.answer]+'\n'+x.why+(x.lesson===undefined?'':'\nForrás: '+lessonURL(x.lesson))).join('\n\n');let url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));let a=document.createElement('a');a.href=url;a.download='hosmuhely-eredmeny.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};}
$('#close').onclick=()=>{$('#arena').hidden=true;$(activeSubject==='grammar'?'#nyelvtan':'#jatekok').scrollIntoView({behavior:'smooth'})};$('#reflection').value=storage.get('reflection','');$('#saveReflection').onclick=()=>$('#saved').textContent=storage.set('reflection',$('#reflection').value)?'Elmentve ebben a böngészőben. ✳':'A böngésző nem engedte a mentést. Másold ki a szövegedet.';$('#reset').onclick=()=>{if(confirm('Törlöd a Hősműhely helyi teszteredményeit és a mentett gondolatodat?')){try{Object.keys(localStorage).filter(k=>k.startsWith('hosmuhely:')).forEach(k=>localStorage.removeItem(k))}catch{}$('#reflection').value='';$('#saved').textContent='Helyi adatok törölve.';cards()}};cards();

lessonMap();

setSubject(subjectOfHash());
