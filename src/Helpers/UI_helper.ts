/*eslint
array-callback-return: "off"
*/

import { RELATION_TYPES } from './Constants'

import moment from 'moment'

const dow: any = 'D-L-M-M-J-V-S'.split('-')

export const getTableWidth = (columns: any) => {

    const anchos = columns.map((column: any) => column.width)

    return anchos.reduce((suma: number, valor: number) => suma + valor)
}

export const getDaysInRange = (start: string, end: string, hideNonWorkingDays: boolean = false) => {

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
            dmy: day.format('DD/MM/YYYY'),
            y: day.format('YYYY')
        })

        day.add(1, 'day')
    }

    return days
}

export const getDaysInRangeWithoutNonWorkingDays = (start: string, end: string, nonWorkingDays: any) => {

    const days = []

    const day = moment(start)

    while (day.isSameOrBefore(end)) {

        const ymd = day.format('YYYY-MM-DD')

        if (!nonWorkingDays.includes(ymd) && day.format('d') !== '0') {

            days.push({
                moment: day.clone(),
                today: day.isSame(moment().format('YYYY-MM-DD')),
                week_of_year: day.format('w'),
                day_of_week: dow[day.format('d')],
                day_of_month: day.date(),
                ymd,
                dmy: day.format('DD/MM/YYYY'),
                y: day.format('YYYY')
            })
        }

        day.add(1, 'day')
    }

    return days
}

export const getWeeksInRange = (start: string, end: string) => {

    const days = getDaysInRange(start, end)

    const weeks_str: any = []
    const weeks: any = []

    days.map((day: any) => {

        const pos = weeks_str.indexOf(`${day.week_of_year}-${day.y}`)

        if (pos === -1) {

            weeks_str.push(`${day.week_of_year}-${day.y}`)

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

export const getWeeksInRangeWithoutNonWorkingDays = (start: string, end: string, nonWorkingDays: any) => {

    const days = getDaysInRangeWithoutNonWorkingDays(start, end, nonWorkingDays)

    const weeks_str: any = []
    const weeks: any = []

    days.map((day: any) => {

        const pos = weeks_str.indexOf(`${day.week_of_year}-${day.y}`)

        if (pos === -1) {

            weeks_str.push(`${day.week_of_year}-${day.y}`)

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

export const getDayPositionWithoutNonWorkingDays = (ganttStart: string, itemStart: string, nonWorkingDays: any) => {

    const day = moment(itemStart)

    let x = 0

    if (day.isBefore(ganttStart)) {

        while (day.isBefore(ganttStart)) {

            x -= 1

            day.add(1, 'day')
        }
    } else if (day.isAfter(ganttStart)) {

        while (day.isAfter(ganttStart)) {

            if (!nonWorkingDays.includes(day.format('YYYY-MM-DD')) && day.format('d') !== '0') {

                x += 1
            }

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

export const getDaysLengthWithoutNonWorkingDays = (start: string, end: string, nonWorkingDays: any) => {

    let len = 0

    const day = moment(start)

    while(day.isSameOrBefore(end)) {

        if (!nonWorkingDays.includes(day.format('YYYY-MM-DD')) && day.format('d') !== '0') {

            len += 1
        }

        day.add(1, 'day')
    }

    return len
}

export const getRelations = (items: any) => {

    const relations: any = []

    const obj_items: any = {}

    items.map((item: any, i: number) => {

        if (item.type === 'task') {

            const is_valid_task = item.task_type !== 'hito' && item.startsAt !== null && item.endsAt !== null
            const is_valid_hito = item.task_type === 'hito' && item.startsAt !== null

            if (is_valid_hito || is_valid_task) {

                obj_items[item.task_id] = { item, i }
            }
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

            if (_item.item.task_type === 'hito') {

                relations.push({
                    fromDay: _item.item.startsAt,
                    fromRow: _item.i,
                    toDay: related.item.startsAt,
                    toRow: related.i,
                    type: RELATION_TYPES.diamond_to_item
                })

                return
            }

            if (relation.type === RELATION_TYPES.start_to_start) {

                relations.push({
                    fromDay: _item.item.startsAt,
                    fromRow: _item.i,
                    toDay: related.item.startsAt,
                    toRow: related.i,
                    type: relation.type
                })
            } else if (relation.type === RELATION_TYPES.end_to_start) {

                relations.push({
                    fromDay: _item.item.endsAt,
                    fromRow: _item.i,
                    toDay: related.item.startsAt,
                    toRow: related.i,
                    type: relation.type
                })
            }
        })
    })

    return relations
}

export const getGroupDuration = (items0: any) => {

    let startsAt: any
    let endsAt: any

    items0.map((item1: any) => {

        if (item1.type === 'task') {

            if (!startsAt) {

                startsAt = item1.task.startsAt
            } else {

                if (moment(item1.task.startsAt).isBefore(startsAt)) {

                    startsAt = item1.task.startsAt
                }
            }

            if (!endsAt) {

                endsAt = item1.task.endsAt
            } else {

                if (moment(item1.task.endsAt).isAfter(endsAt)) {

                    endsAt = item1.task.endsAt
                }
            }
        } else {

            item1.group.items.map((item2: any) => {

                if (item2.type === 'task') {

                    if (!startsAt) {

                        startsAt = item2.task.startsAt
                    } else {

                        if (moment(item2.task.startsAt).isBefore(startsAt)) {

                            startsAt = item2.task.startsAt
                        }
                    }

                    if (!endsAt) {

                        endsAt = item2.task.endsAt
                    } else {

                        if (moment(item2.task.endsAt).isAfter(endsAt)) {

                            endsAt = item2.task.endsAt
                        }
                    }
                }
            })
        }
    })

    return { startsAt, endsAt }
}

export const getGroupProgress = (items0: any) => {

    let progress: number = 0
    let progress_counter = 0

    items0.map((item1: any) => {

        if (item1.type === 'task') {

            progress += item1.task.progress
            progress_counter += 1
        } else {

            item1.group.items.map((item2: any) => {

                if (item2.type === 'task') {

                    progress += item2.task.progress
                    progress_counter += 1
                }
            })
        }
    })

    return progress / progress_counter
}

export const hasGroupsInside = (items0: any) => {

    let hasGroupsInside = false

    items0.map((item1: any) => {

        if (item1.type === 'group') {

            hasGroupsInside = true
        }
    })

    return hasGroupsInside
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
                text: item0.bar_short_text,
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
                        text: item0.bar_short_text,
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
    getDaysInRangeWithoutNonWorkingDays,
    getWeeksInRange,
    getWeeksInRangeWithoutNonWorkingDays,
    getDayPosition,
    getDayPositionWithoutNonWorkingDays,
    getDaysLength,
    getDaysLengthWithoutNonWorkingDays,
    getRelations,
    getGroupDuration,
    getGroupProgress,
    hasGroupsInside,
    getGroupBars,
}
