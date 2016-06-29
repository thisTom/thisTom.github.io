window.onload=function () {
	
	document.getElementsByClassName('loading')[0].style.display='none';	
	
	setInterval(function () {
		var mydate=new Date();
		document.getElementsByClassName('time')[0].innerHTML=mydate.toLocaleString();
	},1000)
	
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