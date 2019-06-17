
var myPublicFiles = [
	'js/jquery.min.js',
	'css/preload.min.css',
	'js/preload.min.js',
	'js/easeljs-0.8.1.min.js',
	'js/tweenjs-0.6.1.min.js',
	'js/movieclip-0.8.1.min.js',
	'js/preloadjs-0.6.1.min.js',
	'js/animaCreateJs.js',
];

var myCommonFiles = [
	
];


var myPrivateFiles = [
	
	'js/layout.js',
	'js/toolList.js',
	//声音处理
	'js/soundjs-0.6.2.min.js',
	
	'js/arrayUtils.js',
	
	//'js/createjsExtendmin.js',
	'js/createjsExtend.js',
	
   	'js/donghua.js',//动画素材,程序提供
   	'js/game.js',//交互程序，程序提供
   
];

var loader = new h5_loader();
loader.addPublicFiles(myPublicFiles)
loader.addCommonFiles(myCommonFiles);
loader.addPrivateFiles(myPrivateFiles);
loader.load();