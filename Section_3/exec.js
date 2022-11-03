const {exec} = require('child_process');

var process = exec('ls');  // 노드에서도 ls 명령어를 사용할 수 있게 해줌(윈도우에서는 dir)

process.stdout.on('data', function(data) {
    console.log(data.toString());
});

process.stderr.on('data', function(data) {  // 에러 났을 때
    console.log(data.toString());
})