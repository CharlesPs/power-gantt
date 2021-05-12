
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
    nonWorkingDays?: any,
    hideNonWorkingDays?: boolean,
}

const GanttBarGroup = (props: Props) => {

    const has_groups = props.items.filter((item: any) => item.type === 'group').length ? true : false

    const durationAndProgress = UI_helper.getGroupDuration(props.items)
    const progress = UI_helper.getGroupProgress(props.items)
    const bars = UI_helper.getGroupBars(props.items)

    if (props.collapseStatus === 'collapsed') {

        bars.map((bar: any) => {

            if (props.hideNonWorkingDays) {

                bar.x = UI_helper.getDayPositionWithoutNonWorkingDays(props.ganttStart, bar.startsAt, props.nonWorkingDays) * props.dayWidth
                bar.w = UI_helper.getDaysLengthWithoutNonWorkingDays(bar.startsAt, bar.endsAt, props.nonWorkingDays) * props.dayWidth
            } else {

                bar.x = UI_helper.getDayPosition(props.ganttStart, bar.startsAt) * props.dayWidth
                bar.w = UI_helper.getDaysLength(bar.startsAt, bar.endsAt) * props.dayWidth
            }
        })
    }

    let x: number
    let w: number

    if (props.hideNonWorkingDays) {

        x = UI_helper.getDayPositionWithoutNonWorkingDays(props.ganttStart, durationAndProgress.startsAt, props.nonWorkingDays) * props.dayWidth
        w = UI_helper.getDaysLengthWithoutNonWorkingDays(durationAndProgress.startsAt, durationAndProgress.endsAt, props.nonWorkingDays) * props.dayWidth
    } else {

        x = UI_helper.getDayPosition(props.ganttStart, durationAndProgress.startsAt) * props.dayWidth
        w = UI_helper.getDaysLength(durationAndProgress.startsAt, durationAndProgress.endsAt) * props.dayWidth
    }


    return (
        <>
            {props.collapseStatus === 'collapsed' && !has_groups ? (
                <g className="gantt-chart-item-group-bar">
                    {bars.map((bar: any, i: number) => (
                        <GanttBarTask key={i}
                            x={bar.x + 4}
                            y={(props.y)}
                            w={bar.w - 8}
                            title={bar.code}
                            color={bar.color}
                            progress={bar.progress}
                            ganttWidth={props.ganttWidth}
                        />
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
