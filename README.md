# Hősműhely

**Nyilvános játék:** https://hampg.github.io/hosmuhely/

Hatodikos magyar gyakorlóoldal: **Külön Irodalom és Nyelvtan menü: 90 irodalmi és 500 különböző nyelvtani feladat.** A kör hossza 1-től a kiválasztott bank teljes méretéig állítható, nincs nyolckérdéses korlát. Gyakorlás, teszt, részletes javítás, hibaismétlés és TXT-export. A teszteredmények és a szabad szöveges gondolat helyben, a böngészőben tárolódnak.

## Tananyag

Az NKP Irodalom 6. (A), NAT 2020 **I. Hősök az irodalomban** fejezetnyitója és 1–13. leckéje alapján, 2026. november 15-én ellenőrizve. A 14 elemű leckétérkép közvetlen forráslinkeket és leckénkénti gyakorlást ad. A 68 tankönyvhöz kapcsolódó kérdés mindegyikének van leckehivatkozása a javításban. További 22 irodalmi feladat a műnemeket és formákat gyakoroltatja. A nyelvtani bank külön fájl és külön menü. A lecketérkép minden leckét követ, a feladatbank a fő fogalmakra összpontosít, nem minden tankönyvi részletre.

Művek: Szent László és a kun vitéz küzdelme; A tordai hasadék; Arany: Szent László; Csörsz árka; Szimónidész sírfelirata; Széchenyi Zsigmond: Csui!…; Kőmíves Kelemenné; Arany: Mátyás anyja, A walesi bárdok; Fazekas: Lúdas Matyi.

Fogalmak: műnem, műfaj, forma, monda, legenda, epigramma, napló, útleírás, ballada (átmeneti műfaj), nép- és műballada, balladai homály, vándortéma, motívum, időmértékes verselés, jambus, trocheus, spondeus, daktilus, hexameter. A Toldi a második fejezethez tartozik, ezért a verses epika példája itt a Lúdas Matyi.

Önálló kérdések és megfogalmazások; nem másolja a tankönyv szövegét, illusztrációit vagy feladatsorait. A pontos források az oldalon szerepelnek. A nyelvtan külön gyakorlóblokk.

## Futtatás és ellenőrzés

```sh
python3 -m http.server 4174 --directory dist
node tests/chapter.test.cjs
```

A teszt a feladatok szerkezetét, a leckelefedettséget, az ismétlésmentességet, a pontozást, a teszt alatti visszajelzés elrejtését és a leckeszűrt hibaismétlést ellenőrzi. Nem helyettesít szakmai lektorálást. Külső függőség nélkül fut; a Google Fonts opcionális, rendszerbetűre esik vissza.

## GitHub Pages

A `gh-pages` ág gyökerét szolgálja ki. A `dist/` módosítása és a forrás commitolása után:

```sh
git push github main
git subtree split --prefix dist -b pages-update
git push github pages-update:gh-pages
git branch -D pages-update
```

## Megjelenés

Kézzel összeállított fanzin: a felhasználó képei, tépett plakátrétegek, grafitrajz és fotó, ragasztószalagok, kivágott betűk, kézírás és írógépbetűk. Y2K-elemek: CD-matrica, fájlcímkék, retró ablakfejléc és reliefes gombok. A külön `dist/zine.css` a vizuális réteg; a játéklogika és a tananyag nem változott. A képfájlok megfeleltetése: `dist/assets/README.md`.

## Nyelvtan — 500 példa

Közvetlen cím: https://hampg.github.io/hosmuhely/#nyelvtan

- Toldalékválogató: 300 feladat (60 képző, 40 jel, 200 rag).
- Szószerelő: 150 toldalékos szóalak elemzése.
- Csavaros toldalékok: 50 mondatos összehasonlítás.
- Mind az 500: az előző három bank egyesítése, nem újabb 500 feladat.

A szám 500 különböző feladatot jelent, nem 500 külön szótövet. A tőváltozatok rögzített listából készülnek. Generátor: `python3 scripts/build-grammar.py`. Szerkesztési megjegyzések: `data/grammar-notes.md`.

A kezdő kör 20 feladat vagy a kisebb bank teljes mérete. Egyedi szám és 20/50/100/Mind gyorsválasztók is vannak; a nyelvtan feladattípus szerint szűrhető. Az összes irodalmi játék is szabad feladatszámot használ. Kör közben az eddigi válaszokkal lezárható a gyakorlás vagy teszt; a részleges teszt nem írja felül a teljes kör rekordját. A hibaismétlés minden elrontott feladatot tartalmaz, nincs levágás nyolcra.

A működési teszt végigpontozza a teljes 500-as kört, ellenőrzi az ismétlésmentességet, az önálló tantárgyi bankokat, a szűrést és a korai lezárást.
