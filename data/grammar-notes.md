# Toldalékbank

500 különböző feladat: 300 osztályozás (60 képző, 40 jel, 200 rag), 150 szószerkezeti elemzés, 50 mondatos szerep-összehasonlítás. A szám feladatokat jelent, nem 500 külön szótövet. A szavak különböző toldalékos alakokban és feladattípusokban is előfordulnak.

A generátor rögzített tőlistát, külön kezelt tőváltozatokat és explicit képzett szóalakokat használ; nem általános magyar ragozó. Kötőhangzót az iskolai egyszerűsítésben a toldalékkal együtt mutatunk. A képzők jelölése is tartalmazhat kötőhangzót. Az -s képző előtti többalakú tő (például izom → izm-, köröm → körm-) a szóalakban szerepel; a toldalékválogató ezeken a képző szerepét, nem a teljes morfémahatárt kérdezi.

Nyelvtani háttér: az oldalon hivatkozott NKP Magyar nyelv 5–6. tanári kézikönyv szóelemekről szóló része. Saját feladatbank, nem átvett tankönyvi feladatsor. Automatikus szerkezeti ellenőrzés készült; független szaklektorálás nem történt.

Újraépítés: python3 scripts/build-grammar.py

## Változatos feladatformák

A fenti eredeti csoportlétszámok (300 + 150 + 50) megmaradnak, de a tartalom már nem pusztán osztályozás. A scripts/grammar_variety.py átalakítja az adatokat: múlt idő, melléknévfokozás, birtokos személyjel, szándékosan hibás mondatok javítása, szóépítés, határok kijelölése, morfémák címkézése és két mondat önálló elemzése.

Aktuális feladatformák: {'input': 130, 'repair': 40, 'choice': 100, 'build': 80, 'segment': 50, 'label': 50, 'pair': 50}.

A mondatjavítóban a hibás mondatot mindig kifejezetten Hibás: címkével mutatjuk; a helyes alak a javításban olvasható. Szöveges válaszoknál kis/nagybetűt, végső írásjelet és felesleges szóközt elnézünk; ékezetet és nyelvtani hibát nem.
