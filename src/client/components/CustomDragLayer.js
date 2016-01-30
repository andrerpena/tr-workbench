import React, { PropTypes } from 'react';
import { ItemTypes } from '../Constants.js';
import { DragLayer } from 'react-dnd';
import componentRegistry from './mockup/componentRegistry';

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
};

var CustomDragLayer = React.createClass({

    propTypes: {
        item: PropTypes.object,
        itemType: PropTypes.string,
        currentOffset: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired
        }),
        isDragging: PropTypes.bool.isRequired
    },

    renderItem(type, item, props) {
        function getItemStyle(props, innerOffset) {
            innerOffset = innerOffset || { x: 0, y: 0 };
            const { currentOffset, initialOffset, sourceOffset } = props;
            if (!currentOffset) {
                return {
                    display: 'none'
                };
            }
            const x = currentOffset.x + initialOffset.x - sourceOffset.x - innerOffset.x;
            const y = currentOffset.y + initialOffset.y - sourceOffset.y - innerOffset.y;
            return {
                position: 'absolute',
                left: x,
                top: y,
                width: 100
            };
        }

        let componentType;
        switch (type) {
            case ItemTypes.ADD_COMPONENT:
                if (!item.type) throw Error('\'item.type\' should be truthy');
                if (!componentRegistry[item.type]) throw Error('\'componentRegistry[item.type]\' should be truthy');
                componentType = componentRegistry[item.type].component;
                return (
                    <div style={getItemStyle(this.props)}>
                        { React.createElement(componentType) }
                    </div>
                );
            case ItemTypes.EXISTING_COMPONENT:
                if (!item.type) throw Error('\'item.type\' should be truthy');
                if (!item.id) throw Error('\'item.id\' should be truthy');
                if (!item.props) throw Error('\'item.props\' should be truthy');
                componentType = componentRegistry[item.type].component;
                return (
                    <div style={getItemStyle(this.props, item.innerOffset)}>
                        { React.createElement(componentType, item.props) }
                    </div>
                );
        }
    },

    render() {
        const { item, itemType, isDragging } = this.props;

        if (!isDragging) {
            return null;
        }


        return (
            <div style={layerStyles}>
                {this.renderItem(itemType, item, this.props)}
            </div>
        );
    }
});


function collect(monitor) {
    return {
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        currentOffset: monitor.getSourceClientOffset(),
        initialOffset: monitor.getInitialClientOffset(),
        sourceOffset: monitor.getInitialSourceClientOffset(),
        isDragging: monitor.isDragging()
    };
}

export default DragLayer(collect)(CustomDragLayer);