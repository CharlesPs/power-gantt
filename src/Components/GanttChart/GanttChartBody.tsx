
import React from 'react'

import UI_helper from '../../Helpers/UI_helper'
import GanttChartArrows from './GanttChartArrows'
import GanttChartBodyGrid from './GanttChartBodyGrid'
import GanttChartBodyItem from './GanttChartBodyItem'

type Props = {
    start: string,
    end: string,
    dayWidth: number,
    items: any,
    // onItemHover?: any,
    // hover?: number,
    active?: number,
}

const GanttChartBody = (props: Props) => {

    const days = UI_helper.getDaysInRange(props.start, props.end)

    const relations = UI_helper.getRelations(props.items)

    return (
        <svg
            style={{
                height: props.items.length * 32,
                width: (days.length * props.dayWidth)
            }}
        >
            <GanttChartBodyGrid
                items={props.items}
                days={days}
                dayWidth={props.dayWidth}
                // onItemHover={props.onItemHover}
                // hover={props.hover}
                active={props.active}
            />
            <GanttChartArrows
                relations={relations}
                dayWidth={props.dayWidth}
                ganttStart={props.start}
            />
            {props.items.map((item: any, i: number) => (
                <GanttChartBodyItem key={item.task_id || item.group_id}
                    y={i}
                    ganttStart={props.start}
                    item={item}
                    dayWidth={props.dayWidth}
                    ganttWidth={days.length * props.dayWidth}
                />
            ))}
        </svg>
    )
}

export default GanttChartBody
