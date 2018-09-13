var nameBtn = document.getElementsByClassName("nameBtn");
for(i=0;i<nameBtn.length;i++){
    nameBtn[i].addEventListener("click", placeName);
}
var resetLeg = document.getElementById("resetLeg");
resetLeg.addEventListener("click", resetLists);

var startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", startGame);

var resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", startGame);

var submitBtn = document.getElementsByClassName("submitScoreBtn");
for (i=0;i<submitBtn.length;i++){
    submitBtn[i].addEventListener("click", submitScores);
}

var radio = document.getElementsByClassName("radio");
for(i=0;i<radio.length;i++){
    radio[i].setAttribute("checked", "");
    radio[i].addEventListener("click", setMultiplierActive);
}

var checkBox = document.getElementsByClassName("checkBox");
for(i=0;i<checkBox.length;i++){
    checkBox[i].addEventListener("click", setChecked);
}

function setChecked(e){
    var a = e.target;
    a.checked=true;
    var b = a.parentElement.querySelectorAll(".checkBox");
    for(i=0;i<b.length;i++){
        if(b[i] === a){
            b[i].checked=true;
        }else{
            b[i].checked=false;
        }
    }
    var c = a.parentElement.parentElement.id;
    if (c==="player1"){
        document.querySelector(".amount1").innerHTML= a.value;
    } else {
        document.querySelector(".amount2").innerHTML= a.value;
    }
}

var count = 0;

function placeName(e){
    var a = e.target;
    var b = a.previousElementSibling.value;
    var c = a.nextElementSibling.nextElementSibling.firstElementChild;
    c.innerHTML = b;
    var d = e.target.id.slice(10);
    var g = document.getElementById("player"+d+"Name");
    g.innerHTML = b;
}

function startGame(){
    alternateClasses(".data", "start");
    alternateClasses(".leftPlayer", "start");
    alternateClasses(".rightPlayer", "start");
    alternateClasses("#resetBtn", "start")
    alternateClasses("#resetLeg", "start")
    alternateClasses(".hidden", "show");
    setDefaultRadio();
}

function alternateClasses(className, newClass){
    var a = document.querySelector(className);
    if(a.classList.contains(newClass)){
        a.classList.remove(newClass);
    } else {
        a.classList.add(newClass);
    }    
}


function submitScores(e){
    var c = e.target;
    var a = e.target.parentElement.querySelectorAll(".dartValue");
    var b = [];
    var d = [];
    var f = [];
   
    for(i=0;i<a.length;i++){
        b[i] = parseFloat(a[i].value);
    }
    correctValues(b);
    getMultiplierValues(c, d);
    if(count===3){
        for(i=0;i<b.length;i++){
            f[i] = b[i] * d[i];
        }
        var g = f[0] + f[1] + f[2];
        count=0;
        var h = e.target.parentElement.querySelector(".amountL").lastElementChild.textContent;
        var k = h - g;
        if((k<0) || (k===1)){
            alert("too much!!");
        } else if (k>1){
            createElement(e, "li", ".amountL", k);
            createElement(e, "li", ".turnS", g);
        } else if (k===0){
            if ((d[0]==="2")||(d[1]==="2")||(d[2]==="2")){
                alert("congratulations, you won the leg");
                resetLists();
                //-- add legs and sets to the correct players --
                if(e.target.id === "btn1"){
                    var z = parseFloat(document.getElementById("l1").textContent);
                    z++;
                    if(z<3){
                        document.querySelector("#l1").innerHTML = z;
                    } else {
                        document.querySelector("#l1").innerHTML = 0;
                        var x = parseFloat(document.querySelector("#s1").textContent);
                        x++
                        document.querySelector("#s1").innerHTML = x;
                    }
                } else {
                    var z = parseFloat(document.getElementById("l2").textContent);
                    z++;
                    if(z<3){
                        document.querySelector("#l2").innerHTML = z;
                    } else {
                        document.querySelector("#l2").innerHTML = 0;
                        var x = parseFloat(document.querySelector("#s2").textContent);
                        x++
                        document.querySelector("#s2").innerHTML = x;
                    }                    
                }
            } else {
                alert("no double out");
            }
        }
    }
}

function correctValues(b){
    for(i=0;i<b.length;i++){
        var a = b[i];

        if((a>(-1) && a<21) ||(a ===25)){
            count++;
        } else {
            alert("put correct value (0-20 or 25)");
            break;
        } 
    }
}

function setDefaultRadio(){
    var a = document.querySelectorAll('.radio');
    for(i=0;i<a.length;i++){
        if( i%3 === 0){
            a[i].checked=true;
            a[i].classList.add("checked");

        } else {
            a[i].checked=false;
        }
    }
    
}

function setMultiplierActive(e){
    var a = e.target.parentElement.querySelectorAll('.radio');
    for(i=0;i<a.length;i++){
        a[i].checked=false;
        a[i].classList.remove("checked");
    }
    var b = e.target;
    b.checked=true;
    b.classList.add("checked")
}

function getMultiplierValues(c, d){
    var a = c.parentElement.querySelectorAll(".checked");
    for(i=0;i<a.length;i++){
        f= a[i].value;
        d.push(f); 
    }
}

function createElement(e, tagName, idName, amount){
    var tagName = document.createElement(tagName);
    var a = e.target.parentElement.querySelector(idName);
    a.appendChild(tagName);
    tagName.innerHTML = amount;
}

function resetLists(){
    var b = document.querySelectorAll(".amountL");
    var c = document.querySelectorAll(".turnS");
    for(i=0;i<b.length;i++){
        while (b[i].lastChild.id !== 'starter'){
            b[i].removeChild(b[i].lastChild);
        }        
    }
    for(i=0;i<c.length;i++){
        while (c[i].children.length !== 0){
            c[i].removeChild(c[i].lastChild);
        }
    }
}