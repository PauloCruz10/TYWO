"use strict";

class Functions {

	constructor(){};

	draw(ctx)
	{
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}


	clear(ctx)
	{
		ctx.clearRect(this.x, this.y, this.width, this.height);
	}	


	reset(ev, ctx)
	{
		this.clear(ctx);
		this.x = this.xIni;
		this.y = this.yIni;
		this.speed = this.speedIni;
	}

	pixelColision(spiritImg, ctx)
	{
		var xi1 = Math.floor(Math.max(this.x, spiritImg.x));
		var xi2 = Math.floor(Math.min(this.x + this.width, spiritImg.x + spiritImg.width));
		var yi1 = Math.floor(Math.max(this.y, spiritImg.y));
		var yi2 = Math.floor(Math.min(this.y + this.height, spiritImg.y + spiritImg.height));
		
		for (var y = yi1; y <= yi2; y++) {
			for (var x = xi1; x <= xi2; x++) {
				var xcl = Math.round(x - this.x);
				var ycl = Math.round(y - this.y);

				var pix = ycl * this.width + xcl;
				var cel = this.imgData.data[pix * 4 + 3];

				var txc1 = Math.round(x - spiritImg.x);
				var tyc1 = Math.round(y - spiritImg.y);

				var pix2 = tyc1 * spiritImg.width + txc1;
				var cel2 = spiritImg.imgData.data[pix2 * 4 + 3]; //+ 3 porque é onde se ve a opacidade

				if(cel == 255 && cel2 == 255){
					return true;
				}
			}
		}
		return false;
	}

	colisionBoundingBox(spiritImg, ctx)
	{
		if ( this.x < spiritImg.x + spiritImg.width &&
			this.x + this.width > spiritImg.x &&
            this.y < spiritImg.y + spiritImg.height &&
            this.y + this.height > spiritImg.y){
			return this.pixelColision(spiritImg, ctx);
			//return true;
		}
		else{
			return false;
		}
	}

	colisionBoundingBox2(spiritImg, ctx)
	{
		if ( this.x < spiritImg.x + spiritImg.width &&
			this.x + this.width > spiritImg.x &&
            this.y < spiritImg.y + spiritImg.height &&
            this.y + this.height > spiritImg.y){
			return true;
		}
		else{
			return false;
		}
	}

	colisionBoarderBox(boarder, ctx)
	{
		if(this.x<0){
			return true;
		}
		else if(this.x>boarder.cw - this.width){
			return true;
		}
		else if(this.y<0){
			return true;
		}
		else if(this.y>boarder.ch - this.height - 75){
			return true;
		}
		else{
			return false;
		}
	}

	colisionBoarderMultiplayer(spiritImg, ctx)
	{
		if (this.x < spiritImg.blocoMultiplayerL.x + spiritImg.blocoMultiplayerL.width &&
			this.x + this.width > spiritImg.blocoMultiplayerL.x &&
            this.y < spiritImg.blocoMultiplayerL.y + spiritImg.blocoMultiplayerL.height &&
            this.y + this.height > spiritImg.blocoMultiplayerL.y){
			return true;
		}
		else if(this.x < spiritImg.blocoMultiplayerD.x + spiritImg.blocoMultiplayerD.width &&
			this.x + this.width > spiritImg.blocoMultiplayerD.x &&
            this.y < spiritImg.blocoMultiplayerD.y + spiritImg.blocoMultiplayerD.height &&
            this.y + this.height > spiritImg.blocoMultiplayerD.y){
			return true;
		}
		else{
			return false;
		}
	}

	mouseOverBoundingBox(ev,ctx) //ev.target é a canvas
	{
		var mx = ev.offsetX;  //mx, my = mouseX, mouseY na canvas
		var my = ev.offsetY;

		if (mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height)
			return this.mouseOverPixel(ev, ctx);
		else
			return false;
	}

	mouseOverPixel(ev, ctx) //ev.target é a canvas
	{
		var mx = ev.offsetX;  //mx, my = mouseX, mouseY na canvas
		var my = ev.offsetY;
		var imgData = ctx.getImageData(mx, my, 1, 1);
		//imageData vai ter 3 parametros, width, height e data que representa um pixel com RGBA

		if (imgData.data[3]!=0)
			return true;
		else
			return false;
	}

