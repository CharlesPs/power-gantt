
import React, { useEffect, useRef, useState } from 'react'

import GanttToolbar from '../GanttToolbar/GanttToolbar'

import GanttTableRows from '../GanttTable/GanttTableRows'
import GanttChartHeader from '../GanttChart/GanttChartHeader'
import GanttChartBody from '../GanttChart/GanttChartBody'
import GanttDivisor from './GanttDivisor'
import GanttOptions from '../GanttOptions/GanttOptions'

import UI_helper from '../../Helpers/UI_helper'

import '@fortawesome/fontawesome-free/css/all.min.css'

import '../../library.css'

import moment from 'moment'

type Props = {
    id?: string,
    start: string,
    end: string,
    items: any,
    columns: any,
    nonWorkingDays?: any,
    hideNonWorkingDays?: boolean,
    minTableWidthPercent?: number,
    maxTableWidthPercent?: number,
    defTableWidthPorcent?: number,
    dayWidth: number,
    dayMinWidth?: number,
    dayMaxWidth?: number,
    onToggleCollapse: any,
    onItemEdit?: any,
    toolbar?: any,
    options?: any,
    sidebar?: any,
}

let scrollTop = 0
let tableScrollLeft = 0
let chartScrollLeft = 0


const Gantt = (props: Props) => {

    const nonWorkingDays = props.nonWorkingDays || []
    const hideNonWorkingDays = props.hideNonWorkingDays ?? false

    moment.locale('es')

    moment.updateLocale('es', {
        monthsShort: 'Ene-Feb-Mar-Abr-May-Jun-Jul-Ago-Set-Oct-Nov-Dic'.split('-'),
        week: {
            dow: 1
        }
    })

    if (!localStorage.getItem(`gantt-${props.id}-column-size`)) {

        localStorage.setItem(`gantt-${props.id}-column-size`, `${props.dayWidth}`)
    }

    if (!localStorage.getItem(`gantt-${props.id}-column-fontsize`)) {

        localStorage.setItem(`gantt-${props.id}-column-fontsize`, `${props.options.dayFontSize}`)
    }

    if (!localStorage.getItem(`gantt-${props.id}-show-vertical-borders`)) {

        localStorage.setItem(`gantt-${props.id}-show-vertical-borders`, '1')
    }

    const localPercent = parseFloat(localStorage.getItem(`gantt-${props.id}`) || '0')
    const localColumnSize = parseInt(localStorage.getItem(`gantt-${props.id}-column-size`) || '0', 10)
    const _showVerticalBorders = localStorage.getItem(`gantt-${props.id}-show-vertical-borders`) === '1' ? true : false

    const [ showVerticalBorders, setShowVerticalBorders ] = useState(_showVerticalBorders)

    const [ state, setState ] = useState({
        divisorPosition: localPercent || 40,
        ganttWidth: 0,
        ganttLeft: 0,
        minTableWidthPercent: props.minTableWidthPercent || 20,
        maxTableWidthPercent: props.maxTableWidthPercent || 50,
        dayWidth: localColumnSize || props.dayWidth || 32,
        active: -1,
    })

    const [ showOptions, setShowOptions ] = useState(false)

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

        const scrollDiv = chartBodyRef.current.scrollLeft
        const scrollWidth = chartBodyRef.current.offsetWidth
        const scrollLimit = scrollDiv + scrollWidth

        const itemPosition = x * state.dayWidth

        if ((scrollLimit <= itemPosition) || (scrollDiv > itemPosition)) {

            chartBodyRef.current.scrollLeft = (x ? x - 1 : x) * state.dayWidth
        }

        setState({
            ...state,
            active
        })
    }

    const onChangeWidth = (dayWidth: number) => {

        if (dayWidth === state.dayWidth) {

            return
        }

        localStorage.setItem(`gantt-${props.id}-column-size`, `${dayWidth}`)

        setState({
            ...state,
            dayWidth
        })
    }

    const onToggleBorders = () => {

        localStorage.setItem(`gantt-${props.id}-show-vertical-borders`, showVerticalBorders ? '0' : '1')

        setShowVerticalBorders(!showVerticalBorders)
    }

    return (
        <>
            <div className="gantt-container">
                <GanttToolbar
                    options={props.toolbar}
                    onToggleOptions={() => setShowOptions(true)}
                />
                <div className="gantt"
                    ref={ganttElRef}
                    style={{
                        height: props.options.height
                    }}
                >
                    <div className={'gantt-table'}
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
                                        <div key={i} className={'th' + (showVerticalBorders ? ' with-border' : '')} style={{
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
                                active={state.active}
                                showVerticalBorders={showVerticalBorders}
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
                                    dayWidth={state.dayWidth}
                                    nonWorkingDays={nonWorkingDays}
                                    hideNonWorkingDays={hideNonWorkingDays}
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
                                dayWidth={state.dayWidth}
                                items={props.items}
                                active={state.active}
                                nonWorkingDays={nonWorkingDays}
                                hideNonWorkingDays={hideNonWorkingDays}
                                showVerticalBorders={showVerticalBorders}
                            />
                        </div>
                    </div>
                    <GanttDivisor
                        divisorPosition={state.divisorPosition}
                        onScroll={(newPosition: any) => updateDivisorPosition(newPosition)}
                    />
                    <GanttOptions
                        show={showOptions}
                        onHide={() => setShowOptions(false)}
                        options={{
                            ...props.options,
                            dayWidth: state.dayWidth,
                            dayMinWidth: props.dayMinWidth || props.dayWidth,
                            dayMaxWidth: props.dayMaxWidth || props.dayWidth,
                            onChangeWidth,
                            columns: props.columns,
                            showVerticalBorders,
                            onToggleBorders,
                        }}
                    >
                        <div>
                            {props.sidebar}
                        </div>
                    </GanttOptions>
                </div>
            </div>
        </>
    )
}

export default Gantt
