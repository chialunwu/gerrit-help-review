cd "$(dirname "$0")"
parcel build index.html -d ../dist/popup --public-url popup
mv ../dist/popup/index.html ../dist/
