function inject(funcname) {
	var actualCode = '(' + funcname + ')();';
	var script = document.createElement('script');
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);
	script.parentNode.removeChild(script);
}
