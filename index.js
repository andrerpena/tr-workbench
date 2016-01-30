var express = require('express');
var colors = require('colors');

var expressReactViews = require('express-react-views');
var app  = express();

app.set('views', './src/server/views');
app.set('view engine', 'jsx');
app.engine('jsx', expressReactViews.createEngine({ beautify: true }));

app.use(express.static('./dist'));

// routes
var def = require('./src/server/routes/app');
app.get('*', def);

app.listen(3000, function() {
    console.log(colors.green(`Monomock is running on port 3000. NODE_ENV: ${process.env.NODE_ENV}`));
});
