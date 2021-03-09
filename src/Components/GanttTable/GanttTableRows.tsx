
import React from 'react'

import ui_helper from '../../Helpers/UI_helper'

import GanttTableRowCell from './GanttTableRowCell'

type Props = {
    items: any,
    columns: any,
    onToggleCollapse: any,
    onItemClick: any,
    onItemEdit?: any,
    onItemHover?: any,
    hover?: any,
    active?: any,
}

const GanttTableRows = (props: Props) => {

    const items = props.items.map((item: any) => {

        if (item.type === 'group') {

            const durationAndProgress = ui_helper.getGroupDurationAndProgress(item.items)

            item.startsAt = durationAndProgress.startsAt
            item.endsAt = durationAndProgress.endsAt
        }

        return item
    })


    const getClassName = (i: number) => {

        let className = "tr gantt-row"

        if (props.hover === i) {

            className += " hover"
        }

        if (props.active === i) {

            className += " active"
        }

        return className
    }

    return (
        <>
            {items.map((item: any, i: number) => (
                <div key={i} className={getClassName(i)}
                    // onMouseOver={() => props.onItemHover(i)}
                    style={{
                        width: ui_helper.getTableWidth(props.columns)
                    }}
                    onClick={() => props.onItemClick(item, i)}
                >
                    {props.columns.map((column: any, j: number) => (
                        <GanttTableRowCell key={j}
                            column={column}
                            item={item}
                            onToggleCollapse={props.onToggleCollapse}
                            onItemEdit={props.onItemEdit}
                            isActive={props.active === i}
                        />
                    ))}
                </div>
            ))}
        </>
    )
}

export default GanttTableRows
