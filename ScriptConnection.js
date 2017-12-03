var url = 'http://twserver.alunos.dcc.fc.up.pt:8008/';
var game;
var source;
var response;
var data = '';
var opponent = '';
var turn = '';
var gameinprogress = 0;
var ranking_data;

function getName(){
    return document.getElementById('username').value.toString();
}

function getPass(){
    return document.getElementById('password').value.toString(); 
}

function getSize(){
    return document.getElementById('numLinhas').value;
}

function getStack(){
    return line+","+col;
}

/**
 * Retornar true ou false se o user foi registrado com sucesso.
 * O registro também deve entrar no user no servidor.
 */
function register() {
     
    data = {"nick": getName(), "pass": getPass()};

    //constroi um pedido http request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'register', true);
    
    // envia os dados coletados como JSON
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function(){
        if(xhr.readyState < 4 && xhr.status == 400 ){
            var response = JSON.parse(xhr.responseText);
              alert("Error: " + response.error);
        }
        else if(xhr.status == 200 && xhr.readyState == 4){
            register_sucess();
        }
    }
}


function join() {
    
    data = {'group': 99, 'nick': getName(), 'pass': getPass(), 'size': getSize()};

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'join', true);

    // envia os dados coletados como JSON
    xhr.send(JSON.stringify(data));
  
    xhr.onloadend = function () {
        response = JSON.parse(xhr.responseText);

        if (response.error == undefined) {
            game = response.game;
        }
        else alert('Erro: ' + response.error);
    };
}


function update() {
    source = new EventSource(url + 'update?game=' + game + '&name=' + getName());

    source.onmessage = function response(event) {
        var json = JSON.parse(event.data);

        if (json.error != null) {
            event.close();
        }

        if (json.hasOwnProperty("rack") && !json.hasOwnProperty("pieces")){
            gameinprogress = 1;
            toggleDisplayBlock('game');
            toggleDisplayBlock('pcturn');
            toggleDisplayNone('wait');
            toggleDisplayBlock('comand');
            turn = json.turn;
        }

        if (json.winner != undefined) {
            gameinprogress=0;
            alert("Player " + winner + " won!");
        }
    };
}


function leave() {
    data = {'nick': getName(), 'pass': getPass(), 'game': game};

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'leave', true);

    // envia os dados coletados como JSON
    xhr.send(JSON.stringify(data));

    xhr.onload = function () {
        var response = JSON.parse(xhr.responseText);

        if(response.hasOwnProperty("error")) {
            console.log(response);
            alert(response.error);
        } else {
            source.close();
        }

    };
}


function notify() {
    data = {'nick': getName(), 'game': game, 'stack': getStack(), 'pieces': sumall};    

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'notify', true);

    // envia os dados coletados como JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
        var response = JSON.parse(xhr.responseText);

        if (response.error == undefined) {
            update();
        }
        else {
            alert('Erro: ' + response.error);
        }
    };
}


function ranking() {

    data={'size': getSize()};

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'ranking', true);

    // envia os dados coletados como JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
       var response = JSON.parse(xhr.responseText);

        if (response.error == undefined) {
           ranking_data = response.ranking;
           tab_highsOnline(ranking_data);
        }
        else alert('Erro: ' + response.error);
    };
}