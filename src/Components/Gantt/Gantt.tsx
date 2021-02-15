
import React, { useEffect, useRef, useState } from 'react'

import GanttTable from '../GanttTable/GanttTable'
import GanttChart from '../GanttChart/GanttChart'
import GanttDivisor from './GanttDivisor'

import UI_helper from '../../Helpers/UI_helper'

import '../../library.css'

type Props = {
    id?: string,
    items: any,
    columns: any,
    minTableWidthPercent?: number,
    maxTableWidthPercent?: number,
    defTableWidthPorcent?: number,
}

const Gantt = (props: Props) => {

    const localPercent = parseFloat(localStorage.getItem(`gantt-${props.id}`) || '0')

    const [ state, setState ] = useState({
        divisorPosition: localPercent || 40,
        ganttWidth: 0,
        ganttLeft: 0,
        minTableWidthPercent: props.minTableWidthPercent || 20,
        maxTableWidthPercent: props.maxTableWidthPercent || 50,
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

        const getMaxTablePercent = (max_calculated: number, max_by_setting: number) => {


            const max = max_calculated <= max_by_setting ? max_calculated : max_by_setting

            return max
        }

        const getGanttSize = () => {

            const ganttElement = ganttElRef.current

            if (!ganttElement) {

                return
            }

            const table_width = UI_helper.getTableWidth(props.columns)
            const max_calculated = UI_helper.getPercent(ganttElement.offsetWidth, table_width)

            setState({
                ...state,
                ganttWidth: ganttElement.offsetWidth,
                ganttLeft: ganttElement.offsetLeft,
                maxTableWidthPercent: getMaxTablePercent(max_calculated, state.maxTableWidthPercent)
            })
        }
        getGanttSize()

        window.addEventListener('resize', () => getGanttSize())
    }, [ ganttElRef.current ])

    return (
        <>
            <div className="gantt"
                ref={ganttElRef}
            >
                <GanttTable
                    items={props.items}
                    columns={props.columns}
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
