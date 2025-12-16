

const data = [10, 20, 30, 40, 50]

// this value is a hack for solving the pixel alignment and anti-aliasing
const ANTI_ALIASING_VALUE = 0.5


class Chart {
    #bar_options = {
        width: 60,
        gap: 12,
        axis: {
            y: {
                width: 50
            }
        }
    }
    constructor(canvasId, config) {
        const canvas = document.querySelector(canvasId)
        this.ctx = canvas.getContext("2d")
        this.canvasHeight = canvas.height
        this.canvasWidth = canvas.width
        // 1. Move the origin to the bottom-left of the canvas
        this.ctx.translate(0, this.canvasHeight);

        // 2. Flip the Y-axis (scale by -1)
        this.ctx.scale(1, -1);

        this.#bar_options = {
            ...this.#bar_options,
            ...config.options
        }
        this.#drawYAxis()
        this.#drawXAxis()
        this.#draw()
    }
    #drawYAxis() {
        this.ctx.beginPath();
        // Y axis line should start after the Y Axis Ticks Width
        this.ctx.moveTo(this.#bar_options.axis.y.width + ANTI_ALIASING_VALUE, 0);
        this.ctx.lineTo(this.#bar_options.axis.y.width + ANTI_ALIASING_VALUE, this.canvasHeight)
        this.ctx.stroke(); // 


        this.ctx.save()
        // 2. Flip the Y-axis (scale by -1)
        this.ctx.scale(1, -1);

        const TICKS_COUNT = 10
        const TICK_GAP = Math.floor(this.canvasHeight / TICKS_COUNT)
        let currentYTick = 0
        console.log({ currentYTick })
        this.ctx.textAlign = "end"
        while (currentYTick < this.canvasHeight) {
            this.ctx.fillText(currentYTick, this.#bar_options.axis.y.width - 10, -currentYTick)
            currentYTick += TICK_GAP
            console.log(11111)
        }
        // Restore the state to the main transformed (bottom-left) system
        this.ctx.restore();
    }
    #drawXAxis() {
        this.ctx.beginPath();
        // Y axis line should start after the Y Axis Ticks Width
        this.ctx.moveTo(this.#bar_options.axis.y.width, 0);
        this.ctx.lineTo(this.canvasWidth - this.#bar_options.axis.y.width, 0)
        this.ctx.stroke(); // 
    }
    #draw() {
        const MaxValue = Math.max(...data)
        const ratio = this.canvasHeight / MaxValue
        this.ctx.beginPath()
        this.ctx.fillStyle = "#0a9396"
        for (let i = 0; i < data.length; i++) {
            // X variable is consist previous rects width + gaps betweens them + y axis ticks width + small gap in the start to seperate
            let calcRectX = (i * (this.#bar_options.width + this.#bar_options.gap)) + this.#bar_options.axis.y.width

            // y value should be calculated based on the canvas height to hold the respected ratio
            const calcRectY = ratio * data[i]

            this.ctx.roundRect(calcRectX, 0, this.#bar_options.width, calcRectY, [0, 0, 10, 10])
        }
        this.ctx.fill()
    }
}