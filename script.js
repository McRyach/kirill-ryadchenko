
(function(){

    var isScrolling;
    var carousel = document.getElementById('wheel');
    var lastIndex = document.getElementById('wheel').childElementCount;
    var first;
    var last;
    var version = " V0.35 ";
    var deb = document.getElementById('debuger');
    var clientX, clientY;
    var scrollBack;
    var outerBody = document.body;
    var outerHTML = document.documentElement;
    
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
        scrollBack = 200;
        //window.addEventListener("touchstart", clickEvent, false);
        console.log("This is touch device");  
        window.addEventListener('touchstart', function(e){
           //
           clientX = e.touches[0].clientX;
           clientY = e.touches[0].clientY;

        },false);

        window.addEventListener('touchend', function(e){
            //
            var deltaX, deltaY;

            //deltaX = e.changedTouches[0].clientX - clientX;
            deltaY = e.changedTouches[0].clientY - clientY;
            console.log("DeltaY: " + deltaY);

            if(Math.abs(deltaY) < 20){
                deb.innerHTML = version + "It's a ckick! ";
                clickEvent(e);
            } else {
                deb.innerHTML = version + "It's a scroll!!!!";
            }

        }, false);

    } else {
        scrollBack = 50;
        window.addEventListener("click", clickEvent, false);    
    }
    

    window.addEventListener("scroll", scrollingEvent, {passive: true});

    function scrollingEvent() {
        
        viewpixel = window.scrollY;
        deb.innerHTML = version +"Pixel: "+ viewpixel;
        first = document.getElementsByClassName('item')[0];
        last = document.getElementsByClassName('item')[23];

        clearTimeout(isScrolling);

        isScrolling = setTimeout(function(){
            
            if(viewpixel > 10520){
                if(first.className == "item preview"){
                    first.classList.add('block');
                    first.classList.remove('preview');
                    viewpixel = viewpixel-400;
                }
                console.log("Add At the Bottom");
                carousel.insertBefore(first, null);
                window.scroll(0, viewpixel-700);
            }

            if(viewpixel < 5260){
                if(last.className == "item preview"){
                    last.classList.add('block');
                    last.classList.remove('preview');
                    viewpixel = viewpixel;
                }
                console.log("Add At the Top");
                carousel.insertBefore(last, first);
                window.scroll(0,viewpixel+700);
            }

        }, scrollBack);
    }

    function wheelNode(event){
        
            var clickedItem = event.target;
            var itemClass = clickedItem.className;
            console.log("Getting The Wheel Item!" + itemClass);
            if(itemClass == "item block" || itemClass == "item preview"){
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

                    if(clickedItem.className == "item block" || clickedItem.className == "item preview"){
                        console.log("Third Try Result");
                        return clickedItem;
                        event.stopPropagation;
                    } else {
                        console.log("We Couldn not catch it!");
                        
                        return null;
                    }
                }
            }
        
    };

    function suspect(){
        var suspect = document.getElementsByClassName('preview')[0];
        if (suspect !== undefined){
            suspect.classList.add('block');
            suspect.classList.remove('preview');
        } 
    }

    function clickEvent(e){
        console.log("We Clicked :" + e.target.tagName);
        deb.innerHTML = version + "Clicked !";
        var eTar = e.target;
        
        if(eTar.tagName == 'HTML'){
            console.log('It is a white space'); 
            suspect();
        } else {
            console.log("We Hit :" + eTar.id);
            console.log("We Got :" + eTar.className);
            eTar = wheelNode(e);
            var proClass = eTar.className;
            console.log("From wheelNode function :" + proClass);
            if (proClass == "item block"){
                suspect();
                console.log("removing BLOCK adding PREVIEW");
                eTar.classList.add('preview');
                eTar.classList.remove('block');
            } else if (proClass == "item preview"){
                console.log("Removing PREVIEW adding OPEN");
                eTar.classList.remove('preview');
                eTar.classList.add('open');
                outerBody.style.overflow = "hidden";
                outerBody.style.position = "relative";
                outerHTML.style.overflow = "hidden";
                outerHTML.style.position = "relative";
                eTar.childNodes[3].scrollIntoView(true);
            }

        }

       console.log("/////////////////////////////////////////////////////////////////");
        deb.innerHTML = version + "Clicked: "+ eTar.id;
        e.stopPropagation();

    }

})();
