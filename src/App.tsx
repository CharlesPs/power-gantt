
import React, { useState } from 'react';

import Gantt from './Components/Gantt/Gantt'

import moment from 'moment'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const App = () => {

    const [ state, setState ] = useState({
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
        ganttColumns: [
            { text: 'Pos.', field: 'pos', width: 60},
            { text: 'Título', field: 'title', width: 300},
            { text: 'Días Ej.', field: 'execute_days', width: 70},
            { text: 'Inicia', field: 'startsAt', width: 100, render: (data: any) => moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY') },
            { text: 'Termina', field: 'endsAt', width: 100, render: (data: any) => moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY')},
            { text: 'Und.', field: 'units', width: 60},
            { text: 'Met.', field: 'metered', width: 60},
            { text: 'Rend.', field: 'performance', width: 60},
            { text: 'N. Cuadr.', field: 'crewmate', width: 80},
            { text: 'T. Estim.', field: 'estimated_time', width: 80},
            { text: 'Estado', field: 'status', width: 100},
        ],
        ganttStart: '2021-02-01',
        ganttEnd: '2021-03-15',
    })

    return (
        <>
            <div className="container-fluid">
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
