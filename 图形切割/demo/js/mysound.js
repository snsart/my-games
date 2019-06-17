var sounds = {
	
	manifest: [{
			src: "sounds/bajieku.mp3",
			id: "bajieku"
		},
		{
			src: "sounds/bajiexiao.mp3",
			id: "bajiexiao"
		}
	]
};

createjs.Sound.alternateExtensions = ["mp3"];
createjs.Sound.addEventListener("fileload", handleLoad);

createjs.Sound.registerSounds(sounds.manifest);

function handleLoad(event) {
	console.log(event.type)
	//dispatchEvent(new Event("SOUND_COMPLETE"))
}
Sound = {};
Sound.boolean=true
Sound.playSound = function(id, delay,loop) {
	var volum;
	if(id=="backsnd"){
		volum=0.5
	}else{
		volum=1;
	}
	return createjs.Sound.play(id, createjs.Sound.INTERRUPT_EARLY, delay, 0, loop,volum);
}

for(var i=0;i<sounds.manifest.length;i++){
	var sndId=sounds.manifest[i].id;
	eval("Sound.play"+sndId+" = function(loop) { Sound."+sndId+"=Sound.playSound('"+sndId+"', loop);}");
	eval("Sound.stop"+sndId+" = function() {if(Sound."+sndId+"){Sound."+sndId+".stop();}}");
}