# Power Gantt

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

# Features!

  - Adjustable frame
  - Items quick edition (double click)
  - Auto horizontal scroll on item click
  - Items relations support
  - Multilevel groups
  - Dayly and weekly modes
  - Items progress bar
  - Bar and diamond types

### Installation

```sh
$ npm install power-gantt
or
$ yarn add power-gantt
```
### Use
```
import Gantt from 'power-gantt'
```

```
const items = [
    {
        "_id": "itemG1",
        "pos": 1,
        "level": 0,
        "type": "group",
        "group_id": "group1",
        "collapseStatus": "expanded",
        "title": "Base",
        "startsAt": "2021-07-01",
        "endsAt": "2021-07-03",
        "items": [
            {
                "_id": "itemG1T1",
                "type": "task",
                "pos": "1.01",
                "task": {
                    "_id": "item0",
                    "name": "Comprar materiales",
                    "startsAt": "2021-07-01",
                    "endsAt": "2021-07-03",
                    "progress": 10,
                    "status": "pendiente",
                    "colorCode": {
                        "code": "AA",
                        "color": "#ff0000"
                    },
                    "relations": [
                        {
                            "type": "end_to_start",
                            "task_id": "itemasd"
                        }
                    ]
                },
                "color": "#093763",
                "bar_short_text": "AA"
            }
        ]
    },
    {
        "_id": "itemG1T1",
        "pos": "1.01",
        "level": 1,
        "type": "task",
        "task_id": "item0",
        "title": "Comprar materiales",
        "bar_text": "AA Comprar materiales (10%)",
        "bar_short_text": "AA",
        "color": "#093763",
        "status": "Pendiente",
        "startsAt": "2021-07-01",
        "endsAt": "2021-07-03",
        "progress": 10,
        "relations": [
            {
                "type": "end_to_start",
                "task_id": "itemasd"
            }
        ]
    },
    {
        "_id": "itemG1T2",
        "pos": "1.02",
        "level": 1,
        "type": "task",
        "task_id": "itemasd",
        "title": "Comprar materiales",
        "bar_text": "AA Comprar materiales (20%)",
        "bar_short_text": "AA",
        "color": "#FF0000",
        "status": "Atrasada",
        "startsAt": "2021-07-05",
        "endsAt": "2021-07-06",
        "progress": 20,
        "relations": [
            {
                "type": "end_to_start",
                "task_id": "item121"
            }
        ]
    },
    {
        "_id": "itemG1G1",
        "pos": "1.02",
        "level": 1,
        "type": "group",
        "group_id": "group1.2",
        "collapseStatus": "expanded",
        "title": "Pinturas",
        "startsAt": "2021-02-08",
        "endsAt": "2021-02-12",
        "items": [
            {
                "_id": "itemT1",
                "type": "task",
                "pos": "1.02.01",
                "task": {
                    "_id": "item121",
                    "name": "Pintura 1",
                    "startsAt": "2021-07-08",
                    "endsAt": "2021-07-09",
                    "progress": 30,
                    "status": "completada",
                    "colorCode": {
                        "code": "AA",
                        "color": "#ff0000"
                    },
                    "relations": [
                        {
                            "type": "end_to_start",
                            "task_id": "item122"
                        }
                    ]
                },
                "color": "#B7B7B7",
                "bar_short_text": "AA"
            },
            {
                "_id": "itemT1",
                "type": "task",
                "pos": "1.02.01",
                "task": {
                    "_id": "item122",
                    "name": "Pintura 1",
                    "startsAt": "2021-07-10",
                    "endsAt": "2021-07-12",
                    "progress": 40,
                    "status": "completada",
                    "colorCode": {
                        "code": "AA",
                        "color": "#ff0000"
                    },
                    "relations": [
                        {
                            "type": "end_to_start",
                            "task_id": "hito1"
                        }
                    ]
                },
                "color": "#B7B7B7",
                "bar_short_text": "AA"
            }
        ]
    },
    {
        "_id": "itemT1",
        "pos": "1.02.01",
        "level": 2,
        "type": "task",
        "task_id": "item121",
        "title": "Pintura 1",
        "bar_text": "AA Pintura 1 (30%)",
        "bar_short_text": "AA",
        "color": "#B7B7B7",
        "status": "Completada",
        "startsAt": "2021-07-08",
        "endsAt": "2021-07-09",
        "progress": 30,
        "relations": [
            {
                "type": "end_to_start",
                "task_id": "item122"
            }
        ]
    },
    {
        "_id": "itemT1",
        "pos": "1.02.01",
        "level": 2,
        "type": "task",
        "task_id": "item122",
        "title": "Pintura 1",
        "bar_text": "AA Pintura 1 (40%)",
        "bar_short_text": "AA",
        "color": "#B7B7B7",
        "status": "Completada",
        "startsAt": "2021-07-10",
        "endsAt": "2021-07-12",
        "progress": 40,
        "relations": [
            {
                "type": "end_to_start",
                "task_id": "hito1"
            }
        ]
    },
    {
        "_id": "itemH2",
        "pos": 2,
        "level": 0,
        "type": "task",
        "task_id": "hito1",
        "task_type": "hito",
        "title": "Hito 1",
        "bar_text": "AA Hito 1 (50%)",
        "bar_short_text": "AA",
        "color": "#FF0000",
        "status": "Atrasada",
        "startsAt": "2021-07-15",
        "endsAt": "2021-07-15",
        "progress": 50,
        "relations": [
            {
                "task_id": "item1"
            }
        ]
    }
]
```

```
const columns = [
    {
        text: 'Título',
        field: 'title',
        width: 300,
        onClick: (item: any) => console.log('onItemClick', { item }),
        editable: true,
        show: true
    },
    { text: 'Inicia', field: 'startsAt', width: 100, render: (data: any) => !data ? null : moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY'), show: true },
    { text: 'Termina', field: 'endsAt', width: 100, render: (data: any) => !data ? null : moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY'), show: true },
    { text: 'Estado', field: 'status', width: 100, show: true },
]

```

```
<Gantt
    id="gantt-1"
    start='2021-07-01'
    end='2021-07-31'
    items={items}
    columns={columns}
    nonWorkingDays={[
        '2021-07-28',
        '2021-07-29',
    ]}
    hideNonWorkingDays={hideNonWorkingDays}
    minTableWidthPercent={20}
    maxTableWidthPercent={75}
    dayWidth={40}
    dayMinWidth={24}
    dayMaxWidth={64}
    onToggleCollapse={toggleCollapse}
    onItemEdit={onItemEdit}
    options={{
        height: 500,
        buttonClassName: 'btn btn-default',
        showWidthButtons: true,
        showVerticalBordersControl: true,
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
    sidebar={(
        <>
            <div className="form-group">
                <div className="form-check">
                    <input
                        id="toggle-non-working-days"
                        className="form-check-input"
                        type="checkbox"
                        checked={hideNonWorkingDays}
                        onChange={(e) => {

                            setHideNonWorkingDays(e.currentTarget.checked)}
                        }
                    />
                    <label className="form-check-label" htmlFor="toggle-non-working-days">
                        Ocultar dias no laborables
                    </label>
                </div>
            </div>
        </>
    )}
/>
```

License
----

MIT

Feel free to write me on my [Facebook]

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [Facebook]: <https://fb.me/c.aguinaga>
