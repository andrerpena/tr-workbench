import React from 'react';
import VNav from './VNav';

var ComponentsMenu = React.createClass({

    handleItemClick: function (node) {
        console.log(node);
    },

    render: function() {

        var menuData = {
            buttons: {
                display: 'Buttons',
                icon: 'check-square',
                nodes: {
                    button: {
                        type: 'button',
                        display: 'Button'
                    }
                }
            },
            forms: {
                display: 'Forms',
                icon: 'check-square',
                nodes: {
                    textbox: {
                        type: 'textbox',
                        display: 'Text input'
                    }
                }
            }
        };

        return <VNav nodes={menuData} onItemClick={this.handleItemClick} />;
    }
});

export default ComponentsMenu;