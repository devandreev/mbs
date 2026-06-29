#!/bin/bash

yarn build

timestamp() {
  date +"%Y%m%d%H%M%S"
}

cp -r ./public/images ./public/dist/images
cp ./public/favicon.ico ./public/dist/favicon.ico

cd ./public/dist

grep -rli '/images/' * | xargs -I@ sed -i '' 's/\/images\//\.\/images\//g' @
grep -rli '.css"' * | xargs -I@ sed -i '' "s/\.css\"/\.css?v=${timestamp}\"/g" @
grep -rli '.js"' * | xargs -I@ sed -i '' "s/\.js\"/\.js?v=${timestamp}\"/g" @

 git init
 git add --all
 git commit -m "build"
 git branch -M dist
 git remote add origin git@github.com:devandreev/mbs.git
 git push -u origin dist --force
