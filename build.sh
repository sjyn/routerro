#!/usr/bin/env bash
curl -X POST -s --data-urlencode 'input@./src/routerro.js' https://javascript-minifier.com/raw > ./dist/routerro.min.js
