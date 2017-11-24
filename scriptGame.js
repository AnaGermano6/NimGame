//setting game vars
var tableLines = 3;
var level;
var difficulty;
var pointsUser = 0; //pontos do user
var pointsPC = 0; //pontos do pc

var tab;
var sumall=0;
var next_to_that = 0;
var original;

//Verifica qual o numero de linhas inserido pelo utilizador
function updateLines(){
    tableLines = document.getElementById('numLinhas').value;
}

tab = new Array (tableLines+1);
original = new Array (tableLines+1);

/* tabuleiro do jogo */
function buildBoard(){
    removetable("tab1");
    updateLines();

    var bodygame = document.getElementById("tabuleiro");
    var tabuleiro = document.createElement('div');

    tabuleiro.setAttribute("id", "tab1");

    for(var i=0; i<tableLines; i++){
        var lines = document.createElement('div');
        lines.setAttribute("id", "lines");

        for(var j=0; j<1+(i*2); j++){
            var columns = document.createElement('div');
            columns.setAttribute("class", "parts");
            var img = document.createElement('IMG');
            img.setAttribute("src", "p_granada.png");
            img.setAttribute("id", "img_parts");
            img.setAttribute("alt", "");
            columns.setAttribute("id", i+","+j);
            columns.setAttribute("onclick", "player_draught("+i+","+j+")");
            columns.appendChild(img);
            lines.appendChild(columns);
        }
        tab[i] = j;
        original[i] = j;
        tabuleiro.appendChild(lines);
    }
    bodygame.appendChild(tabuleiro);
}


//apaga o tabuleiro do jogo caso exista 
function removetable(x){
    var rm = document.getElementById(x);
    if (rm)
        rm.parentNode.removeChild(rm);
}

//Verifica a dificuldade escolhida pelo utilizador
function updateDifficulty(){
    if (document.getElementById('beginner').checked)
        difficulty = 'Beginner';
    else if (document.getElementById('intermediate').checked)
        difficulty = 'Intermediate';
    else
        difficulty = 'Expert';
    
    level = difficulty;
}

//verifica quem inicia o jogo
function turn(){
    if(document.getElementById("computer").checked == true){
        aiTurn();
    }
    if(document.getElementById("opponent").checked == true){
        wait_for_next_player(); 
    }
    else{
        next_to_that = 21
        toggleDisplayNone('wait');
        toggleDisplayNone('giveup');
        toggleDisplayBlock('tabuleiro');
    }
}

//escolha da dificuldade, no caso de nao ser escolhida nenhuma por defeito usa a do beginner
function aiTurn(){    
    switch(difficulty) {
        case "Beginner":
			aiBegginerTurn();
			break;
        case "Intermediate":
			aiIntermediateTurn();
			break;
        case "Expert":
			computer_turn();
			break;
        default:
			aiBegginerTurn();
			break;
    } 
}


function player_draught(line , col) {

    if ((next_to_that==20 || next_to_that==21) && tab[line]!=0)
        next_to_that=line
    if (next_to_that==line && tab[line]!=0) 
        remove(line,col)
    else if(next_to_that!=line && tab[line]!=0)
        alert("The same line must be played!");

    sumall = 0;
    for(var i=0; i< tableLines; i++){
        sumall += tab[i];
    }

    if (sumall==0){
        alert("You Win :)");
        toggleDisplayNone('pcturn');
        toggleDisplayNone('quit');
        pointsUser++;
    }
}

var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


function  aiBegginerTurn(){

    next_to_that = 20;

    var cenas1 = Math.floor((Math.random() * tableLines) + 0)
    var cenas2 = Math.floor((Math.random() * tab[cenas1]) + 0)

    if(document.getElementById(cenas1+","+cenas2).style.visibility == "hidden"){

        for(var j=0; j<tableLines;j++){
            if(tab[j]>0){
                for(var k=0; k<original[j]; k++){
                    if(document.getElementById(j+","+k).style.visibility != "hidden"){
                        remove(j,k);
                        break;
                    }
                }
                break;
            }
        }
    }
    else
        remove(cenas1, cenas2);

    sumall = 0;
    for(var i=0; i< tableLines; i++){
        sumall += tab[i];
    }

    if(sumall==0){
        alert("You lost :(");
        toggleDisplayNone('pcturn');
        toggleDisplayNone('quit');
        pointsPc++;
    }
}

function aiIntermediateTurn(){
    switch(getRandomInteger(0,1)){
        case 0:
			aiBegginerTurn();
			break;
        case 1:
			computer_turn();
			break;
        default:
			aiBegginerTurn();
			break;
    }
}


function computer_turn(){

	var nimSumAll = 0,                          // Nim-sum of all the heap sizes
	nimSumEach = Array(tab.length),      // Nim-sum of each heap size with nimSumAll
	selectedLin, selectedTok;               // Indices of the computer's selected token

	next_to_that = 20;

	nimSumAll = tab[0];               
	for (var i=1; i<tab.length; i++)
		nimSumAll ^= tab[i];

	if (nimSumAll === 0) {
		aiBegginerTurn();
	}
	else {
		for (i=0; i<tab.length; i++){
			nimSumEach[i] = tab[i] ^ nimSumAll;
		}

		for (i=0; i<tab.length; i++) {
			if (nimSumEach[i] < tab[i]) {
				selectedLin = i;
				selectedTok = nimSumEach[i];
				break;
			}
		}
	}
	remove_int(selectedLin,selectedTok);

	sumall = 0;
	for(var i=0; i< tableLines; i++){
		sumall += tab[i];
	}

	if(sumall == 0){
		alert("You lost :(")
		toggleDisplayNone('pcturn');
		toggleDisplayNone('quit');
		pointsPC++;
	}

}

function remove(line,col){
	var x = document.getElementById(line+","+col)
	x.style.visibility="hidden";

	tab[line]--;
}

function remove_int(line,tokens){

	for(var j=0; j<tokens; ){
		for(var i=0; i < original[line]; i++){
			if(document.getElementById(line+","+i).style.visibility != "hidden" && j<tokens){
				tab[line] --;
				j++;
				document.getElementById(line+","+i).style.visibility = "hidden";
			}
		}
	}
	
	if(tokens === 0){
		for(var i=0; i < original[line]; i++){
			if(document.getElementById(line+","+i).style.visibility != "hidden"){
				tab[line] --;
				document.getElementById(line+","+i).style.visibility = "hidden";
			}
		}
	}

}

//random numero
function getRandomInteger(min, max) {
	return Math.random() * (max - min) + min;
}

//no caso de ser o adversario a jogar
function wait_for_next_player() {
    toggleDisplayBlock('wait');
    toggleDisplayBlock('giveup');
    toggleDisplayNone('pcturn');
    toggleDisplayNone('tabuleiro');
    update();
}