const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const min = 2;
let primes = [];

function findPrimes(start, range){
    let isPrime = true;
    const end = start + range;
    for(let i = start; i < end; i++){
        for(let j = min; j < Math.sqrt(end); j++){
            if(i !== j && i % j === 0){
                isPrime = false;
                break;
            }
        }
        if(isPrime){
            primes.push(i);
        }
        isPrime = true;
    }
}

if(isMainThread){
    const max = 10_000_000;
    const threadCount = 8;
    const threads = new Set();
    const range = Math.ceil((max-min)/threadCount);  // 8개에게 범위를 분배해주기 위해
    let start = min;
    console.time('prime');
    
    // 워커 스레드에게 일을 직접 분배해줘야 함.
    for(let i = 0; i < threadCount - 1; i++){
        const wStart = start;
        // 워커 데이터마다 시작과 끝을 갖고 있게 됨.
        threads.add(new Worker(__filename, { workerData: { start: wStart, range }}))
        start += range;
    }
    threads.add(new Worker(__filename, { workerData: { start, range: (range + ((max-min+1) % threadCount)) }}));

    for(let worker of threads){
        // worker에서 에러났을 때 어떻게 대처할지
        worker.on('error', (err)=>{
            throw err;
        })
        worker.on('exit', ()=>{
            threads.delete(worker);
            if(threads.size === 0){
                console.timeEnd('prime');
                console.log(primes.length);
            }
        });
        worker.on('message', (msg) => {
            primes = primes.concat(msg);  // 구한 소수를 직접 합쳐줘야 함.
        });
    }
}
else{
    findPrimes(workerData.start, workerData.range);
    parentPort.postMessage(primes);
}