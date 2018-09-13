const turnBtn = document.getElementsByClassName("turnCard");
for(i=0; i<turnBtn.length;i++){
    turnBtn[i].addEventListener("click", flipCard);
}

const thrownBtn = document.getElementsByClassName("thrownBtn");
for(i=0; i<thrownBtn.length;i++){
    thrownBtn[i].addEventListener("click", getNewCard);
}

const plrName = document.getElementById("btn-submit");
plrName.addEventListener("click", addPlr);

const startbtn = document.getElementById("startbtn");
startbtn.addEventListener("click", createPlayer);

const nxt_Btn = document.getElementById("nxt_Btn");
nxt_Btn.addEventListener("click", nextPlayer);

function changeBgColor(newValue){    
    const colorType = newValue.split(" ");
    return colorType;
}

const deck = [];

function createDeck(){
    for(i=1; i<21;i++){
        deck[i-1]=((i) + " single");
        deck[i+19]=((i) + " double");
        deck[i+39]=((i) + " triple");
    }
    deck.push('25');
    deck.push('50');
}
createDeck();

function shuffle(deck) {
    let m = deck.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = deck[m];
      deck[m] = deck[i];
      deck[i] = t;
    }
    return deck;
}
shuffle(deck);

function placeDeck(){
    const locationDeck = document.getElementById("deck");
    for(i=0;i<deck.length;i++){
        const card = deck[i];
        const textElement = document.createElement("p");
        const frontDiv = document.createElement("div");
        frontDiv.classList.add("front");
        frontDiv.classList.add("bg-front");
        const backDiv = document.createElement("div");
        backDiv.classList.add("back");
        backDiv.classList.add("bg-back");
        const cardWrapper = document.createElement("div");
        textElement.innerHTML = card;
        frontDiv.appendChild(textElement);
        cardWrapper.appendChild(frontDiv);
        cardWrapper.appendChild(backDiv);
        locationDeck.appendChild(cardWrapper);
    }
}
placeDeck();

function firstThreeCards(){
    const locationCard = document.querySelectorAll(".starters");
    for(i=0;i<locationCard.length;i++){
        const lastCard = document.getElementById("deck").lastElementChild.firstElementChild;
        const number = lastCard.textContent;
        const removeDiv = lastCard.parentElement;
        removeDummy(removeDiv)
        const newValue = number.split(" ");
        locationCard[i].innerHTML = newValue[0];
        if(newValue[1]==="single"){
            locationCard[i].parentElement.style.backgroundColor = "white";
        } else if (newValue[1] === "double"){
            locationCard[i].parentElement.style.backgroundColor = "pink";
        } else if (newValue[1]==="triple"){
            locationCard[i].parentElement.style.backgroundColor = "green";
        } else {
            locationCard[i].parentElement.style.backgroundColor = "red";
        }
    }
}
firstThreeCards();


function flipCard(e){
    const list = document.querySelector("#nNames").children.length;
    const parentItem = e.target.parentElement;
    const parentSibling = parentItem.previousElementSibling;
    if(list == 0){
        alert("please enter at least one name");
    } else {
    parentItem.classList.add("flip");
    parentSibling.classList.add("reverseFlip");
    }
}

function getNewCard(e){    
    const correctCard = e.target.parentElement.parentElement;
    const one = correctCard.querySelector(".flip");
    const two = correctCard.querySelector(".reverseFlip");
    const three = correctCard.querySelector(".starters");
    correctCard.classList.add("fadeOut");
    const newValue = document.getElementById("deck").lastElementChild.firstElementChild.textContent;
    let bgColor = changeBgColor(newValue);
    const deckDiv = document.getElementById("deck").lastChild;
    const data1 = correctCard.firstElementChild.getBoundingClientRect();
    const data2 = deckDiv.getBoundingClientRect();
    const xDifference = data1.x - data2.x;
    const yDifference = data1.y - data2.y;
    deckDiv.style.transform = `translate(${xDifference}px, ${yDifference}px)`;
    deckDiv.style.transition = `transform 400ms linear`;
    const backOfCard = correctCard.firstElementChild;
    remainingDeckCards();
    addPoint();
    setTimeout(function(){
        three.innerHTML = bgColor[0];
        one.classList.remove("flip");
        two.classList.remove("reverseFlip");
        correctCard.classList.remove("fadeOut");
        removeDummy(deckDiv);
        if (bgColor[1]==="single"){
            backOfCard.style.backgroundColor = "white";
        } else if (bgColor[1] === "double"){
            backOfCard.style.backgroundColor = "pink";
        } else if (bgColor[1]==="triple"){
            backOfCard.style.backgroundColor = "green";
        } else {
            backOfCard.style.backgroundColor = "red";
        }
    },500);
}

function removeDummy(item) {
    var elem = item;
    elem.parentNode.removeChild(elem);
}

function remainingDeckCards(){
    const cardsLeft = document.querySelector('#deck').children;
    let number = cardsLeft.length;
    number--;
    document.querySelector("#cards_remaining").innerHTML = number;
}

function moveInnerDiv(){
    const innerDiv = document.getElementById("innerDiv");
    innerDiv.classList.remove("move");
}
moveInnerDiv();

function addPlr(){
    const name = document.getElementById("namePlayer").value;
    if(name.length == 0){
        alert("please enter a name!!");
    } else {   
    const li = document.createElement("li");
    li.innerHTML=name;
    const nameList = document.getElementById("nameList");
    nameList.appendChild(li);
    }
}

function createPlayer(){
    const one = document.getElementById("nameList");
    const two = one.querySelectorAll("li");
    if(two.length<1){
        alert("Please enter at least one name")
    } else {
        const three = [];
        for(i=0;i<two.length;i++){
            const seven = document.createElement("span");
            const four = document.createElement("li");
            const six = document.createElement("p");
            const five = document.getElementById("nNames");
            four.appendChild(six);
            four.appendChild(seven);
            five.appendChild(four);
            three.push(two[i].textContent);
            seven.innerHTML = 0;
            six.innerHTML = three[i];
        }
        const leftPanel = document.getElementById("names");
        leftPanel.classList.remove("move");
        chooseRandomStart();
        changeGrid();
    }
}

function chooseRandomStart(){
    let namesArr = document.getElementById("nNames");
    const list = namesArr.querySelectorAll("li");
    const a = list.length;
    let b = list[Math.floor(Math.random()*a)];
    b.classList.add("active");
}

function changeGrid(){
    const change = document.querySelector(".inputPlayers");
    const change1 = document.querySelector(".next");
    change.classList.remove("inputPlayers");
    change.classList.add("next");
    change1.classList.remove("next");
    change1.classList.add("inputPlayers");
}

function nextPlayer(){
    const parent = document.getElementById("nNames");
    const active = parent.querySelector(".active");
    if(active.nextElementSibling){
        active.classList.remove("active");
        active.nextElementSibling.classList.add("active");
    } else {
        active.classList.remove("active");
        active.parentElement.firstElementChild.classList.add("active");
    }
}

function addPoint(){
    const item = document.getElementById("nNames");
    const item1 = item.querySelector(".active").firstElementChild.nextElementSibling;
    let item2 = parseFloat(item1.textContent);
    item2++;
    item1.innerHTML = item2;
}
