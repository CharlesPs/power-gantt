
import React, { useState } from 'react';

import Gantt from './Components/Gantt/Gantt'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const App = () => {

    const [ state, setState ] = useState({
        ganttItems: [
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
            { text: 'Inicia', field: 'startsAt', width: 100},
            { text: 'Termina', field: 'endsAt', width: 100},
            { text: 'Und.', field: 'units', width: 60},
            { text: 'Met.', field: 'metered', width: 60},
            { text: 'Rend.', field: 'performance', width: 60},
            { text: 'N. Cuadr.', field: 'crewmate', width: 80},
            { text: 'T. Estim.', field: 'estimated_time', width: 80},
            { text: 'Estado', field: 'status', width: 100},
        ]
    })

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <Gantt
                            id="macro"
                            items={state.ganttItems}
                            columns={state.ganttColumns}
                            minTableWidthPercent={20}
                            maxTableWidthPercent={75}
                            // defTableWidthPorcent={50}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;
