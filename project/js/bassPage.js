
window.onload=function () {
	var bodyElement=document.querySelector('body');
   	var tips=document.querySelectorAll('.tips')[0];
    //移动端Tip提示内容 and 天气更新位置
    var weatherBox=document.querySelector('.weather');
    var weatherLeftBtn=document.querySelector('.tianqiyubao');
    var weatherClose=document.querySelector('.closeWeather');
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		
		tips.innerHTML='很高兴你能在移动端体验 </br> I am optimizing it';
		bodyElement.appendChild(weatherBox);
		myAddEvent(weatherLeftBtn,'click',function () {
			weatherBox.style.display='block';		
		})
		myAddEvent(weatherClose,'click',function () {
			weatherBox.removeAttribute('style');
		})
	}
	//console.log(tip);	
	//ie8及以下版本方案
	var DEFAULT_VERSION = "8.0";
	var ua = navigator.userAgent.toLowerCase();
	//console.log(ua);
	var isIE = ua.indexOf("msie")>-1;
	var safariVersion;
	if(isIE){
	    safariVersion =  ua.match(/msie ([\d.]+)/)[1];
	}
	if(safariVersion <= DEFAULT_VERSION ){
	    tips.innerHTML='您的浏览器版本老掉牙了</br>Recommended to upgrade your browser or use Google browser';
	}	
	var notice=document.querySelector('#notice');
	setTimeout(function noticePlay () {
		notice.play();
	},2000);
	
	bodyElement.style.backgroundSize='100% 100%';
	document.querySelectorAll('.loading')[0].style.display='none';	
	tips.style.right='10px';
	var startTime=new Date();
	//时间日期
	setInterval('mydate()',1000);
	mydate=function () {
		nowTime=new Date();
		document.querySelectorAll('.time')[0].innerHTML=nowTime.toLocaleDateString()+'&emsp;'+nowTime.toLocaleTimeString();
		
		if (nowTime-startTime>4000) {
		tips.style.opacity=0;

	};
	};
	
	//实时天气 
	    var url = 'http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&day=0&charset=utf-8';
	    var script = document.createElement('script');	    
	    script.onerror = script.onload = script.onreadystatechange = function(e){
	       e = e || window.event;
	       //console.log(e);
	       if(!script.readyState || (/loaded|complete/.test(script.readyState)) || e.type === "error"){
	          script = script.onerror = script.onload = script.onreadystatechange = null;
	          var data = window.SWther || {};
	          //console.log(data)
	          if (ua.indexOf("msie")>-1 || ua.indexOf("rv:11") > -1 || ua.indexOf("edge") >-1) {
		          var weatherData={
		           	time : data.add.update.slice(-7),
		           	city : Object.getOwnPropertyNames(data.w)[0],
		           	weather : data.w[Object.getOwnPropertyNames(data.w)[0]][0]
		          };
	          }else{
		          var weatherData={
		            time : data.add.update.slice(-7),
		            city : Object.getOwnPropertyNames(data.w)[1],
		            weather : data.w[Object.getOwnPropertyNames(data.w)[1]][0]
		          };
	          };

	          //console.log(data.w)
	          //console.log(weatherData);
	          //console.log(weatherBox.childNodes)
	          addClass(weatherBox,'weatherActive');
	          var weatherCh=weatherBox.childNodes;
	          weatherCh[1].innerHTML=weatherData.city;
	          weatherCh[2].innerHTML=weatherData.time;
	          weatherCh[4].innerHTML=weatherData.weather.t1+'℃';
	          weatherCh[5].innerHTML=weatherData.weather.s1;
	          weatherCh[6].innerHTML=weatherData.weather.d1;
	          weatherCh[7].innerHTML=weatherData.weather.p1+'级';
	          var imgName;
	          switch (weatherData.weather.s1){
	          	case '阴':
	          		imgName='yin';
	          		break;
	          	case '晴':
	          		imgName='qing';	          		
	          		break;
	          	case '多云':
	          		imgName='duoyun';
	          		break;
	          	case '阵雨':
	          	case '雷阵雨':
	          	case '小雨':
	          	case '中雨':
	          	case '大雨':	          	
	          		imgName='zhenyu';
	          		break;
	          	case '晴渐多云':
	          	case '晴转多云':
	          	case '多云转晴':
	          		imgName='qingyun';
	          		break;
	          	case '暴雨':
	          	case '大暴雨':
	          	case '特大暴雨':	          	
	          		imgName='baoyu';
	          		break;
	          	case '雨夹雪':
	          		imgName='yujiaxue';
	          		break;
	          	case '小雪':
	          	case '阵雪':
	          		imgName='xue';
	          		break;
	          	case '中雪':
	          	case '大雪':
	          	case '暴雪':
	          		imgName='daxue';
	          		break;
	          	default:
	          		imgName='buzhidao'
	          		break;
	          }
	          weatherCh[3].style.backgroundImage='url(media/'+imgName+'.png)';
	          
	          
	       }
	    }
	    script.src = url;
	    document.body.appendChild(script);
	
	
	
	var projecNavs=document.getElementById("projects");
	setTimeout(function() {
		each(document.getElementsByTagName('iframe'),function addIframeSrc (self) {	
			//console.log(self)
			attr(self,'src',attr(self,'name'));
		})
	},1000)
	
	
	var Zindex=0; //smallShowContent   zIndex
	var body=document.getElementsByTagName('body')[0];
	var mouse=utils.captureMouse(body);
	var opened=null;
	var footer=document.getElementById('footerBar');
	myAddEvent(window,'mousemove',function mousePosition () {

		var bodyHeight= document.body.clientHeight;
		if (mouse.y+1==bodyHeight||opened) {			
			footer.style.bottom=0;
			opened=false;
		}else{
			footer.removeAttribute('style');
		}
		
	});
	
