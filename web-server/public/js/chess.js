var RULE = {

	'che' : {
		pos : [ '0_0', '8_0' ],
		text : '车',
		key : 'che',
		path : function(pos, type) {
			var x = pos.split('_')[0] - 0, y = pos.split('_')[1] - 0, _c, _x, _y, _step = [], _eat = [];
			_x = x;
			_y = y;
			while (_y++ < 9) {
				_c = _x + '_' + _y;
				if (coords.get(_c)) {
					if (!coords.get(_c).get('belong')) {
						_step.push(_c);
					} else if (coords.get(_c).get('belong').get('belong') != type) {
						_eat.push(_c);
						break;
					} else {
						break;
					}
				} else {
					break;
				}
			}
			_x = x;
			_y = y;
			while (_y-- > 0) {
				_c = _x + '_' + _y;
				if (coords.get(_c)) {
					if (!coords.get(_c).get('belong')) {
						_step.push(_c);
					} else if (coords.get(_c).get('belong').get('belong') != type) {
						_eat.push(_c);
						break;
					} else {
						break;
					}
				} else {
					break;
				}
			}

			_x = x;
			_y = y;
			while (_x-- > 0) {
				_c = _x + '_' + _y;
				if (coords.get(_c)) {
					if (!coords.get(_c).get('belong')) {
						_step.push(_c);
					} else if (coords.get(_c).get('belong').get('belong') != type) {
						_eat.push(_c);
						break;
					} else {
						break;
					}
				} else {
					break;
				}
			}

			_x = x;
			_y = y;
			while (_x++ < 8) {
				_c = _x + '_' + _y;
				if (coords.get(_c)) {
					if (!coords.get(_c).get('belong')) {
						_step.push(_c);
					} else if (coords.get(_c).get('belong').get('belong') != type) {
						_eat.push(_c);
						break;
					} else {
						break;
					}
				} else {
					break;
				}
			}

			return [ _step, _eat ];
		}
	},
	'ma' : {
		pos : [ '1_0', '7_0' ],
		text : '马',
		key : 'ma',
		path : function(pos, type) {
			var x = pos.split('_')[0] - 0, y = pos.split('_')[1] - 0, _c, _x, _y, _step = [], _eat = [];
			var part = [ [ (x + 2) + '_' + (y + 1), (x + 1) + '_' + (y) ],
					[ (x + 1) + '_' + (y + 2), (x) + '_' + (y + 1) ],
					[ (x - 1) + '_' + (y + 2), (x) + '_' + (y + 1) ],
					[ (x - 2) + '_' + (y + 1), (x - 1) + '_' + (y) ],
					[ (x + 2) + '_' + (y - 1), (x + 1) + '_' + (y) ],
					[ (x + 1) + '_' + (y - 2), (x) + '_' + (y - 1) ],
					[ (x - 1) + '_' + (y - 2), (x) + '_' + (y - 1) ],
					[ (x - 2) + '_' + (y - 1), (x - 1) + '_' + (y) ] ];
			while (_c = part.pop()) {
				if (coords.get(_c[0]) && !coords.get(_c[1]).get('belong')) {
					if (!coords.get(_c[0]).get('belong')) {
						_step.push(_c[0]);
					} else if (coords.get(_c[0]).get('belong').get('belong') != type) {
						_eat.push(_c[0]);
					}
				}
			}
			return [ _step, _eat ];
		}
	},
	'xiang' : {
		pos : [ '2_0', '6_0' ],
		text : '相',
		key : 'ma',
		path : function(pos, type) {
			var x = pos.split('_')[0] - 0, y = pos.split('_')[1] - 0, _c, _x, _y, _step = [], _eat = [], part = [
					[ (x + 2) + '_' + (y + 2), (x + 1) + '_' + (y + 1) ],
					[ (x + 2) + '_' + (y - 2), (x + 1) + '_' + (y - 1) ],
					[ (x - 2) + '_' + (y + 2), (x - 1) + '_' + (y + 1) ],
					[ (x - 2) + '_' + (y - 2), (x - 1) + '_' + (y - 1) ] ];
			while (_c = part.pop()) {
				if (coords.get(_c[0]) && !coords.get(_c[1]).get('belong')) {
					if (!coords.get(_c[0]).get('belong')) {
						_step.push(_c[0]);
					} else if (coords.get(_c[0]).get('belong').get('belong') != type) {
						_eat.push(_c[0]);
					}
				}
			}
			return [ _step, _eat ];
		}
	},
	'shi' : {
		pos : [ '3_0', '5_0' ],
		text : '士',
		key : 'shi',
		path : function(pos, type) {
			var x = pos.split('_')[0] - 0, y = pos.split('_')[1] - 0, _c, _x, _y, _step = [], _eat = [], part;
			var part = [ (x + 1) + '_' + (y + 1), (x + 1) + '_' + (y - 1),
					(x - 1) + '_' + (y + 1), (x - 1) + '_' + (y - 1) ];
			while (_c = part.pop()) {
				if (coords.get(_c) && (3 <= _c[0]) && (_c[0] <= 5)) {
					if ((type == 'blue') && (0 <= _c[2]) && (_c[2] <= 2)) {
						if (!coords.get(_c).get('belong')) {
							_step.push(_c);
						} else if (coords.get(_c).get('belong').get('belong') != type) {
							_eat.push(_c);
						}
					} else if ((7 <= _c[2]) && (_c[2] <= 9)) {
						if (!coords.get(_c).get('belong')) {
							_step.push(_c);
						} else if (coords.get(_c).get('belong').get('belong') != type) {
							_eat.push(_c);
						}
					}
				}
			}
			return [ _step, _eat ];
		}
	},
	'jiang' : {
		pos : [ '4_0' ],
		text : '将',
		key : 'jiang',
		path : function(pos, type) {
			var x = pos.split('_')[0] - 0, y = pos.split('_')[1] - 0, _c, _x, _y, _step = [], _eat = [], part;
			var part = [ (x) + '_' + (y + 1), (x) + '_' + (y - 1),
					(x + 1) + '_' + (y), (x - 1) + '_' + (y) ];
			while (_c = part.pop()) {
				if (coords.get(_c) && (3 <= _c[0]) && (_c[0] <= 5)) {
					if ((type == 'blue') && (0 <= _c[2]) && (_c[2] <= 2)) {
						if (!coords.get(_c).get('belong')) {
							_step.push(_c);
						} else if (coords.get(_c).get('belong').get('belong') != type) {
							_eat.push(_c);
						}
					} else if ((7 <= _c[2]) && (_c[2] <= 9)) {
						if (!coords.get(_c).get('belong')) {
							_step.push(_c);
						} else if (coords.get(_c).get('belong').get('belong') != type) {
							_eat.push(_c);
						}
					}
				}
			}
			return [ _step, _eat ];
		}
	},
	'pao' : {
		pos : [ '1_2', '7_2' ],
		text : '炮',
		key : 'pao',
		path : function(pos, type) {
			var x = pos.split('_')[0] - 0, y = pos.split('_')[1] - 0, _c, _x, _y, _step = [], _eat = [], _s = false;
			_x = x;
			_y = y;
			_s = false;
			_d = false;
			while (_y++ < 9) {
				_c = _x + '_' + _y;
				if (coords.get(_c)) {
					if (!_s && !coords.get(_c).get('belong')) {
						_step.push(_c);
					} else if (!_d && coords.get(_c).get('belong')) {
						_s = true;
						_d = true;
					} else if (_d
							&& _s
							&& coords.get(_c).get('belong')
							&& (coords.get(_c).get('belong').get('belong') != type)) {
						_eat.push(_c);
						break;
					} else {
						_s = true;
					}
				} else {
					break;
				}
			}
			_x = x;
			_y = y;
			_s = false;
			_d = false;
			while (_y-- > 0) {
				_c = _x + '_' + _y;
				if (coords.get(_c)) {
					if (!_s && !coords.get(_c).get('belong')) {
						_step.push(_c);
					} else if (!_d && coords.get(_c).get('belong')) {
						_s = true;
						_d = true;
					} else if (_d
							&& _s
							&& coords.get(_c).get('belong')
							&& (coords.get(_c).get('belong').get('belong') != type)) {
						_eat.push(_c);
						break;
					} else {
						_s = true;
					}
				} else {
					break;
				}
			}

			_x = x;
			_y = y;
			_s = false;
			_d = false;
			while (_x-- > 0) {
				_c = _x + '_' + _y;
				if (coords.get(_c)) {
					if (!_s && !coords.get(_c).get('belong')) {
						_step.push(_c);
					} else if (!_d && coords.get(_c).get('belong')) {
						_s = true;
						_d = true;
					} else if (_d
							&& _s
							&& coords.get(_c).get('belong')
							&& (coords.get(_c).get('belong').get('belong') != type)) {
						_eat.push(_c);
						break;
					} else {
						_s = true;
					}
				} else {
					break;
				}
			}

			_x = x;
			_y = y;
			_s = false;
			_d = false;
			while (_x++ < 8) {
				_c = _x + '_' + _y;
				if (coords.get(_c)) {
					if (!_s && !coords.get(_c).get('belong')) {
						_step.push(_c);
					} else if (!_d && coords.get(_c).get('belong')) {
						_s = true;
						_d = true;
					} else if (_d
							&& _s
							&& coords.get(_c).get('belong')
							&& (coords.get(_c).get('belong').get('belong') != type)) {
						_eat.push(_c);
						break;
					} else {
						_s = true;
					}
				} else {
					break;
				}
			}

			return [ _step, _eat ];
		}
	},
	'zhu' : {
		pos : [ '0_3', '2_3', '4_3', '6_3', '8_3' ],
		text : '卒',
		key : 'zhu',
		path : function(pos, type) {
			var x = pos.split('_')[0] - 0, y = pos.split('_')[1] - 0, _c, _x, _y, _step = [], _eat = [];

			if (type == 'blue') {
				if (y < 5) {
					part = [ (x) + '_' + (y + 1) ];
				} else {
					part = [ (x) + '_' + (y + 1), (x + 1) + '_' + (y),
							(x - 1) + '_' + (y) ];
				}
			} else {
				if (y < 5) {
					part = [ (x) + '_' + (y - 1), (x + 1) + '_' + (y),
							(x - 1) + '_' + (y) ];
				} else {
					part = [ (x) + '_' + (y - 1) ];
				}
			}

			while (_c = part.pop()) {
				if (coords.get(_c)) {
					if (!coords.get(_c).get('belong')) {
						_step.push(_c);
					} else if (coords.get(_c).get('belong').get('belong') != type) {
						_eat.push(_c);
					}
				}
			}
			return [ _step, _eat ];
		}
	}
};
var mouseBox;
/*
 * Part 可走点，选中一个棋子后，计算哪些坐标点可走
 */
