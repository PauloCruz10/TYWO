"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main()
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
    var cw = canvas.width;
    var ch = canvas.height;
    var spArray;
    var zombies;
    var balas;
    var boarder;
    var pocoes;
    var buttons;
    var variables;
    var som = document.getElementsByTagName("audio")[0];

    var som2 = window.parent.document.getElementsByTagName("audio")[0];
    som2.muted = true;

    if(localStorage.getItem("gameMusic") == "Linkin Park - In the end"){
    	som.src = "../resources/8bitLPend.mp3";
    }
    else{
    	som.src = "../resources/8bitLPnumb.mp3";
    }

    som.play();

	canvas.addEventListener("initend", initEndHandler);
	init(canvas, ctx, cw, ch, zombies, balas, boarder, pocoes, buttons, variables);  //carregar todos os componentes

	function initEndHandler(ev)
	{		
		spArray = ev.spArray;
		zombies = ev.zombies;
		balas = ev.balas;
		boarder = ev.boarder;
		pocoes = ev.pocoes;
		buttons = ev.buttons;
		variables = ev.variables;

		window.addEventListener("keydown", keyDownHandler2);

		window.addEventListener("keyup", keyUpHandler2);

		ctx.canvas.addEventListener("click", cch);

		ctx.canvas.addEventListener("mousemove", mousemove);

		startAnim(ev, ctx, cw, ch, spArray, zombies, balas, boarder, pocoes, buttons, variables);
	}

	var keyDownHandler2 = function(ev){
		keyDownHandler(ev, spArray);
	}

	var keyUpHandler2 = function(ev){
		keyUpHandler(ev, spArray);
	}

	var cch = function(ev){
		canvasClickHandler(ev, ctx, cw, ch, spArray, zombies, balas, boarder, pocoes, buttons, variables, som, som2);	
	}

	var mousemove = function(ev){
		canvasMouseMove(ev, ctx, spArray, buttons);
	}
}

function init(canvas, ctx, cw, ch, spArray, zombies, balas, boarder, pocoes)
{
	var nLoad = 0;
	var totLoad = 8;
	var spArray = new Array(1);
	var zombies = new Array(10);
	var balas = new Array(15);
	var boarder = new Array(1);
	var pocoes = new Array(1);
	var buttons = new Array(6);
	var variables = new Variables();
	var blocos;
	var nblocos;

	var xRandom = Math.floor((Math.random()*cw) + 1);
	var yRandom = Math.floor((Math.random()*ch) + 1);

	//estilos de texto
	ctx.fillStyle = "#993333";
	ctx.font = "12px helvetica";	
	ctx.textBaseline = "bottom"; 
	ctx.textAlign = "center";

	//variaveis globais
	variables.tamanhoZombie = 30;
	variables.tamanhoPocao = 20;
	variables.tamanhoHeroi = 30;
	variables.controlaSpaceBala = 0;
	variables.contaBalasAtivas = 0;
	variables.tempoIntervaloZombies = 5000;
	variables.tempoIntervaloPocoes = 60000;

	var data = new Date();
    variables.tIni = data.getTime();

	//Desenha o limite da canvas (boarder)
	variables.larguraBoarder = 75;
	var campanha = new Board(cw, ch, variables.larguraBoarder);
	boarder[0] = campanha;

	//PLAYER
	var arrayNames = JSON.parse(localStorage.getItem("arrayNames"));
	for (var i = 0; i < arrayNames.length; i++) {
		if(arrayNames[i]!=null && arrayNames[i].playerName == localStorage.getItem("playerName")){
			var playerAux = arrayNames[i];
			break;
		}
	}

	//Botoes SOM e BACK
	//SOM
	var img = new Image();
	img.src = "../resources/soundOnBtn.png";
	buttons[1] = new Botao(cw, ch, cw-35, ch - variables.larguraBoarder + 40, 30, 30, img);
	//BACK
	var img = new Image();
	img.src = "../resources/backBtn.png";
	buttons[2] = new Botao(cw, ch, 5, ch - variables.larguraBoarder + 40, 30, 30, img);
	//PAUSE
	var img = new Image();
	img.src = "../resources/pauseBtn.png";
	buttons[3] = new Botao(cw, ch, cw - 35, 5, 30, 30, img);
	//NEXT LEVEL
	var img = new Image();
	img.src = "../resources/nextLevel.png";
	buttons[4] = new Botao(cw, ch, cw/2-125, ch/2+50, 250, 100, img);
	//HELP
	var img = new Image();
	img.src = "../resources/help2.png";
	buttons[5] = new Botao(cw, ch, 5, 5, 30, 30, img);

	//carregar imagens e criar sprites
	var img = new Image(); 
	img.addEventListener("load", imgLoadedHandler);
	img.id="character";
	img.src = "../resources/"+ localStorage.getItem("playerType") + "F.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="blocos1";
	img.src = "../resources/parede2.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="blocos2";
	img.src = "../resources/blocopequeno.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="blocos3";
	img.src = "../resources/parede.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="blocos4";
	img.src = "../resources/bloco2.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="blocos5";
	img.src = "../resources/parede3.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="flag";
	img.src = "../resources/flag.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="button1";
	img.src = "../resources/playagain.png";  //dá ordem de carregamento da imagem

	function imgLoadedHandler(ev)
	{
		var img = ev.target;
		if(img.id == "character"){
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new Heroi(0, 0, variables.tamanhoHeroi, variables.tamanhoHeroi, 1, "F", img);
			sp.vida = 100;
			sp.mortes = 0;
			if(playerAux.pontuacaoAux !=null && (playerAux.nivelAtual == "Level 2" || playerAux.nivelAtual == "Level 3" || playerAux.nivelAtual == "Level 4" || playerAux.nivelAtual == "Level 5")){
				sp.pontuacao = parseInt(playerAux.pontuacaoAux);
			}
			else{
				sp.pontuacao = 0;
			}
			spArray[0] = sp;
		}
		else if(img.id == "blocos1"){
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;

			var sp = new Board(cw, ch, variables.larguraBoarder, img);
			boarder[0] = sp;
		}

		else if(img.id == "blocos2"){
			boarder[0].bloco = img;
		}
		else if(img.id == "blocos3"){
			boarder[0].img2 = img;
		}
		else if(img.id == "blocos4"){
			boarder[0].bloco2 = img;
		}
		else if(img.id == "blocos5"){
			boarder[0].parede3 = img;
		}
		else if(img.id == "flag"){
			boarder[0].flag = img;
		}
		else{
			var sp = new Botao(cw, ch, cw/2 - img.naturalWidth/2, ch/2 + img.naturalHeight/(1.5), img.naturalWidth, img.naturalHeight, img);
			buttons[0]= sp;
		}

		nLoad++;

		if (nLoad == totLoad)
		{
			boarder[0].uploadNivel(ctx);

			var ev2 = new Event("initend");
			ev2.spArray = spArray;
			ev2.zombies = zombies;
			ev2.balas = balas;
			ev2.boarder = boarder;
			ev2.pocoes = pocoes;
			ev2.buttons = buttons;
			ev2.variables = variables;
			ctx.canvas.dispatchEvent(ev2);
		}
	}
}

