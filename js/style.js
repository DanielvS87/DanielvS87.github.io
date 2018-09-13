//--Self invoking function to assign all the evenlisteners--
(function(){
    var menu_btn = document.querySelector(".menu-btn");
    menu_btn.addEventListener("click", showMenu);
    
    
    var next = document.getElementsByClassName("nxt-btn");
    for(i=0;i<next.length;i++){
        next[i].addEventListener("click", rotateLeft);
    } 
    

    var prv_btn = document.querySelectorAll(".prv-btn");
    for(i=0;i<prv_btn.length;i++){
        prv_btn[i].addEventListener("click", rotateRight);
    }
    
})()

// rotate divs from position 3 to 1 usinf flip effect--
function rotateRight(){
    var a = document.querySelector(".loc1");
    var b = document.querySelector(".loc2");
    var c = document.querySelector(".loc3");
    a.classList.remove("loc1");
    a.classList.add("loc2");
    b.classList.remove("loc2");
    b.classList.add("loc3");
    c.classList.remove("loc3");
    c.classList.add("loc1");
    c.classList.add("flipBack");
    setTimeout(function(){
        var a = document.querySelector(".flipBack")
        a.classList.remove("flipBack");
    }, 400);
}

function rotateLeft(){
    var a = document.querySelector(".loc1");
    var b = document.querySelector(".loc2");
    var c = document.querySelector(".loc3");
    a.classList.remove("loc1");
    a.classList.add("loc3");
    a.classList.add("flipFront");
    setTimeout(function(){
        var a = document.querySelector(".flipFront")
        a.classList.remove("flipFront");
    }, 400);
    b.classList.remove("loc2");
    b.classList.add("loc1");
    c.classList.remove("loc3");
    c.classList.add("loc2");
}

//--function to show and hide the navigation mune and alter the menu button--
function showMenu(){
    var a = document.querySelector(".navbar");
    var b = document.querySelector(".menu-btn");
    if(b.classList.contains("hide")){
        b.classList.remove("hide");
        a.classList.remove("show");
    } else {
        b.classList.add("hide");
        a.classList.add("show");
    }
}