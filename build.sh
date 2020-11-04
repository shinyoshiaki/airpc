#!/bin/sh
rm -rf lib
yarn build
cd lib
mv src/* .
rm -rf src
rm -rf __tests__