function draw(ctx, cw, ch, spArray, zombies, balas, boarder, pocoes, buttons, variables)
{
	var dim = spArray.length;
	var dim2 = zombies.length;
	var dim3 = balas.length;
	var dim4 = pocoes.length;

	for (let i = 0; i < dim; i++)
	{
		spArray[i].draw(ctx);
	}

	for (let i = 0; i < dim2; i++)
	{
		if(zombies[i]!=null){
			zombies[i].draw(ctx);
		}
	}

	for (let i = 0; i < dim3; i++) {
		if(balas[i]!=null){
			balas[i].draw(ctx);
		}
	}

	for (let i = 0; i < dim4; i++) {
		if(pocoes[i]!=null){
			pocoes[i].draw(ctx);
		}
	}

	//DESENHA O LIMITE (QUADRADOS)
	boarder[0].nivelAux(ctx, boarder[0].blocosNivel);

	//BOTOES CANVAS
	buttons[1].draw(ctx);
	buttons[2].draw(ctx);
	buttons[3].draw(ctx);
	buttons[5].draw(ctx);

	//DESENHA INFORMACAO VIDA, KILLS, TEMPO, BALAS
	ctx.font = "bold 20px bloodFont";
  	ctx.fillText("Pontuação:", 40, ch-variables.larguraBoarder);
	ctx.font = "bold 30px bloodFont";
  	ctx.fillText(spArray[0].pontuacao, 110, ch-variables.larguraBoarder);

  	ctx.font = "bold 35px bloodFont";
  	ctx.fillText("Vida:", 120, ch-4);

  	ctx.font = "bold 50px bloodFont";
  	if(spArray[0].vida <= 0) spArray[0].vida = 0;
  	ctx.fillText(spArray[0].vida, 190, ch);

  	ctx.font = "bold 35px bloodFont";
  	ctx.fillText("Balas:", 310, ch-4);

  	ctx.font = "bold 50px bloodFont";
  	ctx.fillText(15-variables.contaBalasAtivas, 380, ch);

  	ctx.font = "bold 35px bloodFont";
  	ctx.fillText("Tempo:", 500, ch-4);

  	var data = new Date();
    var dt = data.getTime() - variables.tIni;
    var mMinute = 1000 * 60;
	var mHour = mMinute * 60;
	var mDay = mHour * 24;
    var minutos = Math.floor(dt/mMinute);
    var segundos = Math.floor(dt/1000);

  	ctx.font = "bold 45px bloodFont";
  	ctx.fillText(minutos+":"+(segundos-minutos*60), 580, ch);

  	spArray[0].minutos = minutos;
  	spArray[0].segundos = segundos-minutos*60;

  	if(spArray[0].paused == true){
		ctx.font = "bold 120px bloodFont";
	  	ctx.fillText("GAME PAUSED", cw/2, ch/2 - 70);
	  	window.clearInterval(variables.tempoZombies);
	  	window.clearInterval(variables.tempoPocao);
  	}
  	if(spArray[0].help == true){
  		ctx.font = "bold 50px bloodFont";
	  	ctx.fillText("Use the arrow keys and space to", cw/2, ch/2 - 70);
	  	ctx.fillText("kill zombies and reach the flag!", cw/2, ch/2 - 10);
	  	window.clearInterval(variables.tempoZombies);
	  	window.clearInterval(variables.tempoPocao);
  	}
}

