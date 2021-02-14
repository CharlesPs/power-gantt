
import React, { useEffect, useRef, useState } from 'react'

import GanttTable from '../GanttTable/GanttTable'
import GanttChart from '../GanttChart/GanttChart'
import GanttDivisor from './GanttDivisor'

import '../../library.css'

type Props = {
    id?: string,
    items: any,
    minTableWidthPercent?: number,
    maxTableWidthPercent?: number,
    defTableWidthPorcent?: number,
}

const Gantt = (props: Props) => {

    const localPercent = parseFloat(localStorage.getItem(`gantt-${props.id}`) || '0')

    const [ state, setState ] = useState({
        divisorPosition: props.defTableWidthPorcent || localPercent || 40,
        ganttWidth: 0,
        ganttLeft: 0,
        minTableWidthPercent: props.minTableWidthPercent || 20,
        maxTableWidthPercent: props.maxTableWidthPercent || 20,
        scrollTop: 0,
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

        localStorage.setItem(`gantt-${props.id}`, porcentaje.toString())

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
                <GanttTable
                    items={props.items}
                    divisorPosition={`${state.divisorPosition}%`}
                    onScroll={(top: number) => setState({ ...state, scrollTop: top })}
                    scrollTop={state.scrollTop}
                />
                <GanttChart
                    items={props.items}
                    onScroll={(top: number) => setState({ ...state, scrollTop: top })}
                    scrollTop={state.scrollTop}
                />
                <GanttDivisor
                    divisorPosition={state.divisorPosition}
                    onScroll={(newPosition: any) => updateDivisorPosition(newPosition)}
                />
            </div>
        </>
    )
}

export default Gantt
