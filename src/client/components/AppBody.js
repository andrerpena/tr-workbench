import React from 'react';
import WidgetsMenu from './WidgetsMenu';
import WidgetContainer from '../components/WidgetContainer';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CustomDragLayer from './CustomDragLayer';
import Constants from '../Constants';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navbar from 'react-bootstrap/lib/Navbar';

var AppBody = React.createClass({

    propTypes: {
        actions: React.PropTypes.object.isRequired,
        dashboard: React.PropTypes.object.isRequired
    },

    render: function () {

        // calculate the containers class based on CONTAINERS_PER_PANEL

        return <div className="page-wrap">

            <div className="row row-no-padding">
                <div className="col-md-2">
                    <WidgetsMenu />
                </div>
                <div className="col-md-10">
                    <div className="app-body">

                        <Nav bsStyle="pills" activeKey={1}>
                            <NavItem eventKey={1} href="/home">Home</NavItem>
                            <NavItem eventKey={2} title="Item">Financial overview</NavItem>
                            <NavItem eventKey={3} >Matters overview</NavItem>
                        </Nav>

                        <div className="widgets-container-wrapper">
                            <div className="row row-no-padding">
                                {
                                    this.props.dashboard.panels.map((p, pi) => {
                                        return <div key={`panel-${pi}`}>
                                            {
                                                p.containers.map((c, ci) => {
                                                    return <div
                                                        className={`col-md-${Math.floor( 12 /p.containers.length)}`}
                                                        key={`container-${ci}-1`}>
                                                        <WidgetContainer panelIndex={pi} containerIndex={ci}
                                                                         widgets={c.widgets}/>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
});

export default DragDropContext(HTML5Backend)(AppBody);