const worker = new Worker("./worker.js")


function runHeavyComputation() {
    const iteration = 10_000_000
    let sum = 0
    for (let i = 0; i < iteration; i++) {
        // Increase the work even further to slow down the loop more
        for (let j = 0; j < 20; j++) {
            sum += Math.sqrt(i + j)
            sum -= Math.cbrt(i + j) // Extra computation: cube root
            sum += Math.log1p(i + j) // Extra computation: natural log of 1 + x
        }
    }
    document.querySelector("input").value = sum
}

console.time("runHeavyComputation")
runHeavyComputation()
console.timeEnd("runHeavyComputation")


// runHeavyComputation: 3170.050048828125 ms
// runHeavyComputation: 2556.39208984375 ms
// runHeavyComputation: 2507.3759765625 ms