import React from 'react';
import ComponentsMenu from '../components/ComponentsMenu';
import WidgetContainer from '../components/WidgetContainer';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CustomDragLayer from './CustomDragLayer';

var AppBody = React.createClass({

    propTypes: {
        actions: React.PropTypes.object.isRequired,
    },

    render: function () {
        return <div className="page-wrap">
            <div className="row row-no-padding">
                <div className="col-md-2">
                    <ComponentsMenu />
                </div>
                <div className="col-md-10">
                    <WidgetContainer />
                </div>
                <CustomDragLayer />
            </div>
        </div>
    }
});

export default DragDropContext(HTML5Backend)(AppBody);