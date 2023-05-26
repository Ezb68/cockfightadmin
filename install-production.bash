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
pm2 delete next-production
pm2 start yarn --name "next-production" --interpreter bash -- start

echo "================> Done"

echo -e '\nHit [Ctrl]+[D] to exit this child shell.'
$SHELL