function startAnim(ev, ctx, cw, ch, spArray, zombies, balas, boarder, pocoes, buttons, variables)
{
	var arrayNames = JSON.parse(localStorage.getItem("arrayNames"));
	for (var i = 0; i < arrayNames.length; i++) {
		if(arrayNames[i]!=null && arrayNames[i].playerName == localStorage.getItem("playerName")){
			var playerAux = arrayNames[i];
			break;
		}
	}

	var nivel = playerAux.nivelAtual.split(" ");

	var auxNivel = parseInt(nivel[1]);
	var maxZombies;
	if(auxNivel == 1){
		maxZombies = 10;
	}
	else if(auxNivel == 2){
		maxZombies = 15;
	}
	else if(auxNivel == 3){
		maxZombies = 20;
	}
	else if(auxNivel == 4){
		maxZombies = 22;
	}
	else{
		maxZombies = 25;
	}

	for (var i = 0; i < maxZombies; i++) {
		criaZombies(ctx, cw, ch, zombies, spArray, boarder, variables);
	}

	boarder[0].nivelAux(ctx, boarder[0].blocosNivel);
	draw(ctx, cw, ch, spArray, zombies, balas, boarder, pocoes, buttons, variables);
	animLoop(ctx, cw, ch, spArray, zombies, balas, boarder, pocoes, buttons, variables);
	//variables.tempoZombies = setInterval(criaZombies, variables.tempoIntervaloZombies, ctx, cw, ch, zombies, spArray, boarder, variables);
	variables.tempoPocao = setInterval(criaPocoes, variables.tempoIntervaloPocoes, ctx, cw, ch, pocoes, spArray, boarder, variables);
}

//apagar sprites
function clear(ctx, spArray, zombies, balas, pocoes, buttons)
{
	var dim = spArray.length;
	var dim2 = zombies.length;
	var dim3 = balas.length;

	for (let i = 0; i < dim; i++)
	{
		spArray[i].clear(ctx);
	}

	for (let i = 0; i < dim2; i++)
	{
		if(zombies[i]!=null){
			zombies[i].clear(ctx);
		}
	}

	for (let i = 0; i < dim3; i++)
	{
		if(balas[i]!=null){
			balas[i].clear(ctx);
		}
	}


}

function criaPocoes(ctx, cw, ch, pocoes, spArray, boarder, variables){
	var xRandom = Math.floor((Math.random()*cw) + 1);
	var yRandom = Math.floor((Math.random()*ch) + 1);

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="pocao";
	img.src = "../resources/pocaoVida.png";  //dá ordem de carregamento da imagem
	
	function imgLoadedHandler(ev){
		var nw = img.naturalWidth;
		var nh = img.naturalHeight;

		while(!(xRandom >= 0 && xRandom <= cw - variables.tamanhoPocao && yRandom >= 0 && yRandom <= ch - variables.larguraBoarder - variables.tamanhoPocao)){
			xRandom = Math.floor((Math.random()*cw) + 1);
			yRandom = Math.floor((Math.random()*ch) + 1);
		}

		var sp = new Pocao(xRandom, yRandom, variables.tamanhoPocao, variables.tamanhoPocao, 0, "F", img);


		for (var i = 0; i < boarder[0].blocosNivel.length; i++) {
			if(boarder[0].blocosNivel[i]!=null){
				if(boarder[0].blocosNivel[i].colisionBoundingBox2(sp, ctx) || spArray[0].colisionBoundingBox(sp, ctx)){
					criaPocoes(ctx, cw, ch, pocoes, spArray, boarder, variables);
					return;
				}
			}
		}

		pocoes[0] = sp;
	}
}

function criaZombies(ctx, cw, ch, zombies, spArray, boarder, variables){
	var xRandom = Math.floor((Math.random()*cw) + 1);
	var yRandom = Math.floor((Math.random()*ch) + 1);
	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="zombie";
	img.src = "../resources/zombieF.png";  //dá ordem de carregamento da imagem
	
	function imgLoadedHandler(ev){
		var nw = img.naturalWidth;
		var nh = img.naturalHeight;

		while(!(xRandom >= 0 && xRandom <= cw - variables.tamanhoPocao && yRandom >= 0 && yRandom <= ch - variables.larguraBoarder - variables.tamanhoPocao)){
			xRandom = Math.floor((Math.random()*cw) + 1);
			yRandom = Math.floor((Math.random()*ch) + 1);
		}

		var sp = new Zombie(xRandom, yRandom, variables.tamanhoZombie, variables.tamanhoZombie, 1.5, "F", img, "c");
		
		for (var i = 0; i < boarder[0].blocosNivel.length; i++) {
			if(boarder[0].blocosNivel[i]!=null){
				if(sp.colisionBoundingBox2(boarder[0].blocosNivel[i], ctx) || sp.colisionBoundingBox(spArray[0], ctx)){
					criaZombies(ctx, cw, ch, zombies, spArray, boarder, variables);
					return;
				}
			}
		}

		sp.vida = 100;
		for (var i = 0; i < zombies.length; i++) {
			if(zombies[i]==null){
				zombies[i] = sp;
				break;
			}
		}	
	}
}

function gameover(ctx, cw, ch, spArray, buttons, variables){
	ctx.font = "bold 120px bloodFont";
  	ctx.fillText("GAME OVER", cw/2, ch/2 - 70);
  	ctx.font = "bold 40px bloodFont";
  	ctx.fillText("Mortes: ", cw/2 - 20, ch/2 - 30);
  	ctx.font = "bold 40px bloodFont";
  	ctx.fillText(spArray[0].mortes, cw/2 + 50, ch/2 - 30);
  	ctx.font = "bold 40px bloodFont";
  	ctx.fillText("Tempo: ", cw/2 - 40, ch/2 + 10);
  	ctx.font = "bold 40px bloodFont";
  	ctx.fillText(spArray[0].minutos+" : "+spArray[0].segundos, cw/2 + 45, ch/2 + 10);
	ctx.font = "bold 40px bloodFont";
  	ctx.fillText("Pontuação: ", cw/2 - 20, ch/2 + 50);
  	ctx.font = "bold 40px bloodFont";
  	ctx.fillText(spArray[0].pontuacao, cw/2 + 80, ch/2 + 50);

	window.clearInterval(variables.tempoZombies);
	window.clearInterval(variables.tempoPocao);

	buttons[1].x = cw-75;
	buttons[1].y = ch - variables.larguraBoarder + 10;
	buttons[2].x = 10;
	buttons[2].y = ch - variables.larguraBoarder + 10;
	buttons[1].height = 60;
	buttons[1].width = 60;
	buttons[2].height = 60;
	buttons[2].width = 60;

  	buttons[0].clickable = true;
  	buttons[4].clickable = false;
  	buttons[0].draw(ctx);
  	buttons[1].draw(ctx);
  	buttons[2].draw(ctx);
}

