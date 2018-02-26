
(function(){

    var isScrolling;
    var carousel = document.getElementById('wheel');
    var lastIndex = document.getElementById('wheel').childElementCount;
    var first;
    var last;
    var version = " V0.25 ";
    var deb = document.getElementById('debuger');
    
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
    
    if (isTouchDevice()){
        //window.addEventListener("touchstart", clickEvent, false);  
        window.on('touchstart', function(ev){
            startX = getCoord(ev, 'X');
            startY = getCoord(ev, 'Y');
        }).on('touchend', function(ev){
            if (Math.abs(getCoord(ev, 'X') - startX) < 20 && Math.abs(getCoord(ev, 'Y') - startY) < 20){
                ev.preventDefault();
                clickEvent.call(this, ev);
            }
        })
    } else {
        window.addEventListener("click", clickEvent, false);    
    }

    //temporary location of helper function. It should go at the bottom of the code
    function getCoord(e, c){
        return /touch/.test(e.type) ? (e.originalEvent || e).changedTouches[0]['page'+c]: e['page' + c];
    }
    

    window.addEventListener("scroll", scrollingEvent, {passive: true});

    function scrollingEvent() {
        
        viewpixel = window.scrollY;
        deb.innerHTML = version +"Pixel: "+ viewpixel;
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
        //if(event.target !== event.curentTarget){
            var clickedItem = event.target;
            var itemClass = clickedItem.className;
            console.log("Getting The Wheel Item!" + itemClass);
            if(itemClass == "item block"){
                console.log("First Try Result");
                return clickedItem;
                event.stopPropagation;
            } else {
                clickedItem = clickedItem.parentNode;

                if(clickedItem.className == "item block" || clickedItem.className == "item preview"){
                    console.log("Second Try Result!");
                    return clickedItem;
                    event.stopPropagation;
                } else {
                    clickedItem = clickedItem.parentNode;

                    if(clickedItem.className == "item block"){
                        console.log("Third Try Result");
                        return clickedItem;
                        event.stopPropagation;
                    } else {
                        console.log("We Couldn not catch it!");
                        //console.log("We are Clicking :" + clickedItem.className);
                        return null;
                    }
                }
            }
        //}
    };

    function clickEvent(e){
        console.log("We Clicked :" + e.target.tagName);
        deb.innerHTML = version + "Clicked !";
        var eTar = e.target;
        
        if(eTar.tagName == 'HTML'){
            console.log('It is a white space');    
        } else {
            console.log("We Hit :" + eTar.id);
            console.log("We Got :" + eTar.className);
            eTar = wheelNode(e);
            var proClass = eTar.className;
            console.log("From wheelNode function :" + proClass);
            if (proClass == "item block"){
                console.log("removing BLOCK adding PREVIEW");
                eTar.classList.add('preview');
                eTar.classList.remove('block');
            } else if (proClass == "item preview"){
                console.log("Removing PREVIEW adding OPEN");
                eTar.classList.remove('preview');
                eTar.classList.add('open');
            }

        }

       console.log("/////////////////////////////////////////////////////////////////");
        deb.innerHTML = version + "Clicked: "+ eTar.id;
        e.stopPropagation();

    }

})();
