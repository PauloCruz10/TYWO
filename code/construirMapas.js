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
    var som = window.parent.document.getElementsByTagName("audio")[0];
    var construction;
    var boarder;
    var blocosNivel;

    canvas.addEventListener("initend", initEndHandler);
	init(canvas, ctx, cw, ch, construction, blocosNivel, boarder);  //carregar todos os componentes

	function initEndHandler(ev)
	{		
		boarder = ev.boarder;
		construction = ev.construction;
		blocosNivel = ev.blocosNivel;

		startAnim(ev, ctx, cw, ch, construction, blocosNivel, boarder);

		ctx.canvas.addEventListener("click", cch);
	}

	var soundMute = function(ev){
		var aux = soundBtn.firstChild;
		if(som.muted == true){
			som.muted = false;
			aux.src = "../resources/soundOnBtn.png";
		}
		else{
			som.muted = true;
			aux.src = "../resources/soundOffBtn.png";
		}
	}

	soundBtn.addEventListener("click", soundMute);

	var nbch = function(ev){
		window.parent.postMessage("ConstroiMapa-Play", "*");
	}

	backBtn.addEventListener("click", nbch);

	var map = function(ev){
		if(document.getElementById("mapName").value!=""){
			var array = JSON.parse(localStorage.getItem("nomeNiveis"));
			if(array!=null){
				array.push(document.getElementById("mapName").value);
				localStorage.setItem("nomeNiveis", JSON.stringify(array));

				var blocosNivelAux = new Array(50);
				for (var i = 0; i < blocosNivel.length; i++) {
					if(blocosNivel[i]!=null){
						blocosNivelAux[i] = new Bloco(null, blocosNivel[i].width, blocosNivel[i].height);
						blocosNivelAux[i].x = blocosNivel[i].x;
						blocosNivelAux[i].y = blocosNivel[i].y;
						blocosNivelAux[i].imgName = blocosNivel[i].imgName;
					}
				}

				localStorage.setItem(document.getElementById("mapName").value, JSON.stringify(blocosNivelAux));
			}
			else{
				var array = new Array();
				array[0] = document.getElementById("mapName").value;
				localStorage.setItem("nomeNiveis",  JSON.stringify(array));

				var blocosNivelAux = new Array(50);
				for (var i = 0; i < blocosNivel.length; i++) {
					if(blocosNivel[i]!=null){
						blocosNivelAux[i] = new Bloco(null, blocosNivel[i].width, blocosNivel[i].height);
						blocosNivelAux[i].x = blocosNivel[i].x;
						blocosNivelAux[i].y = blocosNivel[i].y;
						blocosNivelAux[i].imgName = blocosNivel[i].imgName;
					}
				}

				localStorage.setItem(document.getElementById("mapName").value, JSON.stringify(blocosNivelAux));
			}
		}
	}

	mapBtn.addEventListener("click", map);


	var bloco = function(ev){
		document.getElementById("blocoBtnImg").style.border = "3px solid red";
		document.getElementById("bloco2BtnImg").style.border = null;
		document.getElementById("bloco3BtnImg").style.border = null;
		document.getElementById("lixoBtnImg").style.border = null;
		document.getElementById("flagBtnImg").style.border = null;
		construction[0].blocoActive = true;
		construction[0].flagActive = false;
		construction[0].bloco2Active = false;
		construction[0].bloco3Active = false;
		construction[0].lixoActive = false;
	}

	blocoBtn.addEventListener("click", bloco);

	var bloco2 = function(ev){
		document.getElementById("bloco2BtnImg").style.border = "3px solid red";
		document.getElementById("blocoBtnImg").style.border = null;
		document.getElementById("bloco3BtnImg").style.border = null;
		document.getElementById("lixoBtnImg").style.border = null;
		document.getElementById("flagBtnImg").style.border = null;
		construction[0].bloco2Active = true;
		construction[0].flagActive = false;
		construction[0].blocoActive = false;
		construction[0].bloco3Active = false;
		construction[0].lixoActive = false;		
	}

	bloco2Btn.addEventListener("click", bloco2);

	var bloco3 = function(ev){
		document.getElementById("bloco3BtnImg").style.border = "3px solid red";
		document.getElementById("bloco2BtnImg").style.border = null;
		document.getElementById("blocoBtnImg").style.border = null;
		document.getElementById("lixoBtnImg").style.border = null;
		document.getElementById("flagBtnImg").style.border = null;
		construction[0].bloco3Active = true;
		construction[0].flagActive = false;
		construction[0].blocoActive = false;
		construction[0].bloco2Active = false;
		construction[0].lixoActive = false;
	}

	bloco3Btn.addEventListener("click", bloco3);

	var flag = function(ev){
		document.getElementById("flagBtnImg").style.border = "3px solid red";
		document.getElementById("bloco3BtnImg").style.border = null;
		document.getElementById("bloco2BtnImg").style.border = null;
		document.getElementById("blocoBtnImg").style.border = null;
		document.getElementById("lixoBtnImg").style.border = null;
		construction[0].flagActive = true;
		construction[0].bloco3Active = false;
		construction[0].blocoActive = false;
		construction[0].bloco2Active = false;
		construction[0].lixoActive = false;
	}

	flagBtn.addEventListener("click", flag);

	var lixo = function(ev){
		document.getElementById("lixoBtnImg").style.border = "3px solid red";
		document.getElementById("flagBtnImg").style.border = null;
		document.getElementById("bloco2BtnImg").style.border = null;
		document.getElementById("bloco3BtnImg").style.border = null;
		document.getElementById("blocoBtnImg").style.border = null;
		construction[0].flagActive = false;
		construction[0].bloco3Active = false;
		construction[0].blocoActive = false;
		construction[0].bloco2Active = false;
		construction[0].lixoActive = true;
	}

	lixoBtn.addEventListener("click", lixo);

	var cch = function(ev){
		canvasClickHandler(ev, ctx, construction, blocosNivel);	
	}
}

