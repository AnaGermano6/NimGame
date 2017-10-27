
//autenticaçao no jogo do utilizador 
function authentication(){
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;

    document.getElementById('login').innerHTML = 'Welcome, ' + user + '! ' + '<button id="logout" onclick="logout()">Logout</button>' ;
    
    toggleDisplayBlock('modePlay');
    toggleDisplayBlock('menu');
}

// Botao Logout
function logout(){
    window.location.reload();
}

// modo jogar contra o computador
function singlePlayer(){
   toggleDisplayBlock('mode'); 
   toggleDisplayNone('modePlay');
}

// modo jogar contra outros jogadores online
function multiPlayer(){
    alert("Sorry, multiplayer mode not available yet :( ");
}

//botao play game 
function buttonPlayGame(){
    toggleDisplayNone('mode');
    toggleDisplayNone('modePlay');
    toggleDisplayBlock('game');
    toggleDisplayBlock('pcturn');
    toggleDisplayNone('highs');
    toggleDisplayBlock('quit');
    
    //verifica a dificuldade
    updateDifficulty();
    
    //constroi tabuleiro
    buildBoard();
    
    //verifica quem inicia o jogo
    turn();
}

// desistir do jogo 
function quitGame(){
    if(confirm("Are you sure you want to give up?")==true){
        removetable("tab1");
        toggleDisplayNone('quit');
        toggleDisplayNone('pcturn');
        alert("You lost! Game over :(");
    }  
}

//começar um jogo novo 
function newGame(){
    toggleDisplayNone('game');
    toggleDisplayBlock('mode');
    toggleDisplayNone('highs');
}

//highscores
function displayHighs(){
    toggleDisplayNone('game');
    toggleDisplayNone('mode');
    toggleDisplayBlock('highs');
    //tab_highs();
}

//Se o elemento estiver escondido, mostra-o. Caso contrario, esconde-o
function toggleDisplayNone(id){  
    document.getElementById(id).style.display = 'none';
}

function toggleDisplayBlock(id){  
    document.getElementById(id).style.display = 'block';
}


//tabela das classificaçoes
function tab_highs(){
    removetable("highscore_table");

    var body =  document.getElementById("highs");
    var tab = document.createElement('div');
    tab.setAttribute("id", "highscore_table");

    for(var i=0; i<1; i++){
        var title = document.createElement('div');
        title.setAttribute("id", "title");
        for(var j=0; j<4; i++){
            var colunas = document.createElement('div');
            colunas.setAttribute("id", "colunas");
            if(j==0){
                colunas.textContent = "Num";
                title.appendChild(colunas);
            }
            if(j==1){
                colunas.textContent = "Name";
                title.appendChild(colunas);
            }
            if(j==2){
                colunas.textContent = "Mode";
                title.appendChild(colunas);
            }
            if(j==3){
                colunas.textContent = "Scores";
                title.appendChild(colunas);
            }
        }
    }
    
    //num maximo de 10 linhas
    for(var i=0; i<10; i++){
        var linhas = document.createElement('div');
        linhas.setAttribute("id", "linhas");
        for(var j=0; j<4; i++){
            var col = document.createElement('div');
            col.setAttribute("id", "col");
            if(j==0){
                var num = document.createTextNode(i + 1);
                col.appendChild(num);
                linhas.appendChild(col);
            }
            if(j==1){
                col.textContent = "Name";
                linhas.appendChild(col);
            }
            if(j==2){
                var mode = document.createTextNode(level);
                coll.appendChild(mode);
                linhas.appendChild(col);
            }
            if(j==3){
                col.textContent = "Scores";
                linhas.appendChild(col);
            }
        }
    }
    tab.appendChild(title);
    tab.appendChild(linhas);
    body.appendChild(tab);
}
