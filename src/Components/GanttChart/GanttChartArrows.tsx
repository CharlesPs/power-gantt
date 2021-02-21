
import React, { useEffect, useState } from 'react'
import UI_helper from '../../Helpers/UI_helper'

import GanttArrow from './GanttArrow'

type Props = {
    relations: any,
    dayWidth: number,
    ganttStart: string,
}

const GanttChartArrows = (props: Props) => {

    const [ state, setState ] = useState({
        relationsProps: []
    })

    const getRelationsProps = () => {

        return props.relations.map((relation: any) => {

            let startX = UI_helper.getDayPosition(props.ganttStart, relation.fromDay)

            if (relation.type === 'end_to_start') {

                startX += 1
            }

            return {
                fromX: startX * props.dayWidth,
                fromY: relation.fromRow * 32,
                toX: UI_helper.getDayPosition(props.ganttStart, relation.toDay) * props.dayWidth,
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
