
import React from 'react'
import GanttChartBodyGridItem from './GanttChartBodyGridItem'

type Props = {
    items: any,
    days: any,
    dayWidth: number,
}

const GridSpecialDays = (props: any) => {

    return props.days.map((day: any, i: number) => {

        if (day.today) {
            return (
                <rect key={i}
                    className="grid-today"
                    x={i * props.dayWidth}
                    y={0}
                    height={props.items.length * 32}
                    width={props.dayWidth}
                ></rect>
            )
        }

        return day.day_of_week !== 'D' ? null : (
            <rect key={i}
                className="grid-sunday"
                x={i * props.dayWidth}
                y={0}
                height={props.items.length * 32}
                width={props.dayWidth}
            ></rect>
        )
    })
}

const GanttChartBodyGrid = (props: Props) => {

    return (
        <g id="chart-grid">
            <g id="grid-sundays">
                <GridSpecialDays days={props.days} items={props.items} dayWidth={props.dayWidth} />
            </g>
            <g id="grid-rows">
                {props.items.map((item: any, i: number) => {

                    if (i === (props.items.length - 1)) {

                        return null
                    }

                    return (
                        // hacer grid para los domingos y feriados y today
                        <GanttChartBodyGridItem key={i}
                            x={i}
                            y={i}
                            item={item}
                            chartWidth={(props.days.length * props.dayWidth) + 17}
                            dayWidth={props.dayWidth}
                        />
                    )
                })}
            </g>
        </g>
    )
}

export default GanttChartBodyGrid
