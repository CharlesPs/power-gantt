
import React, { useEffect, useRef, useState } from 'react'

import GanttTable from '../GanttTable/GanttTable'
import GanttChart from '../GanttChart/GanttChart'
import GanttDivisor from './GanttDivisor'

import UI_helper from '../../Helpers/UI_helper'

import '../../library.css'

import moment from 'moment'

type Props = {
    id?: string,
    start: string,
    end: string,
    items: any,
    columns: any,
    minTableWidthPercent?: number,
    maxTableWidthPercent?: number,
    defTableWidthPorcent?: number,
    dayWidth?: number
}

const Gantt = (props: Props) => {

    moment.locale('es')

    moment.updateLocale('es', {
        monthsShort: 'Ene-Feb-Mar-Abr-May-Jun-Jul-Ago-Set-Oct-Nov-Dic'.split('-'),
        week: {
            dow: 1
        }
    })

    const localPercent = parseFloat(localStorage.getItem(`gantt-${props.id}`) || '0')

    const [ state, setState ] = useState({
        divisorPosition: localPercent || 40,
        ganttWidth: 0,
        ganttLeft: 0,
        minTableWidthPercent: props.minTableWidthPercent || 20,
        maxTableWidthPercent: props.maxTableWidthPercent || 50,
        dayWidth: props.dayWidth || 32,
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
            const max_calculated = table_width * 100 / ganttElement.offsetWidth

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
                    start={props.start}
                    end={props.end}
                    items={props.items}
                    onScroll={(top: number) => setState({ ...state, scrollTop: top })}
                    scrollTop={state.scrollTop}
                    dayWidth={state.dayWidth}
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
