var pomelo = window.pomelo;
var queryhost = "192.168.6.1";
var queryPort = "3014";
var connectHost = "-1";
var connectPort = "-1";
var myrole;
var table;
var playing = false;
var userName;
var otherplayer;
var guest;
var room = -20130820;
var type;
var previousroom = -20130830;
var islogout;
var channelId;
var ipaddr = 'http://192.168.6.1:3002';
var screenwidth = window.innerWidth

	function chessHandler(data) {
		switch (data.cmd) {
			case 'guestJoin':
				$("#startBtn").button("enable");
				$("#restartBtn").button("disable");
				document.getElementById("wName").innerHTML = data.guestName;
				otherplayer = data.guestName;
				if (confirm(data.guestName + ' 进来了！！！是否开始游戏？')) {
					startGame();
				}
				break;

			case 'playerExit':
				alert(data.name + ' 离开了！!');
				$("#startBtn").button("disable");
				$("#restartBtn").button("disable");
				if (myrole == 'guest') {
					document.getElementById("bName").innerHTML = userName;
					type = "red";
				}

				document.getElementById("wName").innerHTML = "黑方玩家";
				playing = false;
				myrole = 'host';
				chess.exit();
				break;

			case 'chessBegin':
				$("#startBtn").button("disable");
				$("#restartBtn").button("enable");
				alert("游戏开始！！");
				playing = true;
				chess.start();
				break;

			case 'chessReset':
				if (confirm(data.name + ' 请求重新开始游戏?')) {
					startGame();
				}
				break;
		}
	}

	function startGame() {
		pomelo.request("chinesechess.chinesechessHandler.begin", {
			room: room
		}, function(data) {
			$("#startBtn").button("disable");
			$("#restartBtn").button("enable");
			playing = true;
			chess.start();
		});
	}

	function playChess(coord, piece) {
		pomelo.request("chinesechess.chinesechessHandler.chess", {
			coord: coord.cid,
			piece: piece.cid,
			room: room
		}, function(data) {
			if (data.code == 500)
				alert(data.msg);
		});
	}

	function updateRoomStatus(data) {
		table.fnClearTable();
		table.fnAddData(data.rooms, true);
		$("#example tbody tr").click(function() {
			createOrJoin(table.fnGetPosition(this));
		});
	}

	function createOrJoin(op) {
		room = op;
		pomelo.request("chinesechess.chinesechessHandler.createorjoin", {
			room: room
		}, function(data) {
			_createOrJoin(data);
			if (data.code == 200) {
				$("#startBtn").attr("disabled", true);
				$("#restartBtn").attr("disabled", true);
				$("#exitBtn").attr("disabled", false);
				window.location.href = "#chessboard";
			}
		});
	}

	function _createOrJoin(data) {
		if (data.code == 200) {
			window.previousroom = room;
			host = data.msg;
			if (host == userName) {
				myrole = "host";
				document.getElementById("bName").innerHTML = userName;
				type = 'red';
			} else {
				otherplayer = host;
				myrole = "guest"
				document.getElementById("wName").innerHTML = userName;
				document.getElementById("bName").innerHTML = host;
				type = 'blue';
			}
		} else if (data.code == 500) {
			alert(data.msg);
		}
	}

	function login(channelId, username) {
		pomelo.request("connector.entryHandler.login", {
				username: username,
				channelId: channelId
			},
			function(data) {
				if (data.code == 200) {
					islogout = false;
					userName = username;
					$('#demo')
						.html(
							'<table cellpadding="0" class="display" id="example"></table>');
					table = $('#example').dataTable({
						"aaData": data.rooms,
						"aoColumns": [{
							"sTitle": "房间"
						}, {
							"sTitle": "玩家"
						}, {
							"sTitle": "状态"
						}]
					});
					$("#example tbody tr").click(function() {
						createOrJoin(table.fnGetPosition(this));
					});
					uname1.innerHTML = "你好,"+userName;
					uname2.innerHTML = "你好,"+userName;
					window.location.href = "#roomlist";
				} else {
					alert(username + '已经在这个频道！！！');
					pomelo.disconnect();
					pomelo.init({
						host: queryhost,
						port: queryPort,
						log: true
					}, null);
					if (location.href != ipaddr + "/chinesechess.html")
						window.location.href = ipaddr + "/chinesechess.html";
				}
			});

	}

	function exitGame() {
		pomelo.request("chinesechess.chinesechessHandler.exit", {
			room: room
		}, function(data) {
			if (data.code == 200) {
				playing = false;
				chess.start();
				chess.turn(true);
				room = -20130820;
				$("#restartBtn").button("disable");
				$("#startBtn").button("disable");
				document.getElementById("bName").innerHTML = "红方玩家";
				document.getElementById("wName").innerHTML = "黑方玩家";
				chess.exit();
				if (location.href != ipaddr + "/chinesechess.html#roomlist")
					window.location.href = ipaddr + "/chinesechess.html#roomlist";
			}
		});
	}

	function init() {
		pomelo.init({
				host: queryhost,
				port: queryPort,
				log: true
			},
			function() {
				if (location.href != ipaddr + '/chinesechess.html')
					window.location.href = ipaddr + '/chinesechess.html';
			});
	}

