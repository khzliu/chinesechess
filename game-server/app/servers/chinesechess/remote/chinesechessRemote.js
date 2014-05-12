var GameRoom = require('../../../model/gameRoom');
var ChinesechessHandler = require('../handler/chinesechessHandler');
var Player = require('../../../model/player');
module.exports = function(app) {
  return new ChinesechessRemote(app);
};
var ROOMSIZE = 10;

var ChinesechessRemote = function(app) {
  this.app = app;
  this.channelService = app.get('channelService');
  this.handler = ChinesechessHandler(app);

};

ChinesechessRemote.prototype.login = function(channelId, name,uid, sid, cb) {
  console.log('remote login', 'server id:' + this.app.get('serverId'));
  console.log('remote login', 'channel id:' + channelId);
  var channel = this.channelService.getChannel(channelId, false);
  if (!channel) {
    channel = this.initChannel(channelId);
  }
  channel.add(uid, sid);
  channel.userMap[uid] = Player(name,uid,sid);
  cb(ChinesechessHandler.getRoomStatus(channel));
}

ChinesechessRemote.prototype.initChannel = function(channelId) {
  var channel = this.channelService.getChannel(channelId, true);
  channel.rooms = [];
  for (var i = 0; i < ROOMSIZE; i++) {
    channel.rooms[i] = GameRoom(i, this.channelService);
  }
  channel.userMap = {};
  return channel;
}

ChinesechessRemote.prototype.kick = function(channelId, uid,sid) {
  var channel = this.channelService.getChannel(channelId, false);
  var player = channel.userMap[uid];
  channel.leave(uid, sid);
  this.handler.doExit(channel, player);
}