"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main() {

	var soundBtn = document.getElementById("soundBtn");
	var sobrevivencia = document.getElementById("sobrevivencia");
	var multiplayer = document.getElementById("multiplayer");
	var constroiMapa = document.getElementById("constroiMapa");
	var campanha = document.getElementById("campanha");
	var backBtn = document.getElementById("backBtn");
	var som = window.parent.document.getElementsByTagName("audio")[0];

	var aux = soundBtn.firstChild;
	if(som.muted == true){
		aux.src = "../resources/soundOffBtn.png";
	}
	else{
		aux.src = "../resources/soundOnBtn.png";
	}

	var nbch = function(ev){
		allButtonsHandler(ev);
	}

	backBtn.addEventListener("click", nbch);
	sobrevivencia.addEventListener("click", nbch);
	campanha.addEventListener("click", nbch);
	multiplayer.addEventListener("click", nbch);
	constroiMapa.addEventListener("click", nbch);
	
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

}

function allButtonsHandler(ev){
	var name = ev.currentTarget.id;
	var mainWindow = window.parent;
	switch(name){
		case "backBtn":
			mainWindow.postMessage("Play-Menu", "*");
			break;
		case "sobrevivencia":
			mainWindow.postMessage("Play-EscolhaS", "*");
			break;
		case "campanha":
			mainWindow.postMessage("Play-PreEscolhaC", "*");
			break;
		case "multiplayer":
			mainWindow.postMessage("Play-EscolhaM", "*");
			break;
		case "constroiMapa":
			mainWindow.postMessage("Play-ConstroiMapa", "*");
			break;
	}
}