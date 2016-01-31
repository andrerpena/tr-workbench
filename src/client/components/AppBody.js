import React from 'react';
import WidgetsMenu from './WidgetsMenu';
import WidgetContainer from '../components/WidgetContainer';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CustomDragLayer from './CustomDragLayer';

var AppBody = React.createClass({

    propTypes: {
        actions: React.PropTypes.object.isRequired,
        dashboard: React.PropTypes.object.isRequired
    },

    render: function () {
        return <div className="page-wrap">
            <div className="row row-no-padding">
                <div className="col-md-2">
                    <WidgetsMenu />
                </div>
                <div className="col-md-10">
                    {
                        this.props.dashboard.panels.map((p, i) => {
                            return <div key={`panel-${i}`}>
                                <WidgetContainer panelIndex={i} containerIndex={0} key={`container-${i}-1`} />
                                <WidgetContainer panelIndex={i} containerIndex={1} key={`container-${i}-2`}/>
                                <WidgetContainer panelIndex={i} containerIndex={2} key={`container-${i}-3`}/>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    }
});

export default DragDropContext(HTML5Backend)(AppBody);