"use strict";

(function()
{	
	window.addEventListener("load", main);
}());


function main()
{
	window.addEventListener("message", messageHandler);
    var som = document.getElementsByTagName("audio")[0];
    som.play();

    localStorage.setItem("gameMusic", "Linkin Park - In the end");

    //localStorage.clear();

	showPage("html/menu.html");
}

function showPage(page)
{
	//carregar página na frame e enviar mensagem para a página logo que esteja carregada (frameLoadHandler)
	var frm = document.getElementsByTagName("iframe")[0];
	frm.src = page;

}

function hidePage(page)  //não é necessário (excepto se páginas diferentes tivessem zonas de navegação diferentes)
{
	var frm = document.getElementsByTagName("iframe")[0];
	frm.src = page;
}

function messageHandler(ev)
{
	var pag = ev.data;
	console.log(pag);

	switch(pag){
		case "Menu-Options":
			hidePage("html/menu.html");
			showPage("html/opçoes.html");
			break;
		case "Options-Menu":
			hidePage("html/opçoes.html");
			showPage("html/menu.html");
			break;
        case "Menu-Help":
            hidePage("html/menu.html");
            showPage("html/ajuda.html");
            break;
        case "Help-Menu":
            hidePage("html/ajuda.html");
            showPage("html/menu.html");
            break;
        case "Menu-Credits":
            hidePage("html/menu.html");
            showPage("html/creditos.html");
            break;
        case "Credits-Menu":
            hidePage("html/creditos.html");
            showPage("html/menu.html");
            break;
        case "Menu-Play":
            hidePage("html/menu.html");
            showPage("html/jogar.html");
            break;
        case "Play-Menu":
            hidePage("html/jogar.html");
            showPage("html/menu.html");
            break;
        case "Menu-Ranking":
            hidePage("html/menu.html");
            showPage("html/ranking.html");
            break;
        case "Ranking-Menu":
            hidePage("html/ranking.html");
            showPage("html/menu.html");
            break;

            
        case "Play-EscolhaS":
            hidePage("html/jogar.html");
            showPage("html/escolhaPersonagemS.html");
            break;
        case "EscolhaS-Play":
            hidePage("html/escolhaPersonagemS.html");
            showPage("html/jogar.html");
            break;
        case "Play-PreEscolhaC":
            hidePage("html/jogar.html");
            showPage("html/preEscolhaPersonagemC.html");
            break;
        case "PreEscolhaC-EscolhaC":
            hidePage("html/preEscolhaPersonagemC.html");
            showPage("html/escolhaPersonagemC.html");
            break;
        case "EscolhaC-PreEscolhaC":
            hidePage("html/escolhaPersonagemC.html");
            showPage("html/preEscolhaPersonagemC.html");
            break;
        case "PreEscolhaC-Play":
            hidePage("html/preEscolhaPersonagemC.html");
            showPage("html/jogar.html");
            break;
        case "Character-Survival":
            hidePage("html/escolhaPersonagemS.html");
            showPage("html/sobrevivencia.html");
            break;
        case "Character-Campaign":
            hidePage("html/escolhaPersonagemC.html");
            showPage("html/campanha.html");
            break;
        case "Character-Multiplayer":
            hidePage("html/escolhaPersonagemM.html");
            showPage("html/multiplayer.html");
            break;
        case "Play-EscolhaM":
            hidePage("html/jogar.html");
            showPage("html/escolhaPersonagemM.html");
            break;
        case "EscolhaM-Play":
            hidePage("html/escolhaPersonagemM.html");
            showPage("html/jogar.html");
            break;  
        case "Multiplayer-Play":
            hidePage("html/multiplayer.html");
            showPage("html/jogar.html");
            break; 
        case "Survival-Play":
            hidePage("html/sobrevivencia.html");
            showPage("html/jogar.html");
            break;  
        case "Campaign-Play":
            hidePage("html/campanha.html");
            showPage("html/jogar.html");
            break;
        case "Play-ConstroiMapa":
            hidePage("html/jogar.html");
            showPage("html/construirMapas.html");
            break;
        case "ConstroiMapa-Play":
            hidePage("html/construirMapas.html");
            showPage("html/jogar.html");
            break; 
	}
}