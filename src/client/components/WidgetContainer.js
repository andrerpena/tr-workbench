import React from 'react';
import ReactDom from 'react-dom';
import { ItemTypes } from '../Constants';
import { DropTarget } from 'react-dnd';
import { ADD_COMPONENT } from '../actions/dashboadActions';
import ComponentContainer from './ComponentContainer';
import Popover from 'react-bootstrap/lib/Popover'
import _ from 'underscore';


const widgetTarget = {
    hover: function(props, monitor, component) {

        // offset relative to the window
        let windowOffset = monitor.getClientOffset();
        let windowOffsetX = windowOffset.x;
        let windowOffsetY = windowOffset.y;

        // offset relative to the widgetContainer
        let widgetContainerBoundingClientRect = ReactDom.findDOMNode(component).getBoundingClientRect();
        let widgetContainerOffsetX = widgetContainerBoundingClientRect.left;
        let widgetContainerOffsetY = widgetContainerBoundingClientRect.top;

        let relativeOffset = {
            x: windowOffsetX - widgetContainerOffsetX,
            y: windowOffsetY - widgetContainerOffsetY
        };

        console.log(relativeOffset);

    },
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
        widgets: React.PropTypes.array
    },
    render: function () {
        const { connectDropTarget, monitor, isDragging, isOver } = this.props;
        return connectDropTarget(
            <div>
                <div className="widget-container" ref="viewport">Fuck this shit</div>
            </div>);
    }
});

export default DropTarget('fuck', widgetTarget, collect)(WidgetContainer);