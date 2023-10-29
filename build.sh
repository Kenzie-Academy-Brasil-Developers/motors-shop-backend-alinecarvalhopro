// build.sh
#!/usr/bin/env bash
# exit on error
set -o errexit

cd src
yarn
yarn build
yarn typeorm migration:run -d dist/data-source