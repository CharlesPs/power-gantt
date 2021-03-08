
import React from 'react'
import UI_helper from '../../Helpers/UI_helper'

import GanttBarTask from './GanttBar'

type Props ={
    x: number,
    y: number,
    w: number,
    title: string,
    color: string,
    progress: number,
    ganttWidth: number,
    collapseStatus: string,
    bars: any,
}

const GanttBarGroup = (props: Props) => {

    return (
        <>
            {props.collapseStatus === 'collapsed' ? (
                <g className="gantt-chart-item-group-bar">
                    {props.bars.map((bar: any, i: number) => (
                        <rect key={i}
                            className="grid-row-item"
                            fill={bar.color}
                            x={bar.x + 4}
                            y={(props.y * 32) + 6}
                            height={20}
                            width={bar.w - 8}
                        ></rect>
                    ))}
                </g>
            ) : (
                <>
                    <GanttBarTask
                        x={props.x}
                        y={props.y}
                        w={props.w}
                        title={props.title}
                        color={props.color}
                        progress={props.progress}
                        ganttWidth={props.ganttWidth}
                    />
                </>
            )}
        </>
    )
}

export default GanttBarGroup
