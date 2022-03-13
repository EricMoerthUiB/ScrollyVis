function videoLoaded(id){
    (function videoLoop() {
        let opacity = parseInt(document.getElementById(id).style.opacity);
        if (isNaN(opacity) || opacity <= 0.95) {
            setTimeout(videoLoop, 100);
        } else {
            document.getElementById("vid"+ id).play();
            (function videoPauseLoop() {
                let opacity = parseInt(document.getElementById(id).style.opacity);
                if (isNaN(opacity) || opacity <= 0.5) {
                    document.getElementById("vid" + id).pause();
                }else{
                    setTimeout(videoPauseLoop, 100);
                }
            })();
        }
    })();
}