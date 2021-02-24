
import React from 'react'

import ui_helper from '../../Helpers/UI_helper'

type Props = {
    items: any,
    columns: any,
}

const GanttTableRows = (props: Props) => {

    return (
        <>
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
                            {column.render ? column.render(item[column.field]) : item[column.field]}
                        </div>
                    ))}
                </div>
            ))}
        </>
    )
}

export default GanttTableRows
