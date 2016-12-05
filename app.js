'use strict';

var express = require('express');
var http = require('http');

var socket = require('./routes/socket.js');

var app = express();
var server = http.createServer(app);

// var session = require ('express-session');
// var mongoose = require ('mongoose');
// var connectMongo = require ('connect-mongo');
// var MongoStore = connectMongo(session);

/* Configuration */
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('port', 3000);

if (process.env.NODE_ENV === 'development') {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}


// mongoose.Promise = global.Promise;
// var db = mongoose.connection;
// console.log(db);
// db.on('error', console.error);
// db.once('open', () => {
//     console.log('Connected to mongod server');
//     cache.startWorker();
// });
//
// mongoose.connect(config.db_url);


/* Socket.io Communication */
var io = require('socket.io').listen(server);
io.sockets.on('connection', socket);

/* Start server */
server.listen(app.get('port'), function (){
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
