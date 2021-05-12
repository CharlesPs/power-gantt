
import React, { useEffect, useState } from 'react'
import UI_helper from '../../Helpers/UI_helper'

import GanttArrow from './GanttArrow'

type Props = {
    relations: any,
    dayWidth: number,
    ganttStart: string,
    nonWorkingDays?: any,
    hideNonWorkingDays?: boolean,
}

const GanttChartArrows = (props: Props) => {

    const [ state, setState ] = useState({
        relationsProps: []
    })

    const getRelationsProps = () => {

        return props.relations.map((relation: any) => {

            let startX: number
            let endX: number

            if (props.hideNonWorkingDays) {

                startX = UI_helper.getDayPositionWithoutNonWorkingDays(props.ganttStart, relation.fromDay, props.nonWorkingDays)
                endX = UI_helper.getDayPositionWithoutNonWorkingDays(props.ganttStart, relation.toDay, props.nonWorkingDays)
            } else {

                startX = UI_helper.getDayPosition(props.ganttStart, relation.fromDay)
                endX = UI_helper.getDayPosition(props.ganttStart, relation.toDay)
            }


            if (relation.type === 'end_to_start') {

                startX += 1
            }

            return {
                fromX: startX * props.dayWidth,
                fromY: relation.fromRow * 32,
                toX: endX * props.dayWidth,
                toY: relation.toRow * 32,
                type: relation.type
            }
        })
    }

    useEffect(() => {

        setState({
            ...state,
            relationsProps: getRelationsProps()
        })

    }, [ props.relations ])

    return (
        <g className="gantt-arrows">
            {state.relationsProps.map((relationProps: any, i: number) => (
                <GanttArrow key={i} {...relationProps} />
            ))}
        </g>
    )
}

export default GanttChartArrows
