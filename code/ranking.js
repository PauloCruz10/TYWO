"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main() {

	var soundBtn = document.getElementById("soundBtn");
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

function swapText(){
	var escolha = document.getElementById("select").value;

	if(escolha == "rankingS"){
		var arrayRank = JSON.parse(localStorage.getItem("arrayRankS"));
		var temp;
		if(arrayRank!=null){
			for (i = 0; i < 10; i++) {
				document.getElementById("name"+(i+1)).innerHTML = "";
				document.getElementById("points"+(i+1)).innerHTML = "";
			}
			for (var i = 0; i < 10; i++){
				if(arrayRank[i]!=null){
					var aux = arrayRank[i].split(":"); //vou ter nome e pontos
					document.getElementById("name"+(i+1)).innerHTML = aux[0];
					document.getElementById("points"+(i+1)).innerHTML = aux[1];
				}
			}
		}
		else{
 			for (i = 0; i < 10; i++) {
				document.getElementById("name"+(i+1)).innerHTML = "";
				document.getElementById("points"+(i+1)).innerHTML = "";
			}
		}

	}
	else if(escolha == "rankingC"){
		var arrayRank = JSON.parse(localStorage.getItem("arrayRankC"));
		var temp;
		if(arrayRank!=null){
			for (i = 0; i < 10; i++) {
				document.getElementById("name"+(i+1)).innerHTML = "";
				document.getElementById("points"+(i+1)).innerHTML = "";
			}
			for (var i = 0; i < 10; i++) {
				if(arrayRank[i]!=null){
					var aux = arrayRank[i].split(":"); //vou ter nome e pontos
					document.getElementById("name"+(i+1)).innerHTML = aux[0];
					document.getElementById("points"+(i+1)).innerHTML = aux[1];
				}
			}
		}
		else{
			for (i = 0; i < 10; i++) {
				document.getElementById("name"+(i+1)).innerHTML = "";
				document.getElementById("points"+(i+1)).innerHTML = "";
			}
		}
	}
	else{
		for (i = 0; i < 10; i++) {
			document.getElementById("name"+(i+1)).innerHTML = "";
			document.getElementById("points"+(i+1)).innerHTML = "";
		}
	}
}

function allButtonsHandler(ev){
	var name = ev.currentTarget.id;
	var mainWindow = window.parent;
	switch(name){
		case "backBtn":
			mainWindow.postMessage("Ranking-Menu", "*");
			break;
	}
}