	clickedBoundingBox(ev, ctx) //ev.target é a canvas
	{
		if (!this.clickable)
			return false;
		else
			return this.mouseOverBoundingBox(ev, ctx);
	}

	clickedBoundingBox2(ev, ctx) //ev.target é a canvas
	{
		var mx = ev.offsetX;  //mx, my = mouseX, mouseY na canvas
		var my = ev.offsetY;

		if (mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height){
			return true;
		}
		else{
			return false;
		}
	}

}

class Character extends Functions
{
	constructor(x, y, w, h, speed, direcao, img)
	{
		super();
		//posição e movimento
		this.xIni = x;
		this.yIni = y;
		this.speedIni = speed;
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.speed = speed;
		this.direcao = direcao;

		//imagem
		this.img = img;
		this.imgData;
		this.right = false;
		this.left = false;
		this.top = false;
		this.bottom = false;
		this.space = false;

		var g_cv = document.createElement("canvas");
        g_cv.width = this.width;
        g_cv.height = this.height;
        var g_ctx = g_cv.getContext("2d");
        g_ctx.drawImage(this.img, 0, 0, this.width, this.height);

        this.imgData = g_ctx.getImageData(0, 0, this.width, this.height);
	}
}

class Heroi extends Character
{
    constructor(x, y, w, h, speed, direcao, img)
    {
        super(x, y, w, h, speed, direcao, img);
        //falta meter vidas e vida
        this.vida;
        this.vidas;
        this.mortes;
        this.gameover;
        this.minutos;
        this.segundos;
        this.pontuacao;
        this.paused;
        this.win;
        this.help;
    }
} 

class Zombie extends Character
{
    constructor(x, y, w, h, speed, direcao, img, modo)
    {
    	if(modo=="s"){
    		super(x, y, w, h, speed, direcao, img);
	        this.vida;
	    	this.contador = Math.floor((Math.random() * 100)+100);
	        this.perseguicao = Math.floor((Math.random() * 30)+30);
	        this.direcao = "D";
	        this.raioPreseguicao = 200;
    	}
    	else{
    		super(x, y, w, h, speed, direcao, img);
	        this.vida;
	    	this.contador = 30;
	        this.perseguicao = 1;
	        var componente = Math.random();
			if(componente >=0.25 && componente <=0.5){
				this.direcao = "T";
			}
			else if(componente>0.5 && componente < 0.75){
				this.direcao = "F";
			}
			else if(componente>0.75){
				this.direcao = "E";
			}
			else{
				this.direcao = "D";
			}
	        this.raioPreseguicao = 100;
    	}

    }
    //funcao de verificacao de proximidade
    verificaProximidade(heroi){
    	var zombx = this.x;
    	var zomby = this.y;
    	var herx = heroi.x;
    	var hery = heroi.y;
    	var distancia = Math.round(Math.sqrt(Math.pow((zombx-herx),2)+Math.pow((zomby - hery),2)));
    	if(distancia <=this.raioPreseguicao){
           	//console.log("estou perto");
    		return true;
    	}
        else{
            //console.log("ja nao estou perto\n");
            return false;
        }
    }
}

class Bala extends Character
{
    constructor(x, y, w, h, speed, direcao, img)
    {
        super(x, y, w, h, speed, direcao, img);
        this.ativa;
        this.dano = 50;
        //falta meter vida
    }
}

class Pocao extends Character
{
    constructor(x, y, w, h, speed, direcao, img)
    {
        super(x, y, w, h, speed, direcao, img);
    }
}

class Botao extends Functions{
    constructor(cw, ch, x, y, width, height, img)
    {
    	super();
        this.cw = cw;
        this.clickable;
        this.ch = ch;
        this.x = x;
        this.y = y;
        this.img = img;
        this.width = width;
        this.height = height;
    }

}

class Bloco extends Functions{