var Part = Backbone.Model.extend({});

/*
 * PartEl 可走点视图
 */
var PartEl = Backbone.View.extend({

	render : function() {
		this.$el.addClass('part');
		var coord = this.model.get('coord').get('coord');
		this.$el.css({
			top : coord[1],
			left : coord[0]
		});
		return this;
	},

	events : {
		'click' : 'walk'
	},

	initialize : function() {
		this.listenTo(this.model, 'remove', this.remove);
	},

	walk : function() {
		console.log("click");
		if (this.model.get('eat')) {
			var piece = this.model.get('coord').get('belong');
			function _over() {
				chess.trigger('over', piece);
			}
			setTimeout(_over, 600);
			piece.die();
			this.model.get('coord').unset('belong');
		}
		this.model.get('referTo').walk(this.model.get('coord'));
		parts.clear();
	}

});

/*
 * Parts 可走点集合
 */
var Parts = Backbone.Collection.extend({

	clear : function() {
		while (this.length) {
			this.pop();
		}
	}
})

var parts = new Parts;
/*
 * piece 棋子
 */
var Piece = Backbone.Model.extend({

	//据该子规则计算出可走路径及可吃子
	path : function() {
		var pos = this.get('coord').get('id');
		var _path = this.get('path');

		var ret = _path(pos, this.get('belong')), _part;
		while (_part = ret[0].shift()) {
			var model = new Part({
				pos : _part,
				coord : coords.get(_part),
				referTo : this
			});
			parts.add(model);
			var view = new PartEl({
				model : model
			});
			chess.$el.append(view.render().el);
		}
		while (ret[1] && (_part = ret[1].shift())) {
			var model = new Part({
				pos : _part,
				eat : true,
				coord : coords.get(_part),
				referTo : this
			});
			parts.add(model);
			var view = new PartEl({
				model : model
			});
			chess.$el.append(view.render().el);
		}

	},

	die : function() {
		this.unset('coord');
		this.set('die', true);
		this.trigger('die');
	},

	reset : function() {
		this.unset('coord');
		this.set('die',false);
	},

	//走子，修改棋子坐标到新指定点，并调用修改玩家状态
	walk : function(coord) {
		_getPath(coord, this);
		this.get('coord').unset('belong');
		coord.set('belong', this);
		this.set({
			coord : coord
		});
		this.collection.lastActive = this;
		chess.turn(this.get('belong'));
	},

	_walk : function(coord) {
		if (coord.get('belong')) {
			coord.get('belong').die();

		}
		this.get('coord').unset('belong');
		coord.set('belong', this);
		this.set({
			coord : coord
		});
		this.collection.lastActive = this;
		chess.turn(this.get('belong'));
		chess._enable = true;
	},

	back : function() {
		parts.clear();
		var coord = this._previousAttributes.coord;
		this.get('coord').unset('belong');
		coord.set('belong', this);
		this.set({
			coord : coord,
			pos : coord.id
		});
		this.collection.lastActive = this.get('belong');
	},

	init : function() {
		this.set('coord', coords.get(this.get('pos')));
		coords.get(this.get('pos')).set('belong', this);
		this.trigger('init');
	}
});

