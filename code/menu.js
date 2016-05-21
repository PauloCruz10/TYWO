"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main() {

	var soundBtn = document.getElementById("soundBtn");
	var play = document.getElementById("play");
	var credits = document.getElementById("credits");
	var help = document.getElementById("help");
	var options = document.getElementById("options");
	var ranking = document.getElementById("ranking");
	var som = window.parent.document.getElementsByTagName("audio")[0];

	//VERIFICACAO

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

	play.addEventListener("click", nbch);
	credits.addEventListener("click", nbch);
	help.addEventListener("click", nbch);
	options.addEventListener("click", nbch);
	ranking.addEventListener("click", nbch);
	
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
		case "play":
			mainWindow.postMessage("Menu-Play", "*");
			break;
		case "credits":
			mainWindow.postMessage("Menu-Credits", "*");
			break;
		case "help":
			mainWindow.postMessage("Menu-Help", "*");
			break;
		case "options":
			mainWindow.postMessage("Menu-Options", "*");
			break;
		case "ranking":
			mainWindow.postMessage("Menu-Ranking", "*");
			break;
	}
}