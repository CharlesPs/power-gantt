
import React, { useEffect, useState } from 'react';

import Gantt from './Components/Gantt/Gantt'

import moment from 'moment'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const App = () => {

    const [ colorsTo, setColorsTo ] = useState('status')

    const columns = [
        { text: 'Pos.', field: 'pos', width: 60, show: true },
        { text: 'Título', field: 'title', width: 300, show: true },
        { text: 'Días Ej.', field: 'execute_days', width: 70, show: true },
        { text: 'Inicia', field: 'startsAt', width: 100, render: (data: any) => moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY'), show: true },
        { text: 'Termina', field: 'endsAt', width: 100, render: (data: any) => moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY'), show: true },
        { text: 'Und.', field: 'units', width: 60, show: true },
        { text: 'Met.', field: 'metered', width: 60, show: true },
        { text: 'Rend.', field: 'performance', width: 60, show: true },
        { text: 'N. Cuadr.', field: 'crewmate', width: 80, show: true },
        { text: 'T. Estim.', field: 'estimated_time', width: 80, show: true },
        { text: 'Estado', field: 'status_str', width: 100, show: true },
    ]

    const items: any = [
        {
            _id: 'item0',
            type: 'task',
            pos: '1',
            title: 'Tarea 1',
            execute_days: 2,
            startsAt: '2021-02-03',
            endsAt: '2021-02-03',
            progress: 50,
            units: 'Metros',
            metered: 1,
            performance: 2,
            crewmate: 3,
            estimated_time: 4,
            status: 'atrasada',
            code: 'green',
            relations: [
                {
                    type: 'start_to_start',
                    task_id: 'item1'
                }
            ]
        },
        {
            _id: 'item1',
            type: 'task',
            pos: '1',
            title: 'Tarea 1',
            execute_days: 2,
            startsAt: '2021-02-04',
            endsAt: '2021-02-08',
            progress: 30,
            units: 'Metros',
            metered: 1,
            performance: 2,
            crewmate: 3,
            estimated_time: 4,
            status: 'pendiente',
            code: 'red',
            relations: [
                {
                    type: 'end_to_start',
                    task_id: 'item2'
                }
            ]
        },
        {
            _id: 'item2',
            type: 'task',
            pos: '1',
            title: 'Tarea 1',
            execute_days: 2,
            startsAt: '2021-02-08',
            endsAt: '2021-02-15',
            progress: 70,
            units: 'Metros',
            metered: 1,
            performance: 2,
            crewmate: 3,
            estimated_time: 4,
            status: 'liberada',
            code: 'black'
        },
        {
            _id: 'item3',
            type: 'task',
            pos: '1',
            title: 'Tarea 1',
            execute_days: 2,
            startsAt: '2021-02-03',
            endsAt: '2021-02-06',
            units: 'Metros',
            metered: 1,
            performance: 2,
            crewmate: 3,
            estimated_time: 4,
            status: 'completada',
            code: 'blue',
            relations: [
                {
                    type: 'start_to_start',
                    task_id: 'item2'
                }
            ]
        },
        {
            _id: 'item4',
            type: 'task',
            pos: '1',
            title: 'Tarea 1',
            execute_days: 2,
            startsAt: '2021-02-04',
            endsAt: '2021-02-07',
            units: 'Metros',
            metered: 1,
            performance: 2,
            crewmate: 3,
            estimated_time: 4,
            status: 'activa',
            colde: 'gray',
            relations: [
                {
                    type: 'end_to_start',
                    task_id: 'item2'
                }
            ]
        },
        {
            // _id: 'item4',
            type: 'task',
            pos: '1',
            title: 'Tarea nueva',
            execute_days: 2,
            startsAt: '2021-02-04',
            endsAt: '2021-02-07',
            units: 'Metros',
            metered: 1,
            performance: 2,
            crewmate: 3,
            estimated_time: 4,
            status: 'activa',
            colde: 'gray',
        },
        {
            // _id: 'item4',
            type: 'task',
            pos: '1',
            title: 'Tarea nueva',
            execute_days: 2,
            startsAt: '2021-02-04',
            endsAt: '2021-02-07',
            units: 'Metros',
            metered: 1,
            performance: 2,
            crewmate: 3,
            estimated_time: 4,
            status: 'activa',
            colde: 'gray',
        },
        {
            // _id: 'item4',
            type: 'task',
            pos: '1',
            title: 'Tarea nueva',
            execute_days: 2,
            startsAt: '2021-02-04',
            endsAt: '2021-02-07',
            units: 'Metros',
            metered: 1,
            performance: 2,
            crewmate: 3,
            estimated_time: 4,
            status: 'activa',
            colde: 'gray',
        },
        {
            // _id: 'item4',
            type: 'task',
            pos: '1',
            title: 'Tarea nueva',
            execute_days: 2,
            startsAt: '2021-02-04',
            endsAt: '2021-02-07',
            units: 'Metros',
            metered: 1,
            performance: 2,
            crewmate: 3,
            estimated_time: 4,
            status: 'activa',
            colde: 'gray',
        },
        {
            // _id: 'item4',
            type: 'task',
            pos: '1',
            title: 'Tarea nueva',
            execute_days: 2,
            startsAt: '2021-02-04',
            endsAt: '2021-02-07',
            units: 'Metros',
            metered: 1,
            performance: 2,
            crewmate: 3,
            estimated_time: 4,
            status: 'activa',
            colde: 'gray',
        },
        {
            // _id: 'item4',
            type: 'task',
            pos: '1',
            title: 'Tarea nueva',
            execute_days: 2,
            startsAt: '2021-02-04',
            endsAt: '2021-02-07',
            units: 'Metros',
            metered: 1,
            performance: 2,
            crewmate: 3,
            estimated_time: 4,
            status: 'activa',
            colde: 'gray',
        },
        {
            // _id: 'item4',
            type: 'task',
            pos: '1',
            title: 'Tarea nueva',
            execute_days: 2,
            startsAt: '2021-02-04',
            endsAt: '2021-02-07',
            units: 'Metros',
            metered: 1,
            performance: 2,
            crewmate: 3,
            estimated_time: 4,
            status: 'activa',
            colde: 'gray',
        },
        {
            // _id: 'item4',
            type: 'task',
            pos: '1',
            title: 'Tarea nueva',
            execute_days: 2,
            startsAt: '2021-02-04',
            endsAt: '2021-02-07',
            units: 'Metros',
            metered: 1,
            performance: 2,
            crewmate: 3,
            estimated_time: 4,
            status: 'activa',
            colde: 'gray',
        },
        {
            // _id: 'item4',
            type: 'task',
            pos: '1',
            title: 'Tarea nueva',
            execute_days: 2,
            startsAt: '2021-02-04',
            endsAt: '2021-02-07',
            units: 'Metros',
            metered: 1,
            performance: 2,
            crewmate: 3,
            estimated_time: 4,
            status: 'activa',
            colde: 'gray',
        },
        {
            // _id: 'item4',
            type: 'task',
            pos: '1',
            title: 'Tarea nueva',
            execute_days: 2,
            startsAt: '2021-02-04',
            endsAt: '2021-02-07',
            units: 'Metros',
            metered: 1,
            performance: 2,
            crewmate: 3,
            estimated_time: 4,
            status: 'activa',
            colde: 'gray',
        },
        {
            // _id: 'item4',
            type: 'task',
            pos: '1',
            title: 'Tarea nueva',
            execute_days: 2,
            startsAt: '2021-02-04',
            endsAt: '2021-02-07',
            units: 'Metros',
            metered: 1,
            performance: 2,
            crewmate: 3,
            estimated_time: 4,
            status: 'activa',
            colde: 'gray',
        },
    ]

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

    const getGanttItems = (colorsTo: string) => {

        const ganttItems: any = items.map((item: any) => {

            if (colorsTo === 'status') {

                item.color = statusColors[item.status]
            } else {

                item.color = codesColors[item.code]
            }

            item.status_str = statusStrings[item.status]

            return item
        })

        return ganttItems
    }

    const [ state, setState ] = useState({
        fieldsOpened: false,
        statusColors: [],
        codesColors: [],
        ganttItems: getGanttItems(colorsTo),
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

        const ganttItems = getGanttItems(colorsTo)

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
                <a href="/" className="navbar-brand">Gantt</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a href="/" className="nav-link active">Home</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
            <div className="container-fluid">
                <div className="row mb-2 mt-2">
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
                </div>
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
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;
