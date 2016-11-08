window.onload=function () {
	//video 部分
	var videoWrap=document.querySelector('.news-videos');
	if (videoWrap.style.display='none') {
		videoWrap.style.display='block';
		//video control
		var videoObj=document.querySelector('.news-videos video');
		videoObj.play();
		setTimeout(function(){
			videoObj.pause()
		},2000)
	}	
}

