cd "$(dirname "$0")"
parcel build src/shell.js -d ../dist/inject
parcel build src/main.js -d ../dist/inject
sed -i '' 's/\"use strict\"//' ../dist/inject/main.js
sed -i '' 's/\"use strict\"//' ../dist/inject/shell.js
parcel build src/main.css -d ../dist/inject
