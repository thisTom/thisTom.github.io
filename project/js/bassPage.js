window.onload=function () {
	
	document.getElementsByClassName('loading')[0].style.display='none';	
	var tips=document.getElementsByClassName('tips')[0];
	tips.style.right='10px';
	var startTime=new Date(),
	nowTime=new Date();
	
	setInterval('mydate()',1000);
	mydate=function () {
		nowTime=new Date();
		document.getElementsByClassName('time')[0].innerHTML=nowTime.toLocaleString();
		
		if (nowTime-startTime>4000) {
		tips.style.opacity=0;
	};
	};

	var body=document.getElementsByTagName('body')[0];
	var mouse=utils.captureMouse(body);
	window.addEventListener('mousemove',function mousePosition () {

		var bodyHeight= document.body.clientHeight;
		var footer=document.getElementById('footerBar');
		if (mouse.y+1==bodyHeight) {

			footer.style.bottom=0;
		}else{
			footer.removeAttribute('style');
		}
		
	},false)

}