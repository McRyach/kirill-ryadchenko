
(function(){

    var isScrolling;
    var carousel = document.getElementById('wheel');
    var lastIndex = document.getElementById('wheel').childElementCount;
    var first;
    var last;
    var version = "V0.21 ";
    
    window.onload = function(){
        multiplier();
        window.scrollTo(0,7900);
    }

    function isTouchDevice(){
        return 'ontouchstart' in document.documentElement;
    }
    /*
    if(isTouchDevice()){
        window.addEventListener("scroll", scrollingEvent, {passive: true});
    } else {
        window.addEventListener("scroll", scrollingEvent, {passive: true});
    } */


    
    function multiplier(){
        for(i=0; i<lastIndex; i++){
            carousel.appendChild(document.getElementsByClassName('item')[i].cloneNode(true));
        }

        for(i=0; i<lastIndex; i++){
            carousel.appendChild(document.getElementsByClassName('item')[i].cloneNode(true));
        }
    }
    
    carousel.addEventListener("click", clickEvent, false);

    window.addEventListener("scroll", scrollingEvent, {passive: true});

    function scrollingEvent() {
        
        viewpixel = window.scrollY;
        document.getElementById('debuger').innerHTML = version +"Pixel: "+ viewpixel;
        first = document.getElementsByClassName('item')[0];
        last = document.getElementsByClassName('item')[23];

        clearTimeout(isScrolling);

        isScrolling = setTimeout(function(){
            //document.getElementById('debuger').innerHTML = version + "Timeout: "+ viewpixel;

            if(viewpixel > 10520){
                console.log("Add At the Bottom");
                carousel.insertBefore(first, null);
                window.scroll(0, viewpixel-700);
            }

            if(viewpixel < 5260){
                console.log("Add At the Top");
                carousel.insertBefore(last, first);
                window.scroll(0,viewpixel+700);
            }

        }, 30);
    }

    function wheelNode(event){
        if(event.target !== event.curentTarget){
            var clickedItem = event.target;
            
            if(clickedItem.className == "item block"){
                console.log("First Try - We Got IT! :"+ clickedItem.className);
                return clickedItem;
            } else {
                clickedItem = clickedItem.parentNode;
                if(clickedItem.className == "item block" || clickedItem.className == "item preview"){
                    console.log("Second Try - We Got IT! :" + clickedItem.className);
                    return clickedItem;
                } else {
                    console.log("All We have is :" + clickedItem.className);
                    clickedItem = clickedItem.parentNode;
                    if(clickedItem.className == "item block"){
                        console.log("Third Try - We Got IT! :" + clickedItem.className);
                        return clickedItem;
                    } else {
                        console.log("All We Got is :" + clickedItem.className);
                    }
                }
            }
            console.log("The Item Clicked is: " + clickedItem.id);
        }
    };

    function clickEvent(e){
        console.log("The Function Returned :" + wheelNode(e).id);
        document.getElementById('debuger').innerHTML = version + "Clicked: "+ wheelNode(e).id;
        e.stopPropagation();
    }

})();
