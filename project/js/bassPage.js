
window.onload=function () {
    var tip=document.querySelector('.tips');
	//console.log(tip);	
	//ie8及以下版本方案
	var DEFAULT_VERSION = "8.0";
	var ua = navigator.userAgent.toLowerCase();
	var isIE = ua.indexOf("msie")>-1;
	var safariVersion;
	if(isIE){
	    safariVersion =  ua.match(/msie ([\d.]+)/)[1];
	}
	if(safariVersion <= DEFAULT_VERSION ){
	    tip.innerHTML='您的浏览器版本老掉牙了</br>Recommended to upgrade your browser or use Google browser';
	}
	var notice=document.querySelector('#notice');
	setTimeout(function noticePlay () {
		notice.play();
	},2000);
	var bodyElement=document.querySelector('body');
	bodyElement.style.backgroundSize='100% 100%';
	document.querySelectorAll('.loading')[0].style.display='none';	
	var tips=document.querySelectorAll('.tips')[0];
	tips.style.right='10px';
	var startTime=new Date();
	//时间日期
	setInterval('mydate()',1000);
	mydate=function () {
		nowTime=new Date();
		document.querySelectorAll('.time')[0].innerHTML=nowTime.toLocaleString();
		
		if (nowTime-startTime>4000) {
		tips.style.opacity=0;

	};
	};
	
	var projecNavs=document.getElementById("projects");
	
	each(document.getElementsByTagName('iframe'),function addIframeSrc (self) {	
		//console.log(self)
		attr(self,'src',attr(self,'name'));
	})
	
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
	var classes=['selfInfo','canvas',' ','slide'];
	each(childs(projecNavs,false),function addEvent (self) {
		var object = {
		  init: function() {
		    self.addEventListener("dblclick", this, false);
		    self.addEventListener("touchstart", this, false);
		  },
		  handleEvent: function(e) {
		    switch(e.type) {
		      case "dblclick":
		        this.action();
		        break;
		      case "touchstart":
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
	
	
	

}//end
