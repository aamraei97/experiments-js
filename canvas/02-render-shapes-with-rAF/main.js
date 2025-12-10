const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")


const SHAPES_COUNT = 10_000_000
const MIN_SIZE = 20
const MAX_SIZE = 60
const CANVAS_WIDTH = canvas.clientWidth
const CANVAS_HEIGHT = canvas.clientHeight

let idx = 0
console.time("render shapes")

function render() {
    let batchCount = 100_000


    for (let index = 0; index < batchCount; index++) {
        ctx.beginPath();
        const randomX = Math.ceil(Math.random() * (CANVAS_WIDTH - MAX_SIZE))
        const randomY = Math.ceil(Math.random() * (CANVAS_HEIGHT - MAX_SIZE))
        const randomWidth = Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE + 1)) + MIN_SIZE;
        const randomHeight = Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE + 1)) + MIN_SIZE;
        ctx.strokeRect(randomX, randomY, randomWidth, randomHeight)

    }
    idx += batchCount

    if (idx < SHAPES_COUNT) {
        console.log(idx)
        requestAnimationFrame(render)
    } else {
        console.timeEnd("render shapes")
    }

}


render()

// result: render shapes: 1625.046875 ms
// result: render shapes: 2194.904052734375 ms
// result: render shapes: 1840.512939453125 ms