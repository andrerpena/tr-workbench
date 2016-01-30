var React = require("react");
import ReactDom from 'react-dom';
import Icon from './Icon';
import menuHelper from '../lib/menuHelper';

import { ItemTypes } from '../Constants';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const componentSource = {
    beginDrag(props, monitor, component) {
        return props.node;
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

var VNavItem = React.createClass({

    PropTypes: {
        node: React.PropTypes.object.isRequired,
        onClick: React.PropTypes.func,
        connectDragSource: React.PropTypes.func.isRequired,
        isDragging: React.PropTypes.bool.isRequired
    },

    getInitialState: function () {
        return {
            collapsed: false
        }
    },

    handleOnClick: function () {
        if (this.props.node.nodes) {
            this.setState({collapsed: !this.state.collapsed});
        }
        if (this.props.onClick) {
            this.props.onClick(this.props.node);
        }
    },

    componentDidMount() {
        this.props.connectDragPreview(getEmptyImage(), {
            captureDraggingState: true
        });
    },

    /**
     * ReactJS rendering function.
     * @returns {XML}
     */
    render: function () {

        const { connectDragSource, isDragging } = this.props;

        let childrenWrapper = null;
        if (this.props.node.nodes && this.state.collapsed === false) {
            childrenWrapper = <div className="vnav-children-wrapper">
                {menuHelper.createVNavItemsFromNodes(this.props.node.nodes, this.props.onClick)}
            </div>;
        }

        let vNavIconTextClass = this.props.node.icon ? "vnav-item-text with-icon" : "vnav-item-text";
        let plusWrapper = this.props.node.nodes ? <span className="plus-wrapper">
             <Icon icon={this.state.collapsed ? "plus" : "minus"}/>
        </span> : null;

        let result = <div className="vnav-item-wrapper">
            <div className="vnav-item" onClick={this.handleOnClick}>
                {this.props.node.icon ? <Icon icon={this.props.node.icon}/> : null }
                <span className={vNavIconTextClass}>{this.props.node.display}</span>
                {plusWrapper}
            </div>
            {childrenWrapper}
        </div>;

        return this.props.node.nodes ? result : connectDragSource(result);
    }
});

export default DragSource(ItemTypes.ADD_COMPONENT, componentSource, collect)(VNavItem);