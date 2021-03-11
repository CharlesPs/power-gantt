
import React from 'react'

type Props = {
    options?: any,
    dayWidth: number,
    minDayWidth: number,
    maxDayWidth: number,
    onChangeWidth: any,
}

const GanttToolbar = (props: Props) => {

    const defaultOptions = {
        enabled: true,
        buttonClassName: 'btn btn-default',
        left: [],
        right: {
            showWidthButtons: false
        }
    }

    const options = Object.assign(defaultOptions, props.options)

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
            {!options.enabled ? null : (
                <div className="gantt-toolbar">
                    <div className="toolbar-left">
                        {!options.left ? null : (
                            <>
                                {options.left.map((button: any, i: number) => (
                                    <button key={i}
                                        className={options.buttonClassName}
                                        onClick={button.onClick}
                                        style={{ marginRight: 4 }}
                                    >
                                        {button.icon} {button.text}
                                    </button>
                                ))}
                            </>
                        )}
                    </div>
                    <div className="toolbar-right">
                        {!options.right.showWidthButtons ? null : (
                            <div className="btn-group">
                                <button className={options.buttonClassName} onClick={lessDayWidth}>
                                    <i className="fas fa-minus"></i>
                                </button>
                                <button className={options.buttonClassName} onClick={moreDayWidth}>
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default GanttToolbar
