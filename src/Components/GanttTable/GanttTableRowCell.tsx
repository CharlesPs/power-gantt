
import React, { useRef, useState } from 'react'

type Props = {
    column: any,
    item: any,
    onItemClick?: any,
    onToggleCollapse?: any,
    onItemEdit?: any,
}

const GanttTableRowCell = (props: Props) => {

    let clicks = 0

    const {
        column,
        item,
    } = props

    const [ editing, setEditing ] = useState(false)
    const [ cell, setCell ] = useState(item[column.field])

    const item_back = JSON.parse(JSON.stringify(item))

    const input_ref: any = useRef()

    const getPadding = () => {

        let left = 4

        if (column.field === 'title') {

            left += item.level * 16
        }

        return left
    }

    const toggleCollapse = (e: any) => {
        e.preventDefault()
        e.stopPropagation()

        props.onToggleCollapse(item._id)
    }

    const handleClick = (e: any) => {

        if (column.editable || column.onClick) {

            e.preventDefault()
            e.stopPropagation()
        }

        if (column.editable || column.onClick) {

            clicks += 1

            setTimeout(() => {

                if (clicks === 1 && column.onClick) {

                    column.onClick(item)
                } else  if (clicks === 2 && column.editable) {

                    setEditing(true)

                    if (input_ref && input_ref.current) {

                        input_ref.current.focus()
                    }
                }

                clicks = 0
            }, 200)
        }
    }

    const updateCell = () => {

        item[column.field] = cell

        props.onItemEdit(item)
        setEditing(false)
    }

    const resetCell = () => {

        setCell(item_back[column.field])
        setEditing(false)
    }

    const checkEnterOrEscape = (e: any) => {

        if (e.keyCode === 13) {

            updateCell()
        } else if (e.keyCode === 27) {

            resetCell()
        }
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
                            onClick={(e: any) => toggleCollapse(e)}
                        >
                            ‣
                        </span>
                    )}
                </>
            )}
            {!editing ? (
                <span className={`content ${!column.editable ? '' : 'editable'}`} onClick={(e: any) => handleClick(e)}>
                    {column.render ? column.render(item[column.field]) : item[column.field]}
                </span>
            ): (
                <input
                    ref={input_ref}
                    className="content"
                    type="text"
                    value={cell}
                    onChange={(e: any) => setCell(e.currentTarget.value)}
                    onKeyUp={(e: any) => checkEnterOrEscape(e)}
                    onBlur={() => updateCell()}
                    onClick={(e: any) => e.stopPropagation()}
                />
            )}
        </div>
    )
}

export default GanttTableRowCell
