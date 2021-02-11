
import React from 'react';

import Gantt from './Components/Gantt/Gantt'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const App = () => {

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <Gantt
                            minTableWidthPercent={25}
                            maxTableWidthPercent={75}
                            defTableWidthPorcent={50}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;
