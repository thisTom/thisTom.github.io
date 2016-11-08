window.onload=function () {
	//video 部分
	var videoWrap=document.querySelector('.news-videos');
	if (videoWrap.style.display='none') {
		videoWrap.style.display='block';
		//video control
		var videoObj=document.querySelector('.news-videos video');
		var pauseObj=document.querySelector('.pause');

		function playControl (e) {
			videoObj.addEventListener(e,function () {
				if (e=='pause') {
					pauseObj.style.display='block';
				}else{
					pauseObj.style.display='none';
				}
			},false);
		}
		playControl('pause');
		playControl('play');
	}
}

