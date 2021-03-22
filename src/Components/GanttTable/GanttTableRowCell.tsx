
import React, { useEffect, useRef, useState } from 'react'

type Props = {
    column: any,
    item: any,
    onItemClick?: any,
    onToggleCollapse?: any,
    onItemEdit?: any,
    isActive?: boolean,
}

const GanttTableRowCell = (props: Props) => {

    let clicks = 0

    const {
        column,
        item,
    } = props

    const [ editing, setEditing ] = useState(false)
    const [ cell, setCell ] = useState('')
    const [ writing, setWriting ] = useState(false)

    useEffect(() => {

        setCell(item[column.field])
    }, [ item ])

    const item_back = JSON.parse(JSON.stringify(item))

    const input_ref: any = useRef()

    const getClassName = () => {

        let class_name = 'content'

        if (props.item.type === 'group') {

            class_name += ' group'
        }

        if (props.column.editable) {

            class_name += ' editable'
        }

        return class_name
    }

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

        if (!props.isActive) {

            return
        }

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

    const handleBlur = () => {

        if (cell === item[column.field]) {

            setEditing(false)
            return
        }

        updateCell()
    }

    const updateCell = () => {

        item[column.field] = cell

        props.onItemEdit(item, column.field)
        setEditing(false)
    }

    const resetCell = () => {

        setCell(item_back[column.field])
        setEditing(false)
    }

    const onChange = (e: any) => {

        if (writing) {

            setCell(e.currentTarget.value)
        }
    }

    const onKeyDown = () => {

        setWriting(true)
    }

    const onKeyUp = (e: any) => {

        setWriting(false)

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
                <span className={getClassName()} onClick={(e: any) => handleClick(e)}>
                    {column.render ? column.render(cell) : cell}
                </span>
            ): (
                <input
                    ref={input_ref}
                    className="content"
                    type="text"
                    value={cell}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    onBlur={() => handleBlur()}
                    onClick={(e: any) => e.stopPropagation()}
                />
            )}
        </div>
    )
}

export default GanttTableRowCell
