(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        onResize = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth<=409.6){
                docEl.style.fontSize='40px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 1024) + 'px';
                docEl.style.overflowX = 'hidden';
            }
            $("#pdfToImgBox img").each(function(i) {
                  var img = $(this);
                $(img).css("zoom", 860/1600 * (clientWidth<=409.6?0.4:clientWidth/1024));
            })
        };
    var ready = false;
    if(ready == false){
        ready = true;
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if(clientWidth<=409.6){
            docEl.style.fontSize='40px';
        }else{
            docEl.style.fontSize = 100 * (clientWidth / 1024) + 'px';
        }
        $("#pdfToImgBox img").each(function(i){
            var img = $(this);
            $(img).css("zoom", 860/1600 *(clientWidth<=409.6?0.4:clientWidth/1024));
        });

    }
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, onResize, false);
    doc.addEventListener('DOMContentLoaded', onResize, false);
})(document, window);