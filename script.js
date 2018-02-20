
(function(){

    var isScrolling;
    var viewport = document.getElementsByClassName('viewport')[0];
    
    
    
    viewport.addEventListener("scroll", scrollingEvent, {passive: true});
    
    function scrollingEvent() {
        
        var viewpixel = viewport.scrollTop;
        
        clearTimeout(isScrolling);

        isScrolling = setTimeout(function(){
            console.log("List Position is: " + viewpixel);
        }, 66);
    }



})();