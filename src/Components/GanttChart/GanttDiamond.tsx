
import React from 'react'

type Props = {
    x: number,
    y: number,
    color: string,
}

const GanttDiamond = (props: Props) => {

    const getPoints = () => {

        const x = props.x + 5
        const y = (props.y * 32) + 6

        const points: any = [
            `${x + 10},${y}`,
            `${x + 20},${y + 10}`,
            `${x + 10},${y + 20}`,
            `${x},${y + 10}`,
        ]

        return points.join(' ')
    }

    return (
        <g className="gantt-chart-item-diamond">
            <polygon
                points={getPoints()}
                className="grid-row-item-diamond"
                fill={props.color}
            ></polygon>
        </g>
    )
}

export default GanttDiamond
