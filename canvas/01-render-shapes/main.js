const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")


const SHAPES_COUNT = 10_000_000
const MIN_SIZE = 20
const MAX_SIZE = 60
const CANVAS_WIDTH = canvas.clientWidth
const CANVAS_HEIGHT = canvas.clientHeight

try {
    ctx.beginPath();
    console.time("render shapes")
    for (let index = 0; index < SHAPES_COUNT; index++) {
        const randomX = Math.ceil(Math.random() * (CANVAS_WIDTH - MAX_SIZE))
        const randomY = Math.ceil(Math.random() * (CANVAS_HEIGHT - MAX_SIZE))
        const randomWidth = Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE + 1)) + MIN_SIZE;
        const randomHeight = Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE + 1)) + MIN_SIZE;
        ctx.strokeRect(randomX, randomY, randomWidth, randomHeight)
        if (index % 100000 === 0) {
            console.log(index)
        }
    }
    console.timeEnd("render shapes")

} catch (error) {
    console.error(error)
}

// result: render shapes: 7831.260986328125 ms
// result: render shapes: 5844.0400390625 ms
// render shapes: 5952.14013671875 ms
// render shapes: 6342.2490234375 ms