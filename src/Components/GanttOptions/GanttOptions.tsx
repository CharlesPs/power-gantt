
import React from 'react'

type Props = {
    show: boolean,
    options: any,
    onChangeWidth: any,
}

const GanttOptions = (props: Props) => {

    const defaultOptions = {
        buttonClassName: 'btn btn-default',
        showWidthButtons: false
    }

    const options = Object.assign(defaultOptions, props.options)

    const lessDayWidth = (e: any) => {
        e.preventDefault()

        const newDayWidth = options.dayWidth - 4

        if (newDayWidth >= options.dayMinWidth) {

            props.onChangeWidth(newDayWidth)
        }
    }

    const moreDayWidth = (e: any) => {
        e.preventDefault()

        const newDayWidth = options.dayWidth + 4

        if (newDayWidth <= options.dayMaxWidth) {

            props.onChangeWidth(newDayWidth)
        }
    }

    return (
        <div className={`gantt-options ${!props.show ? '' : 'open'}`}>
            <form>
                {!options.showWidthButtons ? null : (
                    <div className="form-group">
                        <label htmlFor="">Ancho de columnas</label>
                        <div>
                            <div className="btn-group">
                                <button className={options.buttonClassName} onClick={lessDayWidth}>
                                    <i className="fas fa-fw fa-minus"></i> Más pequeñas
                                </button>
                                <button className={options.buttonClassName} onClick={moreDayWidth}>
                                    <i className="fas fa-fw fa-plus"></i> Más grandes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default GanttOptions
