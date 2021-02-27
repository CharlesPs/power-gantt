
import React from 'react'

import ui_helper from '../../Helpers/UI_helper'

import GanttTableRowCell from './GanttTableRowCell'

type Props = {
    items: any,
    columns: any,
    onToggleCollapse: any,
    onItemClick: any,
    onItemEdit?: any,
}

const GanttTableRows = (props: Props) => {

    return (
        <>
            {props.items.map((item: any, i: number) => (
                <div key={i} className="tr gantt-row"
                    style={{
                        width: ui_helper.getTableWidth(props.columns)
                    }}
                    onClick={() => props.onItemClick(item)}
                >
                    {props.columns.map((column: any, i: number) => (
                        <GanttTableRowCell key={i}
                            column={column}
                            item={item}
                            onToggleCollapse={props.onToggleCollapse}
                            onItemEdit={props.onItemEdit}
                        />
                    ))}
                </div>
            ))}
        </>
    )
}

export default GanttTableRows
