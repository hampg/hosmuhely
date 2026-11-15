"""Build 500 bounded, explicit Hungarian suffix exercises; no general inflector."""
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
# stem, plural incl. linking vowel, singular case harmony, plural case harmony
nouns=[
('ház','ak','back','back'),('vár','ak','back','back'),('fal','ak','back','back'),('pad','ok','back','back'),('asztal','ok','back','back'),('ablak','ok','back','back'),('udvar','ok','back','back'),('vonat','ok','back','back'),('hajó','k','back','back'),('autó','k','back','back'),
('labda','ák','back','back'),('alma','ák','back','back'),('iskola','ák','back','back'),('szoba','ák','back','back'),('táska','ák','back','back'),
('kert','ek','front','front'),('kép','ek','front','front'),('gép','ek','front','front'),('szék','ek','front','front'),('nép','ek','front','front'),('kéz','ek','front','front'),('hely','ek','front','front'),('hegy','ek','front','front'),('jegy','ek','front','front'),('levél','ek','front','front'),
('könyv','ek','round','front'),('füzet','ek','front','front'),('erdő','k','round','round'),('mező','k','round','round'),('felhő','k','round','round'),('hős','ök','round','round'),('bőr','ök','round','round'),('őr','ök','round','round'),('kör','ök','round','round'),('kürt','ök','round','round'),
('ceruza','ák','back','back'),('diák','ok','back','back'),('tanár','ok','back','back'),('barát','ok','back','back'),('virág','ok','back','back')]
# Explicit irregular plural stems, avoiding mechanical vowel shortening errors.
plural_overrides={'kéz':'kezek','levél':'levelek'}
def plural(stem,suffix):
 if stem in plural_overrides:return plural_overrides[stem]
 if suffix=='ák':return stem[:-1]+'ák'
 return stem+suffix
cases={'back':['ban','ból','hoz','nál','nak'],'front':['ben','ből','hez','nél','nek'],'round':['ben','ből','höz','nél','nek']}
roles=['helyet: hol?','kiindulópontot: honnan?','irányt: hová, kihez?','helyet: hol, kinél?','címzettet: kinek?']
contexts=['A(z) {w} sok hely van.','A(z) {w} indultunk el.','A(z) {w} mentünk.','A(z) {w} várakoztunk.','Segítséget adtunk a(z) {w}.']
groups=[[],[],[]]
def question(g,text,example,options,answer,why,**extra):
 groups[g].append(dict(id=f'G{sum(map(len,groups))+1:03}',text=text,example=example,options=options,answer=answer,why=why,**extra))
for stem,pl,harmony,ph in nouns:
 base=stem[:-1]+'á' if stem.endswith('a') else stem
 for i,suf in enumerate(cases[harmony]):
  word=base+suf
  question(0,f'Milyen toldalék a(z) -{suf}?',f'{word} → {base} + {suf}', ['Képző','Jel','Rag'],2,f'A -{suf} rag: {roles[i]} jelöl. Nem hoz létre új szót.',kind='rag',word=word)
 word=plural(stem,pl); surface=word[len(stem):] if word.startswith(stem) else pl
 question(0,'Mit jelöl a többes szám toldaléka?',f'Egy {stem} → több {word}', ['Képző','Jel','Rag'],1,f'A {word} alakban a -k a többes szám jele. A kötőhangzót a toldalékkal együtt kezeljük; a szótő alakja is változhat.',kind='jel',word=word)