/*
 * PieceEl 棋子视图
 */
var PieceEl = Backbone.View
		.extend({

			template : _.template('<div class="pieceIn"><%- text %></div>'),

			render : function(xy) {
				var coord = coords.get(this.model.get('pos')).get('coord');
				var num = (this.model.collection.length - 1) % 16;
				this.$el.addClass('piece').addClass(this.model.get('belong'))
						.html(this.template(this.model.toJSON()));
				this.$el.css({
					top : xy[1] + (30 * (Math.floor(num / 4)) * 1.6),
					left : xy[0] + (30 * (num % 4) * 1.6),
					'transition-duration' : '.5s'
				});
				return this;
			},

			initialize : function() {
				this.listenTo(this.model, 'change', this.walk);
				this.listenTo(this.model, 'die', this.die);
				this.listenTo(this.model, 'init', this.init);
			},

			events : {
				'click' : 'getPath'
			},

			die : function() {
				var x = 790, y = (this.model.get('belong') == 'blue') ? 20
						: 390, num = this.model.collection.where({
					die : true,
					belong : this.model.get('belong')
				}).length - 1;
				this.$el.css({
					top : x + (30 * (Math.floor(num / 4)) * 1.6),
					left : y + (30 * (num % 4) * 1.6)
				});
				return this;
			},

			walk : function() {
				try {
					var coord = this.model.get('coord').get('coord');
				} catch (e) {
					return;
				}
				this.$el.css({
					top : coord[1],
					left : coord[0]
				});
				Tips(coord[1],coord[0]);
				this.$el.removeClass('current');
				delete this.model.collection.lastChoose;
				(chess._enable === true) && (chess._enable = false);
			},

			init : function() {
				var coord = coords.get(this.model.get('pos')).get('coord');
				this.$el.css({
					top : coord[1],
					left : coord[0]
				});
			},

			getPath : function() {
				if (!chess._enable) {
					return;
				}
				chess._enable = true;
				var lastActive = this.model.collection.lastActive;
				if((typeof lastActive=='undefined')&&(type=='blue')){
					return;
				}
				if (typeof lastActive == 'string') {
					if (this.model.get('belong') !== lastActive) {
						return;
					}
				} else if (lastActive
						&& lastActive.get('belong') === this.model
								.get('belong')) {
					return;
				}
				if (this.model.get('belong') !== type) {
					return;
				}
				if(!playing)
					return;
				this.model.collection.lastChoose
						&& this.model.collection.lastChoose
								.removeClass('current');
				this.$el.addClass('current');
				this.model.collection.lastChoose = this.$el;
				parts.clear();
				this.model.path();
			}

		});