//open showContent
	var workingProject=Array.prototype.concat.apply([],document.querySelectorAll('.workingProject'));
	var classes=['selfInfo','canvas',' ','slide',' ','StartApp'];
	each(childs(projecNavs,false),function addEvent (self) {
		var object = {
		  init: function() {
		    self.addEventListener("dblclick", this, false);
		    self.addEventListener("click", this, false);
		  },
		  handleEvent: function(e) {
		    switch(e.type) {
		      case "dblclick":
		        this.action();
		        break;
		      case "click":
		        this.action();
		        break;
		    }
		  },
		  action: function() {
		    window.event? window.event.cancelBubble = true : e.stopPropagation();
			//console.log(window.event)	
			var showContent=self.getElementsByTagName('div')[0];
			showContent.removeAttribute('style');
			opened=true;
			if (opened) {
				setTimeout(function () {
					footer.removeAttribute('style');
				},2000);
			}
			showContent.style.display='block';
			showContent.style.zIndex=(Zindex++);
			var nowClass=self.getAttribute('class');
			var _index=classes.indexOf(nowClass);
			//console.log(_index);
			workingProject[_index].style.display='block';
			workingProject[_index].setAttribute('name',_index);
			//弹回窗口
			removeClass(showContent,'minClicked');
			removeClass(showContent,'closeClicked');
		  }
		};
		
		// Init
		object.init();		
	})
	
	
	var filmItem=document.querySelectorAll('.filmItem');
	each(filmItem,function (eachFilmItem) {
		var itemLi=eachFilmItem.getElementsByTagName('li');
		//console.log(itemLi)
		each(itemLi,function addEvent (self) {
			var frameSrc=self.getAttribute('name');
			myAddEvent(self,'click',function changeLocation () {
		    window.event? window.event.cancelBubble = true : e.stopPropagation();
			var showContent=self.parentNode.parentNode.parentNode.getElementsByTagName('div')[1];
			//console.log(showContent);
				showContent.getElementsByTagName('iframe')[0].setAttribute('src',frameSrc);
				setTimeout(function () {
					removeClass(showContent,'minClicked');
					removeClass(showContent,'closeClicked');
					showContent.style.display='block';
					showContent.style.opacity=1;
					showContent.style.zIndex=(Zindex++);
				},100)
				
			var nowClass=showContent.parentNode.getAttribute('class');
			//console.log(nowClass)
			var _index=classes.indexOf(nowClass)+1;
			workingProject[_index].style.display='block';
			workingProject[_index].setAttribute('name',_index);				


			})
	})
	})
	
	
