const WorkerThreadsPool = require('worker-threads-pool')
const os = require('os')
const {
    isMainThread,
    workerData,
    parentPort,
} = require('worker_threads')

const threadCount = Number(process.env.THREADS) || os.cpus().length
const workerThreadsPool = new WorkerThreadsPool({ max: threadCount })
const batchSize = 100000n

if (isMainThread) {
    console.log(`using ${threadCount} threads`)
    
    countPrimesUpTo(10000000n)
    .then(console.log)
} else {
    parentPort.postMessage(
        countPrimesBetween(...workerData)
    )
}

async function countPrimesUpTo(endExclusiveBigInteger) {
    // batch the calculations for workers

    const batches = Array(Math.ceil(Number(endExclusiveBigInteger) / Number(batchSize)))
    .fill()
    .map((_, i) => batchSize * BigInt(i))
    .map(batchStart => [
        batchStart,
        minimum(batchStart + batchSize, endExclusiveBigInteger)
    ])

    const counts = await Promise.all(batches.map(batch => new Promise((resolve, reject) => {
        workerThreadsPool.acquire(__filename, { workerData: batch }, function(error, worker) {
            if (error) {
                return reject(error)
            }

            const startTime = Date.now()

            worker.on('error', reject)
            worker.on('message', count => {
                console.log(`found ${count} primes between ${batch} in ${Date.now() - startTime} ms`)
                resolve(count)
            })
        })
    })))

    return counts.reduce((count1, count2) => count1 + count2)
}

function minimum(bigInteger1, bigInteger2) {
    if (bigInteger1 < bigInteger2) {
        return bigInteger1
    } else {
        return bigInteger2
    }
}

function countPrimesBetween(startInclusiveBigInteger, endExclusiveBigInteger) {
    let count = 0

    for (let numberToCheck = startInclusiveBigInteger; numberToCheck < endExclusiveBigInteger; numberToCheck += 1n) {
        if (isPrime(numberToCheck)) {
            count += 1
        }
    }

    return count
}

function isPrime(bigInteger) {
    if (bigInteger <= 3n) {
        return bigInteger > 1n
    }

    if (bigInteger % 2n === 0n || bigInteger % 3n === 0n) {
        return false
    }

    const midPoint = squareRoot(bigInteger)
    let  divisor = 5n

    while (divisor <= midPoint) {
        if (bigInteger % divisor === 0n || bigInteger % (divisor + 2n) === 0n) {
            return false
        }

        divisor += 6n
    }

    return true
}

/** based on https://en.wikipedia.org/wiki/Integer_square_root */
function squareRoot(bigInteger) {
    if (bigInteger < 0n) {
        throw 'square root of negative numbers is not supported'
    }

    if (bigInteger < 2n) {
        return bigInteger;
    }

    if (bigInteger < 5n) {
        return bigInteger - (bigInteger / 2n)
    }

    function newtonIteration(n, x0) {
        const x1 = ((n / x0) + x0) >> 1n;
        if (x0 === x1 || x0 === (x1 - 1n)) {
            return x0;
        }
        return newtonIteration(n, x1);
    }

    return newtonIteration(bigInteger, 1n);
}
