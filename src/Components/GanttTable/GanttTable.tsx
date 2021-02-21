
import React, { useEffect, useRef, useState } from 'react'

import ui_helper from '../../Helpers/UI_helper'

type Props = {
    items: any,
    columns: any,
    divisorPosition: any,
    onScroll: any,
    scrollTop: number,
}

const GanttTable = (props: Props) => {

    const header_ref: any = useRef()
    const body_ref: any = useRef()

    const onHeaderHorizontalScroll = () => {

        // body_ref.current.scrollLeft = header_ref.current.scrollLeft
    }

    const onBodyHorizontalScroll = () => {

        header_ref.current.scrollLeft = body_ref.current.scrollLeft
    }

    const onBodyScroll = (e: any) => {

        onBodyHorizontalScroll()

        props.onScroll(body_ref.current.scrollTop)
    }

    useEffect(() => {

        body_ref.current.scrollTop = props.scrollTop
    }, [ props.scrollTop ])

    return (
        <div className="gantt-table"
            style={{
                flexBasis: props.divisorPosition
            }}
        >
            <div className="header"
            >
                <div className="header-scroll"
                    ref={header_ref}
                    onScroll={onHeaderHorizontalScroll}
                >
                    <div className="tr"
                        style={{
                            width: ui_helper.getTableWidth(props.columns)
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
                ref={body_ref}
                onScroll={onBodyScroll}
            >
                {props.items.map((item: any, i: number) => (
                    <div key={i} className="tr gantt-row"
                        style={{
                            width: ui_helper.getTableWidth(props.columns)
                        }}
                    >
                        {props.columns.map((column: any, i: number) => (
                            <div key={i} className="td"
                                style={{
                                    width: column.width
                                }}
                            >
                                {item[column.field]}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GanttTable