# 60 explicitly recorded derivations.
deriv=[
('olvas','ás','olvasás'),('ír','ás','írás'),('tanul','ás','tanulás'),('rajzol','ás','rajzolás'),('sétál','ás','sétálás'),('úsz','ás','úszás'),('fut','ás','futás'),('ugrál','ás','ugrálás'),('játsz','ás','játszás'),('vár','ás','várás'),
('kér','és','kérés'),('néz','és','nézés'),('beszél','és','beszélés'),('mesél','és','mesélés'),('énekel','és','énekelés'),('nevet','és','nevetés'),('segít','és','segítés'),('épít','és','építés'),('fest','és','festés'),('keres','és','keresés'),
('szép','ség','szépség'),('jó','ság','jóság'),('bátor','ság','bátorság'),('okos','ság','okosság'),('kedves','ség','kedvesség'),('ügyes','ség','ügyesség'),('boldog','ság','boldogság'),('szabad','ság','szabadság'),('gazdag','ság','gazdagság'),('szegény','ség','szegénység'),
('gyenge','ség','gyengeség'),('erős','ség','erősség'),('csendes','ség','csendesség'),('vidám','ság','vidámság'),('komoly','ság','komolyság'),('igaz','ság','igazság'),('gonosz','ság','gonoszság'),('őszinte','ség','őszinteség'),('hű','ség','hűség'),('éber','ség','éberség'),
('hab','os','habos'),('por','os','poros'),('sár','os','sáros'),('szín','es','színes'),('kert','es','kertes'),('kedv','es','kedves'),('csend','es','csendes'),('rend','es','rendes'),('tej','es','tejes'),('méz','es','mézes'),
('vaj','as','vajas'),('haj','as','hajas'),('izom','os','izmos'),('szomj','as','szomjas'),('köröm','ös','körmös'),('köd','ös','ködös'),('füst','ös','füstös'),('hír','es','híres'),('pénz','es','pénzes'),('íz','es','ízes')]
# Linking vowels grouped with suffix in this school-level simplified display.
for stem,suf,word in deriv:
 question(0,f'Milyen toldalék alkotta ezt az új szót: -{suf}?',f'{stem} → {word}', ['Képző','Jel','Rag'],0,f'A képző új szót hoz létre: {stem} → {word}. A kötőhangzót itt a képzővel együtt mutatjuk.',kind='képző',word=word)
# 150 different plural+case wordforms. Explicit altered stems used for analysis.
for stem,pl,harmony,ph in nouns[:30]:
 p=plural(stem,pl)
 for i,suf in enumerate(cases[ph]):
  word=p+suf
  if stem.endswith('a'):split=stem[:-1]+'á + k + '+suf;note=f'A(z) {stem} szótő végén a → á változás történik.'
  elif stem in plural_overrides:split=('kez' if stem=='kéz' else 'level')+' + ek + '+suf;note=f'A(z) {stem} töve rövidül.'
  else:split=stem+' + '+pl+' + '+suf;note='A kötőhangzót a többesjellel együtt kezeljük.'
  question(1,'Milyen sorrendben állnak a szóelemek?',f'{word} → {split}', ['Szótő + jel + rag','Szótő + képző + rag','Szótő + rag + jel'],0,f'{note} A -k többesjel után a -{suf} rag áll: {roles[i]} jelöl.',word=word)
