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
    var character1;
    var character2;
    var balas;
    var boarder;
    var pocoes;
    var buttons;
    var variables;

	var som = document.getElementsByTagName("audio")[0];
	//som.play();

	canvas.addEventListener("initend", initEndHandler);

	init(canvas, ctx, cw, ch, character1, character2, balas, boarder, pocoes, buttons, variables);  //carregar todos os componentes

	function initEndHandler(ev)
	{		
		character1 = ev.character1;
		character2 = ev.character2;
		balas = ev.balas;
		boarder = ev.boarder;
		pocoes = ev.pocoes;
		buttons = ev.buttons;
		variables = ev.variables;

		window.addEventListener("keydown", keyDownHandler2);

		window.addEventListener("keyup", keyUpHandler2);

		ctx.canvas.addEventListener("click", cch);

		ctx.canvas.addEventListener("mousemove", mousemove);

		startAnim(ev, ctx, cw, ch, character1, character2, balas, boarder, pocoes, buttons, variables);
	}

	var keyDownHandler2 = function(ev){
		keyDownHandler(ev, character1, character2);
	}

	var keyUpHandler2 = function(ev){
		keyUpHandler(ev, character1, character2);
	}

	var cch = function(ev){
		canvasClickHandler(ev, ctx, cw, ch, character1, character2, balas, boarder, pocoes, buttons, variables, som);	
	}

	var mousemove = function(ev){
		canvasMouseMove(ev, ctx, character1, character2, buttons);
	}
}

function init(canvas, ctx, cw, ch, character1, character2, balas, boarder, pocoes, buttons, variables)
{
	var nLoad = 0;
	var totLoad = 5;
	var character1 = new Array(1);
	var character2 = new Array(1);
	var balas = new Array(30);
	var boarder = new Array(1);
	var pocoes = new Array(1);
	var buttons = new Array(4);
	var variables = new Variables();
	var img;

	var xRandom = Math.floor((Math.random()*cw) + 1);
	var yRandom = Math.floor((Math.random()*ch) + 1);

	//estilos de texto
	ctx.fillStyle = "#993333";
	ctx.font = "12px helvetica";	
	ctx.textBaseline = "bottom"; 
	ctx.textAlign = "center";

	//variaveis globais
	variables.tempoIntervaloPocoes = 60000;
	variables.tamanhoPocao = 30;
	variables.tamanhoHeroi = 50;
	variables.controlaSpaceBala = 0;
	variables.contaBalasAtivas = 0;

	var data = new Date();
    variables.tIni = data.getTime();

	//Desenha o limite da canvas (boarder)
	variables.larguraBoarder = 75;

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

	//carregar imagens e criar sprites
	var img = new Image(); 
	img.addEventListener("load", imgLoadedHandler);
	img.id="character1";
	img.src = "../resources/"+ localStorage.getItem("player1Type") + "F.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="character2";
	img.src = "../resources/"+ localStorage.getItem("player2Type") + "F.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="blocos1";
	img.src = "../resources/parede2.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="blocos2";
	img.src = "../resources/parede3.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="blocos3";
	img.src = "../resources/parede.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="button1";
	img.src = "../resources/playagain.png";  //dá ordem de carregamento da imagem

	function imgLoadedHandler(ev)
	{
		var img = ev.target;
		if(img.id == "character1"){
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new Heroi(variables.tamanhoHeroi, ch/2-variables.tamanhoHeroi, variables.tamanhoHeroi, variables.tamanhoHeroi, 1, "F", img);
			sp.vida = 100;
			sp.mortes = 0;
			character1[0] = sp;
		}

		else if(img.id == "character2"){
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new Heroi(cw-(2*variables.tamanhoHeroi), ch/2-variables.tamanhoHeroi, variables.tamanhoHeroi, variables.tamanhoHeroi, 1, "F", img);
			sp.vida = 100;
			sp.mortes = 0;
			character2[0] = sp;
		}

		else if(img.id == "blocos1"){
			var sp = new Board(cw, ch, variables.larguraBoarder, img);
			boarder[0] = sp;
		}

		else if(img.id == "blocos2"){
			boarder[0].img3 = img;
		}

		else if(img.id == "blocos3"){
			boarder[0].img2 = img;
		}
		else{
			var sp = new Botao(cw, ch, cw/2 - img.naturalWidth/2, ch/2 + img.naturalHeight/(1.5), img.naturalWidth, img.naturalHeight, img);
			buttons[0]= sp;
		}

		setTimeout(function(){/*nao faz nada*/}, 200);

		nLoad++;

		if (nLoad == totLoad)
		{
			var ev2 = new Event("initend");
			ev2.character1 = character1;
			ev2.character2 = character2;
			ev2.balas = balas;
			ev2.boarder = boarder;
			ev2.pocoes = pocoes;
			ev2.buttons = buttons;
			ev2.variables = variables;
			ctx.canvas.dispatchEvent(ev2);
		}
	}
}

