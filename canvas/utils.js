
/* 
 * utility对象保存通用方法
 */
window.utils = {};

/**
 * start requestAnimationFrame
 */
if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function(callback) {
			return window.setTimeout(callback, 17 /*~ 1000/60*/ );
		});
}

/**
 * Cancels an animation frame request.
 */
if (!window.cancelRequestAnimationFrame) {
	window.cancelRequestAnimationFrame = (window.cancelAnimationFrame ||
		window.webkitCancelRequestAnimationFrame ||
		window.mozCancelRequestAnimationFrame ||
		window.msCancelRequestAnimationFrame ||
		window.oCancelRequestAnimationFrame ||
		window.clearTimeout);
}

/**
 * 捕获鼠标坐标，相对于element参数
 * @param {HTMLElement} element
 * @return {object} 包含属性: x, y, event
 */
window.utils.captureMouse = function(element) {
	var mouse = {
			x: 0,
			y: 0,
			event: null
		},
		body_scrollLeft = document.body.scrollLeft,
		element_scrollLeft = document.documentElement.scrollLeft,
		body_scrollTop = document.body.scrollTop,
		element_scrollTop = document.documentElement.scrollTop,
		offsetLeft = element.offsetLeft,
		offsetTop = element.offsetTop;

	element.addEventListener('mousemove', function(event) {
		var x, y;

		if (event.pageX || event.pageY) {
			x = event.pageX;
			y = event.pageY;
		} else {
			x = event.clientX + body_scrollLeft + element_scrollLeft;
			y = event.clientY + body_scrollTop + element_scrollTop;
		}
		x -= offsetLeft;
		y -= offsetTop;

		mouse.x = x;
		mouse.y = y;
		mouse.event = event;
	}, false);

	return mouse;
};

/**
 * 捕获触摸事件（返回move时相对于element参数的坐标位置）
 * @param {HTMLElement} element
 * @return {object} 包含属性: x, y, isPressed, event
 */
window.utils.captureTouch = function(element) {
	var touch = {
			x: null,
			y: null,
			isPressed: false,
			event: null
		},
		body_scrollLeft = document.body.scrollLeft,
		element_scrollLeft = document.documentElement.scrollLeft,
		body_scrollTop = document.body.scrollTop,
		element_scrollTop = document.documentElement.scrollTop,
		offsetLeft = element.offsetLeft,
		offsetTop = element.offsetTop;

	element.addEventListener('touchstart', function(event) {
		touch.isPressed = true;
		touch.event = event;
	}, false);

	element.addEventListener('touchend', function(event) {
		touch.isPressed = false;
		touch.x = null;
		touch.y = null;
		touch.event = event;
	}, false);

	element.addEventListener('touchmove', function(event) {
		var x, y,
			touch_event = event.touches[0]; //first touch

		if (touch_event.pageX || touch_event.pageY) {
			x = touch_event.pageX;
			y = touch_event.pageY;
		} else {
			x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
			y = touch_event.clientY + body_scrollTop + element_scrollTop;
		}
		x -= offsetLeft;
		y -= offsetTop;

		touch.x = x;
		touch.y = y;
		touch.event = event;
	}, false);

	return touch;
};

/**
 * 转换   utils.parseColor(0xFFFF00) return '#FFFF00'  ulits.parseColor('#FFFF00'or'0xFFFF00' ,true) return 16776960.
 * @param {number|string} color
 * @param {boolean=}      toNumber=false  返回number格式
 * @return {string|number}
 */
window.utils.parseColor = function(color, toNumber) {
	if (toNumber === true) {
		if (typeof color === 'number') {
			return (color | 0);
		}
		if (typeof color === 'string' && color[0] === '#') {
			color = color.slice(1);
		}
		return window.parseInt(color, 16);
	} else {
		if (typeof color === 'number') {
			color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
		}
		return color;
	}
};

/**
 * 转换一个0xffff00数字格式或者'#ffff00'字符串格式为css风格的颜色: 'rgb(r,g,b)' or 'rgba(r,g,b,a)'
 * @param {number|string} color
 * @param {number}        alpha
 * @return {string}
 */
window.utils.colorToRGB = function(color, alpha) {
	//number in octal format or string prefixed with #
	if (typeof color === 'string' && color[0] === '#') {
		color = window.parseInt(color.slice(1), 16);
	}
	alpha = (alpha === undefined) ? 1 : alpha;
	//parse hex values
	var r = color >> 16 & 0xff,
		g = color >> 8 & 0xff,
		b = color & 0xff,
		a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);
	//only use 'rgba' if needed
	if (a === 1) {
		return "rgb(" + r + "," + g + "," + b + ")";
	} else {
		return "rgba(" + r + "," + g + "," + b + "," + a + ")";
	}
};

//ball类
function Ball(radius, color) {
	if (radius === undefined) {
		radius = 40;
	}
	if (color === undefined) {
		color = "#ff0000";
	}
	this.Y=Math.round(Math.random()*(canvas.height-50)+25),
	this.X=Math.round(Math.random()*(canvas.width-50)+25);
	this.COLOR=['#ffff00','#99ff00','#cc66ff','#ff0000'][Math.floor(Math.random()*4)];
	this.x = 0;
	this.y = 0;
	this.radius = radius;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.lineWidth = 0;
}

Ball.prototype.draw = function(context) {
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.scale(this.scaleX, this.scaleY);
	context.lineWidth = this.lineWidth;
	context.fillStyle = this.color;
	context.beginPath();

	context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
	context.closePath();
	context.fill();
	if (this.lineWidth > 0) {
		context.stroke();
	}
	context.restore();
};
//ship类
function Ship() {
	this.x = 0;
	this.y = 0;
	this.width = 25;
	this.height = 20;
	this.rotation = 0;
	this.showFlame = false;
}
Ship.prototype.draw = function(context) {
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.lineWidth = 1;
	context.strokeStyle = "#ffffff";
	context.beginPath();
	context.moveTo(10, 0);
	context.lineTo(-10, 10);
	context.lineTo(-5, 0);
	context.lineTo(-10, -10);
	context.lineTo(10, 0);
	context.stroke();
	if (this.showFlame) {
		context.beginPath();
		context.moveTo(-7.5, -5);
		context.lineTo(-15, 0);
		context.lineTo(-7.5, 5);
		context.stroke();
	}
	context.restore();
};