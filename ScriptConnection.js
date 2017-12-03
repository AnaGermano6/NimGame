var url = 'http://twserver.alunos.dcc.fc.up.pt:8008/';
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

    xhr.onreadystatechange = function () {
       var response = JSON.parse(xhr.responseText);

        if (xhr.readyState == 4 && xhr.status == 200) {
            key = response.key;
            game = response.game;
           // alert(game)
            //update()
        }
        else alert('Erro: ' + response.error);
    };
}

function update() {
    var source = new EventSource(url + 'update?game=' + game + '&name=' + getName());

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
            opponent = json.opponent;
            turn = json.turn;

            alert(turn + " " + opponent);

            alert('Opponent: ' + opponent + ' Turn: ' + turn);
        }
        if (json.move != undefined) {
            return;
        }

        if (json.winner != undefined) {
            gameinprogress=0;
            //actualiza
            gameover(json.winner);
        }
    };
}

function leave() {
    data = {'nick': getName(), 'pass': getPass(), 'game': game, };

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'leave', true);

    // envia os dados coletados como JSON
    xhr.send(JSON.stringify(data));

    xhr.onload = function () {
        var response = JSON.parse(xhr.responseText);

        if (response.error == undefined) {
            gameinprogress = 0;
            gameover(response.winner);
        }
        else alert('Erro: ' + response.error);

    };
}


function notify() {
    data = {'nick': getName(), 'game': game, 'stack': stack, 'pieces': sumall};
    
    alert(sumall);
    //pieces numero de peças que ainda existem no tabuleiro
    //stack posiçao da pilha onde e feita no tabuleiro
    

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'notify', true);

    // envia os dados coletados como JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
        var response = JSON.parse(xhr.responseText);

        if (response.error == undefined) {
          update_game();
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
    console.log(data);

    xhr.onloadend = function () {
       var response = JSON.parse(xhr.responseText);

        if (response.error == undefined) {
           ranking_data = response.ranking;
            tab_highsOnline(ranking_data);
            console.log(ranking_data);
        }
        else alert('Erro: ' + response.error);
    };
}
