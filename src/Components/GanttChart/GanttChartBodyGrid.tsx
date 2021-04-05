
import React from 'react'
import GanttChartBodyGridItem from './GanttChartBodyGridItem'

type Props = {
    items: any,
    days: any,
    dayWidth: number,
    active?: number,
    nonWorkingDays?: any,
    showVerticalBorders: boolean,
}

const GridSpecialDays = (props: any) => {

    const isNonWorkingDay = (day_ymd: string) => {

        const match = props.nonWorkingDays.filter((_day: any) => _day === day_ymd)

        return match.length ? true : false
    }

    const getClassName = (day: any) => {

        let className = ''

        if (day.day_of_week === 'D' || isNonWorkingDay(day.ymd)) {

            className = 'grid-sunday'
        } else {

            className = 'grid-day'
        }

        if (props.showVerticalBorders) {

            className += ' with-border'
        }

        return className
    }

    return props.days.map((day: any, i: number) => {

        if (day.today) {
            return (
                <>
                    <rect key={i}
                        className="grid-today"
                        x={i * props.dayWidth}
                        y={0}
                        height={props.items.length * 32}
                        width={props.dayWidth}
                    ></rect>
                    {!props.showVerticalBorders ? null : (
                        <line
                            className="grid-row-line"
                            x1={i * props.dayWidth}
                            y1={0}
                            x2={i * props.dayWidth}
                            y2={props.items.length * 32}
                        />
                    )}
                </>
            )
        }

        return (
            <>
                {day.day_of_week !== 'D' && !isNonWorkingDay(day.ymd) ? null :(
                    <rect key={i}
                        className={getClassName(day)}
                        x={i * props.dayWidth}
                        y={0}
                        height={props.items.length * 32}
                        width={props.dayWidth}
                    ></rect>
                )}
                {!props.showVerticalBorders ? null : (
                    <line
                        className="grid-row-line"
                        x1={i * props.dayWidth}
                        y1={0}
                        x2={i * props.dayWidth}
                        y2={props.items.length * 32}
                    />
                )}
            </>
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
                    showVerticalBorders={props.showVerticalBorders}
                />
            </g>
        </g>
    )
}

export default GanttChartBodyGrid
