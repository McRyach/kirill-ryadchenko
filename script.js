
(function(){

    var isScrolling;
    //var viewport = document.getElementsByClassName('viewport')[0];
    //var viewpixel = viewport.scrollTop;
    var carousel = document.getElementById('wheel');
    var lastIndex = (document.getElementsByClassName('item').length)-1;
    var first;
    var last;
    var version = "V0.15 ";
    
    window.onload = function(){
        //viewport.scrollTop = 2700;
        window.scrollTo(0,2450);
    }

    function isTouchDevice(){
        return 'ontouchstart' in document.documentElement;
    }

    if(isTouchDevice()){
        //viewport.addEventListener("touchmove", scrollingEvent, {passive: true});
        //window.addEventListener("touchmove", scrollingEvent, {passive: true});
        window.addEventListener("scroll", scrollingEvent, {passive: true});
    } else {
        //viewport.addEventListener("scroll", scrollingEvent, {passive: true});
        window.addEventListener("scroll", scrollingEvent, {passive: true});
    }
    
    //viewport.addEventListener("scroll", scrollingEvent, {passive: true});
    
    function scrollingEvent() {
        
        viewpixel = window.scrollY;//viewport.scrollTop;
        document.getElementById('debuger').innerHTML = version +"Pixel: "+ viewpixel;
        first = document.getElementsByClassName('item')[0];
        last = document.getElementsByClassName('item')[7];

        clearTimeout(isScrolling);

        isScrolling = setTimeout(function(){
            //console.log("List Position is: " + viewpixel);
            document.getElementById('debuger').innerHTML = version + "Timeout: "+ viewpixel;

            if(viewpixel > 3099){
                console.log("Add At the Bottom");
                carousel.insertBefore(first, null);
                //viewport.scrollTop = viewpixel-700;
                window.scroll(0, viewpixel-700);
            }

            if(viewpixel < 1801){
                console.log("Add At the Top");
                carousel.insertBefore(last, first);
                //viewport.scrollTop = viewpixel +700;
                window.scroll(0,viewpixel+700);
            }

        }, 200);
    }



})();
