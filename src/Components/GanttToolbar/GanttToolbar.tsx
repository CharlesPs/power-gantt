
import React from 'react'

type Props = {
    options?: any,
    onToggleOptions?: any,
}

const GanttToolbar = (props: Props) => {

    const defaultOptions = {
        enabled: true,
        buttonClassName: 'btn btn-default',
        showOptionsButton: false,
        left: [],
        right: []
    }

    const options = Object.assign(defaultOptions, props.options)

    return (
        <>
            {!options.enabled ? null : (
                <div className="gantt-toolbar">
                    <div className="toolbar-left">
                        {!options.left ? null : (
                            <>
                                {React.Children.map(options.left, (child: any, i: number) => (
                                    <>
                                        {child}
                                    </>
                                ))}
                            </>
                        )}
                    </div>
                    <div className="toolbar-right">
                        {!options.right ? null : (
                            <>
                                {React.Children.map(options.right, (child: any, i: number) => (
                                    <>
                                        {child}
                                    </>
                                ))}
                            </>
                        )}
                    </div>
                    {!options.showOptionsButton ? null : (
                        <div className="toolbar-right">
                            <div className="btn-group ml-1">
                                <button className={options.buttonClassName} onClick={() => props.onToggleOptions()}>
                                    <i className="fa fa-fw fa-cogs"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default GanttToolbar
