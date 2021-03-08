/*eslint
@typescript-eslint/no-unused-vars: "off"
*/

import React, { useEffect } from 'react'

type Props = {
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    type: string,
}

const GanttArrow = (props: Props) => {

    const isUp = props.fromY > props.toY
    const isDown = props.fromY < props.toY
    const fromStart = props.type === 'start_to_start'
    const fromEnd = props.type === 'end_to_start'
    const toSameOrLeft = props.fromX >= props.toX
    const toRight = props.fromX < props.toX

    let path = ``

    let x = props.fromX
    let y = props.fromY

    if (isDown) {

        if (fromStart) {

            x += 12
        } else if (fromEnd) {

            x -= 12
        }

        y += 26
        path += `M ${x},${y}`

        if (toSameOrLeft) {

            y += 2
            path += ` L ${x},${y}`

            // dobla a la izquierda
            x -= 5
            y += 5
            path += ` a 5 5 0 0 1 -5 5`

            // retrocede hasta el destino
            x = props.toX - 15
            path += ` L ${x},${y}`

            // dobla hacia abajo
            x -= 5
            y += 5
            path += ` a 5 5 0 0 0 -5 5`
        }

        // baja al destino
        y = props.toY + 11
        path += ` L ${x},${y}`

        // dobla al destino
        path += ` a 5 5 0 0 0 5 5`
    } else if (isUp) {

        if (fromStart) {

            x += 12
        } else if (fromEnd) {

            x -= 12
        }

        y += 6
        path += `M ${x},${y}`

        if (toSameOrLeft) {

            y -= 1
            path += ` L ${x},${y}`

            // dobla a la izquierda
            x -= 5
            y -= 5
            path += ` a 5 5 0 0 0 -5 -5`

            // retrocede hasta el destino
            x = props.toX - 15
            path += ` L ${x},${y}`

            // dobla hacia arriba
            x -= 5
            y -= 5
            path += ` a 5 5 0 0 1 -5 -5`
        }

        // sube al destino
        y = props.toY + 21
        path += ` L ${x},${y}`

        // dobla al destino
        path += ` a 5 5 0 0 1 5 -5`
    }

    // llega al destino
    path += ` L ${props.toX + 4},${props.toY + 16}`

    // dibuja la flecha
    path += ` M ${props.toX - 4},${props.toY + 9} L ${props.toX + 3},${props.toY + 16}`
    path += ` M ${props.toX - 4},${props.toY + 22} L ${props.toX + 3},${props.toY + 16}`

    return (
        <path
            className="gantt-arrow"
            d={path}
        />
    )
}

export default GanttArrow
