
import React from 'react'

type Props = {
    i: number,
    x: number,
    y: number,
    item: any,
    chartWidth: number,
    dayWidth: number,
    isActive?: boolean
}

const GanttChartBodyGridItem = (props: Props) => {

    const getClassName = () => {

        let className = 'grid-row-bg'

        if (props.isActive) {

            className += ' active'
        }

        return className
    }

    return (
        <g id="chart-item">
            <rect
                className={getClassName()}
                x={0}
                y={props.y * 32}
                height={31}
                width={props.chartWidth}
            ></rect>
            <line
                className="grid-row-line"
                x1={0}
                y1={(props.y + 1) * 32}
                x2={props.chartWidth - 17}
                y2={(props.y + 1) * 32}
            />
            {/* <text
                x={(props.x * props.dayWidth) + 4}
                y={((props.y + 1) * 32) - 12}
            >
                {props.item.title}
            </text> */}
        </g>
    )
}

export default GanttChartBodyGridItem
