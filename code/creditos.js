"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main() {

	var soundBtn = document.getElementById("soundBtn");
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
			mainWindow.postMessage("Credits-Menu", "*");
			break;
	}
}