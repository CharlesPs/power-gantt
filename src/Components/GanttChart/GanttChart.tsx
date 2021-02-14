
import React, { useEffect, useRef } from 'react'

type Props = {
    items: any,
    onScroll: any,
    scrollTop: number,
}

const GanttChart = (props: Props) => {

    const el_ref: any = useRef()

    const onScroll = (e: any) => {

        props.onScroll(el_ref.current.scrollTop)
    }

    useEffect(() => {

        el_ref.current.scrollTop = props.scrollTop
    }, [ props.scrollTop ])

    return (
        <div className="gantt-chart">
            <div className="header">
                GanttHeader
            </div>
            <div id="table-body" className="body"
                ref={el_ref}
                onScroll={onScroll}
            >
                {props.items.map((item: any, i: number) => (
                    <div key={i} className="gantt-row">
                        {item.text}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GanttChart
