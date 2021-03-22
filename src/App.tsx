/*eslint
array-callback-return: "off",
@typescript-eslint/no-unused-vars: "off"
*/

import React, { useState } from 'react';

import Gantt from './Components/Gantt/Gantt'

import moment from 'moment'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const App = () => {

    const [ colorsTo, setColorsTo ] = useState('status')

    const statusStrings: any = {
        atrasada: 'Atrasada',
        pendiente: 'Pendiente',
        liberada: 'Liberada',
        completada: 'Completada',
        activa: 'Activa',
        activa_atrasada: 'Activa atrasada',
    }

    const statusColors: any = {
        atrasada: '#FF0000',
        pendiente: '#093763',
        liberada: '#200ab9',
        completada: '#B7B7B7',
        activa: '#34A854',
        activa_atrasada: '#980001',
    }

    const codesColors: any = {
        'red': '#FF0000',
        'green': '#00FF00',
        'blue': '#0000FF',
        'black': '#000000',
        'gray': '#666666'
    }

    const getTaskItem = (item: any, level: number, colorsTo: string) => {

        return {
            _id: item._id,
            pos: item.pos,
            level,
            type: 'task',
            task_id: item.task._id,
            task_type: item.task.type,
            title: item.task.name,
            color: colorsTo === 'status' ? statusColors[item.task.status] : codesColors[item.task.code],
            status: statusStrings[item.task.status],
            execute_days: item.task.execute_days,
            startsAt: item.task.startsAt,
            endsAt: item.task.endsAt,
            progress: item.task.progress,
            unit: item.task.unit,
            metered: item.task.metered,
            performance: item.task.performance,
            crew_number: item.task.crewNumber,
            estimated_days: item.task.estimatedDays,
            relations: item.task.relations
        }
    }

    const getGroupItem = (item: any, level: number, colorsTo: string) => {

        return {
            _id: item._id,
            pos: item.pos,
            level,
            type: 'group',
            group_id: item.group._id,
            collapseStatus: item.collapseStatus,
            title: item.group.name,
            items: item.group.items.map((item: any) => {

                if (item.type === 'task') {

                    item.color = colorsTo === 'status' ? statusColors[item.task.status] : codesColors[item.task.code]
                }

                return item
            }),
        }
    }

    const getGanttItems = (items: any, colorsTo: string) => {

        const ganttItems: any = []

        items.map((itemLevel0: any) => {

            if (itemLevel0.type === 'task') {

                const task = getTaskItem(itemLevel0, 0, colorsTo)

                ganttItems.push(task)
            } else {

                const group = getGroupItem(itemLevel0, 0, colorsTo)

                ganttItems.push(group)

                if (itemLevel0.collapseStatus === 'collapsed') {

                    return
                }

                itemLevel0.group.items.map((itemLevel1: any) => {

                    if (itemLevel1.type === 'task') {

                        const task = getTaskItem(itemLevel1, 1, colorsTo)

                        ganttItems.push(task)
                    } else {

                        const group = getGroupItem(itemLevel1, 1, colorsTo)

                        ganttItems.push(group)

                        if (itemLevel1.collapseStatus === 'collapsed') {

                            return
                        }

                        itemLevel1.group.items.map((itemLevel2: any) => {

                            if (itemLevel2.type === 'task') {

                                const task = getTaskItem(itemLevel2, 2, colorsTo)

                                ganttItems.push(task)
                            }
                        })
                    }
                })
            }
        })

        return ganttItems
    }

    const toggleCollapse = (item_id: any) => {

        const newItems = state.items.map((itemLevel0: any) => {

            if (itemLevel0.type === 'group') {

                if (itemLevel0._id === item_id) {

                    itemLevel0.collapseStatus = itemLevel0.collapseStatus === 'collapsed' ? 'expanded' : 'collapsed'
                } else {

                    itemLevel0.group.items = itemLevel0.group.items.map((itemLevel1: any) => {

                        if (itemLevel1.type === 'group') {

                            if (itemLevel1._id === item_id) {

                                itemLevel1.collapseStatus = itemLevel1.collapseStatus === 'collapsed' ? 'expanded' : 'collapsed'
                            }
                        }

                        return itemLevel1
                    })
                }
            }

            return itemLevel0
        })

        setState({
            ...state,
            items: newItems,
            ganttItems: getGanttItems(newItems, colorsTo)
        })
    }

    const onItemEdit = (item: any, field: string) => {

        console.log('onItemEdit', field, item)
    }

    const items: any = [
        {
            _id: 'itemG1',
            type: 'group',
            pos: 1,
            collapseStatus: 'expanded',
            group: {
                _id: 'group1',
                name: 'Base',
                items: [
                    {
                        _id: 'itemG1T1',
                        type: 'task',
                        pos: '1.01',
                        task: {
                            _id: 'item0',
                            name: 'Comprar materiales',
                            execute_days: 2,
                            startsAt: '2021-02-01',
                            endsAt: '2021-02-03',
                            progress: 10,
                            unit: 'Metros',
                            metered: 1,
                            performance: 2,
                            crewNumber: 3,
                            estimatedDays: 4,
                            status: 'pendiente',
                            code: 'green',
                            relations: [
                                {
                                    type: 'end_to_start',
                                    task_id: 'itemasd'
                                }
                            ]
                        }
                    },
                    {
                        _id: 'itemG1T2',
                        type: 'task',
                        pos: '1.02',
                        task: {
                            _id: 'itemasd',
                            name: 'Comprar materiales',
                            execute_days: 2,
                            startsAt: '2021-02-05',
                            endsAt: '2021-02-06',
                            progress: 20,
                            unit: 'Metros',
                            metered: 1,
                            performance: 2,
                            crewNumber: 3,
                            estimatedDays: 4,
                            status: 'atrasada',
                            code: 'green',
                            relations: [
                                {
                                    type: 'end_to_start',
                                    task_id: 'item121'
                                }
                            ]
                        }
                    },
                    {
                        _id: 'itemG1G1',
                        type: 'group',
                        pos: '1.02',
                        collapseStatus: 'expanded',
                        group: {
                            _id: 'group1.2',
                            name: 'Pinturas',
                            items: [
                                {
                                    _id: 'itemT1',
                                    type: 'task',
                                    pos: '1.02.01',
                                    task: {
                                        _id: 'item121',
                                        name: 'Pintura 1',
                                        execute_days: 2,
                                        startsAt: '2021-02-08',
                                        endsAt: '2021-02-09',
                                        progress: 30,
                                        unit: 'Metros',
                                        metered: 1,
                                        performance: 2,
                                        crewNumber: 3,
                                        estimatedDays: 4,
                                        status: 'completada',
                                        code: 'green',
                                        relations: [
                                            {
                                                type: 'end_to_start',
                                                task_id: 'item122'
                                            }
                                        ]
                                    }
                                },
                                {
                                    _id: 'itemT1',
                                    type: 'task',
                                    pos: '1.02.01',
                                    task: {
                                        _id: 'item122',
                                        name: 'Pintura 1',
                                        execute_days: 2,
                                        startsAt: '2021-02-10',
                                        endsAt: '2021-02-12',
                                        progress: 40,
                                        unit: 'Metros',
                                        metered: 1,
                                        performance: 2,
                                        crewNumber: 3,
                                        estimatedDays: 4,
                                        status: 'completada',
                                        code: 'green',
                                        relations: [
                                            {
                                                type: 'end_to_start',
                                                task_id: 'hito1'
                                            }
                                        ]
                                    }
                                },
                            ]
                        }
                    }
                ],
            }
        },
        {
            _id: 'itemH2',
            type: 'task',
            pos: 2,
            task: {
                _id: 'hito1',
                type: 'hito',
                name: 'Hito 1',
                execute_days: 0,
                startsAt: '2021-02-14',
                endsAt: '2021-02-14',
                progress: 50,
                unit: 'Metros',
                metered: 1,
                performance: 2,
                crewNumber: 3,
                estimatedDays: 4,
                status: 'atrasada',
                code: 'green',
                relations: [
                    {
                        task_id: 'item1'
                    }
                ]
            }
        },
        {
            _id: 'itemT2',
            type: 'task',
            pos: 2,
            task: {
                _id: 'item1',
                name: 'Tarea 1',
                execute_days: 2,
                startsAt: '2021-02-16',
                endsAt: '2021-02-18',
                progress: 50,
                unit: 'Metros',
                metered: 1,
                performance: 2,
                crewNumber: 3,
                estimatedDays: 4,
                status: 'atrasada',
                code: 'green',
                relations: []
            }
        },
    ]

    const columns = [
        { text: 'Pos.', field: 'pos', width: 60, show: true },
        {
            text: 'Título',
            field: 'title',
            width: 300,
            onClick: (item: any) => console.log('onItemClick', { item }),
            editable: true,
            show: true
        },
        { text: 'Días Ej.', field: 'execute_days', width: 70, show: true },
        { text: 'Inicia', field: 'startsAt', width: 100, render: (data: any) => !data ? null : moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY'), show: true },
        { text: 'Termina', field: 'endsAt', width: 100, render: (data: any) => !data ? null : moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY'), show: true },
        { text: 'Und.', field: 'unit', width: 60, show: true },
        { text: 'Met.', field: 'metered', width: 60, show: true },
        { text: 'Rend.', field: 'performance', width: 60, show: true },
        { text: 'N. Cuadr.', field: 'crew_number', width: 80, show: true },
        { text: 'T. Estim.', field: 'estimated_days', width: 80, render: (data: any) => !data ? null : `${data} días`, show: true },
        { text: 'Estado', field: 'status', width: 100, show: true },
    ]

    const [ state, setState ] = useState({
        fieldsOpened: false,
        statusColors: [],
        codesColors: [],
        items,
        ganttItems: getGanttItems(items, colorsTo),
        columns,
        ganttColumns: columns,
        ganttStart: '2021-02-01',
        ganttEnd: '2021-03-15',
    })

    const isChecked = (column: any) => {

        const exists = state.ganttColumns.filter((ganttColumn: any) => ganttColumn.field === column.field)

        if (!exists.length) {

            return false
        }

        return exists[0].show
    }

    const toggleColumn = (e: any, column: any) => {
        e.preventDefault()

        if (!isChecked(column)) {

            setColumn(column, true)
        } else {

            setColumn(column, false)
        }
    }

    const setColumn = (column: any, newShow: boolean) => {

        const ganttColumns: any = []

        const columns = state.columns.map((c: any) => {

            if (c.field === column.field) {

                c.show = newShow
            }

            if (c.show) {

                ganttColumns.push(c)
            }

            return c
        })

        setState({
            ...state,
            columns,
            ganttColumns
        })
    }

    const toggleColorsTo = (colorsTo: string) => {

        const ganttItems = getGanttItems(state.items, colorsTo)

        setColorsTo(colorsTo)

        setState({
            ...state,
            ganttItems
        })
    }

    return (
        <>
            <div className="navbar navbar-expand navbar-light bg-light">
                <div className="container-fluid">
                    <a href="/" className="navbar-brand">Power Gantt</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a href="/" className="nav-link active">Home</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container-fluid mt-2">
                {/* <div className="row mb-2 mt-2">
                    <div className="col-12">

                        <div className="btn-group">
                            <div className="dropdown">
                                <button
                                    className={`btn btn-light dropdown-toggle ${!state.fieldsOpened ? null : 'show'}`}
                                    onClick={() => setState({ ...state, fieldsOpened: !state.fieldsOpened })}
                                >
                                    Campos
                                </button>
                                <ul className={`dropdown-menu ${!state.fieldsOpened ? null : 'show'}`}>
                                    {state.columns.map((column: any, i: number) => (
                                        <li key={i}>
                                            <a className="dropdown-item" href="#" onClick={(e: any) => toggleColumn(e, column)}>
                                                <i className={`far fa-fw fa-${isChecked(column) ? 'check-square' : 'square'}`}></i> {column.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button className="btn btn-light" onClick={() => toggleColorsTo('status')}>
                                <i className={`far fa-fw fa-${colorsTo === 'status' ? 'dot-circle' : 'circle'}`}></i> Colores de estado
                            </button>
                            <button className="btn btn-light" onClick={() => toggleColorsTo('codes')}>
                                <i className={`far fa-fw fa-${colorsTo === 'codes' ? 'dot-circle' : 'circle'}`}></i> Colores de código
                            </button>
                        </div>
                    </div>
                </div> */}
                <div className="row">
                    <div className="col-12">
                        <Gantt
                            id="macro"
                            start={state.ganttStart}
                            end={state.ganttEnd}
                            items={state.ganttItems}
                            columns={state.ganttColumns}
                            minTableWidthPercent={20}
                            maxTableWidthPercent={75}
                            dayWidth={40}
                            dayMinWidth={24}
                            dayMaxWidth={64}
                            onToggleCollapse={toggleCollapse}
                            onItemEdit={onItemEdit}
                            options={{
                                buttonClassName: 'btn btn-default',
                                showWidthButtons: true,
                                daysFontSize: 12,
                                daysMinFontSize: 8,
                                daysMaxFontSize: 12,
                            }}
                            toolbar={{
                                showOptionsButton: true,
                                left: [
                                    (
                                        <button className="btn btn-default mr-1">
                                            <i className="fas fa-fw fa-plus"></i> Nueva tarea
                                        </button>
                                    ),
                                    (
                                        <button className="btn btn-default">
                                            <i className="fas fa-fw fa-plus"></i> Nuevo grupo
                                        </button>
                                    ),
                                ],
                                right: []
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;
