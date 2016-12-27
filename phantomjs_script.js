window._pjscMeta.manualWait = true;
setTimeout(function(){
  XMLHttpRequest.prototype.realOpen = XMLHttpRequest.prototype.open;
  var myOpen = function (method, url, async, user, password) {
  	this.addEventListener('readystatechange', function () {
  		if (this.readyState == 4 && this.responseURL == 'https://www.priceline.com/m/fly/search/api/listings') {
  			window._pjscMeta.scriptOutput = = this.response;
  			window._pjscMeta.manualWait = false;
  		}
  	}, false);
  	this.realOpen(method, url, async, user, password);
  };
  XMLHttpRequest.prototype.open = myOpen;
}, 1000);
