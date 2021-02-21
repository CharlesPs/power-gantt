
import React from 'react'

type Props = {
    x: number,
    y: number,
    item: any,
    chartWidth: number,
    dayWidth: number,
}

const GanttChartBodyGridItem = (props: Props) => {

    return (
        <g id="chart-item">
            <line
                className="grid-row-line"
                x1={0}
                x2={props.chartWidth - 17}
                y1={(props.y + 1) * 32}
                y2={(props.y + 1) * 32}
            />
            {/* <rect
                className="grid-row-item"
                x={0}
                y={props.y * 32}
                height={31}
                width={props.chartWidth}
            ></rect> */}
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
