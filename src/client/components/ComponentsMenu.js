import React from 'react';
import VNav from './VNav';

var ComponentsMenu = React.createClass({

    handleItemClick: function (node) {
        console.log(node);
    },

    render: function() {

        var menuData = {
            novajus: {
                display: 'Novajus',
                icon: 'check-square',
                nodes: {
                    processo: {
                        display: 'Matters',
                        nodes: {
                            processosPorStatus: {
                                display: 'Matters by status',
                                type: 'textbox'
                            }
                        }
                    },
                    button: {
                        type: 'button',
                        display: 'Button'
                    }
                }
            },
            rto: {
                display: 'Revista dos Tribunais',
                icon: 'check-square',
                nodes: {
                    textbox: {
                        type: 'textbox',
                        display: 'Legislations'
                    }
                }
            },
            proview: {
                display: 'Proview',
                icon: 'check-square',
                nodes: {
                    textbox: {
                        type: 'textbox',
                        display: 'My book updates'
                    }
                }
            }
        };

        return <VNav nodes={menuData} onItemClick={this.handleItemClick} />;
    }
});

export default ComponentsMenu;