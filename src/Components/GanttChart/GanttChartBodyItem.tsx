
import React, { useEffect, useRef } from 'react'

import UI_helper from '../../Helpers/UI_helper'

type Props = {
    y: number,
    ganttStart: string,
    item: any,
    dayWidth: number,
    ganttWidth: number,
}

const GanttChartBodyItem = (props: Props) => {

    const text_ref: any = useRef()

    const x = UI_helper.getDayPosition(props.ganttStart, props.item.startsAt) * props.dayWidth

    let text_x = x

    const w = UI_helper.getDaysLength(props.item.startsAt, props.item.endsAt) * props.dayWidth

    const progress = (w - 8) * (props.item.progress || 0) / 100

    const color = props.item.color || '#333333'

    useEffect(() => {

        const text_w = text_ref.current.getBBox().width

        if (text_w >= (w - 8)) {

            text_ref.current.classList.add('dark')

            text_x = x + w

            if (text_x + text_w >= props.ganttWidth) {

                text_x = x - text_w - 4
            }

            text_ref.current.setAttribute('x', text_x)
        }
    }, [ text_ref.current ])


    return (
        <g className="gantt-chart-item">
            <g className="gantt-chart-item-bar">
                <rect
                    className="grid-row-item"
                    fill="#FFFFFFB0"
                    x={x + 4}
                    y={(props.y * 32) + 6}
                    height={20}
                    width={w - 8}
                ></rect>
                <rect
                    className="grid-row-item"
                    fill={`${color}90`}
                    x={x + 4}
                    y={(props.y * 32) + 6}
                    height={20}
                    width={w - 8}
                ></rect>
                <rect
                    className="grid-row-item-progress"
                    fill={color}
                    x={x + 5}
                    y={(props.y * 32) + 7}
                    height={18}
                    width={progress || 3}
                ></rect>
                <text
                    ref={text_ref}
                    className="grid-row-item-text"
                    x={text_x + 8}
                    y={(props.y * 32) + 21}
                >
                    {`${props.item.title} (${props.item.progress || 0}%)`}
                </text>
            </g>
            <g className="gantt-chart-item-controls">
            </g>
        </g>
    )
}

export default GanttChartBodyItem
