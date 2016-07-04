window.onload=function () {

	document.getElementsByClassName('loading')[0].style.display='none';	
	var tips=document.getElementsByClassName('tips')[0];
	tips.style.right='10px';
	var startTime=new Date();
	//时间日期
	setInterval('mydate()',1000);
	mydate=function () {
		nowTime=new Date();
		document.getElementsByClassName('time')[0].innerHTML=nowTime.toLocaleString();
		
		if (nowTime-startTime>4000) {
		tips.style.opacity=0;
	};
	};
	
	var projecNavs=document.getElementById("projects");
	
	each(projecNavs.getElementsByTagName('iframe'),function addIframeSrc (self) {	
		//console.log(self)
		attr(self,'src',attr(self,'name'));
	})
	
	var Zindex=0; //smallShowContent   zIndex
	var body=document.getElementsByTagName('body')[0];
	var mouse=utils.captureMouse(body);
	var opened=null;
	var footer=document.getElementById('footerBar');
	window.addEventListener('mousemove',function mousePosition () {

		var bodyHeight= document.body.clientHeight;
		if (mouse.y+1==bodyHeight||opened) {			
			footer.style.bottom=0;
			opened=false;
		}else{
			footer.removeAttribute('style');
		}
		
	},false);
	
//open showContent
	var workingProject=Array.prototype.slice.call(document.getElementsByClassName('workingProject'));
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
			var firstShowContent=self.getElementsByTagName('div')[0];
			var secShowContent=self.getElementsByTagName('div')[1];
			//console.log(secShowContent)
			firstShowContent.removeAttribute('style');
			opened=true;
			if (opened) {
				setTimeout(function () {
					footer.removeAttribute('style');
				},2000);
			}
			firstShowContent.style.display='block';
			firstShowContent.style.zIndex=(Zindex++);
			var nowClass=self.getAttribute('class');
			var _index=classes.indexOf(nowClass);
			workingProject[_index].style.display='block';
			workingProject[_index].setAttribute('name',_index);
			//弹回窗口
			removeClass(firstShowContent,'minClicked');
			removeClass(firstShowContent,'closeClicked');
		  }
		};
		
		// Init
		object.init();		
	})
	
	
	var filmItem=document.getElementsByClassName('filmItem');
	each(filmItem,function (eachFilmItem) {
		var itemLi=eachFilmItem.getElementsByTagName('li');
		//console.log(itemLi)
		each(itemLi,function addEvent (self) {
			var frameSrc=self.getAttribute('name');
			var showContent=self.parentNode.parentNode.parentNode.getElementsByTagName('div')[1];
			self.addEventListener('click',function changeLocation () {
				showContent.getElementsByTagName('iframe')[0].setAttribute('src',frameSrc);
				setTimeout(function () {
					removeClass(showContent,'minClicked');
					removeClass(showContent,'closeClicked');
					showContent.style.display='block';
					showContent.style.opacity=1;
					showContent.style.zIndex=(Zindex++);				
				},500)
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
	var minimize=document.getElementsByClassName('min');
	each(minimize,function addEvent1 (self) {
		self.addEventListener('click',function minClicked () {
		window.event? window.event.cancelBubble = true : e.stopPropagation();
		//console.log(window.event)
		var showContent=this.parentNode.parentNode;					
		addClass(showContent,'minClicked');	
		
	},false)
	})
	
	//minimize to default
	
	each(workingProject,function addEvent2 (self) {
		self.addEventListener('mouseover',function showSmallContent () {
			//console.log(self.getAttribute('name'))
			var smallContent=document.getElementsByClassName('show')[self.getAttribute('name')];
			//console.log(smallContent)
			if (hasClass(smallContent,'minClicked')) {
				smallContent.style.opacity=1;
				smallContent.style.display='block';
				smallContent.style.zIndex=(Zindex++);
			}

		},false)
		
		self.addEventListener('mouseout',function hideSmallContent () {
			//console.log(self.getAttribute('name'))
			var smallContent=document.getElementsByClassName('show')[self.getAttribute('name')];
			if (hasClass(smallContent,'minClicked')) {
				smallContent.style.opacity=0;
			}
		},false)
		
		// change to default
		self.addEventListener('click',function toDefault () {
			var smallContent=document.getElementsByClassName('show')[self.getAttribute('name')];
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
		self.addEventListener('mouseover',function holdSmallContent () {
			if (hasClass(self,'minClicked')) {
				//console.log(self);
				self.style.display='block';
				self.style.opacity=1;
				footer.style.bottom=0;
			}
		},false)
		self.addEventListener('mouseout',function notHoldSmallContent () {
			if (hasClass(self,'minClicked')) {
				self.style.opacity=0;
				self.style.display='none';	
			}
		},false);
		//console.log(childs(self,false,1))
		self.addEventListener('click',function alsoToDefault () {
			//console.log(iframe不能使用鼠标事件  暂时放下)
		})
		
	});
	
	//close showContent
	var close=document.getElementsByClassName('close');
	each(close,function addEvent4 (self) {
		self.addEventListener('click',function closeShowContent () {
			window.event? window.event.cancelBubble = true : e.stopPropagation();
			//console.log(window.event)
			var thisShowContent=self.parentNode.parentNode;
			addClass(thisShowContent,'closeClicked')
			var id=thisShowContent.getAttribute('id')
			var thisIndex=id.slice(-1);
			//alert(thisIndex)
			workingProject[thisIndex].style.display='none';
			//刷新iframe
			if (thisIndex<3) {
				parent.frames[thisIndex].location.reload();
			}
			//console.log(typeof(window.parent.frames[thisIndex].document));
		})
	})
	
	//full screen
	var max=document.getElementsByClassName('max');
	each(max,function addEvent5 (self) {
		self.addEventListener('click',function fullScreen () {
			window.event? window.event.cancelBubble = true : e.stopPropagation();
			//console.log(window.event)
			var showContent=self.parentNode.parentNode;
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