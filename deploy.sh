#!/bin/sh
yarn test
yarn build

shopt -s dotglob
cp package.json lib/package.json
cp .gitignore lib/.gitignore
cd lib
rm -rf __tests__
mv src/* .
