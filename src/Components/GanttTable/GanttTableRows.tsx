
import React from 'react'

import ui_helper from '../../Helpers/UI_helper'

type Props = {
    items: any,
    columns: any,
    onToggleCollapse: any,
    onItemClick?: any,
}

const Column = (props: any) => {

    const {
        column,
        item,
    } = props

    const getPadding = () => {

        let left = 4

        if (column.field === 'title') {

            left += item.level * 16
        }

        return left
    }

    return (
        <div className="td"
            style={{
                width: column.width,
                paddingLeft: getPadding()
            }}
        >
            {column.field !== 'title' ? null : (
                <>
                    {item.type === 'task' ? <span className="fake-icon"></span> : (
                        <span
                            className={`icon ${item.collapseStatus === 'collapsed' ? 'collapsed' : 'expanded'}`}
                            onClick={() => props.onToggleCollapse(item._id)}
                        >
                            ‣
                        </span>
                    )}
                </>
            )}
            <span className="content" onClick={() => props.onItemClick(item)}>
                {column.render ? column.render(item[column.field]) : item[column.field]}
            </span>
        </div>
    )
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
                        <Column key={i}
                            column={column}
                            item={item}
                            onToggleCollapse={props.onToggleCollapse}
                            onItemClick={props.onItemClick}
                        />
                    ))}
                </div>
            ))}
        </>
    )
}

export default GanttTableRows