    constructor(img, width, height) {
    	super();
	    this.img = img;
	    this.width = width;
	    this.height = height;
	    this.x;
	    this.y;
	    this.imgName;

	    if(this.img!=null){
		    var g_cv = document.createElement("canvas");
	        g_cv.width = this.width;
	        g_cv.height = this.height;
	        var g_ctx = g_cv.getContext("2d");
	        g_ctx.drawImage(this.img, 0, 0, this.width, this.height);
        	this.imgData = g_ctx.getImageData(0, 0, this.width, this.height);
        }   
    }
}

class Construction extends Functions{

	constructor(cw, ch) {
		super();
        this.cw = cw;
        this.ch = ch;
        this.bloco;
        this.blocoActive;
        this.bloco2;
        this.bloco2Active;
        this.bloco3;
        this.bloco3Active;
        this.flag;
        this.flagActive;
        this.lixo;
        this.lixoActive;
    }
}

class Player {
	constructor(pontuacao, niveis, playerName){
		this.pontuacaoAux = pontuacao;
		this.niveisPassados = niveis;
		this.playerName = playerName;
		this.nivelAtual;
	}
}

class Variables {
	constructor(){
		this.controlaSpaceBala;
		this.contaBalasAtivas;
		this.tIni;
		this.tempoPocao;
		this.tempoZombies;
		this.tempoIntervaloPocoes;
		this.tempoIntervaloZombies;
		this.tamanhoHeroi;
		this.tamanhoZombie;
		this.tamanhoPocao;
		this.larguraBoarder;
	}
}

class Board  extends Functions{

    constructor(cw, ch, largura, img) {
    	super();
        this.cw = cw;
        this.ch = ch;
        this.largura = largura;
        this.img = img; //horizontal baixo (boarder)
        this.img2; //verticais meio do jogo (modo multiplayer)
        this.img3; //vertical baixo (boarder)

        //Parte do multiplayer
        this.blocoMultiplayerD;
        this.blocoMultiplayerL;

        //FLAG nivel criado
        this.nivelCriado;

        //FLAG NIVEL
        this.flagNivel = 1;

		this.bloco;
		this.parede3;
		this.bloco2;
		this.flag;
        this.blocosNivel; //array que vai ter o nivel a ser jogado
        this.auxn1;
    }

    sobrevivencia(ctx) {
    	ctx.drawImage(this.img, 0, this.ch - this.largura, 140, 30);
    	ctx.drawImage(this.img, 140, this.ch - this.largura, 140, 30);
    	ctx.drawImage(this.img, 280, this.ch - this.largura, 140, 30);
    	ctx.drawImage(this.img, 420, this.ch - this.largura, 140, 30);
    	ctx.drawImage(this.img, 560, this.ch - this.largura, 140, 30);
    	ctx.drawImage(this.img2, 50, this.ch - this.largura + 30, 30, 140);
    	ctx.drawImage(this.img2, 230, this.ch - this.largura + 30, 35, 140);
    	ctx.drawImage(this.img2, 422, this.ch - this.largura + 30, 35, 140);
    	ctx.drawImage(this.img2, 620, this.ch - this.largura + 30, 30, 140);
    }

    multiplayer(ctx) {
		this.sobrevivencia(ctx);

    	ctx.drawImage(this.img3, 110, this.ch/2-100, this.img3.naturalWidth/2, this.img3.naturalHeight);
    	this.blocoMultiplayerL = new Bloco(this.img3, this.img3.naturalWidth/2, this.img3.naturalHeight);
		ctx.drawImage(this.img3, this.cw-140, this.ch/2-100, this.img3.naturalWidth/2, this.img3.naturalHeight);
		this.blocoMultiplayerD = new Bloco(this.img3, this.img3.naturalWidth/2, this.img3.naturalHeight);

		this.blocoMultiplayerL.x = 110;
		this.blocoMultiplayerL.y = this.ch/2-100;
		this.blocoMultiplayerD.x = this.cw-140;
		this.blocoMultiplayerD.y = this.ch/2-100;
    }

