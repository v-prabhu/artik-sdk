var events = require('events');
var util = require('util');
var cloud = require('../lib/artik-sdk').cloud;

var Cloud = function() {
	events.EventEmitter.call(this);
	this.cloud = cloud();
}

util.inherits(Cloud, events.EventEmitter);

module.exports = Cloud;

Cloud.prototype.websocket_open_stream = function websocket_open_stream(access_token, device_id, use_se) {
	var _ = this;
	return this.cloud.websocket_open_stream(access_token, device_id, use_se,
											function (message) {
												_.emit('receive', message);
											});
};

Cloud.prototype.websocket_send_message = function websocket_send_message(message) {
	return this.cloud.websocket_send_message(message);
};

Cloud.prototype.websocket_close_stream = function websocket_close_stream() {
	return this.cloud.websocket_close_stream();
};
