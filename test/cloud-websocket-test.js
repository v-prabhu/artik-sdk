/* Global Includes */
var testCase   = require('mocha').describe;
var pre        = require('mocha').before;
var preEach    = require('mocha').beforeEach;
var post       = require('mocha').after;
var postEach   = require('mocha').afterEach;
var assertions = require('mocha').it;
var assert     = require('chai').assert;
var validator  = require('validator');
var exec       = require('child_process').execSync;
var artik      = require('../lib/artik-sdk');


/* Test Specific Includes */
var cloud             = require('../src/cloud');
var auth_token        = process.env.WEBSOCKET_ACCESS_TOKEN;
var device_id         = process.env.WEBSOCKET_DEVICE_ID;
var use_se            = false;
var test_message      = process.env.WEBSOCKET_MESSAGE;

var conn = new cloud();

/* Test Case Module */
testCase('Cloud-Websockets', function() {

	this.timeout(10000);

	pre(function() {

	});

	testCase('#websocket_open_stream(), on(receive)', function() {

		assertions('Return callback event when the websocket is connected', function(done) {

			conn.once('receive', function(message) {
				console.log("Receive: " + message);
				assert.isNotNull(message);
				assert.equal(JSON.parse(message).data.code, "200");
				assert.equal(JSON.parse(message).data.message, "OK");
				done();
			});

			conn.websocket_open_stream(auth_token, device_id, use_se);
		});

	});

	testCase('#websocket_write_stream(), on(receive)', function() {

		assertions('Return callback event when the data is received', function(done) {

            if (!auth_token || !device_id || !auth_token.length || !device_id.length)
                this.skip();

			conn.on('receive', function(message) {
				console.log("Received: " + message);
				assert.isNotNull(message);
				assert.isNotNull(JSON.parse(message).data.mid);
				done();
			});

			conn.websocket_send_message(test_message);
		});

	});

	post(function() {
	});

});
