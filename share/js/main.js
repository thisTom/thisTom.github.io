window.onload=function () {
	//检测是否安装App
	function testApp(url) {  
	    var timeout, t = 1000, hasApp = true;
	    var downLink=document.querySelector('.down-link'),
	    	openLink=document.querySelector('.bottom-btn'),
	    	downLinkImg=document.querySelector('.down-link-img');
	    setTimeout(function () {  
	        if (hasApp) {  
	        	downLinkImg.style.display='none';
	            downLink.innerText='立即打开';
	            downLink.setAttribute('href',url);
	            openLink.setAttribute('href',url);				
	        } else {  
	        	downLinkImg.style.display='inline-block';
	            downLink.innerText='立即下载';
	            downLink.setAttribute('href','http://m.zoneju.com/app');
	            openLink.setAttribute('href','http://m.zoneju.com/app'); 
	        }  
	        document.body.removeChild(ifr);  
	    }, 2000)  
	  
	    var t1 = Date.now();  
	    var ifr = document.createElement("iframe");  
	    ifr.setAttribute('src', url);  
	    ifr.setAttribute('style', 'display:none');  
	    document.body.appendChild(ifr);  
	    timeout = setTimeout(function () {  
	         var t2 = Date.now();  
	         if (!t1 || t2 - t1 < t + 100) {  
	             hasApp = false;  
	         }  
	    }, t);  
	} 
	
	testApp('app协议URL：URL Scheme');
}

