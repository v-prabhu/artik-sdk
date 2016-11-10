var cloud = require('../src/cloud');
var artik = require('../lib/artik-sdk');

var access_token = '';
var device_id = '';
var use_se = false;
var test_message = '{"actions":{"name":"setOn"}}';

var conn = new cloud();

conn.on('receive', function(message) {
	console.log("received: " + message);
});

conn.websocket_open_stream(access_token, device_id, use_se);

process.on('SIGINT', function () {
    console.log("Close stream");
    conn.websocket_close_stream();
    process.exit(0);
});

setInterval(function () {
	conn.websocket_send_message(test_message);
}, 1000);

setTimeout(function() {
	console.log("Time out, close stream");
	conn.websocket_close_stream();
	process.exit(0);
}, 5500);