    uploadNivel(ctx){
    	var arrayNames = JSON.parse(localStorage.getItem("arrayNames"));
		for (var i = 0; i < arrayNames.length; i++) {
			if(arrayNames[i]!=null && arrayNames[i].playerName == localStorage.getItem("playerName")){
				var playerAux = arrayNames[i];
				break;
			}
		}

    	var name = playerAux.nivelAtual;
    	if(name != "Level 1" && name != "Level 2" && name != "Level 3" && name != "Level 4" && name != "Level 5"){
    		this.nivelCriado = true;
    		var blocosNivelAux = JSON.parse(localStorage.getItem(name));
    		this.blocosNivel = new Array(blocosNivelAux.length);
			for (var i = 0; i < this.blocosNivel.length; i++) {
				if(blocosNivelAux[i]!=null){
					var img = new Image();
					if(blocosNivelAux[i].imgName == "bloco"){
						img.src = "../resources/bloco.png";
						this.blocosNivel[i] = new Bloco(img, 43.75, 42.5);
						this.blocosNivel[i].imgName = "bloco";
						this.blocosNivel[i].x = blocosNivelAux[i].x;
						this.blocosNivel[i].y = blocosNivelAux[i].y;
					}
					if(blocosNivelAux[i].imgName == "parede3"){
						img.src = "../resources/parede3.png";
						this.blocosNivel[i] = new Bloco(img, 43.75, 2*42.5);
						this.blocosNivel[i].imgName = "parede3";
						this.blocosNivel[i].x = blocosNivelAux[i].x;
						this.blocosNivel[i].y = blocosNivelAux[i].y;
					}
					if(blocosNivelAux[i].imgName == "bloco2"){
						img.src = "../resources/bloco2.png";
						this.blocosNivel[i] = new Bloco(img, 2*43.75, 42.5);
						this.blocosNivel[i].imgName = "bloco2";
						this.blocosNivel[i].x = blocosNivelAux[i].x;
						this.blocosNivel[i].y = blocosNivelAux[i].y;
					}
					if(blocosNivelAux[i].imgName == "flag"){
						img.src = "../resources/flag.png";
						this.blocosNivel[i] = new Bloco(img, 43.75/2, 42.5/2);
						this.blocosNivel[i].imgName = "flag";
						this.blocosNivel[i].x = blocosNivelAux[i].x;
						this.blocosNivel[i].y = blocosNivelAux[i].y;
					}
				}
			}
    	}
    	else{
    		this.nivelCriado = false;
    		if(name == "Level 1"){
    			this.nivel1(ctx);
    		}
    		else if(name == "Level 2"){
    			this.nivel2(ctx);
    		}
    		else if(name == "Level 3"){
    			this.nivel3(ctx);
    		}
        	else if(name == "Level 4"){
        		this.nivel4(ctx);
    		}
        	else{
        		this.nivel5(ctx);
    		}
    	}
    }

	nivelAux(ctx,blocos) {
    	this.sobrevivencia(ctx);
    	for (var i = 0; i < blocos.length; i++) {
			if(blocos[i]!=null){
				blocos[i].draw(ctx);
			}
		}
    }

    retornaTamanho(imgName){
    	var tamanho = Array(2);
    	if(imgName=="bloco"){
    		tamanho[0] = 43.75;
    		tamanho[1] = 42.5;
    	}
    	else if(imgName=="parede3"){
    		tamanho[0] = 43.75;
    		tamanho[1] = 2*42.5;

    	}
    	else if(imgName=="bloco2"){
    		tamanho[0] = 2*43.75;
    		tamanho[1] = 42.5;
    	}
    	else{
    		tamanho[0] = 43.75/2;
    		tamanho[1] =  42.5/2;
    	}
    	return tamanho;
    }

    desenhaFilaBlocosVerticalB(xinici,yinici,img,numero,arrayBlocos,imgName){
    	var tamanho = this.retornaTamanho(imgName);
    	for(var i=0;i<numero;i++){
    		arrayBlocos[this.auxn1] = new Bloco(img, tamanho[0], tamanho[1]);
    		arrayBlocos[this.auxn1].x = xinici;
    		arrayBlocos[this.auxn1].y = yinici;
    		arrayBlocos[this.auxn1].imgName = imgName;
    		yinici += tamanho[1];
    		this.auxn1++;
    	}
    	return yinici;
    }

