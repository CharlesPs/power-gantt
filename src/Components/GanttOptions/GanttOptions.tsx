
import React from 'react'

type Props = {
    show: boolean,
    options: any,
    // onChangeWidth: any,
}

const GanttOptions = (props: Props) => {

    const lessDayWidth = (e: any) => {
        e.preventDefault()

        const newDayWidth = props.options.dayWidth - 4

        if (newDayWidth >= props.options.dayMinWidth) {

            props.options.onChangeWidth(newDayWidth)
        }
    }

    const moreDayWidth = (e: any) => {
        e.preventDefault()

        const newDayWidth = props.options.dayWidth + 4

        if (newDayWidth <= props.options.dayMaxWidth) {

            props.options.onChangeWidth(newDayWidth)
        }
    }

    return (
        <div className={`gantt-options ${!props.show ? '' : 'open'}`}>
            <form>
                {!props.options.showWidthButtons ? null : (
                    <div className="form-group">
                        <label htmlFor="">Ancho de columnas</label>
                        <div>
                            <div className="btn-group">
                                <button className={props.options.buttonClassName} onClick={lessDayWidth}>
                                    <i className="fas fa-fw fa-minus"></i> Más pequeñas
                                </button>
                                <button className={props.options.buttonClassName} onClick={moreDayWidth}>
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