/*
 * pieces 玩家
 */

var Pieces = Backbone.Collection.extend({

	model : Piece,

	restart : function() {
		this.forEach(function(v) {
			v.reset();
		})
		delete this.lastActive;
	}

});

var pieces = window.pieces = new Pieces;

/*
 * coord 棋盘单个点
 */
var Coord = Backbone.Model.extend({

});

/*
 * coords 棋盘点集合
 */
var Coords = Backbone.Collection.extend({

	model : Coord,

	restart : function() {
		this.forEach(function(v) {
			v.unset('belong');
		});
	}

});

var coords = window.coords = new Coords;

/*
 * Chess 棋盘
 */
var Chess = Backbone.View.extend({

	_enable : 1,

	el : '#container',

	back : function() {
		pieces.lastActive && pieces.lastActive.back();
	},

	start : function() {
		this.reset();
		this.turn('blue');
		pieces.forEach(function(model) {
			model.init();
		})
				if(mouseBox){
			mouseBox.style.display = "none";
		}
	},

	rebox : function() {

	},

	init : function() {
		var me = this;

		//据 RULE 生成双方棋子
		function render(toggle) {
			for ( var key in RULE) {
				var value = RULE[key], _value;
				for ( var i = 0, c; c = value.pos[i]; i++) {
					_value = _.clone(value);
					if (toggle) {
						_value.pos = c.replace(/^(.{2})(\d)$/, function($1, $2,
								$3) {
							return $2 + (9 - c.slice(-1));
						});
						_value.belong = 'red';
						_value.text = (_value.key == 'zhu') ? '兵'
								: (_value.key == 'jiang') ? '帅' : _value.text;
					} else {
						_value.pos = c;
						_value.belong = 'blue';
					}
					var model = new Piece(_value);
					pieces.add(model);
					var view = new PieceEl({
						model : model
					});
					me.$el.append(view.render(toggle ? [ 390, 790 ] : [ 20,
							790 ]).el);
				}
			}
		}
			render();
			render( true);

	},

	reset : function() {
		coords.restart();
		pieces.restart();
		parts.clear();
		this.turn(true);
		this._enable = 1;
	},
	exit : function() {
		this.turn(true);
		this._enable = 1;
		if(mouseBox){
			mouseBox.style.display = "none";
		}
		pieces.forEach(function(model) {
			if(model.get('die')==true)
				return;
			model.die();
		})
	},

	defaults : {
		width : 700,
		cls : 'chess'
	},

	initialize : function() {
		this.createCanvas();
		this.createCoords();
		this.createLine();
		this.init();
	},

	createCanvas : function() {
		this.canvas = $('<canvas>').attr({
			'width' : this.defaults.width - 86,
			'height' : this.defaults.width - 26
		}).addClass(this.defaults.cls);
		this.cxt = this.canvas[0].getContext('2d');
		this.$el.append(this.canvas);
	},

	//创建棋盘所有坐标点
	createCoords : function() {
		var me = this, _lit = this.defaults.width / 10, y = 0, _coord;
		function _create(y) {
			var x = 0;
			while (x < 9) {
				coords.add({
					id : x + '_' + y,
					x : x,
					y : y,
					coord : [ x * _lit + 10, y * _lit + 10 ]
				});
				x++;
			}
		}
		while (y < 10) {
			_create(y++);

		}
	},

	//据点画棋盘线
	createLine : function() {
		var _lit = this.defaults.width / 10;
		this.cxt.fillStyle = '#f3c89c';
		this.cxt.fillRect(10, 10, _lit * 8 + 20, _lit * 9 + 20);
		for ( var i = 0; i < 10; i++) {
			this.line(8 * _lit + 20, 0 * _lit + 20, i * _lit + 20, i * _lit
					+ 20);
			if (i < 9) {
				this.line(i * _lit + 20, i * _lit + 20, 9 * _lit + 20, 20);
			}
			if (i > 0 && i < 8) {
				this.line(i * _lit + 20, i * _lit + 20, 5 * _lit + 20,
						4 * _lit + 20, '#f3c89c');
			}
		}
		this.line(5 * _lit + 20, 3 * _lit + 20, 2 * _lit + 20, 0 * _lit + 20);
		this.line(5 * _lit + 20, 3 * _lit + 20, 0 * _lit + 20, 2 * _lit + 20);
		this.line(5 * _lit + 20, 3 * _lit + 20, 9 * _lit + 20, 7 * _lit + 20);
		this.line(5 * _lit + 20, 3 * _lit + 20, 7 * _lit + 20, 9 * _lit + 20);
		this.cxt.lineWidth = 8;
		this.cxt.strokeRect(10, 10, _lit * 8 + 20, _lit * 9 + 20);
		this.text();
	},

	line : function(x, x1, y, y1, color) {
		var cxt = this.cxt;
		color = color || '#6b3d28';
		cxt.lineWidth = 2;
		cxt.strokeStyle = color;
		cxt.beginPath();
		cxt.moveTo(x1, y1);
		cxt.lineTo(x, y);
		cxt.stroke();
	},

	text : function() {
		this.strokeStyle = '#f00';
		this.cxt.lineWidth = 1;
		this.cxt.font = 'normal 30px 隶书';
		this.cxt.strokeText('楚  河', 90, 350);
		this.cxt.strokeText('汉  界', 440, 350);
	},

	turn : function(type) {
		var _lit = this.defaults.width / 10;
		this.cxt.lineWidth = 8;
		this.cxt.beginPath();
		this.cxt.strokeStyle = '#6b3d28';
		this.cxt.strokeRect(10, 10, _lit * 8 + 20, _lit * 9 + 20);
		this.cxt.beginPath();
		if (typeof type == 'string') {
			if (type === 'blue') {
				this.cxt.beginPath();
				this.cxt.strokeStyle = '#f00';
				this.cxt.moveTo(10, this.defaults.width / 10 * 9 + 30);
				this.cxt.lineTo(this.defaults.width / 10 * 8 + 20,
						this.defaults.width / 10 * 9 + 30);
				this.cxt.stroke();
			} else {
				this.cxt.beginPath();
				this.cxt.strokeStyle = '#00f';
				this.cxt.moveTo(10, 10);
				this.cxt.lineTo(this.defaults.width / 10 * 8 + 20, 10);
				this.cxt.stroke();
			}
		}
	}
});

