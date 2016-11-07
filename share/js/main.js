window.onload=function () {
	//video 部分
	var videoWrap=document.querySelector('.news-videos');
	if (videoWrap.style.display='none') {
		videoWrap.style.display='block';
		//video control
		var videoObj=document.querySelector('.news-videos video');
		var pauseObj=document.querySelector('.pause');
		var played=false;
		function playControl () {
			if (!played) {
				pauseObj.style.display='none';
				videoObj.play();
				played=true;
			}else{
				pauseObj.style.display='block';
				videoObj.pause();	
				played=false;
			}
		};
		pauseObj.addEventListener('touchstart',playControl,false);
		videoObj.addEventListener('touchstart',playControl,false);
	}
}

