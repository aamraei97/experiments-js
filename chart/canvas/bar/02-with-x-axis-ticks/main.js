



// this value is a hack for solving the pixel alignment and anti-aliasing
const ANTI_ALIASING_VALUE = 0.5
// we need this space because we need extra space in the bottom of the canvas to render x, y axis ticks and later the legends
const BAR_CHART_BOTTOM_SPACE = 40


class Chart {
    #chart_data = []
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
        this.#chart_data = config.data
        this.#drawYAxisLine()
        this.#drawYAxisTicks()
        this.#drawXAxisLine()
        this.#drawXAxisTicks()
        this.#draw()
    }
    #drawYAxisLine() {
        this.ctx.beginPath();
        // Y axis line should start after the Y Axis Ticks Width
        this.ctx.moveTo(this.#bar_options.axis.y.width + ANTI_ALIASING_VALUE, BAR_CHART_BOTTOM_SPACE);
        this.ctx.lineTo(this.#bar_options.axis.y.width + ANTI_ALIASING_VALUE, (this.canvasHeight - BAR_CHART_BOTTOM_SPACE))
        this.ctx.stroke(); // 
    }
    #drawYAxisTicks() {
        this.ctx.save()
        // 2. Flip the Y-axis (scale by -1)
        this.ctx.scale(1, -1);

        const TICKS_COUNT = 10
        const AVAILABEL_Y_HEIGHT = this.canvasHeight - (BAR_CHART_BOTTOM_SPACE * 2)
        const TICK_GAP = Math.floor(AVAILABEL_Y_HEIGHT / TICKS_COUNT)
        let currentYTick = 0

        this.ctx.textAlign = "end"
        this.ctx.textBaseline = "middle"
        const chartValues = this.#chart_data.map(item => item.value)
        const MaxValue = Math.max(...chartValues)
        const ratio = MaxValue / AVAILABEL_Y_HEIGHT
        while (currentYTick <= AVAILABEL_Y_HEIGHT) {
            this.ctx.fillText(parseInt(currentYTick * ratio).toString(), this.#bar_options.axis.y.width - 10, -(currentYTick + BAR_CHART_BOTTOM_SPACE))
            currentYTick += TICK_GAP
            console.log(11111)
        }
        // Restore the state to the main transformed (bottom-left) system
        this.ctx.restore();
    }
    #drawXAxisLine() {
        this.ctx.beginPath();
        // Y axis line should start after the Y Axis Ticks Width
        this.ctx.moveTo(this.#bar_options.axis.y.width + ANTI_ALIASING_VALUE, BAR_CHART_BOTTOM_SPACE + ANTI_ALIASING_VALUE);
        this.ctx.lineTo(this.canvasWidth - this.#bar_options.axis.y.width + ANTI_ALIASING_VALUE, BAR_CHART_BOTTOM_SPACE + ANTI_ALIASING_VALUE)
        this.ctx.stroke(); // 
    }
    #drawXAxisTicks() {
        this.ctx.save()
        // 2. Flip the Y-axis (scale by -1)
        this.ctx.scale(1, -1);
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = "center"
        this.ctx.textBaseline = "middle"
        const chartLabels = this.#chart_data.map(item => item.label)

        for (let i = 0; i < chartLabels.length; i++) {
            let X_Value = this.#bar_options.axis.y.width + (i * this.#bar_options.width) + ((i + 1) * this.#bar_options.gap)
            // because we want the x tick to placed at the center of the bar we add half of the bar width to start point of the tick text
            X_Value += this.#bar_options.width / 2
            this.ctx.fillText(chartLabels[i], X_Value, -25, this.#bar_options.width)
        }
        // Restore the state to the main transformed (bottom-left) system
        this.ctx.restore();
    }
    #draw() {
        const chartValues = this.#chart_data.map(item => item.value)
        const MaxValue = Math.max(...chartValues)
        const AVAILABEL_Y_HEIGHT = this.canvasHeight - (BAR_CHART_BOTTOM_SPACE * 2)
        const ratio = AVAILABEL_Y_HEIGHT / MaxValue


        for (let i = 0; i < chartValues.length; i++) {
            this.ctx.beginPath()
            // X variable is consist previous rects width + gaps betweens them + y axis ticks width + small gap in the start to seperate
            let calcRectX = (i * this.#bar_options.width) + (this.#bar_options.gap * (i + 1)) + this.#bar_options.axis.y.width

            // y value should be calculated based on the canvas height to hold the respected ratio
            const calcRectY = ratio * chartValues[i]
            this.ctx.fillStyle = this.#chart_data[i].backgroundColor
            this.ctx.roundRect(calcRectX, BAR_CHART_BOTTOM_SPACE, this.#bar_options.width, calcRectY, [0, 0, 10, 10])
            this.ctx.fill()
        }

    }
}