var chess = window.chess = new Chess;
// 监听游戏结束
chess.on('over', function(piece) {
	if (piece.get('key') == 'jiang') {
		var data = {
			player : piece.get('belong'),
			room : room
		};
		pomelo.request('chinesechess.chinesechessHandler.win', data, function(
				data) {

		});
	}
});

function _getPath(coord, piece) {
	var data = {
		coord : coord.cid,
		piece : piece.cid,
		room : room
	};
	console.log(coord.cid+","+piece.cid);
	pomelo.request('chinesechess.chinesechessHandler.chess', data, function(
			data) {

	});
}
function addClass(object, className) {
	var classString;
	if (document.all)
		classString = object.getAttribute("className");
	else
		classString = object.getAttribute("class");
	if (classString == null) {
		if (document.all)
			object.setAttribute("className", className);
		else
			object.setAttribute("class", className);
	} else {
		classString += " " + className;
		if (document.all)
			object.setAttribute("className", classString);
		else
			object.setAttribute("class", classString);
	}
}

function removeClass(object, className) {
	var classString;
	if (document.all)
		classString = object.getAttribute("className");
	else
		classString = object.getAttribute("class");
	if (classString == null)
		return false;
	var classArray = classString.split(" ");
	for ( var i = 0; i < classArray.length; i++) {
		if (classArray[i] != className)
			continue;
		else {
			classArray.splice(i, 1);
		}
	}
	classString = classArray.join(" ");
	if (document.all)
		object.setAttribute("className", classString);
	else
		object.setAttribute("class", classString);
}

