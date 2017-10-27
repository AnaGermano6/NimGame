//setting game vars
var tableLines = 3;
var level;
var difficulty;

var tab;
var sumall=0;
var next_to_that = 0;
var original;

//Verifica qual o numero de linhas inserido pelo utilizador
function updateLines(){
    tableLines = document.getElementById('numLinhas').value;
}

//console.log(tableLines+1);
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
        lines.setAttribute('dataset-line-active', '1');

        for(var j=0; j<1+(i*2); j++){
            var columns = document.createElement('div');
            columns.setAttribute("class", "parts");
            var img = document.createElement('IMG');
            img.setAttribute("src", "granada.png");
            img.setAttribute("id", "img_parts");
            img.setAttribute("alt", "");
            columns.setAttribute("id", i+","+j);
            columns.setAttribute("onclick", "player_draught("+i+","+j+")");
            columns.setAttribute('dataset-part-active', '1');
            var removebutton = document.getElementById("botao" + i);
            columns.appendChild(img);
            lines.appendChild(columns);
        }
        //console.log(j)
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
    else
        next_to_that = 21
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
                winningStrategy();
                break;
        default:
                aiBegginerTurn();
                break;
    } 
}


function player_draught(line , col) {
    //console.log(row)
    //console.log(next_to_that)
    sumall = 0;
    for(var i=0; i< tableLines; i++){
        sumall += tab[i];
    }

    if ((next_to_that==20 || next_to_that==21) && tab[line]!=0)
        next_to_that=line
    if (next_to_that==line && tab[line]!=0) remove(line,col)
        if (sumall==0)
            alert("You Lost :( Try Again :)");
}


function  aiBegginerTurn(){

    sumall = 0;
    for(var i=0; i< tableLines; i++){
        sumall += tab[i];
    }

    console.log(sumall);

    if(sumall==0){
        alert("parabens ganhaste um rebuçado!");
        toggleDisplayNone('pcturn');
        toggleDisplayNone('quit');
    }

    next_to_that = 20;

    var cenas1 = Math.floor((Math.random() * tableLines) + 0)
    var cenas2 = Math.floor((Math.random() * tab[cenas1]) + 0)

    console.log(cenas1 + " " + cenas2)
    if(document.getElementById(cenas1+","+cenas2).style.visibility == "hidden"){
        console.log("escondido")

        for(var j=0; j<tableLines;j++){
            console.log(tab[j]);
            if(tab[j]>0){
                for(var k=0; k<original[j]; k++){
                    console.log(j,k)
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
}

function aiIntermediateTurn(){
    switch(getRandomInteger(0,1)){
        case 0:
            aiBegginerTurn();
            break;
        case 1:
            winningStrategy();
            break;
        default:
            aiBegginerTurn();
            break;
    }
}

function winningStrategy() {

    next_to_that = 20;

    sumall = 0;
    for(var i=0; i< tableLines; i++){
        sumall += tab[i];
    }

    if(sumall == 0){
        alert("You win :)")
        toggleDisplayNone('pcturn');
        toggleDisplayNone('quit');
    }
    var X = boardXor(tab);

    if (X == 0) {
        aiBegginerTurn();
        return;
    }
    console.log(tab.length)
    for(var i = 0; i < tab.length; i++) {
        var xorvalue = X ^ tab[i]
        if(xorvalue < tab[i] && tab[i] > 0) {
            var line = tableLines - xorvalue;
            console.log(line + " " + i)
            remove(line, i+1);
            //bremove("div("+line+"," +(i+1)+ ")", false);
            return;
        }
    }
}


function boardXor(columns) {
    var xor = 0;
    //console.log(columns.length)
    for(var i = 0; i < columns.length; i++) {
        //console.log(columns[i])
        xor ^= columns[i];
        console.log(xor);
    }
    return xor;
}


function remove(line,col){
    //console.log(line + " " + col);

    var x = document.getElementById(line+","+col)
    x.style.visibility="hidden";

    tab[line]--;
}

//random numero
function getRandomInteger(min, max) {
    return Math.random() * (max - min) + min;
}