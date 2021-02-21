
import React, { useEffect, useRef, useState } from 'react'
import GanttChartBody from './GanttChartBody'
import GanttChartHeader from './GanttChartHeader'

type Props = {
    start: string,
    end: string,
    items: any,
    onScroll: any,
    scrollTop: number,
    dayWidth: number,
}

const GanttChart = (props: Props) => {

    const header_ref: any = useRef()
    const body_ref: any = useRef()

    const onBodyScroll = (e: any) => {

        header_ref.current.scrollLeft = body_ref.current.scrollLeft

        props.onScroll(body_ref.current.scrollTop)
    }

    useEffect(() => {

        body_ref.current.scrollTop = props.scrollTop
    }, [ props.scrollTop ])

    return (
        <div className="gantt-chart">
            <div className="header">
                <div className="header-scroll"
                    ref={header_ref}
                >
                    <GanttChartHeader
                        start={props.start}
                        end={props.end}
                        dayWidth={props.dayWidth}
                    />
                </div>
            </div>
            <div id="table-body" className="body"
                ref={body_ref}
                onScroll={onBodyScroll}
            >
                <GanttChartBody
                    start={props.start}
                    end={props.end}
                    dayWidth={props.dayWidth}
                    items={props.items}
                />
            </div>
        </div>
    )
}

export default GanttChart
