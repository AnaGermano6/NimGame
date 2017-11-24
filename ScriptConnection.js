var url = 'http://twserver.alunos.dcc.fc.up.pt:8008/';
var json;
var response;
var group = 99;
var key;
var game;
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

/**
 * Retornar true ou false se o user foi registrado com sucesso.
 * O registro também deve entrar no user no servidor.
 */
function register() {
     
    data = {"nick": getName(), "pass": getPass()};

    //constroi um pedido http request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'register', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

   

    xhr.onloadend = function () {
        response = JSON.parse(xhr.responseText);

        if (response.error == undefined) {
            console.log("returning 1");
            register_sucess();
            return 1;
        }
        else {
            alert('Erro: ' + response.error);
            return 0;
        }
    };
    
     // envia os dados coletados como JSON
    xhr.send(JSON.stringify(data));
}


function join() {
    
    data = {'group': group, 'nick': getName(), 'pass': getPass(), 'size': getSize()};

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'join', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // envia os dados coletados como JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
        response = JSON.parse(xhr.responseText);

        if (response.error == undefined) {
            key = response.key;
            game = response.game;
            wait_for_next_player();
        }
        else alert('Erro: ' + response.error);
    };
}

/*
function update() {
    var source = new EventSource(url + 'update?name=' + getName() + '&game=' + game + '&key=' + key);

    source.onmessage = function response(event) {
        var json = JSON.parse(event.data);

        if (json.error != null) {
            event.target.close();
        }

        if (json.opponent) {
            gameinprogress = 1;
            toggleDisplayBlock('game');
            toggleDisplayBlock('pcturn');
            toggleDisplayNone('wait');
            getvalue();
            opponent = json.opponent;
            turn = json.turn;

            alert('Opponent: ' + opponent + ' Turn: ' + turn);
            MultiGame(turn);

        }
        if (json.move != undefined) {

        }

        if (json.winner != undefined) {
            gameinprogress=0;
            alert("O jogador " + json.winner + " ganhou o jogo!! Parabens!")
            //actualiza
            gameover(json.winner);
        }
    };
}
*/

function leave() {
    data = {'nick': getName(), 'pass': getPass(), 'game': game};

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'leave', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // envia os dados coletados como JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
        response = JSON.parse(xhr.responseText);

        if (response.error == undefined) {
            gameinprogress = 0;
            gameover(response.winner);
        }
        else alert('Erro: ' + response.error);

    };
}

/*
function notify() {
    data = {'nick': getName(), 'game': game, 'stack': stack, 'pieces': pieces};

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'notify', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

 // envia os dados coletados como JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
        response = JSON.parse(xhr.responseText);

        if (response.error == undefined) {
        update_game();
        }
        else {
            alert('Erro: ' + response.error);
        }
    };
}
*/


function ranking() {

    data={'size': getSize()};

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'ranking', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

 // envia os dados coletados como JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
        response = JSON.parse(xhr.responseText);

        if (response.error == undefined) {
            ranking_data = response.ranking;
        }
        else alert('Erro: ' + response.error);
    };
}