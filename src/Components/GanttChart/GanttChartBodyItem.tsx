/*eslint
array-callback-return: "off"
*/

import React from 'react'

import UI_helper from '../../Helpers/UI_helper'
import GanttBar from './GanttBar'
import GanttBarGroup from './GanttBarGroup'
import GanttDiamond from './GanttDiamond'

type Props = {
    y: number,
    ganttStart: string,
    item: any,
    dayWidth: number,
    ganttWidth: number,
    nonWorkingDays?: any,
    hideNonWorkingDays?: boolean,
}

const GanttChartBodyItem = (props: Props) => {

    const is_valid_task = props.item.task_type !== 'hito' && props.item.startsAt !== null && props.item.endsAt !== null
    const is_valid_hito = props.item.task_type === 'hito' && props.item.startsAt !== null

    if (!is_valid_task && !is_valid_hito) {

        return null
    }

    let x: number
    let w: number

    if (props.hideNonWorkingDays) {

        x = UI_helper.getDayPositionWithoutNonWorkingDays(props.ganttStart, props.item.startsAt, props.nonWorkingDays) * props.dayWidth
        w = UI_helper.getDaysLengthWithoutNonWorkingDays(props.item.startsAt, props.item.endsAt, props.nonWorkingDays) * props.dayWidth
    } else {

        x = UI_helper.getDayPosition(props.ganttStart, props.item.startsAt) * props.dayWidth
        w = UI_helper.getDaysLength(props.item.startsAt, props.item.endsAt) * props.dayWidth
    }



    const color = props.item.color || '#333333'

    return (
        <g className="gantt-chart-item">
            {props.item.type === 'group' ? (
                <GanttBarGroup
                    items={props.item.items}
                    y={props.y}
                    title={props.item.title}
                    color={color}
                    ganttStart={props.ganttStart}
                    ganttWidth={props.ganttWidth}
                    dayWidth={props.dayWidth}
                    collapseStatus={props.item.collapseStatus}
                    nonWorkingDays={props.nonWorkingDays}
                    hideNonWorkingDays={props.hideNonWorkingDays}
                />
            ) : (
                <>
                    {props.item.task_type && props.item.task_type === 'hito' ? (
                        <GanttDiamond
                            x={x}
                            y={props.y}
                            color={color}
                        />
                    ) : (
                        <GanttBar
                            x={x}
                            y={props.y}
                            w={w}
                            title={props.item.bar_text}
                            color={color}
                            progress={props.item.progress}
                            ganttWidth={props.ganttWidth}
                        />
                    )}
                </>
            )}
            <g className="gantt-chart-item-controls">
            </g>
        </g>
    )
}

export default GanttChartBodyItem
