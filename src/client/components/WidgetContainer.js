import React from 'react';
import ReactDom from 'react-dom';
import { ItemTypes } from '../Constants';
import { DropTarget } from 'react-dnd';
import { ADD_COMPONENT } from '../actions/dashboadActions';
import ComponentContainer from './ComponentContainer';
import Popover from 'react-bootstrap/lib/Popover'
import _ from 'underscore';


const widgetTarget = {
    drop: function (props, monitor, component) {


    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

var WidgetContainer = React.createClass({

    propTypes: {
        panelIndex: React.PropTypes.number.isRequired,
        containerIndex: React.PropTypes.number.isRequired,
        widgets: React.PropTypes.array,
    },

    render: function () {
        return <div className="widget-container">Fuck this shit</div>
    }
});

export default DropTarget([ItemTypes.ADD_WIDGET], widgetTarget, collect)(WidgetContainer);