# Context disambiguates -t and -k.
past=[('olvasott','olvasás','A fiú tegnap olvasott.'),('rajzolt','rajz','Anna tegnap rajzolt.'),('tanult','tanulás','Peti tegnap tanult.'),('sétált','séta','A lány tegnap sétált.'),('ugrált','ugrás','A kutya tegnap ugrált.'),('futott','futás','A fiú tegnap futott.'),('úszott','úszás','Anna tegnap úszott.'),('játszott','játék','Peti tegnap játszott.'),('várt','vár','A fiú tegnap várt.'),('kért','kérés','Anna tegnap segítséget kért.'),('nézett','nézés','Peti tegnap filmet nézett.'),('beszélt','beszéd','A fiú tegnap beszélt.'),('mesélt','mese','Anna tegnap mesélt.'),('énekelt','ének','Peti tegnap énekelt.'),('nevetett','nevetés','A lány tegnap nevetett.'),('segített','segítség','A fiú tegnap segített.'),('épített','építés','Anna tegnap várat épített.'),('festett','festés','Peti tegnap festett.'),('keresett','keresés','A lány tegnap kulcsot keresett.'),('válaszolt','válasz','A fiú tegnap válaszolt.'),('számolt','szám','Anna tegnap számolt.'),('pakolt','csomag','Peti tegnap pakolt.'),('tapsolt','taps','A lány tegnap tapsolt.'),('gyakorolt','gyakorlat','A fiú tegnap gyakorolt.'),('hallgatott','dal','Anna tegnap zenét hallgatott.')]
objects=['könyvet','rajzot','verset','képet','labdát','házat','almát','játékot','várat','levelet','filmet','széket','mesét','éneket','füzetet','ceruzát','táskát','asztalt','kulcsot','választ','számot','csomagot','dalt','gyakorlatot','virágot']
for (verb,_,sentence),obj in zip(past,objects):
 question(2,'Mi a -t/-tt szerepe ebben a két mondatban?',f'{sentence}\nLátok egy {obj}.', ['Előbb múlt idő jele, aztán tárgyrag','Mindkettő képző','Mindkettő tárgyrag'],0,f'A(z) {verb} ige múlt idejű: a -t/-tt jel. A(z) {obj} főnév a mit? kérdésre felel: a -t tárgyrag.',kind='t-pár')
verbs=['olvasok','rajzolok','tanulok','sétálok','ugrálok','futok','úszok','játszok','várok','kérek','nézek','beszélek','mesélek','énekelek','nevetek','segítek','építek','festek','keresek','válaszolok','számolok','pakolok','tapsolok','gyakorlok','hallgatok']
# Avoid school disputes about ikes conjugation: use uncontroversial forms here.
verbs[6]='indulok';verbs[7]='sétáltatok'
for (stem,pl,*_),verb in zip(nouns[:25],verbs):
 word=plural(stem,pl)
 question(2,'Mi a -k szerepe a két szóalakban?',f'Több {word} van.\nÉn {verb}.', ['Előbb többesjel, aztán igei személyrag','Mindkettő többesjel','Mindkettő képző'],0,f'A(z) {word} főnévben a -k többes számot jelöl. A(z) {verb} igében személyrag: én, egyes szám első személy.',kind='k-pár')
assert list(map(len,groups))==[300,150,50]
allq=sum(groups,[])
assert len({q['text']+'|'+q['example'] for q in allq})==500
assert len({q['id'] for q in allq})==500
(ROOT/'dist/grammar-data.js').write_text('window.grammarData = '+json.dumps(groups,ensure_ascii=False,indent=2)+';\n')
(ROOT/'data/grammar-notes.md').write_text('''# Toldalékbank\n\n500 különböző feladat: 300 osztályozás (60 képző, 40 jel, 200 rag), 150 szószerkezeti elemzés, 50 mondatos szerep-összehasonlítás. A szám feladatokat jelent, nem 500 külön szótövet. A szavak különböző toldalékos alakokban és feladattípusokban is előfordulnak.\n\nA generátor rögzített tőlistát, külön kezelt tőváltozatokat és explicit képzett szóalakokat használ; nem általános magyar ragozó. Kötőhangzót az iskolai egyszerűsítésben a toldalékkal együtt mutatunk. A képzők jelölése is tartalmazhat kötőhangzót. Az -s képző előtti többalakú tő (például izom → izm-, köröm → körm-) a szóalakban szerepel; a toldalékválogató ezeken a képző szerepét, nem a teljes morfémahatárt kérdezi.\n\nNyelvtani háttér: az oldalon hivatkozott NKP Magyar nyelv 5–6. tanári kézikönyv szóelemekről szóló része. Saját feladatbank, nem átvett tankönyvi feladatsor. Automatikus szerkezeti ellenőrzés készült; független szaklektorálás nem történt.\n\nÚjraépítés: python3 scripts/build-grammar.py\n''')
print('500 grammar questions built:',list(map(len,groups)))
