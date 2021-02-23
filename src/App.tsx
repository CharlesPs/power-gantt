
import React, { useState } from 'react';

import Gantt from './Components/Gantt/Gantt'

import moment from 'moment'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const App = () => {

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
        { text: 'Estado', field: 'status', width: 100, show: true },
    ]

    const [ state, setState ] = useState({
        fieldsOpened: false,
        statusColors: [],
        codesColors: [],
        ganttItems: [
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
                status: 'Completada',
                color: '#FF0000',
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
                status: 'Completada',
                color: '#0000FF',
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
                status: 'Completada',
                color: '#F000FF'
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
                status: 'Completada',
                color: '#7630A0',
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
                status: 'Completada',
                color: '#4e704c',
                relations: [
                    {
                        type: 'end_to_start',
                        task_id: 'item2'
                    }
                ]
            },
            {
                pos: '1',
                title: 'Tarea 1',
                execute_days: 2,
                startsAt: '2021-02-01',
                endsAt: '2021-02-28',
                units: 'Metros',
                metered: 1,
                performance: 2,
                crewmate: 3,
                estimated_time: 4,
                status: 'Completada',
            },
            {
                pos: '1',
                title: 'Tarea 1',
                execute_days: 2,
                startsAt: '2021-02-01',
                endsAt: '2021-02-28',
                units: 'Metros',
                metered: 1,
                performance: 2,
                crewmate: 3,
                estimated_time: 4,
                status: 'Completada',
            },
            {
                pos: '1',
                title: 'Tarea 1',
                execute_days: 2,
                startsAt: '2021-02-01',
                endsAt: '2021-02-28',
                units: 'Metros',
                metered: 1,
                performance: 2,
                crewmate: 3,
                estimated_time: 4,
                status: 'Completada',
            },
            {
                pos: '1',
                title: 'Tarea 1',
                execute_days: 2,
                startsAt: '2021-02-01',
                endsAt: '2021-02-28',
                units: 'Metros',
                metered: 1,
                performance: 2,
                crewmate: 3,
                estimated_time: 4,
                status: 'Completada',
            },
            {
                pos: '1',
                title: 'Tarea 1',
                execute_days: 2,
                startsAt: '2021-02-01',
                endsAt: '2021-02-28',
                units: 'Metros',
                metered: 1,
                performance: 2,
                crewmate: 3,
                estimated_time: 4,
                status: 'Completada',
            },
            {
                pos: '1',
                title: 'Tarea 1',
                execute_days: 2,
                startsAt: '2021-02-01',
                endsAt: '2021-02-28',
                units: 'Metros',
                metered: 1,
                performance: 2,
                crewmate: 3,
                estimated_time: 4,
                status: 'Completada',
            },
            {
                pos: '1',
                title: 'Tarea 1',
                execute_days: 2,
                startsAt: '2021-02-01',
                endsAt: '2021-02-28',
                units: 'Metros',
                metered: 1,
                performance: 2,
                crewmate: 3,
                estimated_time: 4,
                status: 'Completada',
            },
            {
                pos: '1',
                title: 'Tarea 1',
                execute_days: 2,
                startsAt: '2021-02-01',
                endsAt: '2021-02-28',
                units: 'Metros',
                metered: 1,
                performance: 2,
                crewmate: 3,
                estimated_time: 4,
                status: 'Completada',
            },
            {
                pos: '1',
                title: 'Tarea 1',
                execute_days: 2,
                startsAt: '2021-02-01',
                endsAt: '2021-02-28',
                units: 'Metros',
                metered: 1,
                performance: 2,
                crewmate: 3,
                estimated_time: 4,
                status: 'Completada',
            },
            {
                pos: '1',
                title: 'Tarea 1',
                execute_days: 2,
                startsAt: '2021-02-01',
                endsAt: '2021-02-28',
                units: 'Metros',
                metered: 1,
                performance: 2,
                crewmate: 3,
                estimated_time: 4,
                status: 'Completada',
            },
            {
                pos: '1',
                title: 'Tarea 1',
                execute_days: 2,
                startsAt: '2021-02-01',
                endsAt: '2021-02-28',
                units: 'Metros',
                metered: 1,
                performance: 2,
                crewmate: 3,
                estimated_time: 4,
                status: 'Completada',
            },
        ],
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
