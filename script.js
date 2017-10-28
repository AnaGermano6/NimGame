
//autenticaçao no jogo do utilizador 
function authentication(){
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;

    document.getElementById('login_menu').innerHTML = user;
    
    toggleDisplayBlock('modePlay');
    toggleDisplayBlock('menu');
    toggleDisplayNone('login');
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
    toggleDisplayNone('modePlay');
    tab_highs();
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

    var body = document.getElementById("highs");
    var tab = document.createElement('div');
    tab.setAttribute("id", "highscore_table");

    for(var i=0; i<1; i++){
        var title = document.createElement('div');
        title.setAttribute("id", "title");
        for(var j=0; j<4; j++){
            var colunas = document.createElement('div');
            colunas.setAttribute("id", "colunas");
            if(j==0){
                colunas.textContent = "Name";
                title.appendChild(colunas);
            }
            if(j==1){
                colunas.textContent = "Scores";
                title.appendChild(colunas);
            }
            if(j==2){
                colunas.textContent = "Computer Scores";
                title.appendChild(colunas);
            }
            if(j==3){
                colunas.textContent = "Mode" ;
                title.appendChild(colunas);
            }
        }
        tab.appendChild(title);
    }
 
   //corpo da tabela
    for(var i=0; i<1; i++){
        var linhas = document.createElement('div');
        linhas.setAttribute("id", "linhas");
        for(var j=0; j<4; j++){
            var col = document.createElement('div');
            col.setAttribute("id", "col");
            if(j==0){
                var name = document.getElementById('username').value;
                col.innerHTML = name;
                linhas.appendChild(col);
            }
            if(j==1){
               var pontosuser = document.createTextNode(pointsUser);
                 col.appendChild(pontosuser);
                linhas.appendChild(col);
            }
            if(j==2){
               var pontospc = document.createTextNode(pointsPC);
                col.appendChild(pontospc);
                linhas.appendChild(col);
            }
            if(j==3){
                var mode = document.createTextNode(level);
                col.appendChild(mode);
                linhas.appendChild(col);   
            }
        }
        tab.appendChild(linhas);
    }
    body.appendChild(tab); 
}