
import React from 'react'

type Props = {
    column: any,
    item: any,
    onItemClick?: any,
    onToggleCollapse?: any,
}

const GanttTableRowCell = (props: Props) => {

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
            <span className={`content ${column.field !== 'title' ? '' : 'clickable'}`} onClick={() => props.onItemClick(item)}>
                {column.render ? column.render(item[column.field]) : item[column.field]}
            </span>
        </div>
    )
}

export default GanttTableRowCell
