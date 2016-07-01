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
	var classes=['selfInfo','curve','shipGame'];
	each(childs(projecNavs,false),function addEvent (self) {
		self.addEventListener('dblclick',function () {
			var nowShowContent=self.getElementsByTagName('div')[0];
			nowShowContent.removeAttribute('style');
			opened=true;
			if (opened) {
				setTimeout(function () {
					footer.removeAttribute('style');
				},2000);
			}
			nowShowContent.style.display='block';
			nowShowContent.style.zIndex=(Zindex++);
			var nowClass=self.getAttribute('class');
			var _index=classes.indexOf(nowClass);
			workingProject[_index].style.display='block';
			workingProject[_index].setAttribute('name',_index);
			//弹回窗口
			nowShowContent.setAttribute('class','')
		},false)
	})
	
//showContent event start
	//minimize
	var minimize=document.getElementsByClassName('min');
	each(minimize,function addEvent1 (self) {
		self.addEventListener('click',function minClicked () {
		var showContent=this.parentNode.parentNode;					
		showContent.setAttribute('class','minClicked');	
		
	},false)
	})
	
	//minimize to default
	
	each(workingProject,function addEvent2 (self) {
		self.addEventListener('mouseover',function showSmallContent () {
			//console.log(self.getAttribute('name'))
			//console.log(childs(projecNavs,false,self.getAttribute('name')))
			var smallContent=childs(projecNavs,false,self.getAttribute('name')).getElementsByTagName('div')[0]
			if (smallContent.getAttribute('class')) {
				smallContent.style.opacity=1;
				smallContent.style.display='block';
				smallContent.style.zIndex=(Zindex++);
				mouseover=true;
			}

		},false)
		
		self.addEventListener('mouseout',function hideSmallContent () {
			//console.log(self.getAttribute('name'))
			//console.log(childs(projecNavs,false,self.getAttribute('name')))
			var smallContent=childs(projecNavs,false,self.getAttribute('name')).getElementsByTagName('div')[0]
			if (smallContent.getAttribute('class')) {
				smallContent.style.opacity=0;
			}
		},false)
		
		// change to default
		self.addEventListener('click',function toDefault () {
			var smallContent=childs(projecNavs,false,self.getAttribute('name')).getElementsByTagName('div')[0]
			//console.log(smallContent);
			smallContent.removeAttribute('style');
			smallContent.setAttribute('class','');
			smallContent.style.display='block';
			smallContent.style.zIndex=(Zindex++);
		})
		
	})
	//console.log(projecNavs.getElementsByTagName('div'))
	each(projecNavs.getElementsByTagName('div'),function addEvent3 (self) {
		//console.log(self);
		self.addEventListener('mouseover',function holdSmallContent () {
			if (self.getAttribute('class')) {
				//console.log(self);
				self.style.display='block';
				self.style.opacity=1;
				footer.style.bottom=0;
			}
		},false)
		self.addEventListener('mouseout',function notHoldSmallContent () {
			if (self.getAttribute('class')) {
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
			var thisShowContent=self.parentNode.parentNode;
			thisShowContent.setAttribute('class','closeClicked')
			var id=thisShowContent.getAttribute('id')
			var thisIndex=id.slice(-1);
			//alert(thisIndex)
			workingProject[thisIndex].style.display='none';
		})
	})
	
	//fall screen
	var max=document.getElementsByClassName('max');
	each(max,function addEvent5 (self) {
		self.addEventListener('click',function fullScreen () {
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