function wingame(ctx, cw, ch, spArray, buttons, boarder, variables){
  	var playerAux;
	var arrayNames = JSON.parse(localStorage.getItem("arrayNames"));
	for (var i = 0; i < arrayNames.length; i++) {
		if(arrayNames[i]!=null && arrayNames[i].playerName == localStorage.getItem("playerName")){
			playerAux = arrayNames[i];
			break;
		}
	}

	ctx.font = "bold 80px bloodFont";
  	ctx.fillText(playerAux.nivelAtual, cw/2, ch/2 - 140);
  	ctx.font = "bold 80px bloodFont";
  	ctx.fillText("complete", cw/2, ch/2 - 70);
  	ctx.font = "bold 40px bloodFont";
  	ctx.fillText("Mortes: ", cw/2 - 20, ch/2 - 30);
  	ctx.font = "bold 40px bloodFont";
  	ctx.fillText(spArray[0].mortes, cw/2 + 50, ch/2 - 30);
  	ctx.font = "bold 40px bloodFont";
  	ctx.fillText("Tempo: ", cw/2 - 40, ch/2 + 10);
  	ctx.font = "bold 40px bloodFont";
  	ctx.fillText(spArray[0].minutos+" : "+spArray[0].segundos, cw/2 + 45, ch/2 + 10);
	ctx.font = "bold 40px bloodFont";
  	ctx.fillText("Pontuação: ", cw/2 - 20, ch/2 + 50);
  	ctx.font = "bold 40px bloodFont";
  	ctx.fillText(spArray[0].pontuacao, cw/2 + 80, ch/2 + 50);

  	if(playerAux.nivelAtual != "Level 5" && boarder[0].nivelCriado == false){
  		//faz next level
  		buttons[4].clickable = true;
  		buttons[4].draw(ctx);
  	}
  	else if(boarder[0].nivelCriado){
  		//finish game
  		ctx.font = "bold 80px bloodFont";
  		ctx.fillText("You finish the level!", cw/2 - 20, ch/2 + 130);
  	}
  	else{
  		//finish game
  		ctx.font = "bold 40px bloodFont";
  		ctx.fillText("You finish all the levels!", cw/2 + 120, ch/2 - 50);
  	}

	window.clearInterval(variables.tempoZombies);
	window.clearInterval(variables.tempoPocao);

	buttons[1].x = cw-75;
	buttons[1].y = ch - variables.larguraBoarder + 10;
	buttons[2].x = 10;
	buttons[2].y = ch - variables.larguraBoarder + 10;
	buttons[1].height = 60;
	buttons[1].width = 60;
	buttons[2].height = 60;
	buttons[2].width = 60;

  	buttons[1].draw(ctx);
  	buttons[2].draw(ctx);
}

function animLoop(ctx, cw, ch, spArray, zombies, balas, boarder, pocoes, buttons, variables)
{	
	var al = function(time)
	{
		animLoop(ctx, cw, ch, spArray, zombies, balas, boarder, pocoes, buttons, variables);
	}

	if(spArray[0].paused != true && spArray[0].help != true){
		var reqID = window.requestAnimationFrame(al);
		render(ctx, spArray, zombies, balas, boarder, pocoes, buttons, variables, reqID);
	}
	else{
		ctx.clearRect(0, 0, cw, ch);
		draw(ctx, cw, ch, spArray, zombies, balas, boarder, pocoes, buttons, variables);
		window.cancelAnimationFrame(reqID);
	}

}

function anda(zombie,perseguicao){
    if(zombie.contador<=0 && perseguicao==0){
        var componente = Math.random();
        zombie.contador = Math.floor((Math.random() * 100)+150);
        if(componente >=0.25 && componente <=0.5){
            zombie.direcao = "T";
            return zombie;
        }
        else if(componente>0.5 && componente < 0.75){
            zombie.direcao = "F";
            return zombie;
        }
        else if(componente>0.75){
            zombie.direcao = "E";
            return zombie;
        }
        else{
            zombie.direcao = "D";
            return zombie;
        }
    }
    if(perseguicao==0){
        switch(zombie.direcao){
            case "D":
                zombie.x  = zombie.x + zombie.speed/2.5;
                return zombie;
            case "E":
                zombie.x = zombie.x - zombie.speed/2.5;
                return zombie;
            case "T":
                zombie.y = zombie.y -zombie.speed/2.5;
                return zombie;
            case "F":
                zombie.y = zombie.y + zombie.speed/2.5;
                return zombie;
        }
    }
    else if(perseguicao==1){
        switch(zombie.direcao){
            case "D":
                zombie.x  = zombie.x + zombie.speed/1.5;
                return zombie;
            case "E":
                zombie.x = zombie.x - zombie.speed/1.5;
                return zombie;
            case "T":
                zombie.y = zombie.y -zombie.speed/1.5;
                return zombie;
            case "F":
                zombie.y = zombie.y + zombie.speed/1.5;
                return zombie;
        }  
    }
}
function zombiePerseguicao(zombie,heroi){
    var moduloy = Math.abs(zombie.y - heroi.y);
    var modulox = Math.abs(zombie.x - heroi.x);
    var direcao;
    if(moduloy<modulox){
        if(Math.round(zombie.x)>=Math.round(heroi.x)){
            direcao = "E";
        }
        else if(Math.round(zombie.x)< Math.round(heroi.x)){
            direcao = "D";
        }
        else{
            direcao = "T";
        }
    }
    else{
        if(Math.round(zombie.y)>=Math.round(heroi.y)){
            direcao = "T"; 
        }
        else if (Math.round(zombie.y)<Math.round(heroi.y)){
            direcao = "F";
        }
    }
    return direcao;
}
function desviaBlocos(boarder, zombie,heroi,ctx,perseguicao){
    var k;
    var direcao;
    for(k = 0;k<boarder[0].blocosNivel.length;k++){
        if(zombie!=null && boarder[0].blocosNivel[k] != null){
            if(zombie.colisionBoundingBox2(boarder[0].blocosNivel[k], ctx)){
                if(zombie.direcao =="E"){
                    zombie.direcao = "D";
                }
                else if(zombie.direcao =="D"){
                    zombie.direcao = "E";
                }
                else if(zombie.direcao =="T"){
                    zombie.direcao = "F";
                }
                else{
                    zombie.direcao = "T";
                }
                if(perseguicao==1){
                    zombie.contador = 30;
                }
                else{
                    zombie.contador = Math.floor((Math.random() * 30))+perseguicao;
                }
                return zombie;
            }
        }
        else{
            break;
        }
    }
    return zombie;
}
 
