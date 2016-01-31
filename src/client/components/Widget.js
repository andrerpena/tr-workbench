import React from 'react';

var Widget = React.createClass({
    render: function() {
        return <div className="widget">
            <div className="widget-header">
                Widget
            </div>
            <div className="widget-body">
            </div>
        </div>;
    }
});

export default Widget;