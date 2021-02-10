
import React, { useEffect, useRef, useState } from 'react'

import GanttTable from '../GanttTable/GanttTable'
import GanttChart from '../GanttChart/GanttChart'
import GanttDivisor from './GanttDivisor'

import '../../library.css'

type Props = {
    minTableWidthPercent?: number,
    maxTableWidthPercent?: number,
    defTableWidthPorcent?: number,
}

const Gantt = (props: Props) => {

    const [ state, setState ] = useState({
        divisorPosition: props.defTableWidthPorcent || 40,
        ganttWidth: 0,
        ganttLeft: 0,
        minTableWidthPercent: props.minTableWidthPercent || 20,
        maxTableWidthPercent: props.maxTableWidthPercent || 20,
    })

    const ganttElRef: any = useRef()

    const updateDivisorPosition = (mousePosition: any) => {

        const left = mousePosition - state.ganttLeft

        let porcentaje = 100 * left / state.ganttWidth

        if (porcentaje < state.minTableWidthPercent) {

            porcentaje = state.minTableWidthPercent
        } else if (porcentaje > state.maxTableWidthPercent) {

            porcentaje = state.maxTableWidthPercent
        }

        setState({
            ...state,
            divisorPosition: porcentaje
        })
    }

    useEffect(() => {

        const getGanttSize = () => {

            const ganttElement = ganttElRef.current

            setState({
                ...state,
                ganttWidth: ganttElement.offsetWidth,
                ganttLeft: ganttElement.offsetLeft,
            })
        }
        getGanttSize()

        window.addEventListener('resize', () => getGanttSize())
    }, [])

    return (
        <>
            <div className="gantt"
                ref={ganttElRef}
            >
                <GanttTable divisorPosition={`${state.divisorPosition}%`} />
                <GanttChart />
                <GanttDivisor
                    divisorPosition={state.divisorPosition}
                    onScroll={(newPosition: any) => updateDivisorPosition(newPosition)}
                />
            </div>
        </>
    )
}

export default Gantt
