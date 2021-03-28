
import React, { useEffect, useRef } from 'react'

type Props = {
    x: number,
    y: number,
    w: number,
    title: string,
    color: string,
    progress: number,
    ganttWidth: number
}

const GanttBar = (props: Props) => {

    const text_ref: any = useRef()

    let text_x = props.x

    const progress_w = (props.w - 8) * (props.progress || 0) / 100

    useEffect(() => {

        const getTextWidth = () => {


            return text_ref.current.getBBox().width
        }

        const updateTextLeft = () => {

            const text_w = getTextWidth()

            if (text_w >= (props.w - 8)) {

                text_ref.current.classList.add('dark')

                text_x = props.x + props.w

                if (text_x + text_w >= props.ganttWidth) {

                    text_x = props.x - text_w - 4
                }

                text_ref.current.setAttribute('x', text_x)
            }
        }

        if (text_ref.current && props.w < getTextWidth()) {

            updateTextLeft()
        }
    }, [ text_ref.current ])

    return (
        <g className="gantt-chart-item-bar">
            <rect
                className="grid-row-item"
                fill="#FFFFFFB0"
                x={props.x + 4}
                y={(props.y * 32) + 6}
                height={20}
                width={props.w - 8}
            ></rect>
            <rect
                className="grid-row-item"
                fill={`${props.color}90`}
                x={props.x + 4}
                y={(props.y * 32) + 6}
                height={20}
                width={props.w - 8}
            ></rect>
            <rect
                className="grid-row-item-progress"
                fill={props.color}
                x={props.x + 5}
                y={(props.y * 32) + 7}
                height={18}
                width={progress_w || 3}
            ></rect>
            <text
                ref={text_ref}
                className="grid-row-item-text dark"
                x={text_x + 8}
                y={(props.y * 32) + 21}
            >
                {`${props.title} (${props.progress || 0}%)`}
            </text>
        </g>
    )
}

export default GanttBar
