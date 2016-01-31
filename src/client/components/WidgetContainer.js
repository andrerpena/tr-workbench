import React from 'react';
import ReactDom from 'react-dom';
import { ItemTypes } from '../Constants';
import { DropTarget } from 'react-dnd';
import { ADD_COMPONENT } from '../actions/dashboadActions';
import ComponentContainer from './ComponentContainer';
import Widget from './Widget';
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

        console.log(monitor.getItem());

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
        widgets: React.PropTypes.array.isRequired
    },
    render: function () {
        console.log(this.props.widgets);
        const { connectDropTarget, monitor, isDragging, isOver } = this.props;
        return connectDropTarget(
            <div>
                <div className="widget-container" ref="viewport">
                    {
                        this.props.widgets.map((w, wi) => {
                            return <Widget key={`widget-${wi}`} />
                        })
                    }
                </div>
            </div>);
    }
});

export default DropTarget('fuck', widgetTarget, collect)(WidgetContainer);