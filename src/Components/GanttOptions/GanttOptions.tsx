
import React, { useRef, useEffect } from 'react'

type Props = {
    show: boolean,
    onHide: any,
    options: any,
    children?: any,
    // onChangeWidth: any,
}

const GanttOptions = (props: Props) => {

    const optionsRef: any = useRef(null)

    const defaultOptions = {
        showWidthButtons: false,
        showVerticalBorders: false,
    }

    const options = Object.assign(defaultOptions, props.options)

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

    useEffect(() => {

        const handleClickOutside = (e: any) => {

            if (optionsRef.current && !optionsRef.current.contains(e.target)) {

                props.onHide()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [ optionsRef ])

    return (
        <div className={`gantt-options ${!props.show ? '' : 'open'}`}
            ref={optionsRef}
        >
            <div>
                {!options.showWidthButtons ? null : (
                    <div className="form-group">
                        <label htmlFor="">Ancho de columnas</label>
                        <div className="btn-group">
                            <button className={options.buttonClassName} onClick={lessDayWidth}>
                                <i className="fas fa-fw fa-minus"></i> Más pequeñas
                            </button>
                            <button className={options.buttonClassName} onClick={moreDayWidth}>
                                <i className="fas fa-fw fa-plus"></i> Más grandes
                            </button>
                        </div>
                    </div>
                )}
                <div className="form-group">
                    <div className="form-check mb-1">
                        <input className="form-check-input"
                            type="checkbox"
                            checked={options.showVerticalBorders ? true : false}
                            onChange={options.onToggleBorders}
                            id="defaultCheck1"
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Mostrar bordes verticales
                        </label>
                    </div>
                </div>
                {props.children}
            </div>
        </div>
    )
}

export default GanttOptions