function init(canvas, ctx, cw, ch, construction, blocosNivel, boarder)
{
	var nLoad = 0;
	var totLoad = 2;
	var boarder = new Array(1);
	var blocosNivel = new Array(50);
	var construction = new Array(1);
	var img;

	var larguraBoarder = 75;

	//CONSTRUCAO
	var sp = new Construction(cw, ch);
	construction[0] = sp;

	var img1 = new Image();
	img1.src = "../resources/bloco.png";
	construction[0].bloco = img1;

	var img2 = new Image();
	img2.src = "../resources/parede3.png";
	construction[0].bloco2 = img2;

	var img3 = new Image();
	img3.src = "../resources/bloco2.png";
	construction[0].bloco3 = img3;

	var img4 = new Image();
	img4.src = "../resources/flag.png";
	construction[0].flag = img4;

	//CARREGAMENTO
	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="parede2";
	img.src = "../resources/parede2.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="parede";
	img.src = "../resources/parede.png";

	function imgLoadedHandler(ev)
	{
		var img = ev.target;
		if(img.id == "parede2"){
			var sp = new Board(cw, ch, larguraBoarder, img);
			boarder[0] = sp;
		}
		else{
			boarder[0].img2 = img;
		}

		nLoad++;

		if (nLoad == totLoad)
		{
			var ev2 = new Event("initend");
			ev2.construction = construction;
			ev2.boarder = boarder;
			ev2.blocosNivel = blocosNivel;
			ctx.canvas.dispatchEvent(ev2);
		}
	}
}

function draw(ctx, cw, ch, construction, blocosNivel, boarder)
{
	for (var i = 0; i < blocosNivel.length; i++) {
		if(blocosNivel[i]!=null){
			blocosNivel[i].draw(ctx);
		}
	}
	//DESENHA O LIMITE (QUADRADOS)
	boarder[0].sobrevivencia(ctx);
}

//iniciar animação
function startAnim(ev, ctx, cw, ch, construction, blocosNivel, boarder)
{
	draw(ctx, cw, ch, construction, blocosNivel, boarder);
	animLoop(ctx, cw, ch, construction, blocosNivel, boarder);
}

function animLoop(ctx, cw, ch, construction, blocosNivel, boarder)
{	
	var al = function(time)
	{
		animLoop(ctx, cw, ch, construction, blocosNivel, boarder);
	}
	var reqID = window.requestAnimationFrame(al);

	render(ctx, construction, blocosNivel, boarder, reqID);
}

function render(ctx, construction, blocosNivel, boarder, reqID)
{
	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

	ctx.clearRect(0, 0, cw, ch);

	draw(ctx, cw, ch, construction, blocosNivel, boarder);
}

