
(function(){

    var isScrolling;
    var viewport = document.getElementsByClassName('viewport')[0];
    
    
    console.log("element to listen" + viewport);
    viewport.addEventListener("scroll", scrollingEvent, {passive: true});
    console.log("we are in listener");
    function scrollingEvent() {
        
        var viewpixel = viewport.scrollTop;
        console.log("Scrolling Pixel: " + viewpixel);
        clearTimeout(isScrolling);

        isScrolling = setTimeout(function(){
            console.log("List Position is: " + viewpixel);
        }, 66);
    }



})();