function zombieMove(ctx, zombie,heroi,boarder,variables){
    //console.log(sp.perseguicao);
    var cw = ctx.canvas.width;
    var ch = ctx.canvas.height;
    var k;
    var direcao;
    if(zombie.x +zombie.width + zombie.speed>=cw){
        //anda para a esquerda
        zombie.direcao = "E";
    }
    else if(zombie.y +zombie.height +zombie.speed>=ch - variables.larguraBoarder){
        //anda para tras
        zombie.direcao = "T";
    }
    else if(zombie.y -zombie.speed<=0){
        //anda para a frente5
        zombie.direcao = "F";
    }
    else if(zombie.x -zombie.speed<=0){
        //anda para a direita
        zombie.direcao = "D";
    }
    if(zombie.verificaProximidade(heroi)){ //apenas altera a direcao do zombie e a sua velocidade
        if(zombie.contador>0){
            zombie.perseguicao=0;
            zombie.contador-=1;
        }
        else if(zombie.contador==0){
            zombie.perseguicao=1;
            zombie.contador = 15;
        }
        if(zombie.perseguicao==1){
            direcao = zombiePerseguicao(zombie,heroi);
            if(direcao!=zombie.direcao){
                zombie.direcao = direcao;
            }
        }
        zombie = desviaBlocos(boarder,zombie,heroi,ctx,1);
        zombie = anda(zombie,1);   
    }
    else{
        zombie = desviaBlocos(boarder,zombie,heroi,ctx,10);
        zombie.contador-=1;
        zombie = anda(zombie,0);
    }
    return zombie;
}

