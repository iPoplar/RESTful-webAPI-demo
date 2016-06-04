var express = require("express");
var bodyParser = require('body-parser');

var file = require("./file");
var route_items = require("./routes/getAllItems");
var route_simple_items = require("./routes/getItem");
var route_post_item = require("./routes/insertItem");
var route_delete_item = require("./routes/deleteItem");
var route_update_item = require("./routes/updateItem");

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/', route_items);
app.use('/items', route_simple_items);
app.use('/items', route_post_item);
app.use('/items', route_delete_item);
app.use('/items', route_update_item);


app.listen(3000);

module.exports = app;