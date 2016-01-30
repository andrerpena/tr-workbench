import React from 'react';
import BootstrapInput from 'react-bootstrap/lib/Input';

var TextBox = React.createClass({

    propTypes: {
        width: React.PropTypes.number
    },

    getDefaultProps() {
        return {
            width: 200
        }
    },

    render: function () {

        return <div style={{ width: this.props.width}}>
        <BootstrapInput type="text" value="TextBox" onChange={ e=> {} }/>
            </div>
    }
});

export default TextBox;