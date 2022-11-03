const spawn = require('child_process').spawn;

const process = spawn('python3', ['test.py']);  // 새로운 프로세스를 띄워서 파이썬으로 실행, python3으로 해야함!!

process.stdout.on('data', function(data) {
    console.log(data.toString());
});

process.stderr.on('data', function(data) {  // 에러 났을 때
    console.error(data.toString());
})