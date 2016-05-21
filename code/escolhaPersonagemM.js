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

function swapImage1(){
        var image = document.getElementById("character1BtnImg");
        var escolha = document.getElementById("selectC1").value;

        image.src = "../resources/" + escolha + "F.png";
}

function swapImage2(){
        var image = document.getElementById("character2BtnImg");
        var escolha = document.getElementById("selectC2").value;

        image.src = "../resources/" + escolha + "F.png";
}

function allButtonsHandler(ev){
	var name = ev.currentTarget.id;
	var mainWindow = window.parent;
	switch(name){
		case "backBtn":
			mainWindow.postMessage("EscolhaM-Play", "*");
			break;
		case "beginBtn":
			if(document.getElementById("player1Name").value!="" && document.getElementById("player2Name").value!=""){
				localStorage.setItem("player1Name", document.getElementById("player1Name").value);
				localStorage.setItem("player2Name", document.getElementById("player2Name").value);
				if(document.getElementById("selectC1").value == "boneco"){
					localStorage.setItem("player1Type", "boneco");
				}
				if(document.getElementById("selectC1").value == "boneca"){
					localStorage.setItem("player1Type", "boneca");
				}
				if(document.getElementById("selectC1").value == "soldado"){
					localStorage.setItem("player1Type", "soldado");
				}
				if(document.getElementById("selectC1").value == "zombie"){
					localStorage.setItem("player1Type", "zombie");
				}
				if(document.getElementById("selectC2").value == "boneco"){
					localStorage.setItem("player2Type", "boneco");
				}
				if(document.getElementById("selectC2").value == "boneca"){
					localStorage.setItem("player2Type", "boneca");
				}
				if(document.getElementById("selectC2").value == "soldado"){
					localStorage.setItem("player2Type", "soldado");
				}
				if(document.getElementById("selectC2").value == "zombie"){
					localStorage.setItem("player2Type", "zombie");
				}
				mainWindow.postMessage("Character-Multiplayer", "*");
			}
			else{
				alert("Insert all the name players!");
			}
			break;
	}
}