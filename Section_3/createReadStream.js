const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 16});  // readme3.txt를 조각 내서 전달해줌. highWaterMark: 바이트 단위
// 받을 때는 그 조각들을 합쳐줘야 함
const data = [];
readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data: ', chunk, chunk.length);
});
readStream.on('end', () => {
    console.log('end:', Buffer.concat(data).toString());
});
readStream.on('error', (err) => {
    console.log('error: ', err);
});