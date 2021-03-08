/*eslint
array-callback-return: "off"
*/

import React from 'react'

import UI_helper from '../../Helpers/UI_helper'
import GanttBar from './GanttBar'
import GanttBarGroup from './GanttBarGroup'

type Props = {
    y: number,
    ganttStart: string,
    item: any,
    dayWidth: number,
    ganttWidth: number,
}

const GanttChartBodyItem = (props: Props) => {

    const x = UI_helper.getDayPosition(props.ganttStart, props.item.startsAt) * props.dayWidth

    const w = UI_helper.getDaysLength(props.item.startsAt, props.item.endsAt) * props.dayWidth

    const color = props.item.color || '#333333'

    return (
        <g className="gantt-chart-item">
            {props.item.type === 'task' ? (
                <GanttBar
                    x={x}
                    y={props.y}
                    w={w}
                    title={props.item.title}
                    color={color}
                    progress={props.item.progress}
                    ganttWidth={props.ganttWidth}
                />
            ) : (
                <GanttBarGroup
                    items={props.item.items}
                    y={props.y}
                    title={props.item.title}
                    color={color}
                    ganttStart={props.ganttStart}
                    ganttWidth={props.ganttWidth}
                    dayWidth={props.dayWidth}
                    collapseStatus={props.item.collapseStatus}
                />
            )}
            <g className="gantt-chart-item-controls">
            </g>
        </g>
    )
}

export default GanttChartBodyItem
