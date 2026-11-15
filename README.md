# Hősműhely
Önálló, hatodikos magyar gyakorlóoldal. Hat játék, 56 saját feladat, ismétlésmentes legfeljebb nyolckérdéses körök, gyakorlás és teszt, részletes javítás, hibák újragyakorlása és TXT-export. Helyi eredmény- és gondolatmentés. A forráskorlátokat és a pedagógiai kapaszkodókat az oldal jelzi.

Futtatás: `python3 -m http.server 4174 --directory dist`

## Nyilvános oldal

https://hampg.github.io/hosmuhely/

Forrás: https://github.com/hampg/hosmuhely

A GitHub Pages a `gh-pages` ág gyökerét szolgálja ki. A `dist/` változtatásai után: 

```sh
git push github main
git subtree split --prefix dist -b pages-update
git push github pages-update:gh-pages
git branch -D pages-update
```
