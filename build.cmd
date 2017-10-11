del g.js
cd app
tsc > nul || browserify .\game.js | uglifyjs > ..\g.js
cd ..