    desenhaFilaBlocosHorizontalD(xinici,yinici,img,numero,arrayBlocos,imgName){
    	var tamanho = this.retornaTamanho(imgName);
    	for (var i = 0; i < numero; i++) {
    		arrayBlocos[this.auxn1] = new Bloco(img, tamanho[0], tamanho[1]);
    		arrayBlocos[this.auxn1].x = xinici;
    		arrayBlocos[this.auxn1].y = yinici;
    		arrayBlocos[this.auxn1].imgName = imgName;
			xinici +=tamanho[0];
			this.auxn1++;
    	}
    	return xinici;
    }

    desenhaFilaBlocosVerticalC(xinici,yinici,img,numero,arrayBlocos,imgName){
    	var tamanho = this.retornaTamanho(imgName);
    	for(var i=0;i<numero;i++){
    		arrayBlocos[this.auxn1] = new Bloco(img, tamanho[0], tamanho[1]);
    		arrayBlocos[this.auxn1].x = xinici;
    		arrayBlocos[this.auxn1].y = yinici;
    		arrayBlocos[this.auxn1].imgName =imgName;
    		yinici-= tamanho[1];
    		this.auxn1++;
    	}
    	return yinici;
    }

    desenhaFilaBlocosHorizontalE(xinici,yinici,img,numero,arrayBlocos,imgName){
    	var tamanho = this.retornaTamanho(imgName);
    	for (var i = 0; i < numero; i++) {
    		arrayBlocos[this.auxn1] = new Bloco(img, tamanho[0], tamanho[1]);
    		arrayBlocos[this.auxn1].x = xinici;
    		arrayBlocos[this.auxn1].y = yinici;
    		arrayBlocos[this.auxn1].imgName = imgName;
			xinici-=tamanho[0];
			this.auxn1++;
    	}
    	return xinici;
    }

