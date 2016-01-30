import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header';
import AppBody from '../components/AppBody';
import * as MockupActions from '../actions/dashboadActions';

function mapStateToProps(state) {
    return {
        dashboard: state.dashboard
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(MockupActions, dispatch)
}


var App = React.createClass({

    propTypes: {
        dashboard: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <div className="container-fluid">
                <Header/>
                <AppBody
                    actions={
                        {
                            addComponent: this.props.addComponent,
                            moveComponent: this.props.moveComponent,
                            setSelection: this.props.setSelection,
                            updateComponentSize: this.props.updateComponentSize
                        }
                    }
                    mockups={this.props.mockups}
                />
            </div>
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);