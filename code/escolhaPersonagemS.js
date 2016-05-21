"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main() {

	var soundBtn = document.getElementById("soundBtn");
	var beginBtn = document.getElementById("beginBtn");
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

function swapImage(){
        var image = document.getElementById("characterImg");
        var escolha = document.getElementById("selectC").value;

        image.src = "../resources/" + escolha + "F.png";
}

function allButtonsHandler(ev){
	var name = ev.currentTarget.id;
	var mainWindow = window.parent;
	switch(name){
		case "backBtn":
			mainWindow.postMessage("EscolhaS-Play", "*");
			break;
		case "beginBtn":
			if(document.getElementById("playerName").value!=""){
				localStorage.setItem("playerName", document.getElementById("playerName").value);
				if(document.getElementById("selectC").value == "boneco"){
					localStorage.setItem("playerType", "boneco");
				}
				if(document.getElementById("selectC").value == "boneca"){
					localStorage.setItem("playerType", "boneca");
				}
				if(document.getElementById("selectC").value == "soldado"){
					localStorage.setItem("playerType", "soldado");
				}
				mainWindow.postMessage("Character-Survival", "*");
			}
			else{
				alert("Insert your name!");
			}
			break;
	}
}