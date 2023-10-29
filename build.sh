#!/bin/bash
# Exit on error
set -o errexit

cd /opt/render/project
yarn
cd src
yarn build
yarn typeorm migration:run -d dist/data-source