$(document).ready(function() {
	var board = $("#chesscontent");
	if (screenwidth < 614) {
		var z = screenwidth / 614;
		//board.css("zoom", z);
		board.css("transform", "scale(" + z + ")");
		board.css("transform-origin", "left top");
	}
	init();
	pomelo.on('onWin', function(data) {
		if (myrole == "host")
			$("#startBtn").button("enable");
		$("#restartBtn").button("disable");
		chess.exit();
		playing = false;
		if (data.player == type)
			alert(otherplayer + '获胜!');
		else
			alert(userName + "获胜！")
	});

	pomelo.on('path', function(data) {
		var coord = coords.get(data.coord);
		var piece = pieces.get(data.piece);
		piece._walk(coord);
	});
	pomelo.on('onStatus', updateRoomStatus);
	pomelo.on('onChess', chessHandler);
	window.onhashchange = function() {
		if (location.href == ipaddr + '/chinesechess.html') {
			pomelo.disconnect();
			init();
			islogout = true;;
		}
		if (location.href == ipaddr + '/chinesechess.html#roomlist') {
			if (connectPort == "-1" || connectHost == "-1")
				window.location.href = ipaddr + "/chinesechess.html";
			pomelo.request("chinesechess.chinesechessHandler.refreshRoomStatus", {}, function(data) {});
			if (!islogout) {
				if (room == -20130820)
					return;
				else {
					if (playing) {
						if (!confirm(" 您正在游戏中，确定退出？？")) {
							window.location.href = "#chessboard";
							return;
						}
					}
					exitGame();
				}
			}
			if (islogout) {
				pomelo.init({
						host: connectHost,
						port: connectPort,
						log: true
					},
					function() {
						pomelo.request("connector.entryHandler.login", {
								username: userName,
								channelId: channelId
							},
							function(data) {
								if (data.code == 200) {
									islogout = false;
								} else {
									alert(userName + ' 已经在这个频道了！！');
									pomelo.disconnect();
									pomelo.init({
											host: queryhost,
											port: queryPort,
											log: true
										},
										null);
									if (location.href != ipaddr + "/chinesechess.html")
										window.location.href = ipaddr + "/chinesechess.html";
								}
							}
						);
					}
				);
			}
		}

		if (location.href == ipaddr + '/chinesechess.html#chessboard') {
			if (previousroom == -20130830)
				window.location.href = ipaddr + "/chinesechess.html";
			if (room != -20130820)
				return;
			room = window.previousroom;
			pomelo.request("chinesechess.chinesechessHandler.createorjoin", {
					room: room
				},
				function(data) {
					_createOrJoin(data);
					if (data.code == 200) {
						$("#startBtn").button("disable");
						$("#restartBtn").button("disable");
						$("#exitBtn").button("enable");
					} else if (data.code == 500) {
						$.mobile.changePage("#roomlist", {
							changeHash: true
						});
					}
				}
			);

		}
	}

	$("#startBtn").click(function() {
		startGame();
	});

	$("#restartBtn").click(function() {
		pomelo.request("chinesechess.chinesechessHandler.reset", {
			room: room
		}, function(data) {
			if (data.code == 500)
				alert(data.msg);

		});
	});

	$("#exitBtn").click(function() {
		exitGame();
	});

	$("#loginBtn").click(function() {
		channelId = $("#channels").val();
		var un = $("#username").val();
		roomtitle.innerHTML = "中国象棋-"+$("#channels").find("option:selected").text();
		if (un != '') {
			if(un.replace(/(^s*)|(s*$)/g, "").length <=5){
							pomelo.request("gate.gateHandler.queryEntry", {
				channelId: channelId
			}, function(queryData) {
				connectHost = queryData.host;
				connectPort = queryData.port;
				pomelo.disconnect();
				pomelo.init({
					host: queryData.host,
					port: queryData.port,
					log: true
				}, function() {
					if (queryData.code == 200) {
						login(channelId, un);
					} else {
						alert(queryData.msg);
					}
				});
			});
			}
			else{
				alert("用户名不能超过5个字符");
			}

		} else {
			alert("用户名不能为空！！");
		}
	});

});
