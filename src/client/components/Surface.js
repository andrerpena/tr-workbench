import React from 'react';
import ReactDom from 'react-dom';
import { ItemTypes } from '../Constants';
import { DropTarget } from 'react-dnd';
import { ADD_COMPONENT } from '../actions/mockupActions';
import ComponentContainer from './ComponentContainer';
import Popover from 'react-bootstrap/lib/Popover'
import _ from 'underscore';


const componentTarget = {
    drop: function (props, monitor, component) {

        let viewport = ReactDom.findDOMNode(component.refs.viewport);

        switch (monitor.getItemType()) {
            case ItemTypes.ADD_COMPONENT:
            {
                // trigger the add component action
                if (!props.actions || !props.actions.addComponent) {
                    throw Error('Surface is not receiving the component actions');
                }

                let clientOffset = monitor.getClientOffset();
                let offsetX = clientOffset.x;
                let offsetY = clientOffset.y;

                let rect = ReactDom.findDOMNode(component).getBoundingClientRect();
                let left = rect.left;
                let top = rect.top;

                let mockupName = props.mockup.name;
                let position = {
                    x: offsetX - left + viewport.scrollLeft,
                    y: offsetY - top + viewport.scrollTop
                };
                let componentType = monitor.getItem().type;

                // trigger the action
                props.actions.addComponent(mockupName, componentType, position);
                break;
            }


            case ItemTypes.EXISTING_COMPONENT:
            {
                // trigger the add component action
                if (!props.actions || !props.actions.addComponent) {
                    throw Error('Surface is not receiving the component actions');
                }

                let clientOffset = monitor.getClientOffset();
                let offsetX = clientOffset.x;
                let offsetY = clientOffset.y;

                let rect = ReactDom.findDOMNode(component).getBoundingClientRect();
                let left = rect.left;
                let top = rect.top;

                let mockupName = props.mockup.name;

                let componentInnerOffset = monitor.getItem().innerOffset;
                let position = {
                    x: offsetX - left - componentInnerOffset.x + viewport.scrollLeft,
                    y: offsetY - top - componentInnerOffset.y + viewport.scrollTop
                };
                let componentId = monitor.getItem().id;

                // trigger the action
                props.actions.moveComponent(mockupName, componentId, position);
                break;
            }
        }

    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

var Surface = React.createClass({

    propTypes: {
        actions: React.PropTypes.object.isRequired,
        mockup: React.PropTypes.object.isRequired,
        clientHeight: React.PropTypes.number.isRequired
    },

    handleComponentSelection: function (id) {
        this.props.actions.setSelection(this.props.mockup.name, id);
    },

    handleComponentUpdateSize: function (id, size) {
        this.props.actions.updateComponentSize(this.props.mockup.name, id, size);
    },

    handleClick: function () {
        this.props.actions.setSelection(this.props.mockup.name, null);
    },

    render: function () {

        // find the selected component
        let selectedComponent = this.props.mockup.selectedComponent ? _.find(this.props.mockup.components, c => c.id == this.props.mockup.selectedComponent) : null;
        const popoverOffsetX = 10, popoverOffsetY = 10, popoverWidth=232;
        let selectedComponentX, selectedComponentY, selectedComponentWidth, selectedComponentHeight;

        let popoverPositionLeft, popoverPositionTop;

        if(selectedComponent && selectedComponent.computedSize) {
            selectedComponentX = selectedComponent.props.x;
            selectedComponentY = selectedComponent.props.y;
            selectedComponentWidth = selectedComponent.computedSize.width;
            selectedComponentHeight = selectedComponent.computedSize.height;

            popoverPositionLeft = selectedComponentX + selectedComponentWidth/2 - popoverWidth / 2;
            popoverPositionTop = selectedComponentY + selectedComponentHeight + popoverOffsetY;
        }



        const { connectDropTarget, isDragging, isOver } = this.props;
        return connectDropTarget(
            <div>
                <div className="surface-viewport" style={{height: this.props.clientHeight}} ref="viewport">
                    <div className="surface" onClick={this.handleClick} style={{ width: 2000, height: 2000}}>
                        { this.props.mockup.components.map((c, i) => {
                            return <ComponentContainer
                                key={`component-${i}`}
                                id={c.id}
                                type={c.type}
                                position={c.position}
                                props={c.props}
                                selected={this.props.mockup.selectedComponent == c.id }
                                onSelect={this.handleComponentSelection}
                                onUpdateComponentSize={this.handleComponentUpdateSize}
                            />
                        })}
                        {
                            !isOver && selectedComponent && selectedComponent.computedSize ? <Popover placement="bottom" positionLeft={popoverPositionLeft} positionTop={popoverPositionTop}
                                               animation={false} >
                               <div className="popover-content-medium">
                                   Fuck this
                               </div>
                            </Popover> : null
                        }
                    </div>
                </div>
            </div>
        );
    }
});

export default DropTarget([ItemTypes.ADD_COMPONENT, ItemTypes.EXISTING_COMPONENT], componentTarget, collect)(Surface);