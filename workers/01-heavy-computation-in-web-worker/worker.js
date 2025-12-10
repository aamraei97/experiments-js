onmessage = (event) => {
    const { iteration } = event.data
    let sum = 0
    for (let i = 0; i < iteration; i++) {
        // Increase the work even further to slow down the loop more
        for (let j = 0; j < 20; j++) {
            sum += Math.sqrt(i + j)
            sum -= Math.cbrt(i + j) // Extra computation: cube root
            sum += Math.log1p(i + j) // Extra computation: natural log of 1 + x
        }
    }

    postMessage(sum)
}