function render(ctx, spArray, zombies, balas, boarder, pocoes, buttons, variables, reqID)
{
	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;
	ctx.clearRect(0, 0, cw, ch);
	clear(ctx, spArray, zombies, balas, pocoes, buttons);

	//GAME OVER
	if(spArray[0].vida == 0){
		spArray[0].gameover = true;
		gameover(ctx, cw, ch, spArray, buttons, variables);
		window.cancelAnimationFrame(reqID);
	}
	else if(spArray[0].win == true){
		wingame(ctx, cw, ch, spArray, buttons, boarder, variables);
		window.cancelAnimationFrame(reqID);
	}
	else{

		//COLISAO DOS ZOMBIES COM A PERSONAGEM
		for (var i = 0; i < zombies.length; i++){
			if(zombies[i]!=null){
				if(spArray[0].colisionBoundingBox(zombies[i], ctx)){
					spArray[0].vida--;
				}
				zombieMove(ctx,zombies[i],spArray[0], boarder, variables);
			}
		}

		//COLISAO DA PERSONAGEM COM AS POCOES
		for (var i = 0; i < pocoes.length; i++) {
			if(pocoes[i]!=null){
				if(spArray[0].colisionBoundingBox(pocoes[i], ctx)){
					pocoes[i] = null;
					spArray[0].vida += 100; //pocao de 100 de vida
					if(spArray[0].vida > 100){
						spArray[0].vida = 100;
					}
					spArray[0].pontuacao += 10;
				}
			}
		}

		for (var j = 0; j < balas.length; j++){
			if(balas[j]!=null){
				//COLISAO COM OS ZOMBIES
				for (var i = 0; i < zombies.length; i++) {
					if(zombies[i]!=null){
						if(balas[j].colisionBoundingBox(zombies[i], ctx)){
							if(zombies[i].vida - balas[j].dano == 0){
								zombies[i] = null;
								spArray[0].mortes++;
								spArray[0].pontuacao += 20;
							}
							else{
								zombies[i].vida -= balas[j].dano;
							}
							balas[j] = null;
							variables.contaBalasAtivas = variables.contaBalasAtivas-1;
							break;
						}
					}
				}
			}
			if(balas[j]!=null){
				//COLISAO COM OS BLOCOS
				for(var k = 0; k < boarder[0].blocosNivel.length; k++){
					if(balas[j]!=null && boarder[0].blocosNivel[k] != null){
						if(balas[j].colisionBoundingBox2(boarder[0].blocosNivel[k], ctx)){
							balas[j] = null;
							variables.contaBalasAtivas = variables.contaBalasAtivas-1;
						}
					}
					else{
						break;
					}
				}
			}
			if(balas[j]!=null && ((balas[j].y + balas[j].height > ch - variables.larguraBoarder) || balas[j].y - balas[j].height < 0 || balas[j].x - balas[j].width < 0 || balas[j].x + balas[j].width > cw)){
				balas[j] = null;
				variables.contaBalasAtivas = variables.contaBalasAtivas - 1;
			}
			if(balas[j]!=null){
				if(balas[j].direcao == "F"){
					if(balas[j].y + balas[j].height > ch - variables.larguraBoarder){
						balas[j].ativa = 0;
					}
					else{
						balas[j].y = balas[j].y + balas[j].speed;
					}
				}
				if(balas[j].direcao == "T"){
					if(balas[j].y - balas[j].height < 0){
						balas[j].ativa = 0;
					}
					else{
						balas[j].y = balas[j].y - balas[j].speed;
					}
				}
				if(balas[j].direcao == "E"){
					if(balas[j].x - balas[j].width < 0){
						balas[j].ativa = 0;
					}
					else{
						balas[j].x = balas[j].x - balas[j].speed;
					}
				}
				if(balas[j].direcao == "D"){
					if(balas[j].x + balas[j].width > cw){
						balas[j].ativa = 0;
					}
					else{
						balas[j].x = balas[j].x + balas[j].speed;
					}
				}
			}
		}

		//CHARACTER A MEXER COM AS TECLAS E BALAS
		var xIni = spArray[0].x;
		var yIni = spArray[0].y;
		var ximg = spArray[0].x;
		var yimg = spArray[0].y; 

		if(spArray[0].space == true){

			variables.controlaSpaceBala++;
			if(variables.controlaSpaceBala==10){
				variables.controlaSpaceBala=0;
				var somBala = new Audio("../resources/somBala.mp3");
				somBala.play();
			}

			for (var i = 0; i < balas.length; i++) {
				if(balas[i]==null && variables.controlaSpaceBala == 0){ //so cria se houver espaço no array
					var img = new Image();
					variables.contaBalasAtivas++;
					if(spArray[0].direcao == "E"){
						img.addEventListener("load", imgLoadedHandler);
						img.id = "balaE";
						img.src = "../resources/balaED.png";
						function imgLoadedHandler(ev){
							var img = ev.target;
							if(img.id == "balaE"){
								var nw = img.width/2;
								var nh = img.height/2;
								var xBala = spArray[0].x - spArray[0].width/4;
								var yBala = spArray[0].y + spArray[0].height/2;
								var sp = new Bala(xBala, yBala, nw, 2*nh, 5, "E", img);
								balas[i] = sp;
								balas[i].ativa = 1;
							}
						}
					}
					if(spArray[0].direcao == "T"){
						img.addEventListener("load", imgLoadedHandler);
						img.id = "balaT";
						img.src = "../resources/balaCB.png";
						function imgLoadedHandler(ev){
							var img = ev.target;
							if(img.id == "balaT"){
								var nw = img.width;
								var nh = img.height;
								var xBala = spArray[0].x + spArray[0].width/(2.5);
								var yBala = spArray[0].y - spArray[0].height/4;
								var sp = new Bala(xBala, yBala, nw, nh/2, 5, "T", img);
								balas[i] = sp;
								balas[i].ativa = 1;
							}
						}
					}
					if(spArray[0].direcao == "D"){
						img.addEventListener("load", imgLoadedHandler);
						img.id = "balaD";
						img.src = "../resources/balaED.png";
						function imgLoadedHandler(ev){
							var img = ev.target;
							if(img.id == "balaD"){
								var nw = img.width/2;
								var nh = img.height/2;
								var xBala = spArray[0].x + spArray[0].width;
								var yBala = spArray[0].y + spArray[0].height/2;
								var sp = new Bala(xBala, yBala, nw, 2*nh, 5, "D", img);
								balas[i] = sp;
								balas[i].ativa = 1;
							}
						}
					}
					if(spArray[0].direcao == "F"){
						img.addEventListener("load", imgLoadedHandler);
						img.id = "balaF";
						img.src = "../resources/balaCB.png";
						function imgLoadedHandler(ev){
							var img = ev.target;
							if(img.id == "balaF"){
								var nw = img.width;
								var nh = img.height;
								var xBala = spArray[0].x + spArray[0].width/(2.5);
								var yBala = spArray[0].y + spArray[0].height;
								var sp = new Bala(xBala, yBala, nw, nh/2, 5, "F", img);
								balas[i] = sp;
								balas[i].ativa = 1;
							}
						}
					}
					break;
				}
			}
		}

		if(spArray[0].left == true){
			var img = new Image();
			spArray[0].img = img;
			img.src = "../resources/"+ localStorage.getItem("playerType") + "E.png";
			spArray[0].direcao = "E";
			ximg-=2;
		}
		if(spArray[0].top == true){
			var img = new Image();
			spArray[0].img = img;
			img.src = "../resources/"+ localStorage.getItem("playerType") + "T.png";
			spArray[0].direcao = "T";
			yimg-=2;
		}
		if(spArray[0].right == true){
			var img = new Image();
			spArray[0].img = img;
			img.src = "../resources/"+ localStorage.getItem("playerType") + "D.png";
			spArray[0].direcao = "D";
			ximg+=2;
		}
		if(spArray[0].bottom == true){
			var img = new Image();
			spArray[0].img = img;
			img.src = "../resources/"+ localStorage.getItem("playerType") + "F.png";
			spArray[0].direcao = "F";
			yimg+=2;
		}

		spArray[0].x = ximg;
		spArray[0].y = yimg;
		if(spArray[0].colisionBoarderBox(boarder[0])){
			spArray[0].x = xIni;
			spArray[0].y = yIni;
		}
		else{
			for(var k = 0;k<boarder[0].blocosNivel.length;k++){
				if(boarder[0].blocosNivel[k]!=null){
					if((spArray[0].colisionBoundingBox2(boarder[0].blocosNivel[k], ctx))){
						if(boarder[0].blocosNivel[k].imgName == "flag"){
							spArray[0].win = true;
							spArray[0].pontuacao += 100;
						}
						else{
							spArray[0].x = xIni;
							spArray[0].y = yIni;
						}
					}
				}
			}
		}

		if(spArray[0].gameover != true){
			draw(ctx, cw, ch, spArray, zombies, balas, boarder, pocoes, buttons, variables);
		}
	}
}

