
(function(){

    var isScrolling;
    var viewport = document.getElementsByClassName('viewport')[0];
    var viewpixel = viewport.scrollTop;
    var carousel = document.getElementsByClassName('list')[0];
    
    window.onload = function(){
        viewport.scrollTop = 2700;
    }
    
    viewport.addEventListener("scroll", scrollingEvent, {passive: true});
    
    function scrollingEvent() {
        
        viewpixel = viewport.scrollTop;
        
        clearTimeout(isScrolling);

        isScrolling = setTimeout(function(){
            console.log("List Position is: " + viewpixel);

            if(viewpixel > 3099){
                console.log("Add At the Bottom");
                //var carousel = document.getElementsByClassName('list')[0];
                //carousel.lastChild.after(carousel.firstChild);
                viewport.scrollTop = viewpixel-700;
                carousel.lastChild.after(carousel.firstChild);
                //viewpixel = (viewpixel-3099)+2700;
                //viewport.scrollTop = viewpixel;
            }

            if(viewpixel < 1801){
                console.log("Add At the Top");
                //var carousel = document.getElementsByClassName('list')[0];
                //viewpixel = 1801-(1801-viewpixel);
                //carousel.prepend(carousel.lastChild);
                //viewport.scrollTop = viewpixel+700;
                //carousel.prepend(carousel.lastChild);
                viewport.scrollTop = viewpixel+700;
                carousel.prepend(carousel.lastChild);
                //viewpixel = 2700-(1801-viewpixel);
                //viewport.scrollTop = viewpixel;
            }

        }, 66);
    }



})();