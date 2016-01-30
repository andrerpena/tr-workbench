import React from 'react';
import ReactDom from 'react-dom';
import componentRegistry from './mockup/componentRegistry';

import { ItemTypes } from '../Constants';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const componentSource = {
    beginDrag(props, monitor, component) {
        return {
            id: props.id,
            type: props.type,
            props: props.props || {},
            innerOffset: component.mouseDownInnerOffset
        }
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

var ComponentContainer = React.createClass({

    propTypes: {
        id: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        onSelect: React.PropTypes.func.isRequired,
        onUpdateComponentSize: React.PropTypes.func.isRequired,
        props: React.PropTypes.object
    },

    render: function () {

        if (!componentRegistry[this.props.type]) throw Error('\'componentRegistry[item.type]\' should be truthy');
        let componentType = componentRegistry[this.props.type].component;
        const { connectDragSource, isDragging } = this.props;

        const transform = `translate(${this.props.props.x}px, ${this.props.props.y}px)`;
        let style = {
            position: 'absolute',
            left: this.props.props.x,
            top: this.props.props.y,
            opacity: isDragging ? 0 : 1
        };


        return connectDragSource(<div style={style}>
            <div ref="container" className="component-container" onClick={this.handleClick} onMouseDown={this.handleMouseDown}>
                <div className="component-container-content">
                    { React.createElement(componentType)}
                </div>
                { !isDragging && this.props.selected ? this.renderHandles() : null }
            </div>
        </div>);
    },

    handleClick: function (e) {
        e.stopPropagation();
        this.props.onSelect(this.props.id);
    },

    handleMouseDown: function(e) {

        let clientRect = ReactDom.findDOMNode(this).getBoundingClientRect();
        this.mouseDownInnerOffset = {
            x: e.pageX - clientRect.left,
            y: e.pageY - clientRect.top
        };
    },

    renderHandles: function () {
        return <div className="component-container-handles">
            <div className="component-container-handle north" ref="north-handle"></div>
            <div className="component-container-handle south" ref="south-handle"></div>
            <div className="component-container-handle north-west" ref="north-west-handle"></div>
            <div className="component-container-handle north-east" ref="north-east-handle"></div>
            <div className="component-container-handle south-west" ref="south-west-handle"></div>
            <div className="component-container-handle south-east" ref="south-east-handle"></div>
        </div>;
    },

    updateHandles: function () {
        let componentWidth = this.refs['container'].offsetWidth;
        let componentHeight = this.refs['container'].offsetHeight;
        let handleOffset = 3.5;

        this.refs['north-handle'].style.top = `-${handleOffset}px`;
        this.refs['north-handle'].style.left = (componentWidth / 2 - handleOffset) + 'px';

        this.refs['south-handle'].style.top = ( componentHeight - handleOffset) + 'px';
        this.refs['south-handle'].style.left = (componentWidth / 2 - handleOffset) + 'px';

        this.refs['north-west-handle'].style.top = `-${handleOffset}px`;
        this.refs['north-west-handle'].style.left = `-${handleOffset}px`;

        this.refs['north-east-handle'].style.top = `-${handleOffset}px`;
        this.refs['north-east-handle'].style.left = (componentWidth - handleOffset) + 'px';

        this.refs['south-west-handle'].style.top = ( componentHeight - handleOffset) + 'px';
        this.refs['south-west-handle'].style.left = `-${handleOffset}px`;

        this.refs['south-east-handle'].style.top = ( componentHeight - handleOffset) + 'px';
        this.refs['south-east-handle'].style.left = (componentWidth - handleOffset) + 'px';
    },

    componentDidMount: function () {
        const { selected, isDragging } = this.props;

        this.props.connectDragPreview(getEmptyImage(), {
            captureDraggingState: true
        });
        if (!isDragging && selected)
            this.updateHandles();

        let componentRect = this.refs["container"].getBoundingClientRect();
        this.props.onUpdateComponentSize(this.props.id, {
            width: componentRect.width,
            height: componentRect.height
        });

        console.log(this.refs["container"].getBoundingClientRect());

    },

    componentDidUpdate: function () {
        const { selected, isDragging } = this.props;
        if (!isDragging && selected)
            this.updateHandles();
    }
});

export default DragSource(ItemTypes.EXISTING_COMPONENT, componentSource, collect)(ComponentContainer);
