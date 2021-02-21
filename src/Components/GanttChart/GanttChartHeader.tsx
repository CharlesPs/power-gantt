
import React from 'react'
import UI_helper from '../../Helpers/UI_helper'

type Props = {
    start: string,
    end: string,
    dayWidth: number,
}

const GanttChartHeader = (props: Props) => {

    const days = UI_helper.getDaysInRange(props.start, props.end)
    const weeks = UI_helper.getWeeksInRange(props.start, props.end)

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
