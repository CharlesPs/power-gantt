
import React from 'react'
import UI_helper from '../../Helpers/UI_helper'

import GanttBarTask from './GanttBar'

type Props ={
    items: any,
    y: number,
    title: string,
    color: string,
    ganttStart: string,
    ganttWidth: number,
    dayWidth: number,
    collapseStatus: string,
}

const GanttBarGroup = (props: Props) => {

        const has_groups = props.items.filter((item: any) => item.type === 'group').length ? true : false

        const durationAndProgress = UI_helper.getGroupDuration(props.items)
        const progress = UI_helper.getGroupProgress(props.items)
        const bars = UI_helper.getGroupBars(props.items)

        if (props.collapseStatus === 'collapsed') {

            bars.map((bar: any) => {

                bar.x = UI_helper.getDayPosition(props.ganttStart, bar.startsAt) * props.dayWidth
                bar.w = UI_helper.getDaysLength(bar.startsAt, bar.endsAt) * props.dayWidth
            })
        }

        const x = UI_helper.getDayPosition(props.ganttStart, durationAndProgress.startsAt) * props.dayWidth

        const w = UI_helper.getDaysLength(durationAndProgress.startsAt, durationAndProgress.endsAt) * props.dayWidth

    return (
        <>
            {props.collapseStatus === 'collapsed' && !has_groups ? (
                <g className="gantt-chart-item-group-bar">
                    {bars.map((bar: any, i: number) => (
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
                        x={x}
                        y={props.y}
                        w={w}
                        title={props.title}
                        color={props.color}
                        progress={progress}
                        ganttWidth={props.ganttWidth}
                    />
                </>
            )}
        </>
    )
}

export default GanttBarGroup
