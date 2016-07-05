
function myAddEvent(obj,type,handle){
    try{  // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
        obj.addEventListener(type,handle,false);
    }catch(e){
        try{  // IE8.0及其以下版本
            obj.attachEvent('on' + type,handle);
        }catch(e){  // 早期浏览器
            obj['on' + type] = handle;
        }
    }
}



/*
 * utility对象保存通用方法
 */
window.utils = {};


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

	myAddEvent(element,'mousemove', function(event) {
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

	myAddEvent(element,'touchstart', function(event) {
		touch.isPressed = true;
		touch.event = event;
	});

	myAddEvent(element,'touchend', function(event) {
		touch.isPressed = false;
		touch.x = null;
		touch.y = null;
		touch.event = event;
	});

	myAddEvent(element,'touchmove', function(event) {
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
	});

	return touch;
};



function each(elmts,callback){
	if(elmts.length){
		for(var i=0,len=elmts.length;i<len;i++){
			callback(elmts[i]);
		}
	}else{
		callback(elmts);
	}
}

/**
* 获取目标子节点/子节点列表
* parent 目标节点
* [withTextNode] 是否包含文本节点，默认为 false
* [n] 获取指定子节点
*/

// childs(parent) 获取 parent 的所有子节点（不含文本节点）
// childs(parent,true) 获取 parent 的所有子节点（包含文本节点）
// childs(parent,false,2) 获取 parent 的第三个非文本子节点

function childs(parent,withTextNode,n){
	withTextNode=(withTextNode || false);
	//console.log("withTextNode:"+withTextNode);
	if(parent.hasChildNodes()){
		var childs=parent.childNodes;
		//console.log(childs.length);
		if(withTextNode){
			//console.log("childs");
			result=childs;
		}else{
			var result=new Array();
			for(var i=0,len=childs.length;i<len;i++){
				if(childs[i].nodeType!==3){
					result.push(childs[i]);
				}
			}
		}
		//console.log("n:"+n);
		if(n){
			return result[n];
		}else{
			return result;
		}
	}else{
		return null;
	}
}

// attr(elmt,"type") 获取 elmt 的 type 属性值（elmt 需为单个元素）
// attr(elmts,"type","value") 设置 elmts 的 type 属性值（elmts 可为元素列表）

function attr(elmts,attr,value){
	if(value!=undefined){
		each(elmts,function(elmt){
			elmt.setAttribute(attr,value);
		});
	}else{
		return elmts.getAttribute(attr);
	}
}

// hasClass, takes two params: element and classname
function hasClass(el, cls) {
  return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}

function addClass(elmts,value){
	each(elmts,function(elmt){
		if(!hasClass(elmt,value)){
			elmt.className+=" "+value;
		}
	});
}

// removeClass, takes two params: element and classname
function removeClass(el, cls) {
  var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
  el.className = el.className.replace(reg, " ").replace(/(^\s*)|(\s*$)/g,"");
}

function toggleClass(elmts,value1,value2){
	each(elmts,function(elmt){
		if(hasClass(elmt,value1)){
			removeClass(elmt,value1);
			addClass(elmt,value2);
		}else if(hasClass(elmt,value2)){
			removeClass(elmt,value2);
			addClass(elmt,value1);
		}else{
			addClass(elmt,value1);
		}
	});
}