const click = document.getElementById("click");
click.addEventListener("click", move);

const click1 = document.getElementById("click1");
click1.addEventListener("click", move1);

const btn_number = document.getElementsByClassName("number");
for(i=0;i<btn_number.length;i++){
    btn_number[i].addEventListener("click", get_number);
}

const btn_mult = document.getElementsByClassName("multiplier");
for(i=0;i<btn_mult.length;i++){
    btn_mult[i].addEventListener("click", get_multiplier);
}

const sbm = document.getElementsByClassName("submit_score");
for(i=0;i<sbm.length;i++){
    sbm[i].addEventListener("click", get_submit);
}

window.addEventListener("resize", write);

function write(){
    const width = document.querySelector(".number").getBoundingClientRect().width;
    const width1 = document.querySelector(".wrapper").getBoundingClientRect().width;
    const width2 = document.querySelector("#left_scores_input").getBoundingClientRect().width;
    const elem = document.getElementsByClassName("number");
    const elem1 = document.querySelector("#score_board.move");
    for(i=0;i<elem.length;i++){
        elem[i].style.height = width+"px";

    }
    console.log(elem1);
    console.log(width1-width2);
    elem1.style.setProperty('--width', width1-width2+'px');
}

let one = {
    number:0,
    multiplier:0,
    button_location: "",
    dart_number: 0,
    score_location: document.getElementById("score_number"),
    index:null,
    own_sl: [],
    opp_sl: [],
    score: 0
};


function move(){
    /*
    -give left_scores_input move class;
    -add class to score_board to adjust for the width;
    */
    const left = document.getElementById("left_scores_input");
    const board = document.getElementById("score_board");
    const width1 = document.querySelector(".wrapper").getBoundingClientRect().width;
    left.classList.add("move");
    board.classList.add("move");
    const elem1 = document.querySelector("#score_board.move");
    elem1.style.setProperty('--width', width1-300+'px');
}

function move1(){
    const sb = document.getElementById("score_board");
    const left = document.getElementById("left_scores_input");
    const right = document.getElementById("right_scores_input");
    if(sb.style.left === "20%"){
        sb.style.left = "0%";
        left.style.left = "-20%";
        right.style.left = "80%";
    } else {
        sb.style.left = "20%";
        left.style.left = "0%";
        right.style.left = "100%";
    }
}

function get_number(e){
    const target = e.target;
    const number =  target.textContent;
    const location = target.parentElement.parentElement.querySelectorAll("span");
    location[0].innerHTML = number;
    one.number = number;

}

function get_multiplier(e){
    const target = e.target;
    const mult = target.textContent;    
    const location = target.parentElement.parentElement.querySelectorAll("span");
    location[1].innerHTML = mult;
    one.multiplier = parseFloat(target.value);
}

function get_submit(){
    const validation = validate_input()
    if (validation === true){
        const index = get_index();
        const current_score = get_player_score(index);
        const opp_score = get_opp_score(index);
        const opp = opp_number(opp_score);
        place_score(current_score);
        const score = calc_score(opp);
        add_score(score);
        winning_conditions();
        add_dart_count();
    } else {
    }
}

function add_dart_count(){
    const left = document.getElementById("left_scores_input");
    const right = document.getElementById("right_scores_input");
    one.dart_number++;
    if(one.dart_number===3 && left.classList.contains("active")){
        left.classList.remove("active");
        right.classList.add("active");
        one.dart_number = 0;
        move1();
    } else if (one.dart_number===3 && right.classList.contains("active")){
        right.classList.remove("active");
        left.classList.add("active");
        one.dart_number = 0;
        move1();
    }
}

function validate_input(){
    if(one.number === 0){
        alert("please elect a score");
        return false;
    } else if (one.multiplier === 0){
        alert("please select a multiplier");
        return false;    
    } else if (one.multiplier === 3 && one.number === "B"){
        alert("triple Bull is not possible");
        return false;
    } else {
        return true;
    }
}

function get_index(){
    const nEw = one.score_location.firstElementChild.children;
    for(i=0;i<nEw.length;i++){
        if(nEw[i].textContent == one.number){
            return parseFloat(i);
        }
    }
}

function get_player_score(index){
    const left = document.getElementById("left_scores_input");
    const right = document.getElementById("right_scores_input");
    if(left.classList.contains("active")){
        const current_score = document.getElementById("checklist_left").children;
        return current_score[index].firstElementChild.children;
    } else if (right.classList.contains("active")){
        const current_score = document.getElementById("checklist_right").children;
        return current_score[index].firstElementChild.children;
    }
}

function get_opp_score(index){
    const left = document.getElementById("left_scores_input");
    const right = document.getElementById("right_scores_input");
    if(left.classList.contains("active")){
        const current_score = document.getElementById("checklist_right").children;
        return current_score[index].firstElementChild.children;
    } else if (right.classList.contains("active")){
        const current_score = document.getElementById("checklist_left").children;
        return current_score[index].firstElementChild.children;
    }
}

function opp_number(opp_score){
    const opp = [];
    for(i=0;i<opp_score.length;i++){
        if(opp_score[i].classList.contains("black")){
            opp.push(opp_score[i]);
        }
    }
    return opp.length;
}

function place_score(current_score){
    for(i=0;i<current_score.length;i++){
        if(current_score[i].classList.contains("black")){

        } else {
            if(one.multiplier!=0){
                current_score[i].classList.add("black");
                one.multiplier--;
            }
        }
    }
}

function calc_score(opp){
    if(one.multiplier != 0 && opp != 3){
        if(one.number == "B"){
            return parseFloat(one.multiplier)*25;
        } else {
            return parseFloat(one.multiplier)*parseFloat(one.number);
        }
    } else {
        return null;
    }
}

function add_score(score){
    const left = document.getElementById("left_scoreboard").firstElementChild.firstElementChild;
    const right = document.getElementById("right_scoreboard").firstElementChild.firstElementChild;
    const li = document.createElement("li");
    if(document.getElementById("left_scores_input").classList.contains("active") && score != null){
        let new_score = parseFloat(left.lastElementChild.textContent);
        new_score = new_score + score;
        li.innerHTML = new_score;
        left.appendChild(li);
        return new_score;
    } else if(document.getElementById("right_scores_input").classList.contains("active") && score !=null){
        let new_score = parseFloat(right.lastElementChild.textContent);
        new_score = new_score + score;
        li.innerHTML = new_score;
        right.appendChild(li);
        return new_score;
    }

}

function winning_conditions(){
    let count_checks = 0;
    const li_list_left = document.getElementById("checklist_left").querySelectorAll("li");
    const li_list_right = document.getElementById("checklist_right").querySelectorAll("li");
    const opp_score = document.getElementById("right_scoreboard").firstElementChild.firstElementChild.lastElementChild.textContent;
    const own_score = document.getElementById("left_scoreboard").firstElementChild.firstElementChild.lastElementChild.textContent;
    if(document.getElementById("left_scores_input").classList.contains("active")){
        for(i=0;i<li_list_left.length;i++){
            if(li_list_left[i].classList.contains("black")){
                count_checks++;
            }
        }
    } else if(document.getElementById("right_scores_input").classList.contains("active")){
        for(i=0;i<li_list_right.length;i++){
            if(li_list_right[i].classList.contains("black")){
                count_checks++;
            }
        }    
        
    }
    if(count_checks == 36 && own_score>opp_score){
        alert("you have won the game");
    }
}