//showContent event start
	//minimize
	var minimize=document.querySelectorAll('.min');
	each(minimize,function addEvent1 (self) {
		myAddEvent(self,'click',function minClicked () {
		window.event? window.event.cancelBubble = true : e.stopPropagation();
		//console.log(window.event)
		var showContent=this.parentNode.parentNode;		
		removeClass(showContent,'maxClicked');
		addClass(showContent,'minClicked');	
		
	})
	})
	
	//minimize to default
	
	each(workingProject,function addEvent2 (self) {
		myAddEvent(self,'mouseover',function showSmallContent () {
			//console.log(self.getAttribute('name'))
			var smallContent=document.querySelectorAll('.show')[self.getAttribute('name')];
			//console.log(smallContent)
			if (hasClass(smallContent,'minClicked')) {
				smallContent.style.opacity=1;
				smallContent.style.display='block';
				smallContent.style.zIndex=(Zindex++);
			}

		})
		
		myAddEvent(self,'mouseout',function hideSmallContent () {
			//console.log(self.getAttribute('name'))
			var smallContent=document.querySelectorAll('.show')[self.getAttribute('name')];
			if (hasClass(smallContent,'minClicked')) {
				smallContent.style.opacity=0;
			}
		})
		
		// change to default
		myAddEvent(self,'click',function toDefault () {
			var smallContent=document.querySelectorAll('.show')[self.getAttribute('name')];
			//console.log(smallContent);
			smallContent.removeAttribute('style');
			removeClass(smallContent,'minClicked')
			smallContent.style.display='block';
			smallContent.style.zIndex=(Zindex++);
		})
		
	})
	//console.log(projecNavs.getElementsByTagName('div'))
	each(projecNavs.getElementsByTagName('div'),function addEvent3 (self) {
		//console.log(self);
		myAddEvent(self,'mouseover',function holdSmallContent () {
			if (hasClass(self,'minClicked')) {
				//console.log(self);
				self.style.display='block';
				self.style.opacity=1;
				footer.style.bottom=0;
			}
		})
		myAddEvent(self,'mouseout',function notHoldSmallContent () {
			if (hasClass(self,'minClicked')) {
				self.style.opacity=0;
				self.style.display='none';	
			}
		});
		//console.log(childs(self,false,1))
		myAddEvent(self,'click',function alsoToDefault () {
			self.removeAttribute('style');
			removeClass(self,'minClicked');
			self.style.display='block';
			//console.log(iframe不能使用鼠标事件  暂时放下)
		})
		
	});
	
	//close showContent
	var close=document.querySelectorAll('.close');
	each(close,function addEvent4 (self) {
		myAddEvent(self,'click',function closeShowContent () {
			window.event? window.event.cancelBubble = true : e.stopPropagation();
			//console.log(window.event)
			var thisShowContent=self.parentNode.parentNode;
			addClass(thisShowContent,'closeClicked');
			var id=thisShowContent.getAttribute('id')
			var thisIndex=id.slice(-1);
			//alert(thisIndex)
			workingProject[thisIndex].style.display='none';
			//刷新iframe
			//console.log(thisIndex)
			if (thisIndex<=2) {
				parent.frames[thisIndex].location.reload();
			}
			//console.log(typeof(window.parent.frames[thisIndex].document));
		})
	})
	
	//full screen
	var max=document.querySelectorAll('.max');
	each(max,function addEvent5 (self) {
		myAddEvent(self,'click',function fullScreen () {
			window.event? window.event.cancelBubble = true : e.stopPropagation();
			//console.log(window.event)
			var showContent=self.parentNode.parentNode;
			showContent.style.zIndex=(Zindex++);
			if (hasClass(showContent,'maxClicked')) {
				removeClass(showContent,'maxClicked')
			}else{
				//console.log(self);
				//console.log(self.parent);
				addClass(showContent,'maxClicked');
			}
		})
	})
	
	//start menu 
	//menuOpen and animation
	var startBtn=document.querySelector('.start');
	var startMenu=document.querySelector('#startMenu');
	var rightMenu=document.querySelector('#menu-right');
	myAddEvent(startBtn,'click', function showOrHideMenu () {
		window.event? window.event.cancelBubble = true : e.stopPropagation();
		if (startMenu.style.opacity==0) {
			startMenu.style.opacity=1;
			startMenu.style.height='80%';
			startMenu.style.zIndex=999;
			addClass(footer,'menuOpen')
			rightMenu.style.top='15px';			
		}else{
			startMenu.removeAttribute('style');
			rightMenu.removeAttribute('style');
			removeClass(footer,'menuOpen');
		}
		
		
		
		
		
	});
	myAddEvent(document,'click',function () {
		startMenu.removeAttribute('style');
		rightMenu.removeAttribute('style');
		removeClass(footer,'menuOpen');
	})
	
	
	
	//menu-right style
	
	myAddEvent(window,'resize',changeHeight);
	function changeHeight () {
		var menuRightLi=rightMenu.querySelectorAll('li');
		each(menuRightLi,function changeHeight (self) {
			var selfH=self.style.width;
			console.log(selfH);
			self.style.height=selfH;			
		});
	};
	changeHeight();




		
		
		
	
}//end