function canvasClickHandler(ev, ctx, construction, blocosNivel)
{
	//BLOCO é 43.75 por 42.5 da 10 blocos vertical e 16 horizontal
	if(construction[0].blocoActive){
		if(ev.offsetY <= ctx.canvas.height - 75){
			for (var i = 0; i < blocosNivel.length; i++) {
				if(blocosNivel[i]==null){
					blocosNivel[i] = new Bloco(construction[0].bloco, 43.75, 42.5);
					blocosNivel[i].imgName = "bloco";
					var auxX = ev.offsetX;
					var auxY = ev.offsetY;

					var auxConta = 0;	
					while (auxConta<ev.offsetX) { //parte do X
						auxConta+=43.75;
						if(auxConta>ev.offsetX){
							auxConta-=43.75;
							break;
						}
					}
					blocosNivel[i].x = auxConta;

					auxConta = 0;
					while (auxConta<ev.offsetY) {
						auxConta+=42.5;
						if(auxConta>ev.offsetY){
							auxConta-=42.5;
							break;
						}
					}
					blocosNivel[i].y = auxConta;

					var aux = 0;
					for (var j = 0; j < blocosNivel.length; j++) {
						if(blocosNivel[j]!=null && i!=j){
							if(blocosNivel[j].colisionBoundingBox2(blocosNivel[i], ctx)){
								aux = 1;
								blocosNivel[i] = null;
								break;
							}
						}
					}
					if(aux==0){
						ctx.drawImage(construction[0].bloco2, blocosNivel[i].x, blocosNivel[i].y, 43.75, 2*42.5);
					}
					break;
				}
			}
		}
	}
	else if(construction[0].bloco2Active){
		if(ev.offsetY <= ctx.canvas.height - 75){
			for (var i = 0; i < blocosNivel.length; i++) {
				if(blocosNivel[i]==null){
					blocosNivel[i] = new Bloco(construction[0].bloco2, 43.75, 2*42.5);
					blocosNivel[i].imgName = "parede3";
					var auxX = ev.offsetX;
					var auxY = ev.offsetY;
					var auxConta = 0;	
					while (auxConta<ev.offsetX) { //parte do X
						auxConta+=43.75;
						if(auxConta>ev.offsetX){
							auxConta-=43.75;
							break;
						}
					}
					blocosNivel[i].x = auxConta;

					auxConta = 0;
					while (auxConta<ev.offsetY) {
						auxConta+=2*42.5;
						if(auxConta>ev.offsetY){
							auxConta-=2*42.5;
							break;
						}
					}
					blocosNivel[i].y = auxConta;

					var aux = 0;
					for (var j = 0; j < blocosNivel.length; j++) {
						if(blocosNivel[j]!=null && i!=j){	
							if(blocosNivel[j].colisionBoundingBox2(blocosNivel[i], ctx)){
								aux = 1;
								blocosNivel[i] = null;
								break;
							}
						}
					}
					if(aux==0){
						ctx.drawImage(construction[0].bloco2, blocosNivel[i].x, blocosNivel[i].y, 43.75, 2*42.5);
					}
					break;
				}
			}			
		}
	}
	else if(construction[0].bloco3Active){
		if(ev.offsetY <= ctx.canvas.height - 75){
			for (var i = 0; i < blocosNivel.length; i++) {
				if(blocosNivel[i]==null){
					blocosNivel[i] = new Bloco(construction[0].bloco3, 2*43.75, 42.5);
					blocosNivel[i].imgName = "bloco3";
					var auxX = ev.offsetX;
					var auxY = ev.offsetY;
					var auxConta = 0;	
					while (auxConta<ev.offsetX) { //parte do X
						auxConta+=2*43.75;
						if(auxConta>ev.offsetX){
							auxConta-=2*43.75;
							break;
						}
					}
					blocosNivel[i].x = auxConta;

					auxConta = 0;
					while (auxConta<ev.offsetY) {
						auxConta+=42.5;
						if(auxConta>ev.offsetY){
							auxConta-=42.5;
							break;
						}
					}
					blocosNivel[i].y = auxConta;

					var aux = 0;
					for (var j = 0; j < blocosNivel.length; j++) {
						if(blocosNivel[j]!=null && i!=j){
							if(blocosNivel[j].colisionBoundingBox2(blocosNivel[i], ctx)){
								aux = 1;
								blocosNivel[i] = null;
								break;
							}
						}
					}
					if(aux==0){
						ctx.drawImage(construction[0].bloco2, blocosNivel[i].x, blocosNivel[i].y, 43.75, 2*42.5);
					}
					break;
				}
			}			
		}
	}
	//flag é 30 por 30
	else if(construction[0].flagActive){
		if(ev.offsetY <= ctx.canvas.height - 75){
			for (var i = 0; i < blocosNivel.length; i++) {
				if(blocosNivel[i]==null){
					blocosNivel[i] = new Bloco(construction[0].flag, 21.875, 21.25);
					blocosNivel[i].imgName = "flag";
					var auxX = ev.offsetX;
					var auxY = ev.offsetY;
					var auxConta = 0;	
					while (auxConta<ev.offsetX) { //parte do X
						auxConta+=43.75;
						if(auxConta>ev.offsetX){
							auxConta-=43.75;
							break;
						}
					}
					blocosNivel[i].x = auxConta+21.875;

					auxConta = 0;
					while (auxConta<ev.offsetY) {
						auxConta+=42.5;
						if(auxConta>ev.offsetY){
							auxConta-=42.5;
							break;
						}
					}
					blocosNivel[i].y = auxConta+21.25;

					var aux = 0;
					for (var j = 0; j < blocosNivel.length; j++) {
						if(blocosNivel[j]!=null && i!=j){
							if(blocosNivel[j].colisionBoundingBox2(blocosNivel[i], ctx)){
								aux = 1;
								blocosNivel[i] = null;
								break;
							}
						}
					}
					if(aux==0){
						ctx.drawImage(construction[0].bloco2, blocosNivel[i].x, blocosNivel[i].y, 43.75, 2*42.5);
					}
					break;
				}
			}			
		}
	}
	else if(construction[0].lixoActive){
		for (var j = 0; j < blocosNivel.length; j++) {
			if(blocosNivel[j]!=null){
				if(blocosNivel[j].clickedBoundingBox2(ev, ctx)){
					blocosNivel[j] = null;
					break;
				}
			}
		}
	}
	else{
		//NADA
	}
}