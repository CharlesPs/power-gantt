
import React, { useEffect, useRef, useState } from 'react'

import GanttTableRows from '../GanttTable/GanttTableRows'
import GanttChartHeader from '../GanttChart/GanttChartHeader'
import GanttChartBody from '../GanttChart/GanttChartBody'
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
    dayWidth: number,
    onToggleCollapse: any,
    onItemEdit?: any,
}

let scrollTop = 0
let tableScrollLeft = 0
let chartScrollLeft = 0

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
        hover: -1,
        active: -1,
    })

    const ganttElRef: any = useRef()

    const tableHeaderRef: any = useRef()
    const tableBodyRef: any = useRef()

    const chartHeaderRef: any = useRef()
    const chartBodyRef: any = useRef()

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

    const onTableBodyScroll = () => {

        const left = tableBodyRef.current.scrollLeft
        const top = tableBodyRef.current.scrollTop

        if (tableScrollLeft !== left) {

            tableScrollLeft = left

            tableHeaderRef.current.scrollLeft = left
        }

        if (scrollTop !== top) {

            scrollTop = top

            chartBodyRef.current.scrollTop = top
        }
    }

    const onChartBodyScroll = () => {

        const left = chartBodyRef.current.scrollLeft
        const top = chartBodyRef.current.scrollTop

        if (chartScrollLeft !== left) {

            chartScrollLeft = left

            chartHeaderRef.current.scrollLeft = left
        }

        if (scrollTop !== top) {

            scrollTop = top

            tableBodyRef.current.scrollTop = top
        }
    }

    const onItemClick = (item: any, active: number) => {

        const x = UI_helper.getDayPosition(props.start, item.startsAt)

        chartBodyRef.current.scrollLeft = x * props.dayWidth

        setState({
            ...state,
            active
        })
    }

    return (
        <>
            <div className="gantt"
                ref={ganttElRef}
            >
                <div className="gantt-table"
                    style={{
                        flexBasis: `${state.divisorPosition}%`
                    }}
                >
                    <div className="header">
                        <div className="header-scroll"
                            ref={tableHeaderRef}
                        >
                            <div className="tr"
                                style={{
                                width: UI_helper.getTableWidth(props.columns)
                            }}
                            >
                                {props.columns.map((column: any, i: number) => (
                                    <div key={i} className="th" style={{
                                        width: column.width
                                    }}>
                                        {column.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="body"
                        ref={tableBodyRef}
                        onScroll={(e: any) => onTableBodyScroll()}
                    >
                        <GanttTableRows
                            items={props.items}
                            columns={props.columns}
                            onToggleCollapse={props.onToggleCollapse}
                            onItemClick={onItemClick}
                            onItemEdit={props.onItemEdit}
                            onItemHover={(hover: number) => setState({ ...state, hover })}
                            hover={state.hover}
                            active={state.active}
                        />
                    </div>
                </div>
                <div className="gantt-chart">
                    <div className="header">
                        <div className="header-scroll"
                            ref={chartHeaderRef}
                        >
                            <GanttChartHeader
                                start={props.start}
                                end={props.end}
                                dayWidth={props.dayWidth}
                            />
                        </div>
                    </div>
                    <div id="table-body" className="body"
                        ref={chartBodyRef}
                        onScroll={(e: any) => onChartBodyScroll()}
                    >
                        <GanttChartBody
                            start={props.start}
                            end={props.end}
                            dayWidth={props.dayWidth}
                            items={props.items}
                            onItemHover={(hover: number) => setState({ ...state, hover })}
                            hover={state.hover}
                            active={state.active}
                        />
                    </div>
                </div>
                <GanttDivisor
                    divisorPosition={state.divisorPosition}
                    onScroll={(newPosition: any) => updateDivisorPosition(newPosition)}
                />
            </div>
        </>
    )
}

export default Gantt
