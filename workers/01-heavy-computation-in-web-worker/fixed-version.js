const worker = new Worker("./worker.js")
const iteration = 10_000_000


console.time("runHeavyComputation")
worker.postMessage({ iteration })
worker.onmessage = (event) => {
    document.querySelector("input").value = event.data
    console.timeEnd("runHeavyComputation")
}



// runHeavyComputation: 3170.050048828125 ms
// runHeavyComputation: 2556.39208984375 ms
// runHeavyComputation: 2507.3759765625 ms