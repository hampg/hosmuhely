# Hősműhely

**Nyilvános játék:** https://hampg.github.io/hosmuhely/

Hatodikos magyar gyakorlóoldal: **9 játék, 114 saját feladat**, ismétlésmentes, legfeljebb nyolckérdéses körökkel. Gyakorlás, teszt, részletes javítás, hibaismétlés és TXT-export. A teszteredmények és a szabad szöveges gondolat helyben, a böngészőben tárolódnak.

## Tananyag

Az NKP Irodalom 6. (A), NAT 2020 **I. Hősök az irodalomban** fejezetnyitója és 1–13. leckéje alapján, 2026. november 15-én ellenőrizve. A 14 elemű leckétérkép közvetlen forráslinkeket és leckénkénti gyakorlást ad. A 68 tankönyvhöz kapcsolódó kérdés mindegyikének van leckehivatkozása a javításban. További 46 feladat a műnemeket, formákat és toldalékokat gyakoroltatja. A lecketérkép minden leckét követ, a feladatbank a fő fogalmakra összpontosít, nem minden tankönyvi részletre.

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
