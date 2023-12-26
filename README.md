# eleventy-starter-template

My 11ty starter template because I need one.

`npm start` and `localhost:8080`.

## Scripts

`npm run serve`: Runs `eleventy --serve`. Compiles templates in `src` into `dist`, as well as copying over `_assets` and `_scripts` as-is. Also watches and serves the site to `localhost:8080`.

`npm run once`: Compiles templates and copies over `_assets` and `_scripts` once.

`npm run scss`: Runs `gulp`. Watches `src/_styles` and compiles `styles.scss` into `dist/_styles`.

`npm run oncescss`: Compiles SCSS files once.

`npm run prodscss`: Compiles SCSS files once without sourcemap.

`npm start`: Runs `serve` and `scss` concurrently.

## File structure

```
src/
|- _assets/
|- _scripts/
|- _styles/
   |- _normalize.scss
   |- styles.scss
|- index.liquid
```
