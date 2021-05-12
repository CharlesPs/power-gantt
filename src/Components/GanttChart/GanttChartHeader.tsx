
import React from 'react'
import UI_helper from '../../Helpers/UI_helper'

type Props = {
    start: string,
    end: string,
    dayWidth: number,
    nonWorkingDays?: any,
    hideNonWorkingDays?: boolean,
}

const GanttChartHeader = (props: Props) => {


    let days: any = []
    let weeks: any = []

    if (props.hideNonWorkingDays) {

        days = UI_helper.getDaysInRangeWithoutNonWorkingDays(props.start, props.end, props.nonWorkingDays)
        weeks = UI_helper.getWeeksInRangeWithoutNonWorkingDays(props.start, props.end, props.nonWorkingDays)
    } else {

        days = UI_helper.getDaysInRange(props.start, props.end)
        weeks = UI_helper.getWeeksInRange(props.start, props.end)
    }


    const isNonWorkingDay = (day_ymd: string) => {

        const match = props.nonWorkingDays.filter((_day: any) => _day === day_ymd)

        return match.length ? true : false
    }

    return (
        <>
            <div className="tr"
                style={{
                    width: (days.length * props.dayWidth) + 17
                }}
            >
                {weeks.map((week: any, i: number) => (
                    <div key={i}
                        className="th-week th"
                        style={{
                            width: week.days * props.dayWidth
                        }}
                    >
                        {week.first_day}
                    </div>
                ))}
            </div>
            <div className="tr"
                style={{
                    width: (days.length * props.dayWidth) + 17
                }}
            >
                {days.map((day: any, i: number) => (
                    <div key={i}
                        className={
                            [
                                'th-day',
                                'th',
                                isNonWorkingDay(day.ymd) ? 'th-dark' : '',
                                day.day_of_week === 'D' ? 'th-dark' : '',
                                day.today ? 'th-today' : ''
                            ].join(' ')
                        }
                        style={{
                            width: props.dayWidth
                        }}
                    >
                        {day.day_of_week}
                    </div>
                ))}
            </div>
            <div className="tr"
                style={{
                    width: (days.length * props.dayWidth) + 17
                }}
            >
                {days.map((day: any, i: number) => (
                    <div key={i}
                    className={
                        [
                            'th-day-month',
                            'th',
                            isNonWorkingDay(day.ymd) ? 'th-dark' : '',
                            day.day_of_week === 'D' ? 'th-dark' : '',
                            day.today ? 'th-today' : ''
                        ].join(' ')
                    }
                    style={{
                        width: props.dayWidth
                    }}
                >
                        {day.day_of_month}
                    </div>
                ))}
            </div>
        </>
    )
}

export default GanttChartHeader
