"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main() {

	var soundBtn = document.getElementById("soundBtn");
	var beginBtn = document.getElementById("beginBtn");
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
	beginBtn.addEventListener("click", nbch);	
	
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
			mainWindow.postMessage("PreEscolhaC-Play", "*");
			break;
		case "beginBtn":
			if(document.getElementById("playerName").value!=""){
				var arrayNames = JSON.parse(localStorage.getItem("arrayNames"));
				if(arrayNames != null){
					var aux = new Player(null,null,document.getElementById("playerName").value);
					arrayNames.push(aux);
					localStorage.setItem("arrayNames", JSON.stringify(arrayNames));
				}
				else{
					arrayNames = new Array();
					var aux = new Player(0,null,document.getElementById("playerName").value);
					arrayNames[0] = aux;
					localStorage.setItem("arrayNames", JSON.stringify(arrayNames));
				}
				localStorage.setItem("playerName", document.getElementById("playerName").value);
				mainWindow.postMessage("PreEscolhaC-EscolhaC", "*");
			}
			else{
				alert("Insert your name!");
			}
			break;
	}
}