function keyDownHandler(ev, spArray){
	var key = window.event?ev.keyCode:ev.wich;
	if(key != 37 && key != 38 && key != 39 && key != 40 && key != 32) return;
	if(key==32){
		spArray[0].space = true;
		if(spArray[0].gameover == true){
			location.reload();
		}
	}
	if(key==37){
		spArray[0].left = true;
	}
	else if(key==38){
		spArray[0].top = true;
	}
	else if(key==39){
		spArray[0].right = true;
	}
	else if(key==40){
		spArray[0].bottom = true;
	}
}

function keyUpHandler(ev, spArray){
	var key = window.event?ev.keyCode:ev.wich;
	if(key != 37 && key != 38 && key != 39 && key != 40 && key != 32) return;
	if(key==32){
		spArray[0].space = false;
	}
	if(key==37){
		spArray[0].left = false;
	}
	else if(key==38){
		spArray[0].top = false;
	}
	else if(key==39){
		spArray[0].right = false;
	}
	else if(key==40){
		spArray[0].bottom = false;
	}
}

function canvasClickHandler(ev, ctx, cw, ch, spArray, zombies, balas, boarder, pocoes, buttons, variables, som, som2)
{

	var mainWindow = window.parent;
	var arrayNames = JSON.parse(localStorage.getItem("arrayNames"));
	var iAux;
	for (var i = 0; i < arrayNames.length; i++) {
		if(arrayNames[i]!=null && arrayNames[i].playerName == localStorage.getItem("playerName")){
			iAux = i;
			break;
		}
	}

	if (buttons[0].clickedBoundingBox2(ev, ctx) && spArray[0].gameover == true && boarder[0].nivelCriado == false)
	{
		arrayNames[iAux].pontuacaoAux = null;
		setPlayerRank(localStorage.getItem("playerName"),spArray[0].pontuacao);
		localStorage.setItem("arrayNames", JSON.stringify(arrayNames));
		location.reload();
		return;
	}
	if (buttons[2].clickedBoundingBox2(ev, ctx) && spArray[0].win == true  && boarder[0].nivelCriado == false)
	{
		var conta = 0;
		var nivel = arrayNames[iAux].nivelAtual.split(" ");

		var arrayNiveisPassados = arrayNames[iAux].niveisPassados;
		if(arrayNiveisPassados != null){
			for (var i = 0; i < arrayNiveisPassados.length; i++) {
				if(arrayNiveisPassados[i]!=null && arrayNiveisPassados[i] == nivel[1]){
					conta++;
				}
			}
			if(conta==0){
				arrayNiveisPassados.push(nivel[1]);
				arrayNiveisPassados = sortArray(arrayNiveisPassados);
				arrayNames[iAux].niveisPassados = arrayNiveisPassados;
			}
		}
		else{
			arrayNiveisPassados = new Array();
			arrayNiveisPassados[0] = nivel[1];
			arrayNames[iAux].niveisPassados = arrayNiveisPassados;
		}

		som2.muted = false;
	  	arrayNames[iAux].nivelAtual = nivel[0]+" "+(parseInt(nivel[1])+1);
	  	arrayNames[iAux].pontuacaoAux = spArray[0].pontuacao;
	  	localStorage.setItem("arrayNames", JSON.stringify(arrayNames));
	  	if(arrayNames[iAux].nivelAtual == "Level 6"){
	  		arrayNames[iAux].pontuacaoAux = null;
	  		setPlayerRank(localStorage.getItem("playerName"),spArray[0].pontuacao);
	  	}
		mainWindow.postMessage("Campaign-Play", "*");
		return;
	}
	if (buttons[2].clickedBoundingBox2(ev, ctx))
	{
		som2.muted = false;
		arrayNames[iAux].pontuacaoAux = null;
		setPlayerRank(localStorage.getItem("playerName"),spArray[0].pontuacao);
		localStorage.setItem("arrayNames", JSON.stringify(arrayNames));
		mainWindow.postMessage("Campaign-Play", "*");
		return;
	}
	if (buttons[1].clickedBoundingBox2(ev, ctx))
	{
		var img = new Image();
		if(som.muted == true){
			buttons[1].clickable = false;
			som.muted = false;
			img.src = "../resources/soundOnBtn.png";
			buttons[1].img = img;
		}
		else{
			buttons[1].clickable = true;
			img.src = "../resources/soundOffBtn.png";
			buttons[1].img = img;
			som.muted = true;
		}
		return;
	}
	if (buttons[2].clickedBoundingBox2(ev, ctx) && spArray[0].gameover == true)
	{
		arrayNames[iAux].pontuacaoAux = null;
		setPlayerRank(localStorage.getItem("playerName"),spArray[0].pontuacao);
		localStorage.setItem("arrayNames", JSON.stringify(arrayNames));
		mainWindow.postMessage("Campaign-Play", "*");
		return;
	}
	if (buttons[3].clickedBoundingBox2(ev, ctx))
	{
		if(spArray[0].paused == true){
			spArray[0].paused = false;
			startAnim(ev, ctx, cw, ch, spArray, zombies, balas, boarder, pocoes, buttons, variables);
		}
		else{
			spArray[0].paused = true;
		}
		return;
	}
	if (buttons[5].clickedBoundingBox2(ev, ctx))
	{
		if(spArray[0].help == true){
			spArray[0].help = false;
			startAnim(ev, ctx, cw, ch, spArray, zombies, balas, boarder, pocoes, buttons, variables);
		}
		else{
			spArray[0].help = true;
		}
		return;
	}
	if (buttons[4].clickedBoundingBox2(ev, ctx) && spArray[0].win == true && boarder[0].nivelCriado == false)
	{
		var nivel = arrayNames[iAux].nivelAtual.split(" ");
	  	arrayNames[iAux].nivelAtual = nivel[0]+" "+(parseInt(nivel[1])+1);
	  	arrayNames[iAux].pontuacaoAux = spArray[0].pontuacao;
	  	localStorage.setItem("arrayNames", JSON.stringify(arrayNames));
	  	location.reload();
	  	return;
	}
}

