const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

// isMainThread로 분기 처리
if(isMainThread){  // 메인 스레드
    const threads = new Set();  // 중복되지 않는 배열 Set
    threads.add(new Worker(__filename,{
        workerData: { start: 1 },  // 초기 데이터 넣어줄 수 있음.(postMessage 대신)
    }));
    threads.add(new Worker(__filename,{
        workerData: { start: 2 },  // 초기 데이터 넣어줄 수 있음.(postMessage 대신)
    }));

    for(let worker of threads){
        worker.on('message', (value) => console.log('워커로부터', value))
        worker.on('exit', () => {
            threads.delete(worker);  // 끝난 워커는 삭제 -> 관리 용이
            if(threads.size === 0){
                console.log('워커 끝!')
            }
            console.log('워커 끝!');
        })
    }
}
else{  // 워커 스레드
    const data = workerData;  // 초기 데이터
    parentPort.postMessage(data.start + 100)
}