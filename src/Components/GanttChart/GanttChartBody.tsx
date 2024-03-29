
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
    active?: number,
    nonWorkingDays?: any,
    hideNonWorkingDays?: boolean,
    showVerticalBorders: boolean
}

const GanttChartBody = (props: Props) => {


    let days: any = []

    if (props.hideNonWorkingDays) {

        days = UI_helper.getDaysInRangeWithoutNonWorkingDays(props.start, props.end, props.nonWorkingDays)
    } else {

        days = UI_helper.getDaysInRange(props.start, props.end)
    }


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
                active={props.active}
                nonWorkingDays={props.nonWorkingDays}
                showVerticalBorders={props.showVerticalBorders}
            />
            <GanttChartArrows
                relations={relations}
                dayWidth={props.dayWidth}
                ganttStart={props.start}
                nonWorkingDays={props.nonWorkingDays}
                hideNonWorkingDays={props.hideNonWorkingDays}
            />
            {props.items.map((item: any, i: number) => (
                <GanttChartBodyItem key={item.task_id || item.group_id}
                    y={i}
                    ganttStart={props.start}
                    item={item}
                    dayWidth={props.dayWidth}
                    ganttWidth={days.length * props.dayWidth}
                    nonWorkingDays={props.nonWorkingDays}
                    hideNonWorkingDays={props.hideNonWorkingDays}
                />
            ))}
        </svg>
    )
}

export default GanttChartBody
