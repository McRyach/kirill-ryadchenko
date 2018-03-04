
(function(){

    var isScrolling;
    var carousel = document.getElementById('wheel');
    var lastIndex = document.getElementById('wheel').childElementCount;
    var first;
    var last;
    var version = " V0.51 ";
    var deb = document.getElementById('debuger');
    var clientX, clientY;
    var scrollBack;
    var outerBody = document.body;
    var outerHTML = document.documentElement;
    var goTop;
    //var preDef = false;
    
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

    function scrollingEvent(e) {

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

                if(clickedItem.className == "item block" || clickedItem.className == "item preview" || clickedItem.className == "return"){
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

    function hideBlocks(){
        var blocks = document.getElementsByClassName('block');
        var proj = document.getElementsByClassName('open')[0];
        
        proj.childNodes[1].classList.add('hidden');
        proj.childNodes[5].classList.add('hidden');

        for(var i=0, max=blocks.length; i<max; i++){
            blocks[i].classList.add('hidden');
        }
        outerBody.classList.add('backBody');
        outerHTML.classList.add('backBody');

        window.removeEventListener("scroll", scrollingEvent, {passive: true});

    }

    function showBlocks(){
        var proj = document.getElementsByClassName('open')[0];
        var blocks = document.getElementsByClassName('block');
        
        outerBody.classList.remove('backBody');
        outerHTML.classList.remove('backBody');

        proj.childNodes[1].classList.remove('hidden');
        proj.childNodes[5].classList.remove('hidden');

        for(var i=0, max=blocks.length; i<max; i++){
            blocks[i].classList.remove('hidden');
        }

        proj.classList.add('block');
        proj.classList.remove('open');

        window.addEventListener("scroll", scrollingEvent, {passive: true});

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
                var fixedUnderlay = eTar.childNodes[3];

                //fixedUnderlay.addEventListener('touchmove', function(e){
                //    e.preventDefault();
                //}, false);
                
                hideBlocks();
                //preDef = true;
                
                eTar.scrollIntoView({behavior: "instant"});
                if(false == isTouchDevice()){
                    goTop = setTimeout(function(){
                        eTar.scrollIntoView(true);
                    }, 400);
                }

            } else if (proClass == "return") {
                console.log("Return of The Jedi!");
                showBlocks();
            }
            //eTar.scrollIntoView(true);
            

        }

       console.log("/////////////////////////////////////////////////////////////////");
        deb.innerHTML = version + "Clicked: "+ eTar.id;
        e.stopPropagation();

    }

})();
