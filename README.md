# rfantasy-megasale

Page listing all the books for the r/fantasy MegaSale because Reddit posts have limits, and Google Sheets is not a good browsing experience.

`npm start` and `localhost:8080`.

## Next year:
- Probably worth it to get an API key and pull the images properly
- Lazy load the images?
- Series pages are causing problems -- use ASIN for first book in series intead of the series page next time

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
|- _data/
|- _scripts/
|- _styles/
   |- _normalize.scss
   |- styles.scss
|- index.liquid
```
