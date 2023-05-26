#!/bin/bash
# abort on errors
set -e

echo "================> Update new code"
git pull

echo "================> Install modules"
yarn

echo "================> Run website"
cross-env NODE_ENV=production next build
chown -R kanni:kanni /home/kanni/web
pm2 delete next-test
pm2 start yarn --name "next-test" --interpreter bash -- start

echo -e '\nHit [Ctrl]+[D] to exit this child shell.'
$SHELL
