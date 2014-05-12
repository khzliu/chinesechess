var pomelo = require('pomelo');

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'chinesechess');
//app.defaultConfiguration();

var route = function(session, msg, app, cb) {
	var chinesechessServers = app.getServersByType('chinesechess');

	if(!chinesechessServers || chinesechessServers.length === 0) {
		cb(new Error('can not find chinesechess servers.'));
		return;
	}
        console.log('route channel:'+session.get('channel'));
        var index = session.get('channel') % chinesechessServers.length;
        var res = chinesechessServers[index];

	cb(null, res.id);
};

app.configure('production|development', function(){
	// route configures
	app.route('chinesechess', route);

	// filter configures
	app.filter(pomelo.timeout());
});

// start app
app.start();

process.on('uncaughtException', function (err) {
    console.error(' Caught exception: ' + err.stack);
});