function draw(ctx, cw, ch, character1, character2, balas, boarder, pocoes, buttons, variables)
{
	var dim = character1.length;
	var dim2 = character2.length;
	var dim3 = balas.length;
	var dim4 = pocoes.length;

	for (let i = 0; i < dim; i++)
	{
		if(character1[i]!=null){
			character1[i].draw(ctx);
		}
	}

	for (let i = 0; i < dim2; i++)
	{
		if(character2[i]!=null){
			character2[i].draw(ctx);
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
	boarder[0].multiplayer(ctx);

	//BOTOES CANVAS
	buttons[1].draw(ctx);
	buttons[2].draw(ctx);
	buttons[3].draw(ctx);

	//DESENHA INFORMACAO VIDA, KILLS, TEMPO, BALAS
  	ctx.font = "bold 30px bloodFont";
  	ctx.fillText("Player 1:", 125, ch-8);

  	ctx.font = "bold 40px bloodFont";
  	if(character1[0].vida <= 0) character1[0].vida = 0;
  	ctx.fillText(character1[0].vida, 195, ch-4);

  	ctx.font = "bold 30px bloodFont";
  	ctx.fillText("Player 2:", 310, ch-8);

  	ctx.font = "bold 40px bloodFont";
  	if(character2[0].vida <= 0) character2[0].vida = 0;
  	ctx.fillText(character2[0].vida, 385, ch-4);

  	ctx.font = "bold 30px bloodFont";
  	ctx.fillText("Tempo:", 505, ch-8);

  	var data = new Date();
    var dt = data.getTime() - variables.tIni;
    var mMinute = 1000 * 60;
	var mHour = mMinute * 60;
	var mDay = mHour * 24;
    var minutos = Math.floor(dt/mMinute);
    var segundos = Math.floor(dt/1000);

  	ctx.font = "bold 40px bloodFont";
  	ctx.fillText(minutos+":"+(segundos-minutos*60), 585, ch-4);

  	character1[0].minutos = minutos;
  	character1[0].segundos = segundos;

  	if(character1[0].paused == true){
		ctx.font = "bold 120px bloodFont";
	  	ctx.fillText("GAME PAUSED", cw/2, ch/2 - 70);
  	}
}

//iniciar animação
function startAnim(ev, ctx, cw, ch, character1, character2, balas, boarder, pocoes, buttons, variables)
{
	draw(ctx, cw, ch, character1, character2, balas, boarder, pocoes, buttons, variables);
	animLoop(ev, ctx, cw, ch, character1, character2, balas, boarder, pocoes, buttons, variables);
	variables.tempoPocao = setInterval(criaPocoes, variables.tempoIntervaloPocoes, ctx, cw, ch, pocoes, character1, character2, boarder, variables);
}

//apagar sprites
function clear(ctx, character1, character2, balas, pocoes, buttons)
{
	var dim = character1.length;
	var dim2 = character2.length;
	var dim3 = balas.length;

	for (let i = 0; i < dim; i++)
	{
		if(character1[i]!=null){
			character1[i].clear(ctx);
		}
	}

	for (let i = 0; i < dim2; i++)
	{
		if(character2[i]!=null){
			character2[i].clear(ctx);
		}
	}

	for (let i = 0; i < dim3; i++)
	{
		if(balas[i]!=null){
			balas[i].clear(ctx);
		}
	}


}

function criaPocoes(ctx, cw, ch, pocoes, character1, character2, boarder, variables){
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

		//verificar se esta perto do heroi
		if(character1[0].colisionBoundingBox(sp, ctx) || character2[0].colisionBoundingBox(sp, ctx) || boarder[0].blocoMultiplayerL.colisionBoundingBox(sp, ctx) || boarder[0].blocoMultiplayerD.colisionBoundingBox(sp, ctx)){
			criaPocoes(ctx, cw, ch, pocoes, character1, character2, boarder, variables);
		}
		else{
			pocoes[0] = sp;
		}
	}
}

function gameover(ev, ctx, cw, ch, character1, buttons, variables){
	ctx.font = "bold 120px bloodFont";
	ctx.fillText("GAME OVER", cw/2, ch/2-40);
	ctx.font = "bold 40px bloodFont";
	if(character1[0].gameover == true){
		ctx.fillText("Player 2 WINS", cw/2, ch/2-5);
	}
	else{
		ctx.fillText("Player 1 WINS", cw/2, ch/2-5);
	}

  	ctx.font = "bold 40px bloodFont";
  	ctx.fillText("Tempo: ", cw/2 - 40, ch/2+40);
  	ctx.font = "bold 40px bloodFont";
  	ctx.fillText(character1[0].minutos+":"+character1[0].segundos, cw/2 + 35, ch/2 + 40);

  	buttons[1].x = cw-75;
	buttons[1].y = ch - variables.larguraBoarder + 10;
	buttons[2].x = 10;
	buttons[2].y = ch - variables.larguraBoarder + 10;
	buttons[1].height = 60;
	buttons[1].width = 60;
	buttons[2].height = 60;
	buttons[2].width = 60;

  	buttons[0].clickable = true;
  	buttons[0].draw(ctx);
  	buttons[1].draw(ctx);
  	buttons[2].draw(ctx);
}

function animLoop(ev, ctx, cw, ch, character1, character2, balas, boarder, pocoes, buttons, variables)
{	
	var al = function(time)
	{
		animLoop(ev, ctx, cw, ch, character1, character2, balas, boarder, pocoes, buttons, variables);
	}

	if(character1[0].paused != true){
		var reqID = window.requestAnimationFrame(al);
		render(ev, ctx, character1, character2, balas, boarder, pocoes, buttons, variables, reqID);
	}
	else{
		ctx.clearRect(0, 0, cw, ch);
		draw(ctx, cw, ch, character1, character2, balas, boarder, pocoes, buttons, variables);
		window.cancelAnimationFrame(reqID);
		//draw(ctx, cw, ch, character1, character2, balas, boarder, pocoes, buttons, variables);
	}
}

function render(ev, ctx, character1, character2, balas, boarder, pocoes, buttons, variables, reqID)
{
	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

	ctx.clearRect(0, 0, cw, ch);
	clear(ctx, character1, character2, balas, pocoes);

	//GAME OVER
	if(character1[0].vida == 0 || character2[0].vida == 0){
		
		if(character1[0].vida == 0){
			character1[0].gameover = true;
			
			gameover(ev, ctx, cw, ch, character1, buttons, variables);
		}
		else{
			character2[0].gameover = true;
			
			gameover(ev, ctx, cw, ch, character1, buttons, variables);
		}
	}

	else{
		//COLISAO DA PERSONAGEM COM AS POCOES
		for (var i = 0; i < pocoes.length; i++) {
			if(pocoes[i]!=null){
				if(character1[0].colisionBoundingBox(pocoes[i], ctx)){
					pocoes[i] = null;
					character1[0].vida += 100; //pocao de 100 de vida
					if(character1[0].vida > 100){
						character1[0].vida = 100;
					}
				}
			}
			if(pocoes[i]!=null){
				if(character2[0].colisionBoundingBox(pocoes[i], ctx)){
					pocoes[i] = null;
					character2[0].vida += 100; //pocao de 100 de vida
					if(character2[0].vida > 100){
						character2[0].vida = 100;
					}
				}
			}
		}

		//COLISAO DAS BALAS COM AS PERSONAGENS E PAREDES
		for (var j = 0; j < balas.length; j++){
			if(balas[j]!=null){
				if(balas[j].colisionBoundingBox(character1[0], ctx)){
					if(character1[0].vida - balas[j].dano == 0){
						character1[0].vida = 0;
					}
					else{
						character1[0].vida -= balas[j].dano;
					}
					balas[j] = null;
					variables.contaBalasAtivas = variables.contaBalasAtivas-1;
				}
			}
			if(balas[j]!=null){
				if(balas[j].colisionBoundingBox(character2[0], ctx)){
					if(character2[0].vida - balas[j].dano == 0){
						character2[0].vida = 0;
					}
					else{
						character2[0].vida -= balas[j].dano;
					}
					balas[j] = null;
					variables.contaBalasAtivas = variables.contaBalasAtivas-1;
				}
			}
			if(balas[j]!=null && balas[j].colisionBoarderMultiplayer(boarder[0], ctx)){
				balas[j] = null;
				variables.contaBalasAtivas = variables.contaBalasAtivas - 1;
			}
			if(balas[j]!=null && ((balas[j].y + balas[j].height > ch - variables.larguraBoarder) || balas[j].y - balas[j].height < 0 || balas[j].x - balas[j].width < 0 || balas[j].x + balas[j].width > cw)){
				balas[j] = null;
				variables.contaBalasAtivas = variables.contaBalasAtivas - 1;
			}	
		}

		//DIRECAO DA BALA
		for (var i = 0; i < balas.length; i++) {
			if(balas[i]!=null){
				if(balas[i].direcao == "F"){
					if(balas[i].y + balas[i].height > ch - variables.larguraBoarder){
						balas[i].ativa = 0;
					}
					else{
						balas[i].y = balas[i].y + balas[i].speed;
					}
				}
				if(balas[i].direcao == "T"){
					if(balas[i].y - balas[i].height < 0){
						balas[i].ativa = 0;
					}
					else{
						balas[i].y = balas[i].y - balas[i].speed;
					}
				}
				if(balas[i].direcao == "E"){
					if(balas[i].x - balas[i].width < 0){
						balas[i].ativa = 0;
					}
					else{
						balas[i].x = balas[i].x - balas[i].speed;
					}
				}
				if(balas[i].direcao == "D"){
					if(balas[i].x + balas[i].width > cw){
						balas[i].ativa = 0;
					}
					else{
						balas[i].x = balas[i].x + balas[i].speed;
					}
				}
			}
		}

		//CHARACTER1 A MEXER COM AS TECLAS
		var xIni = character1[0].x;
		var yIni = character1[0].y;
		var ximg = character1[0].x;
		var yimg = character1[0].y; 

		if(character1[0].space == true){

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
					if(character1[0].direcao == "E"){
						img.addEventListener("load", imgLoadedHandlerBala);
						img.id="balaE";
						img.src = "../resources/balaED.png";
						function imgLoadedHandlerBala(ev){
							var img = ev.target;
							if(img.id == "balaE"){
								var nw = img.width/2;
								var nh = img.height/2;
								var xBala = character1[0].x - character1[0].width/4;
								var yBala = character1[0].y + character1[0].height/2;
								var sp = new Bala(xBala, yBala, nw, 2*nh, 5, "E", img);
								balas[i] = sp;
								balas[i].ativa = 1;
								balas[i].dano = 10;
							}
						}
					}
					if(character1[0].direcao == "T"){
						img.addEventListener("load", imgLoadedHandlerBala);
						img.id="balaT";
						img.src = "../resources/balaCB.png";
						function imgLoadedHandlerBala(ev){
							var img = ev.target;
							if(img.id == "balaT"){
								var nw = img.width;
								var nh = img.height;
								var xBala = character1[0].x + character1[0].width/(2.5);
								var yBala = character1[0].y - character1[0].height/4;
								var sp = new Bala(xBala, yBala, nw, nh/2, 5, "T", img);
								balas[i] = sp;
								balas[i].ativa = 1;
								balas[i].dano = 10;
							}
						}
					}
					if(character1[0].direcao == "D"){
						img.addEventListener("load", imgLoadedHandlerBala);
						img.id="balaD";
						img.src = "../resources/balaED.png";
						function imgLoadedHandlerBala(ev){
							var img = ev.target;
							if(img.id == "balaD"){
								var nw = img.width/2;
								var nh = img.height/2;
								var xBala = character1[0].x + character1[0].width;
								var yBala = character1[0].y + character1[0].height/2;
								var sp = new Bala(xBala, yBala, nw, 2*nh, 5, "D", img);
								balas[i] = sp;
								balas[i].ativa = 1;
								balas[i].dano = 10;
							}
						}
					}
					if(character1[0].direcao == "F"){
						img.addEventListener("load", imgLoadedHandlerBala);
						img.id="balaF";
						img.src = "../resources/balaCB.png";
						function imgLoadedHandlerBala(ev){
							var img = ev.target;
							if(img.id == "balaF"){
								var nw = img.width;
								var nh = img.height;
								var xBala = character1[0].x + character1[0].width/(2.5);
								var yBala = character1[0].y + character1[0].height;
								var sp = new Bala(xBala, yBala, nw, nh/2, 5, "F", img);
								balas[i] = sp;
								balas[i].ativa = 1;
								balas[i].dano = 10;
							}
						}
					}
					break;
				}
			}
		}

		if(character1[0].left == true){
			var img = new Image();
			character1[0].img = img;
			img.src = "../resources/"+ localStorage.getItem("player1Type") + "E.png";
			character1[0].direcao = "E";
			ximg-=5;
		}
		if(character1[0].top == true){
			var img = new Image();
			character1[0].img = img;
			img.src = "../resources/"+ localStorage.getItem("player1Type") + "T.png";
			character1[0].direcao = "T";
			yimg-=5;
		}
		if(character1[0].right == true){
			var img = new Image();
			character1[0].img = img;
			img.src = "../resources/"+ localStorage.getItem("player1Type") + "D.png";
			character1[0].direcao = "D";
			ximg+=5;
		}
		if(character1[0].bottom == true){
			var img = new Image();
			character1[0].img = img;
			img.src = "../resources/"+ localStorage.getItem("player1Type") + "F.png";
			character1[0].direcao = "F";
			yimg+=5;
		}

		character1[0].x = ximg;
		character1[0].y = yimg;
		if(character1[0].colisionBoarderBox(boarder[0]) || character1[0].colisionBoarderMultiplayer(boarder[0], ctx)){
			character1[0].x = xIni;
			character1[0].y = yIni;
		}

		//CHARACTER2 A MEXER COM AS TECLAS
		var xIni = character2[0].x;
		var yIni = character2[0].y;
		var ximg = character2[0].x;
		var yimg = character2[0].y; 

		if(character2[0].space == true){

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
					if(character2[0].direcao == "E"){
						img.addEventListener("load", imgLoadedHandlerBala);
						img.id = "balaE";
						img.src = "../resources/balaED.png";
						function imgLoadedHandlerBala(ev){
							var img = ev.target;
							if(img.id == "balaE"){
								var nw = img.width/2;
								var nh = img.height/2;
								var xBala = character2[0].x - character2[0].width/4;
								var yBala = character2[0].y + character2[0].height/2;
								var sp = new Bala(xBala, yBala, nw, 2*nh, 5, "E", img);
								balas[i] = sp;
								balas[i].ativa = 1;
								balas[i].dano = 10;
							}
						}
					}
					if(character2[0].direcao == "T"){
						img.addEventListener("load", imgLoadedHandlerBala);
						img.id = "balaT";
						img.src = "../resources/balaCB.png";
						function imgLoadedHandlerBala(ev){
							var img = ev.target;
							if(img.id == "balaT"){
								var nw = img.width;
								var nh = img.height;
								var xBala = character2[0].x + character2[0].width/(2.5);
								var yBala = character2[0].y - character2[0].height/4;
								var sp = new Bala(xBala, yBala, nw, nh/2, 5, "T", img);
								balas[i] = sp;
								balas[i].ativa = 1;
								balas[i].dano = 10;
							}
						}
					}
					if(character2[0].direcao == "D"){
						img.addEventListener("load", imgLoadedHandlerBala);
						img.id = "balaD";
						img.src = "../resources/balaED.png";
						function imgLoadedHandlerBala(ev){
							var img = ev.target;
							if(img.id == "balaD"){
								var nw = img.width/2;
								var nh = img.height/2;
								var xBala = character2[0].x + character2[0].width;
								var yBala = character2[0].y + character2[0].height/2;
								var sp = new Bala(xBala, yBala, nw, 2*nh, 5, "D", img);
								balas[i] = sp;
								balas[i].ativa = 1;
								balas[i].dano = 10;
							}
						}
					}
					if(character2[0].direcao == "F"){
						img.addEventListener("load", imgLoadedHandlerBala);
						img.id = "balaF";
						img.src = "../resources/balaCB.png";
						function imgLoadedHandlerBala(ev){
							var img = ev.target;
							if(img.id == "balaF"){
								var nw = img.width;
								var nh = img.height;
								var xBala = character2[0].x + character2[0].width/(2.5);
								var yBala = character2[0].y + character2[0].height;
								var sp = new Bala(xBala, yBala, nw, nh/2, 5, "F", img);
								balas[i] = sp;
								balas[i].ativa = 1;
								balas[i].dano = 10;
							}
						}
					}
					break;
				}
			}
		}

		if(character2[0].left == true){
			var img = new Image();
			character2[0].img = img;
			img.src = "../resources/"+ localStorage.getItem("player2Type") + "E.png";
			character2[0].direcao = "E";
			ximg-=5;
		}
		if(character2[0].top == true){
			var img = new Image();
			character2[0].img = img;
			img.src = "../resources/"+ localStorage.getItem("player2Type") + "T.png";
			character2[0].direcao = "T";
			yimg-=5;
		}
		if(character2[0].right == true){
			var img = new Image();
			character2[0].img = img;
			img.src = "../resources/"+ localStorage.getItem("player2Type") + "D.png";
			character2[0].direcao = "D";
			ximg+=5;
		}
		if(character2[0].bottom == true){
			var img = new Image();
			character2[0].img = img;
			img.src = "../resources/"+ localStorage.getItem("player2Type") + "F.png";
			character2[0].direcao = "F";
			yimg+=5;
		}

		character2[0].x = ximg;
		character2[0].y = yimg;
		if(character2[0].colisionBoarderBox(boarder[0], ctx) || character2[0].colisionBoarderMultiplayer(boarder[0], ctx)){
			character2[0].x = xIni;
			character2[0].y = yIni;
		}
		
		if(character1[0].vida != 0 && character2[0].vida != 0){
			draw(ctx, cw, ch, character1, character2, balas, boarder, pocoes, buttons, variables);
		}
	}
}

