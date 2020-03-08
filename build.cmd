del g.js
cd app
tsc  || browserify .\game.js | uglifyjs > ..\g.js
cd ..