function canvasMouseMove(ev, ctx, spArray, buttons){
	if(spArray[0].gameover == true){
		if(ev.offsetX >= buttons[0].x && ev.offsetX <= buttons[0].x + buttons[0].width && ev.offsetY >= buttons[0].y && ev.offsetY <= buttons[0].y + buttons[0].height){
	  		document.body.style.cursor = "pointer";
			return;
	  	}
		else if(ev.offsetX >= buttons[1].x && ev.offsetX <= buttons[1].x + buttons[1].width && ev.offsetY >= buttons[1].y && ev.offsetY <= buttons[1].y + buttons[1].height){
			document.body.style.cursor = "pointer";
			return;
		}
		else if(ev.offsetX >= buttons[2].x && ev.offsetX <= buttons[2].x + buttons[2].width && ev.offsetY >= buttons[2].y && ev.offsetY <= buttons[2].y + buttons[2].height){
			document.body.style.cursor = "pointer";
			return;
		}
	  	else{
	  		document.body.style.cursor = "auto";
	  		return;
	  	}
	}
	if(buttons[4].clickable){
		if(ev.offsetX >= buttons[4].x && ev.offsetX <= buttons[4].x + buttons[4].width && ev.offsetY >= buttons[4].y && ev.offsetY <= buttons[4].y + buttons[4].height){
			document.body.style.cursor = "pointer";
			return;
		}
		else if(ev.offsetX >= buttons[1].x && ev.offsetX <= buttons[1].x + buttons[1].width && ev.offsetY >= buttons[1].y && ev.offsetY <= buttons[1].y + buttons[1].height){
			document.body.style.cursor = "pointer";
			return;
		}
		else if(ev.offsetX >= buttons[2].x && ev.offsetX <= buttons[2].x + buttons[2].width && ev.offsetY >= buttons[2].y && ev.offsetY <= buttons[2].y + buttons[2].height){
			document.body.style.cursor = "pointer";
			return;
		}	
		else{
	  		document.body.style.cursor = "auto";
	  		return;
	  	}
	}
	else if(ev.offsetX >= buttons[1].x && ev.offsetX <= buttons[1].x + buttons[1].width && ev.offsetY >= buttons[1].y && ev.offsetY <= buttons[1].y + buttons[1].height){
		document.body.style.cursor = "pointer";
		return;
	}
	else if(ev.offsetX >= buttons[2].x && ev.offsetX <= buttons[2].x + buttons[2].width && ev.offsetY >= buttons[2].y && ev.offsetY <= buttons[2].y + buttons[2].height){
		document.body.style.cursor = "pointer";
		return;
	}
	else if(ev.offsetX >= buttons[3].x && ev.offsetX <= buttons[3].x + buttons[3].width && ev.offsetY >= buttons[3].y && ev.offsetY <= buttons[3].y + buttons[3].height){
		document.body.style.cursor = "pointer";
		return;
	}
	else if(ev.offsetX >= buttons[5].x && ev.offsetX <= buttons[5].x + buttons[5].width && ev.offsetY >= buttons[5].y && ev.offsetY <= buttons[5].y + buttons[5].height){
		document.body.style.cursor = "pointer";
		return;
	}	
	else{
  		document.body.style.cursor = "auto";
  		return;
  	}
}

function setPlayerRank(playerName,pontuacao){
    var array = JSON.parse(localStorage.getItem("arrayRankC"));
    if(pontuacao!=0){
        if(array!=null){
            array.push(playerName + ":" +pontuacao.toString());
            array = sortArray(array);
            localStorage.setItem("arrayRankC",  JSON.stringify(array));
        }
        else{
            var array = new Array();
            array[0] = playerName + ":" +pontuacao.toString()
            localStorage.setItem("arrayRankC",  JSON.stringify(array));
        }
    }
}

function sortArray(array){
    var j;
    for(var i=1;i<array.length;i++){
    	if(array[i]!=null){
	        j = i;
	        while(j>0 && array[j]!=null && parseInt(array[j-1].split(":")[1]) < parseInt(array[j].split(":")[1])){
	            var temp = array[j];
	            array[j] = array[j-1];
	            array[j-1] = temp;
	            j--;
	        }
    	}
    }
    return array;
}