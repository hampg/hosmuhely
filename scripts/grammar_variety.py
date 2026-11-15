"""Interaction and content variety for the 500-question bank."""
def enrich(groups,deriv):
 def free(q,text,example,expected,ui='input',**extra):
  q.update(text=text,example=example,expected=expected,ui=ui,options=[expected,'Más válasz'],answer=0,**extra)
 # Broaden content beyond noun case endings: tense, comparison, possession.
 past=[('olvas','olvasott'),('rajzol','rajzolt'),('tanul','tanult'),('sétál','sétált'),('ugrál','ugrált'),('fut','futott'),('úszik','úszott'),('játszik','játszott'),('vár','várt'),('kér','kért'),('néz','nézett'),('beszél','beszélt'),('mesél','mesélt'),('énekel','énekelt'),('nevet','nevetett'),('segít','segített'),('épít','épített'),('fest','festett'),('keres','keresett'),('válaszol','válaszolt')]
 degrees=[('erős','erősebb'),('gyenge','gyengébb'),('szép','szebb'),('jó','jobb'),('rossz','rosszabb'),('nagy','nagyobb'),('kicsi','kisebb'),('magas','magasabb'),('alacsony','alacsonyabb'),('gyors','gyorsabb'),('lassú','lassabb'),('okos','okosabb'),('kedves','kedvesebb'),('ügyes','ügyesebb'),('bátor','bátrabb'),('vidám','vidámabb'),('szomorú','szomorúbb'),('öreg','öregebb'),('fiatal','fiatalabb'),('édes','édesebb')]
 possess=[('ház','házam'),('vár','váram'),('pad','padom'),('asztal','asztalom'),('ablak','ablakom'),('udvar','udvarom'),('vonat','vonatom'),('hajó','hajóm'),('autó','autóm'),('labda','labdám'),('alma','almám'),('iskola','iskolám'),('szoba','szobám'),('táska','táskám'),('kert','kertem'),('kép','képem'),('gép','gépem'),('szék','székem'),('könyv','könyvem'),('füzet','füzetem')]
 rag=[q for q in groups[0] if q['kind']=='rag']
 for q,(stem,word) in zip(rag[:20],past):
  free(q,'Tedd múlt időbe!','Ő most '+stem+'. → Ő tegnap ___.',word)
  q.update(kind='jel',family=stem,why=f'{stem} → {word}: a múlt időt a -t/-tt jel fejezi ki. A mondat alanya egyes szám harmadik személyű.')
 for q,(stem,word) in zip(rag[20:40],degrees):
  free(q,'Egy fokkal több!','Írd be a melléknév középfokát: '+stem+' → ___',word)
  q.update(kind='jel',family=stem,why=f'{stem} → {word}: a középfok jele -bb. A tő alakja is változhat.')
 for q,(stem,word) in zip(rag[40:60],possess):
  free(q,'Legyen az enyém!','Egy '+stem+' → az én ___ (csak a szóalakot írd)',word)
  q.update(kind='jel',family=stem,why=f'{stem} → {word}: a birtokos személyjel azt fejezi ki, hogy a birtok egyes szám első személyű birtokoshoz tartozik.')
 # Remaining case tasks alternate real word completion and classification.
 for i,q in enumerate(rag[60:]):
  word,split=q['example'].split(' → ');base,suf=split.split(' + ')
  q['family']=base
  if i%2==0:
   hint={'ban':'valaminek a belsejében: hol?','ben':'valaminek a belsejében: hol?','ból':'valaminek a belsejéből: honnan?','ből':'valaminek a belsejéből: honnan?','hoz':'irány a megnevezett helyhez vagy dologhoz: hová?','hez':'irány a megnevezett helyhez vagy dologhoz: hová?','höz':'irány a megnevezett helyhez vagy dologhoz: hová?','nál':'mellette, a közelében: hol?','nél':'mellette, a közelében: hol?','nak':'neki szánjuk: kinek?','nek':'neki szánjuk: kinek?'}[suf]
   free(q,'Toldalékolj a jelentés szerint!',f'Szótő a szóalakban: {base}\nJelentés: {hint}\nÍrd be a teljes toldalékos szót!',word)
 # Agreement repair, deliberately faulty sentence explicitly marked as such.
 plurals=[q for q in groups[0] if q['text']=='Mit jelöl a többes szám toldaléka?']
 for i,q in enumerate(plurals):
  singular=q['example'].split(' → ')[0].removeprefix('Egy ');word=q['word'];q['family']=singular
  if i%2==0:
   free(q,'Javítsd ki a hibás mondatot!',f'Hibás: Három {word} van.\nÍrd le helyesen az egész mondatot!',f'Három {singular} van.','repair')
   q['why']='Számnév után a főnév egyes számban áll: három '+singular+'.'
  else:
   free(q,'Javítsd ki az egyeztetést!',f'Hibás: Ezek {word} van.\nÍrd le helyesen az egész mondatot!',f'Ezek {word} vannak.','repair')
   q['why']='A többes számú alanyhoz többes számú állítmány tartozik: vannak.'
 # Derivations as word building, including explicit changed stems.
 derived=[q for q in groups[0] if q.get('kind')=='képző']
 for i,(q,(stem,suf,word)) in enumerate(zip(derived,deriv)):
  q['family']=stem
  if i%2==0:
   surface=word[:-len(suf)]
   free(q,'Építs új szót a cédulákból!',f'Kiinduló szó: {stem}\nVálaszd ki a két megfelelő cédulát, és rakd őket sorrendbe!',word,'build',parts=[surface,suf],decoys=['k','ban'] if suf not in ['k','ban'] else ['t','ság'])
 # Diversify structural analysis with derived nouns, not only plural case forms.
 for q,(stem,suf,word) in zip(groups[1][-30:],deriv[:30]):
  case='ban' if suf in ['ás','ság'] else 'ben';base=word[:-len(suf)]
  q.update(word=word+case,example=word+case+' → '+base+' + '+suf+' + '+case,structure=['Szótő','Képző','Rag'],family=stem,why=f'{base}: szótő; -{suf}: képző; -{case}: rag. Itt nincs többesjel.')
 for i,q in enumerate(groups[1]):
  word,split=q['example'].split(' → ');parts=split.split(' + ');q.setdefault('structure',['Szótő','Jel','Rag']);q.setdefault('family',parts[0]);q['kind']='elemzés'
  if i%3==0:
   free(q,'Vágd szét a szót szóelemekre!',word+'\nKattints a szóelemek közötti határokra! A kötőhangzót a toldalékkal együtt kezeld.', ' + '.join(parts),'segment',parts=parts,word=word)
  elif i%3==1:
   free(q,'Rakd össze a szóalakot!',f'Tedd a cédulákat a helyes sorrendbe!\nCél: {word}',word,'build',parts=parts,decoys=[])
  else:
   free(q,'Címkézd fel a szóelemeket!',word,' + '.join(q['structure']),'label',parts=parts,labels=q['structure'])
 # Paired analysis requires two independent answers rather than one obvious sentence.
 for i,q in enumerate(groups[2]):
  labels=['Jel','Rag'] if i%2==0 else ['Rag','Jel']
  example=q['example'] if i%2==0 else '\n'.join(reversed(q['example'].split('\n')))
  suffix='-t/-tt' if q['kind']=='t-pár' else '-k'
  free(q,'Mi a(z) '+suffix+' szerepe a két mondatban?',example,' + '.join(labels),'pair',labels=labels)
  q['family']=q['example'].split('\n')[0]
 # Make family metadata stable for scheduling.
 for group in groups:
  for q in group:q.setdefault('ui','choice');q.setdefault('family',q.get('word',q['id']))
