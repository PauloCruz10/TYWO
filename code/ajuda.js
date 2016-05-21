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

function swapText(){
	var escolha = document.getElementById("select").value;

	if(escolha == "helpM"){
		document.getElementById("text").innerHTML = "In multiplayer mode, two players choose their characters they <br> want to play, enter their name and then start the game! <br> Win  the player who kill the opponent first! <br> The keys to control the characters are: <br>- for player one, W, A, S, D to move and Space to shot; <br>- for player two, the arrows to move and Enter to shot.";
	}
	else if(escolha == "helpS"){
		document.getElementById("text").innerHTML = "In survival mode, after choosing the name and the character <br> you want to play, will enter a fully open map where you will <br> always be reborn zombies, <br> the goal is to hold the maximum time possible! <br>The keys to control the character are: <br>- W, A, S, D to move and Space to shot;";
	}
	else if(escolha == "helpC"){
		document.getElementById("text").innerHTML = "In campaign mode, the goal is to get to the flag that is on <br> the map, killing the maximum of zombies possible to also <br> increase the pontuation! The more you kill zombies and more<br>higher pass levels will be your pontuation. <br>The keys to control the character are: <br>- W, A, S, D to move and Space to shot;";
	}
	else{
		document.getElementById("text").innerHTML = "";
	}
}

function allButtonsHandler(ev){
	var name = ev.currentTarget.id;
	var mainWindow = window.parent;
	switch(name){
		case "backBtn":
			mainWindow.postMessage("Help-Menu", "*");
			break;
	}
}