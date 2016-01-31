import React from 'react';
import VNav from './VNav';

var WidgetsMenu = React.createClass({

    handleItemClick: function (node) {
        console.log(node);
    },

    render: function() {

        var menuData = {
            novajus: {
                display: 'Novajus',
                icon: 'check-square',
                nodes: {
                    processosPorStatus: {
                        display: 'Matters by status',
                        id: 'textbox'
                    }
                }
            },
            rto: {
                display: 'Revista dos Tribunais',
                icon: 'check-square',
                nodes: {
                    textbox: {
                        id: 'textbox',
                        display: 'Legislations'
                    }
                }
            },
            proview: {
                display: 'Proview',
                icon: 'check-square',
                nodes: {
                    textbox: {
                        id: 'textbox',
                        display: 'My book updates'
                    }
                }
            }
        };

        return <VNav nodes={menuData} onItemClick={this.handleItemClick} />;
    }
});

export default WidgetsMenu;