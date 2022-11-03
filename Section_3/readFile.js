const fs = require('fs').promises;

fs.readFile('./readme.txt')
    .then((data) => {
        console.log(data);  // binary
        console.log(data.toString());  // 사람이 읽을 수 있는 문자열
    })
    .catch((err) => {
        throw err;
    })