function getElementsByClassName(className, root) {
	var list = new Array();
	var temClass;
	if (!root)
		root = document.body;
	var array = root.getElementsByTagName("*");
	for ( var i = 0; i < array.length; i++) {
		if (document.all)
			temClass = array[i].getAttribute("className");
		else
			temClass = array[i].getAttribute("class");
		if (temClass == null)
			continue;
		var temList = temClass.split(" ");
		for ( var j = 0; j < temList.length; j++) {
			if (temList[j] == className) {
				list.push(array[i]);
			}
		}
	}
	return list;
}
function Tips(top, left) {
	var objLeft = left;
	var objTop = top;
	if (!mouseBox) {
		mouseBox = document.createElement("div");
		addClass(mouseBox, "mouseBox");
		for ( var i = 0; i < 4; i++) {
			var iObj = document.createElement("i");
			addClass(iObj, "mouseP");
			switch (i) {
			case 0:
				addClass(iObj, "mouseLT");
				break;
			case 1:
				addClass(iObj, "mouseRT");
				break;
			case 2:
				addClass(iObj, "mouseLB");
				break;
			case 3:
				addClass(iObj, "mouseRB");
				break;
			default:
				break;
			}
			mouseBox.appendChild(iObj);
		}
		chess.$el.append(mouseBox);
	}
	mouseBox.style.display = "block";
	mouseBox.style.left = objLeft  + "px";
	mouseBox.style.top = objTop  + "px";
}
