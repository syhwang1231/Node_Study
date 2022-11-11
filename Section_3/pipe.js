const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });  // 16byte씩 스트리밍하면서
const zlibStream = zlib.createGzip();  // 압축함
//const writeStream = fs.createWriteStream('./writeme3.txt');
const writeStream = fs.createWriteStream('./writeme4.txt.gz');  // 압축한 것을 writeme에 작성. -> 보이진 않음.

// readStream.pipe(writeStream);
readStream.pipe(zlibStream).pipe(writeStream);  // 파이프 여러 개 연결 가능