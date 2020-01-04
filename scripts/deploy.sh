aws s3 sync build/ s3://marvelheroes

aws s3 sync dist/ s3://newcleus-app --exclude "*" --include "*.css" --include "*.js" --content-encoding gzip --cache-control max-age=30672000
aws s3 sync dist/ s3://newcleus-app --exclude "*.js" --exclude "*.css"

// 31536000 = 365 days

index.html
cache-control: no-cache
content-encoding: gzip
content-type: text/html

.css
cache-control: max-age=31536000
content-encoding: gzip
content-type: text/css

.js
cache-control: max-age=31536000
content-encoding: gzip
content-type: application/javascript

.svg
cache-control: max-age=31536000
content-encoding: gzip
content-type: image/svg+xml

.png
cache-control: max-age=31536000
content-type: image/png

.jpg
cache-control: max-age=31536000
content-type: image/jpeg

.woff2
cache-control: max-age=31536000
content-type: binary/octet-stream

.ico
cache-control: max-age=31536000
content-type: image/vnd.microsoft.icon

site.webmanifest
cache-control: max-age=31536000
content-type: binary/octet-stream

