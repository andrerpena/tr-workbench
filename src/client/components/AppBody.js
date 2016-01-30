import React from 'react';
import ComponentsMenu from '../components/ComponentsMenu';
import Surface from '../components/Surface';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CustomDragLayer from './CustomDragLayer';

const headerHeight = 48;

var AppBody = React.createClass({

    propTypes: {
        actions: React.PropTypes.object.isRequired,
        mockups: React.PropTypes.array.isRequired
    },

    render: function () {
        return <div className="page-wrap">
            <div className="row row-no-padding">
                <div className="col-md-2">
                    <ComponentsMenu />
                </div>
                <div className="col-md-10">
                    {
                        this.props.mockups.map((m, i) => {
                            return <Surface key={`mockup-${i}`} actions={this.props.actions} mockup={m} clientHeight={this.state.windowSize.height - headerHeight} />;
                        })
                    }
                </div>
                <CustomDragLayer />
            </div>
        </div>
    },

    getInitialState: function() {
        return {
            windowSize: {
                width: 800,
                height: 600
            }
        }
    },

    componentWillMount: function() {
        this.updateDimensions();
    },

    componentDidMount: function() {
        window.addEventListener("resize", this.updateDimensions);
    },

    updateDimensions: function() {

        var w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
            height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

        this.setState({ windowSize: { width: width, height: height } });
    },

    componentWillUnmount: function() {
        window.removeEventListener("resize", this.updateDimensions);
    }
});

export default DragDropContext(HTML5Backend)(AppBody);