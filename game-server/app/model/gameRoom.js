module.exports = function(roomId, channelService) {
     return new GameRoom(roomId, channelService);
};

var GameRoom = function(roomId, channelService) {
     this.roomId = roomId;
     this.channelService = channelService;
     this.status='空房间';
     this.host = null;
     this.guest = null;
};

/**
 * Api function
 */
GameRoom.prototype.begin = function(player) {
     this.currentPlayer = this.host;
     if(player == this.host)
          this.sendChessBegin(this.guest);
     else if(player == this.guest)
          this.sendChessBegin(this.host);
}

GameRoom.prototype.playChess = function(player, coord, piece) {
     if (this.status != '游戏中') return {
          code: 500,
          msg: "游戏尚未开始!"
     };
     //var player = this.getPlayer(name);
     if (player != this.currentPlayer) return {
          code: 500,
          msg: "尚未轮到您走棋!"
     };
     var otherPlayer;
     if (player == this.host) otherPlayer = this.guest;
     else if (player == this.guest) otherPlayer = this.host;
     this.currentPlayer = otherPlayer;
     var chessParam = {
          route: 'path',
          coord: coord,
          piece: piece
     };
     this.pushMessageToPlayer(chessParam, otherPlayer);
     return {
          code: 200,
     };
}
GameRoom.prototype.getRoomStatus = function() {
     if(!this.host)
          return [this.roomId,'',this.status];
     else{
		 if(!this.guest)
		    return [this.roomId,'玩家1：'+this.host.name,this.status];
		else
		    return [this.roomId,'玩家1：'+this.host.name+', '+'玩家2：'+this.guest.name,this.status]; 
		 }      
}


GameRoom.prototype.sendGuestJoin = function() {
     var param = {
          route: 'onChess',
          cmd: 'guestJoin',
          guestName: this.guest.name
     };
     this.pushMessageToPlayer(param, this.host);
}
GameRoom.prototype.sendWinner = function(winnerName) {
    var param = {
         route: 'onWin',
         player: winnerName
    };
    this.pushMessageToPlayer(param, this.host);
    this.pushMessageToPlayer(param, this.guest);

}
GameRoom.prototype.sendChessBegin = function(player) {
     var param = {
          route: 'onChess',
          cmd: 'chessBegin'
     };
     this.pushMessageToPlayer(param, player);
}

GameRoom.prototype.sendChessReset = function(targertPlayer, resetPlayer) {
     var param = {
          route: 'onChess',
          cmd: 'chessReset',
          name:resetPlayer.name
     };
     this.pushMessageToPlayer(param, targertPlayer);
}

GameRoom.prototype.sendPlayerExit = function(name, player) {
     var param = {
          route: 'onChess',
          cmd: 'playerExit',
          name: name
     };
     this.pushMessageToPlayer(param, player);
}


/**
 * Util function
 */
GameRoom.prototype.getPlayer = function(name) {
     if (name == this.host.name) return this.host;
     else if (name == this.guest.name) return this.guest;
     else
     return null;
}

GameRoom.prototype.pushMessageToPlayer = function(param, player) {
     this.channelService.pushMessageByUids(param, player.getUidSid());
}
