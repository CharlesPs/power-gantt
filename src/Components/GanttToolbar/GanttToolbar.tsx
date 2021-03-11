
import React from 'react'

type Props = {
    dayWidth: number,
    minDayWidth: number,
    maxDayWidth: number,
    onChangeWidth: any,
}

const GanttToolbar = (props: Props) => {

    const lessDayWidth = () => {

        const newDayWidth = props.dayWidth - 4

        if (newDayWidth >= props.minDayWidth) {

            props.onChangeWidth(newDayWidth)
        }
    }

    const moreDayWidth = () => {

        const newDayWidth = props.dayWidth + 4

        if (newDayWidth <= props.maxDayWidth) {

            props.onChangeWidth(newDayWidth)
        }
    }

    return (
        <>
            <div className="gantt-toolbar">
                <div className="toolbar-left"></div>
                <div className="toolbar-right">
                    <div className="btn-group">
                        <button className="btn btn-default" onClick={lessDayWidth}>
                            <i className="fas fa-minus"></i>
                        </button>
                        <button className="btn btn-default" onClick={moreDayWidth}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GanttToolbar
