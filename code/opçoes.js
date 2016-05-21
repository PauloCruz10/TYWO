"use strict";

(function()
{
	window.addEventListener("load", main);
}());

var som;

function main() {

	var soundBtn = document.getElementById("soundBtn");
	var volumemais = document.getElementById("volumemaisBtn");
	var volumemenos = document.getElementById("volumemenosBtn");
	var musicBack = document.getElementById("musicBackBtn");
	var musicFront = document.getElementById("musicFrontBtn");
	var backBtn = document.getElementById("backBtn");
	var volumeDif = document.getElementById("volumeDif");
	var som = window.parent.document.getElementsByTagName("audio")[0];

	var aux = soundBtn.firstChild;

	disabled(musicBack);

	if(som.muted == true){
		aux.src = "../resources/soundOffBtn.png";
	}
	else{
		aux.src = "../resources/soundOnBtn.png";
	}

	switch(som.volume){
		case 1:
			disabled(volumemais);
			volumeDif.src = "../resources/volumeMax.png";
			break;
		case 0.75:
			volumeDif.src = "../resources/volume3.png";
			break;
		case 0.5:
			volumeDif.src = "../resources/volume2.png";
			break;
		case 0.25:
			volumeDif.src = "../resources/volume1.png";
			break;	
		case 0:
			disabled(volumemenos);
			volumeDif.src = "../resources/volume0.png";
			break;	
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

	var soundLess = function(ev){
		var aux = soundBtn.firstChild;

		if(som.muted == true){
			som.muted = false;
			aux.src = "../resources/soundOnBtn.png";
		}

		switch(som.volume){
			case 1:
				enabled(volumemais);
				som.volume = 0.75;
				volumeDif.src = "../resources/volume3.png";
				break;
			case 0.75:
				som.volume = 0.5;
				volumeDif.src = "../resources/volume2.png";
				break;
			case 0.5:
				som.volume = 0.25;
				volumeDif.src = "../resources/volume1.png";
				break;
			case 0.25:
				disabled(volumemenos);
				som.volume = 0;
				som.muted = true;
				volumeDif.src = "../resources/volume0.png";
				aux.src = "../resources/soundOffBtn.png";
				break;	
		}
	}

	var soundPlus = function(ev){
		var aux = soundBtn.firstChild;

		if(som.muted == true){
			som.muted = false;
			aux.src = "../resources/soundOnBtn.png";
		}

		switch(som.volume){
			case 0:
				enabled(volumemenos);
				som.volume = 0.25;
				volumeDif.src = "../resources/volume1.png";
				aux.src = "../resources/soundOnBtn.png";
				break;
			case 0.25:
				som.volume = 0.5;
				volumeDif.src = "../resources/volume2.png";
				break;
			case 0.5:
				som.volume = 0.75;
				volumeDif.src = "../resources/volume3.png";
				break;
			case 0.75:
				disabled(volumemais);
				som.volume = 1;
				volumeDif.src = "../resources/volumeMax.png";
				break;	
		}
	}

	soundBtn.addEventListener("click", soundMute);
	volumemenos.addEventListener("click", soundLess);
	volumemais.addEventListener("click", soundPlus);

	var musicName = function(ev){
		var name = ev.currentTarget.id;
		if(name == "musicBackBtn"){
			enabled(musicFront);
			disabled(musicBack);
			localStorage.setItem("gameMusic", "Linkin Park - In the end");
			document.getElementById("nomeMusica").innerHTML = "Linkin Park - In the end";
		}
		else{
			enabled(musicBack);
			disabled(musicFront);
			localStorage.setItem("gameMusic", "Linkin Park - Numb");
			document.getElementById("nomeMusica").innerHTML = "Linkin Park - Numb";
		}
	}

	musicFront.addEventListener("click", musicName);
	musicBack.addEventListener("click", musicName);
}

function allButtonsHandler(ev){
	var name = ev.currentTarget.id;
	var mainWindow = window.parent;

	if(name == "backBtn"){
		mainWindow.postMessage("Options-Menu", "*");
	}
}

function disabled(name){
	var aux = name.firstChild;
	aux.style.cursor = 'default';
	name.disabled = true;
	name.style.opacity = 0.3;
}

function enabled(name){
	var aux = name.firstChild;
	aux.style.cursor = 'pointer';
	name.disabled = false;
	name.style.opacity = 1;
}