function keyDownHandler(ev, character1, character2){
	var key = window.event?ev.keyCode:ev.wich;
	if(key != 37 && key != 38 && key != 39 && key != 40 && key != 32 && key != 65 && key != 68 && key != 87 && key != 83 && key != 13) return;
	if(key==13){
		character2[0].space = true;
		if(character1[0].gameover == true || character2[0].gameover == true){
			//location.reload();
		}
	}
	if(key==37){
		character2[0].left = true;
	}
	else if(key==38){
		character2[0].top = true;
	}
	else if(key==39){
		character2[0].right = true;
	}
	else if(key==40){
		character2[0].bottom = true;
	}
	else if(key==65){
		character1[0].left = true;
	}
	else if(key==68){
		character1[0].right = true;
	}
	else if(key==87){
		character1[0].top = true;
	}
	else if(key==83){
		character1[0].bottom = true;
	}
	if(key==32){
		character1[0].space = true;
		if(character1[0].gameover == true || character2[0].gameover == true){
			//location.reload();
		}
	}
}

function keyUpHandler(ev, character1, character2){
	var key = window.event?ev.keyCode:ev.wich;
	if(key != 37 && key != 38 && key != 39 && key != 40 && key != 32 && key != 65 && key != 68 && key != 87 && key != 83 && key != 13) return;
	if(key==13){
		character2[0].space = false;
	}
	if(key==37){
		character2[0].left = false;
	}
	else if(key==38){
		character2[0].top = false;
	}
	else if(key==39){
		character2[0].right = false;
	}
	else if(key==40){
		character2[0].bottom = false;
	}
	else if(key==65){
		character1[0].left = false;
	}
	else if(key==68){
		character1[0].right = false;
	}
	else if(key==87){
		character1[0].top = false;
	}
	else if(key==83){
		character1[0].bottom = false;
	}
	if(key==32){
		character1[0].space = false;
	}
}

