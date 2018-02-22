
(function(){

    var isScrolling;
    var viewport = document.getElementsByClassName('viewport')[0];
    var viewpixel = viewport.scrollTop;
    var carousel = document.getElementsByClassName('list')[0];
    var lastIndex = (document.getElementsByClassName('item').length)-1;
    var first;
    var last;
    
    window.onload = function(){
        viewport.scrollTop = 2700;
    }

    function isTouchDevice(){
        return 'ontouchstart' in document.documentElement;
    }

    if(isTouchDevice()){
        viewport.addEventListener("touchmove", scrollingEvent, {passive: true});
    } else {
        viewport.addEventListener("scroll", scrollingEvent, {passive: true});
    }
    
    //viewport.addEventListener("scroll", scrollingEvent, {passive: true});
    
    function scrollingEvent() {
        
        viewpixel = viewport.scrollTop;
        
        first = document.getElementsByClassName('item')[0];
        last = document.getElementsByClassName('item')[lastIndex];

        clearTimeout(isScrolling);

        isScrolling = setTimeout(function(){
            console.log("List Position is: " + viewpixel);

            if(viewpixel > 3099){
                console.log("Add At the Bottom");
                carousel.insertBefore(first, last);
                viewport.scrollTop = viewpixel-700;
            }

            if(viewpixel < 1801){
                console.log("Add At the Top");
                carousel.insertBefore(last, first);
                viewport.scrollTop = viewpixel +700;
            }

        }, 66);
    }



})();