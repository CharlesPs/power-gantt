
import React, { useState } from 'react'

type Props = {
    divisorPosition: any,
    onScroll: any,
}

const GanttDivisor = (props: Props) => {

    const [ state, setState ] = useState({
        dragging: false,
    })

    const onMouseDown = () => {

        setState({
            ...state,
            dragging: true
        })
    }

    const onMouseMove = (e: any) => {

        if (state.dragging) {

            props.onScroll(e.pageX)
        }
    }

    const onTouchMove = (e: any) => {

        if (state.dragging) {

            props.onScroll(e.targetTouches[0].pageX)
        }
    }

    const onMouseUp = () => {

        setState({
            ...state,
            dragging: false
        })
    }

    return (
        <>
            <div className="gantt-divisor-backdrop"
                style={{
                    display: state.dragging ? 'block' : 'none'
                }}
                onMouseMove={(e: any) => onMouseMove(e)}
                onMouseUp={(e: any) => onMouseUp()}
                onTouchMove={onTouchMove}
                onTouchEnd={(e: any) => onMouseUp()}
            ></div>
            <div className="gantt-divisor"
                onMouseDown={(e: any) => onMouseDown()}
                onMouseUp={(e: any) => onMouseUp()}
                onTouchStart={(e: any) => onMouseDown()}
                onTouchMove={onTouchMove}
                onTouchEnd={(e: any) => onMouseUp()}
                onContextMenu={(e: any) => e.preventDefault()}
            >
                <div className="divisor-bar">
                    <div className="divisor-dots">
                        <div className="divisor-dot"></div>
                        <div className="divisor-dot"></div>
                        <div className="divisor-dot"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GanttDivisor
