



// this value is a hack for solving the pixel alignment and anti-aliasing
const ANTI_ALIASING_VALUE = 0.5
// we need this space because we need extra space in the bottom of the canvas to render x, y axis ticks and later the legends
const BAR_CHART_BOTTOM_SPACE = 40


class Chart {
    #chart_data = []
    #chart_options = {
        width: 60,
        gap: 12,
        radius: [0, 0, 16, 16],
        axis: {
            y: {
                width: 50
            },
        }
    }
    #axis_options = {
        y: {
            tickCount: 10,
            line: true
        },
        x: {
            line: true
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

        this.#chart_options = {
            ...this.#chart_options,
            ...config.options
        }
        this.#chart_data = config.data
        console.log(config)
        this.#axis_options = {
            ...this.#axis_options,
            ...(config.axis || {})
        }

        // if chart type is bar, we need to calculate the gap between the bars
        if (config.type === "bar") {
            this.#calculateBarGap()
        }
        this.#drawYAxisLine()
        this.#drawYAxisTicks()
        this.#drawXAxisLine()
        this.#drawXAxisTicks()
        this.#draw()
    }
    #drawYAxisLine() {
        // if the y axis line is not enabled, we don't need to draw it
        if (!this.#axis_options.y.line) {
            return;
        }
        this.#drawLine({
            x: this.#chart_options.axis.y.width + ANTI_ALIASING_VALUE,
            startY: BAR_CHART_BOTTOM_SPACE,
            endY: this.canvasHeight - BAR_CHART_BOTTOM_SPACE
        })
    }
    #drawYAxisTicks() {
        this.ctx.save()
        // 2. Flip the Y-axis (scale by -1)
        this.ctx.scale(1, -1);

        const AVAILABEL_Y_HEIGHT = this.canvasHeight - (BAR_CHART_BOTTOM_SPACE * 2)
        const TICK_GAP = Math.floor(AVAILABEL_Y_HEIGHT / this.#axis_options.y.tickCount)
        let currentYTick = 0
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = "end"
        this.ctx.textBaseline = "middle"
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        const chartValues = this.#chart_data.map(item => item.value)
        const MaxValue = Math.max(...chartValues)
        const ratio = MaxValue / AVAILABEL_Y_HEIGHT
        while (currentYTick <= AVAILABEL_Y_HEIGHT) {
            this.ctx.fillText(parseInt(currentYTick * ratio).toString(), this.#chart_options.axis.y.width - 10, -(currentYTick + BAR_CHART_BOTTOM_SPACE))
            if (this.#axis_options.y.line) {
                this.#drawLine({
                    startX: this.#chart_options.axis.y.width - 4,
                    endX: this.#chart_options.axis.y.width,
                    y: -(currentYTick + BAR_CHART_BOTTOM_SPACE - ANTI_ALIASING_VALUE),
                })
            }
            currentYTick += TICK_GAP
        }
        // Restore the state to the main transformed (bottom-left) system
        this.ctx.restore();
    }
    #drawLine({ x, startX, endX, startY, endY, y }) {
        this.ctx.beginPath();
        this.ctx.moveTo(x ?? startX, y ?? startY);
        this.ctx.lineTo(x ?? endX, y ?? endY)
        this.ctx.stroke();
    }
    #drawXAxisLine() {
        if (!this.#axis_options.x.line) {
            return;
        }
        this.#drawLine({
            y: BAR_CHART_BOTTOM_SPACE + ANTI_ALIASING_VALUE,
            startX: this.#chart_options.axis.y.width + ANTI_ALIASING_VALUE,
            endX: this.canvasWidth - this.#chart_options.axis.y.width + ANTI_ALIASING_VALUE,
        })
    }
    #drawXAxisTicks() {
        this.ctx.save()
        // 2. Flip the Y-axis (scale by -1)
        this.ctx.scale(1, -1);
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = "center"
        this.ctx.textBaseline = "middle"
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        const chartLabels = this.#chart_data.map(item => item.label)

        for (let i = 0; i < chartLabels.length; i++) {
            let X_Value = this.#chart_options.axis.y.width + (i * this.#chart_options.width) + ((i + 1) * this.#chart_options.gap)
            // because we want the x tick to placed at the center of the bar we add half of the bar width to start point of the tick text
            X_Value += this.#chart_options.width / 2
            this.ctx.fillText(chartLabels[i], X_Value, -20, this.#chart_options.width)
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
            // Start X variable is consist of: 
            // 1. previous rects width
            // 2. gaps betweens them
            // 3. y axis ticks width
            // 4. small gap in the start to seperate
            let calcRectX =
                (i * this.#chart_options.width)
                + (this.#chart_options.gap * (i + 1))
                + this.#chart_options.axis.y.width

            // y value should be calculated based on the canvas height to hold the respected ratio
            const calcRectY = ratio * chartValues[i]
            this.ctx.fillStyle = this.#chart_data[i].backgroundColor
            this.ctx.roundRect(
                calcRectX, // start X
                BAR_CHART_BOTTOM_SPACE, // start Y
                this.#chart_options.width, // width
                calcRectY, // height
                this.#chart_options.radius // radius
            )
            this.ctx.fill()
        }

    }
    #calculateBarGap() {
        // Calculate Gap to seperate the bars from each other
        let calculatedGap = this.canvasWidth
        // 1. reduce the total width of bars 
        const availableWidthForGaps = this.#chart_data.length * this.#chart_options.width
        calculatedGap = availableWidthForGaps / (this.#chart_data.length)
        this.#chart_options.gap = calculatedGap
    }
}