    nivel1(ctx) {
    	var y,yaux;;
    	var x;
    	var i = 0;
    	var imgHorizontal = this.bloco;
    	var imgVertical= this.bloco;
    	var imgMeta =  this.flag;

    	this.blocosNivel = new Array(27);
    	this.auxn1 = 0;
    	var alturaBloco = 42.5;
    	var name = "bloco";
    	//this.sobrevivencia(ctx);

    	//construcao do nivel1
		x = 80;
		y = alturaBloco;
		x = this.desenhaFilaBlocosHorizontalD(x,y,imgHorizontal,2,this.blocosNivel,name);
		x+=3*alturaBloco;
		x = this.desenhaFilaBlocosHorizontalD(x,y,imgHorizontal,2,this.blocosNivel,name);
		yaux = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,2,this.blocosNivel,name);
		x+=3*alturaBloco;
		x = this.desenhaFilaBlocosHorizontalD(x,y,imgHorizontal,2,this.blocosNivel,name);
		x = 80;
		y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,4,this.blocosNivel,name);
		y-=alturaBloco;
		x+=3*alturaBloco;
		x = this.desenhaFilaBlocosHorizontalD(x,y,imgHorizontal,2,this.blocosNivel,name);
		y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,2,this.blocosNivel,name);
		yaux = y;
		
		x = this.desenhaFilaBlocosHorizontalD(x,y,imgHorizontal,2,this.blocosNivel,name);
		x+=3*alturaBloco;
		y = this.desenhaFilaBlocosVerticalC(x,y,imgVertical,2,this.blocosNivel,name);

		x = this.desenhaFilaBlocosHorizontalE(x,y,imgHorizontal,2,this.blocosNivel,name);
		x = 80;
		y = yaux+ alturaBloco;
		x = this.desenhaFilaBlocosHorizontalD(x,y,imgHorizontal,3,this.blocosNivel,name);
		x+= 4*alturaBloco;
		y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,2,this.blocosNivel,name);

		//flag
		name = "flag";
		x = this.desenhaFilaBlocosHorizontalD(9*43.75,6*42.5 + 42.5/2,imgMeta,1,this.blocosNivel,name);

    }

    nivel2(ctx){
    	var y,yaux,xaux;
    	var x;
    	var i = 0;
    	var imgHorizontal = this.bloco;
    	var imgVertical= this.bloco;
    	var imgMeta =  this.flag;
    	this.nblocosNivel = 24;
    	this.blocosNivel = new Array(38);
    	var alturaBloco = 42.5;
    	this.auxn1 = 0;
    	var name = "bloco";
    	var tamanhos = this.retornaTamanho(name);
    	x = 50;
    	y = alturaBloco;
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,1,this.blocosNivel,name);
    	x+=tamanhos[0];
    	x = this.desenhaFilaBlocosHorizontalD(x,y,imgHorizontal,2,this.blocosNivel,name);
    	xaux = x;
    	x = 50;
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,3,this.blocosNivel,name);
    	yaux = y + tamanhos[1];
    	x = this.desenhaFilaBlocosHorizontalD(xaux,yaux,imgHorizontal,2,this.blocosNivel,name);
    	y += 2*tamanhos[1];
    	x-= 2*tamanhos[0];
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,3,this.blocosNivel,name);
    	y -= 3*tamanhos[1];
    	x-= tamanhos[0];
    	x = this.desenhaFilaBlocosHorizontalE(x,y,imgHorizontal,2,this.blocosNivel,name);
    	x  = 50 + 6*tamanhos[0];
    	y = 0;
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,4,this.blocosNivel,name);
    	x = this.desenhaFilaBlocosHorizontalD(x,y,imgHorizontal,2,this.blocosNivel,name);
    	x -= tamanhos[0];
    	xaux = x;
    	y +=3*tamanhos[1];
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,1,this.blocosNivel,name);
    	x = this.desenhaFilaBlocosHorizontalD(x,y,imgHorizontal,4,this.blocosNivel,name);
    	y += tamanhos[1];
    	x = this.desenhaFilaBlocosHorizontalD(x,y,imgHorizontal,1,this.blocosNivel,name);
    	x = xaux + 3* tamanhos[0];
    	y = 0;
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,1,this.blocosNivel,name);
    	xaux = x;
    	y +=tamanhos[1];
    	x = this.desenhaFilaBlocosHorizontalD(x,y,imgHorizontal,5,this.blocosNivel,name);
    	y = this.desenhaFilaBlocosVerticalB(xaux,y+ tamanhos[1],imgVertical,2,this.blocosNivel,name);
    	x = xaux;
    	x = this.desenhaFilaBlocosHorizontalD(x+2*tamanhos[0],y,imgHorizontal,1,this.blocosNivel,name);
    	//x = this.desenhaFilaBlocosHorizontalD(x+3*tamanhos[0],y,imgMeta,1,this.blocosNivel,"flag");
    	y += tamanhos[1];
    	x -= tamanhos[0];
    	x = this.desenhaFilaBlocosHorizontalD(x,y,imgHorizontal,3,this.blocosNivel,name);
    	
		//flag
		name = "flag";
		x = this.desenhaFilaBlocosHorizontalD(14*43.75,1*42.5 + 42.5/2,imgMeta,1,this.blocosNivel,name);

    }

    nivel3(ctx){
    	var y,yaux,xaux;
    	var x;
    	var i = 0;
    	var imgHorizontal = this.bloco;
    	var imgVertical= this.bloco;
    	var imgMeta =  this.flag;
    	this.nblocosNivel = 24;
    	this.blocosNivel = new Array(50);
    	var alturaBloco = 42.5;
    	this.auxn1 = 0;
    	var name = "bloco";
    	var tamanhos = this.retornaTamanho(name);
    	y = 0;
    	x = tamanhos[0];
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,2,this.blocosNivel,name);
    	x+= tamanhos[0];
    	x =this.desenhaFilaBlocosHorizontalD(x,y,imgVertical,1,this.blocosNivel,name);
    	y-=tamanhos[1];
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,2,this.blocosNivel,name);
    	y-=tamanhos[1];
    	x+= tamanhos[0];
    	yaux = y;
    	x =this.desenhaFilaBlocosHorizontalD(x,y,imgVertical,2,this.blocosNivel,name);
    	x += 3*tamanhos[0];
    	x =this.desenhaFilaBlocosHorizontalD(x,y,imgVertical,1,this.blocosNivel,name);
    	x-=2*tamanhos[0];
    	y+=tamanhos[1];
    	x =this.desenhaFilaBlocosHorizontalD(x,y,imgVertical,3,this.blocosNivel,name);
    	x-=2*tamanhos[0];
    	y+=tamanhos[1];
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,1,this.blocosNivel,name);
    	x =this.desenhaFilaBlocosHorizontalD(x,y,imgVertical,1,this.blocosNivel,name);
    	x = this.desenhaFilaBlocosHorizontalD(x + 42.5/2,y + 42.5/2,imgMeta,1,this.blocosNivel,"flag");
    	x =this.desenhaFilaBlocosHorizontalD(x,y,imgVertical,1,this.blocosNivel,name);
    	x -=5*tamanhos[0];
    	y += tamanhos[1];
    	x =this.desenhaFilaBlocosHorizontalD(x,y,imgVertical,5,this.blocosNivel,name);
    	x-= 3*tamanhos[0];
    	y+=tamanhos[1];
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,2,this.blocosNivel,name);
    	x+=4*tamanhos[0];
    	y = 0;
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,3,this.blocosNivel,name);
    	y = this.desenhaFilaBlocosVerticalB(x,y+tamanhos[1],imgVertical,2,this.blocosNivel,name);
    	y = this.desenhaFilaBlocosVerticalB(x,y+tamanhos[1],imgVertical,3,this.blocosNivel,name);
    	x = tamanhos[0];
    	y = this.desenhaFilaBlocosVerticalB(x,yaux,imgVertical,4,this.blocosNivel,name);
    	x =this.desenhaFilaBlocosHorizontalD(x,y,imgVertical,4,this.blocosNivel,name);
    	y = this.desenhaFilaBlocosVerticalB(x-2*tamanhos[0],y+tamanhos[1],imgVertical,2,this.blocosNivel,name);
    }
    nivel4(ctx){
    	var y,yaux,xaux;
    	var x;
    	var i = 0;
    	var imgHorizontal = this.bloco;
    	var imgVertical= this.bloco;
    	var imgMeta =  this.flag;
    	var parede = this.parede3;
    	var bloco2 = this.bloco2;
    	this.nblocosNivel = 24;
    	this.blocosNivel = new Array(50);
    	var alturaBloco = 42.5;
    	this.auxn1 = 0;
    	var name = "bloco";
    	var tamanhos = this.retornaTamanho("bloco");
    	var tamanhosParede = this.retornaTamanho("parede3");
    	var tamanhosBlocos2 = this.retornaTamanho("blocos2");
    	x = tamanhos[0];
    	y = 0;
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,3,this.blocosNivel,name);
    	x =this.desenhaFilaBlocosHorizontalD(0,y+2*tamanhos[1],imgVertical,2,this.blocosNivel,name);
    	y = 0 + 2*tamanhos[0];
    	x = x+tamanhos[0];
    	y = this.desenhaFilaBlocosVerticalB(x,y,parede,1,this.blocosNivel,"parede3");
    	xaux = x;
    	y = y-tamanhosParede[1]/2;
    	x = this.desenhaFilaBlocosHorizontalD(x+tamanhosParede[0],y,bloco2,1,this.blocosNivel,"bloco2");
    	x-=tamanhos[0];
    	y+=tamanhos[1];
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,1,this.blocosNivel,name);
    	x = this.desenhaFilaBlocosHorizontalE(x-42.5/1.4,y-42.5/2,imgMeta,1,this.blocosNivel,"flag");
    	y = this.desenhaFilaBlocosVerticalB(xaux,y-tamanhos[1],parede,2,this.blocosNivel,"parede3");
    	y = y-tamanhosParede[1]/2;
    	x = this.desenhaFilaBlocosHorizontalD(xaux+tamanhosParede[0],y,bloco2,2,this.blocosNivel,"bloco2");
    	x-=tamanhos[0];
    	y+=tamanhos[1];
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,1,this.blocosNivel,name);
    	x +=tamanhos[0];
    	y = 0 + 2*tamanhos[1];
    	yaux = y;
    	y = this.desenhaFilaBlocosVerticalB(x,y,parede,1,this.blocosNivel,"parede3");
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,1,this.blocosNivel,name);
    	y = yaux-tamanhos[1];
    	x+=tamanhos[0];
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,1,this.blocosNivel,name);
    	x =this.desenhaFilaBlocosHorizontalD(x,y,imgVertical,3,this.blocosNivel,name);
    	y = this.desenhaFilaBlocosVerticalB(x,y,parede,1,this.blocosNivel,"parede3");
    	x = this.desenhaFilaBlocosHorizontalD(x,y,bloco2,1,this.blocosNivel,"bloco2");
    	y+=2*tamanhos[1];
    	x-= 4*tamanhos[0];
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,1,this.blocosNivel,name);
    	x = this.desenhaFilaBlocosHorizontalD(x,y,bloco2,1,this.blocosNivel,"bloco2");
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,1,this.blocosNivel,name);
    	y = this.desenhaFilaBlocosVerticalB(x,y,parede,1,this.blocosNivel,"parede3");

    }
    nivel5(ctx){
    	var y,yaux,xaux;
    	var x;
    	var i = 0;
    	var imgHorizontal = this.bloco;
    	var imgVertical= this.bloco;
    	var imgMeta =  this.flag;
    	var parede = this.parede3;
    	var bloco2 = this.bloco2;
    	this.nblocosNivel = 24;
    	this.blocosNivel = new Array(50);
    	var alturaBloco = 42.5;
    	this.auxn1 = 0;
    	var name = "bloco";
    	var tamanhos = this.retornaTamanho("bloco");
    	var tamanhosParede = this.retornaTamanho("parede3");
    	var tamanhosBlocos2 = this.retornaTamanho("blocos2");
    	y = 3*tamanhos[0];
    	x = 0;
    	x = this.desenhaFilaBlocosHorizontalD(x,y,bloco2,1,this.blocosNivel,"bloco2");
    	x-=2*tamanhosBlocos2[0];
    	y+=tamanhos[1];
    	y = this.desenhaFilaBlocosVerticalB(x,y,parede,2,this.blocosNivel,"parede3");
    	x+=tamanhos[0];
    	y-=tamanhos[1];
    	x =this.desenhaFilaBlocosHorizontalD(x,y,imgVertical,2,this.blocosNivel,name);
    	y = tamanhos[1];
    	x-=tamanhos[0];
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,2,this.blocosNivel,name);
    	y = 0;
    	x+=2*tamanhos[0];
    	y = this.desenhaFilaBlocosVerticalB(x,y,parede,2,this.blocosNivel,"parede3");
    	y -=tamanhos[1];
    	x+=tamanhos[0];
    	xaux = x;
    	yaux = y+ 5*tamanhos[1];
    	x =this.desenhaFilaBlocosHorizontalD(x,y,imgVertical,1,this.blocosNivel,name);
    	x-=2*tamanhos[0];
    	y-=tamanhos[1];
    	x = this.desenhaFilaBlocosHorizontalD(x+1.5*42.5,y+42.5/2,imgMeta,1,this.blocosNivel,"flag");
    	x =this.desenhaFilaBlocosHorizontalD(x,y,imgVertical,1,this.blocosNivel,name);
    	y = this.desenhaFilaBlocosVerticalC(x,y-tamanhos[1],imgVertical,1,this.blocosNivel,name);
    	y = this.desenhaFilaBlocosVerticalB(xaux,yaux,parede,1,this.blocosNivel,"parede3");
    	x +=3*tamanhos[0];
    	y = 2*tamanhos[1];
    	y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,1,this.blocosNivel,name);
    	x =this.desenhaFilaBlocosHorizontalD(x,y,imgVertical,3,this.blocosNivel,name);
    	x-= 3*tamanhos[0];
    	y = this.desenhaFilaBlocosVerticalB(x,y+tamanhos[1],parede,2,this.blocosNivel,"parede3");
    	y -=tamanhos[1];
		x =this.desenhaFilaBlocosHorizontalE(x-tamanhos[0],y,imgVertical,2,this.blocosNivel,name);
		x+=6*tamanhos[0];
		y-=tamanhos[1];
		y = this.desenhaFilaBlocosVerticalB(x,y,parede,1,this.blocosNivel,"parede3");
		x-=tamanhos[0];
		y = this.desenhaFilaBlocosVerticalB(x,y,imgVertical,1,this.blocosNivel,name);

    }
}