function canvasClickHandler(ev, ctx, cw, ch, character1, character2, balas, boarder, pocoes, buttons, variables, som)
{
	var mainWindow = window.parent;

	if (buttons[0].clickedBoundingBox(ev, ctx))
	{
		location.reload();
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
	}
	if (buttons[2].clickedBoundingBox2(ev, ctx))
	{
		mainWindow.postMessage("Multiplayer-Play", "*");
	}

	if (buttons[3].clickedBoundingBox2(ev, ctx))
	{
		if(character1[0].paused == true){
			character1[0].paused = false;
			startAnim(ev, ctx, cw, ch, character1, character2, balas, boarder, pocoes, buttons, variables);
		}
		else{
			character1[0].paused = true;
		}
	}
}

function canvasMouseMove(ev, ctx, character1, character2, buttons){
	if(character1[0].gameover == true || character2[0].gameover == true){
		if(ev.offsetX >= buttons[0].x && ev.offsetX <= buttons[0].x + buttons[0].width && ev.offsetY >= buttons[0].y && ev.offsetY <= buttons[0].y + buttons[0].height){
	  		document.body.style.cursor = "pointer";
	  	}
		else if(ev.offsetX >= buttons[1].x && ev.offsetX <= buttons[1].x + buttons[1].width && ev.offsetY >= buttons[1].y && ev.offsetY <= buttons[1].y + buttons[1].height){
			document.body.style.cursor = "pointer";
		}
		else if(ev.offsetX >= buttons[2].x && ev.offsetX <= buttons[2].x + buttons[2].width && ev.offsetY >= buttons[2].y && ev.offsetY <= buttons[2].y + buttons[2].height){
			document.body.style.cursor = "pointer";
		}
	  	else{
	  		document.body.style.cursor = "auto";
	  	}
	}
	else if(ev.offsetX >= buttons[1].x && ev.offsetX <= buttons[1].x + buttons[1].width && ev.offsetY >= buttons[1].y && ev.offsetY <= buttons[1].y + buttons[1].height){
		document.body.style.cursor = "pointer";
	}
	else if(ev.offsetX >= buttons[2].x && ev.offsetX <= buttons[2].x + buttons[2].width && ev.offsetY >= buttons[2].y && ev.offsetY <= buttons[2].y + buttons[2].height){
		document.body.style.cursor = "pointer";
	}
	else if(ev.offsetX >= buttons[3].x && ev.offsetX <= buttons[3].x + buttons[3].width && ev.offsetY >= buttons[3].y && ev.offsetY <= buttons[3].y + buttons[3].height){
		document.body.style.cursor = "pointer";
	}	
	else{
  		document.body.style.cursor = "auto";
  	}
}
