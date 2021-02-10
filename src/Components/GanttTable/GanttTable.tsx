
import React from 'react'

type Props = {
    divisorPosition: any,
}

const GanttTable = (props: Props) => {

    return (
        <div className="gantt-table"
            style={{
                flexBasis: props.divisorPosition
            }}
        >
            GanttTable
        </div>
    )
}

export default GanttTable
