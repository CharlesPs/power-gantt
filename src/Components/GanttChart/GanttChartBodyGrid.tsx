
import React from 'react'
import GanttChartBodyGridItem from './GanttChartBodyGridItem'

type Props = {
    items: any,
    days: any,
    dayWidth: number,
    active?: number,
    nonWorkingDays?: any,
}

const GridSpecialDays = (props: any) => {

    const isNonWorkingDay = (day_ymd: string) => {

        const match = props.nonWorkingDays.filter((_day: any) => _day === day_ymd)

        return match.length ? true : false
    }

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

        return (day.day_of_week !== 'D' && !isNonWorkingDay(day.ymd)) ? null : (
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
            <g id="grid-rows">
                {props.items.map((item: any, i: number) => {

                    return (
                        <GanttChartBodyGridItem key={i}
                            i={i}
                            x={i}
                            y={i}
                            item={item}
                            chartWidth={(props.days.length * props.dayWidth) + 17}
                            dayWidth={props.dayWidth}
                            isActive={props.active === i}
                        />
                    )
                })}
            </g>
            <g id="grid-sundays">
                <GridSpecialDays
                    days={props.days}
                    items={props.items}
                    dayWidth={props.dayWidth}
                    nonWorkingDays={props.nonWorkingDays}
                />
            </g>
        </g>
    )
}

export default GanttChartBodyGrid
