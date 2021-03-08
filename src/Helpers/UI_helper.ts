/*eslint
array-callback-return: "off"
*/

import moment from 'moment'

const dow: any = 'D-L-M-M-J-V-S'.split('-')

export const getTableWidth = (columns: any) => {

    const anchos = columns.map((column: any) => column.width)

    return anchos.reduce((suma: number, valor: number) => suma + valor)
}

export const getDaysInRange = (start: string, end: string) => {

    const days = []

    const day = moment(start)

    while (day.isSameOrBefore(end)) {

        days.push({
            moment: day.clone(),
            today: day.isSame(moment().format('YYYY-MM-DD')),
            week_of_year: day.format('w'),
            day_of_week: dow[day.format('d')],
            day_of_month: day.date(),
            ymd: day.format('YYYY-MM-DD'),
            dmy: day.format('DD/MM/YYYY')
        })

        day.add(1, 'day')
    }

    return days
}

export const getWeeksInRange = (start: string, end: string) => {

    const days = getDaysInRange(start, end)

    const weeks_str: any = []
    const weeks: any = []

    days.map((day: any) => {

        const pos = weeks_str.indexOf(day.week_of_year)

        if (pos === -1) {

            weeks_str.push(day.week_of_year)

            weeks.push({
                first_day: day.moment.format('D MMM YYYY'),
                days: 1
            })
        } else {

            weeks[pos].days += 1
        }

        return weeks
    })

    return weeks
}

export const getDayPosition = (ganttStart: string, itemStart: string) => {

    const day = moment(itemStart)

    let x = 0

    if (day.isBefore(ganttStart)) {

        while (day.isBefore(ganttStart)) {

            x -= 1

            day.add(1, 'day')
        }
    } else if (day.isAfter(ganttStart)) {

        while (day.isAfter(ganttStart)) {

            x += 1

            day.subtract(1, 'day')
        }
    }

    return x
}

export const getDaysLength = (start: string, end: string) => {

    let len = 0

    const day = moment(start)

    while(day.isSameOrBefore(end)) {

        len += 1

        day.add(1, 'day')
    }

    return len
}

export const getRelations = (items: any) => {

    const relations: any = []

    const obj_items: any = {}

    items.map((item: any, i: number) => {

        if (item.type === 'task') {

            obj_items[item.task_id] = { item, i }
        } else {

            if (item.collapseStatus === 'collapsed') {

                console.log(item.bars)
            }
        }
    })

    Object.values(obj_items).map((_item: any) => {

        if (!_item.item.relations) {

            return
        }

        _item.item.relations.map((relation: any) => {

            const related = obj_items[relation.task_id]

            if (!related) {

                return
            }

            if (relation.type === 'start_to_start') {

                relations.push({
                    fromDay: _item.item.startsAt,
                    fromRow: _item.i,
                    toDay: related.item.startsAt,
                    toRow: related.i,
                    type: relation.type
                })
            } else if (relation.type === 'end_to_start') {

                relations.push({
                    fromDay: _item.item.endsAt,
                    fromRow: _item.i,
                    toDay: related.item.startsAt,
                    toRow: related.i,
                    type: 'end_to_start'
                })
            }
        })
    })

    return relations
}

export const getGroupDurationAndProgress = (items: any) => {

    let startsAt: any
    let endsAt: any
    let progress: number = 0
    let progress_counter = 0

    items.map((item0: any) => {

        if (item0.type === 'task') {

            if (!startsAt) {

                startsAt = item0.task.startsAt
            } else {

                if (moment(item0.task.startsAt).isBefore(startsAt)) {

                    startsAt = item0.task.startsAt
                }
            }

            progress += item0.task.progress
            progress_counter += 1

            if (!endsAt) {

                endsAt = item0.task.endsAt
            } else {

                if (moment(item0.task.endsAt).isAfter(endsAt)) {

                    endsAt = item0.task.endsAt
                }
            }
        } else {

            item0.group.items.map((item1: any) => {

                if (item1.type === 'task') {

                    if (!startsAt) {

                        startsAt = item1.task.startsAt
                    } else {

                        if (moment(item1.task.startsAt).isBefore(startsAt)) {

                            startsAt = item1.task.startsAt
                        }
                    }

                    progress += item1.task.progress
                    progress_counter += 1

                    if (!endsAt) {

                        endsAt = item1.task.endsAt
                    } else {

                        if (moment(item1.task.endsAt).isAfter(endsAt)) {

                            endsAt = item1.task.endsAt
                        }
                    }
                }
            })
        }
    })

    return { startsAt, endsAt, progress: progress / progress_counter }
}

export const getGroupBars = (items: any) => {

    const bars: any = []

    items.map((item0: any) => {

        if (item0.type === 'task') {

            bars.push({
                task_id: item0.task._id,
                startsAt: item0.task.startsAt,
                endsAt: item0.task.endsAt,
                color: item0.color,
                progress: item0.task.progress,
                relations: item0.task.relations,
            })
        } else {

            item0.group.items.map((item1: any) => {

                if (item1.type === 'task') {

                    bars.push({
                        task_id: item1.task._id,
                        startsAt: item1.task.startsAt,
                        endsAt: item1.task.endsAt,
                        color: item1.color,
                        progress: item1.task.progress,
                        relations: item1.task.relations,
                    })
                }
            })
        }
    })

    return bars
}

export default {
    getTableWidth,
    getDaysInRange,
    getWeeksInRange,
    getDayPosition,
    getDaysLength,
    getRelations,
    getGroupDurationAndProgress,
    getGroupBars,
}
