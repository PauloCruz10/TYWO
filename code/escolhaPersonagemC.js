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

function setStates(){
	var niveisFeitos;
	var arrayNames = JSON.parse(localStorage.getItem("arrayNames"));
	for (var i = 0; i < arrayNames.length; i++) {
		if(arrayNames[i]!=null && arrayNames[i].playerName == localStorage.getItem("playerName")){
			niveisFeitos = arrayNames[i].niveisPassados;
			break;
		}
	}

	if(niveisFeitos != null){
		console.log(niveisFeitos);
		console.log(niveisFeitos[0]);
		console.log(niveisFeitos[1]);
		console.log(niveisFeitos[2]);
		for (var i = 0; i < 6; i++) {
			if(niveisFeitos[i]!=null){
				console.log(niveisFeitos[i]);
				document.getElementById("Level "+niveisFeitos[i].toString()).text = "Level "+niveisFeitos[i].toString()+" - Done";
			}
		}
	}

	var select = document.getElementById("selectM"); 
	var options = JSON.parse(localStorage.getItem("nomeNiveis"));
	if(options!=null){
		for(var i = 0; i < options.length; i++) {
			if(options[i]!=null){
				var option = new Option(options[i], options[i]);
	        	select.options.add(option);
	    	}	
		}
	}
}

function swapImage(){
    var image = document.getElementById("characterImg");
    var escolha = document.getElementById("selectC").value;

    image.src = "../resources/" + escolha + "F.png";
}

function swapText(){
	if(document.getElementById("selectM").value != "null" && document.getElementById("selectL").value != "null"){
		document.getElementById("selectL").value = "null";
		var image = document.getElementById("levelImg");
		image.style.visibility = "hidden";
	}
}

function swapImage2(){
    var image = document.getElementById("levelImg");
    var escolha = document.getElementById("selectL").value;
    if(escolha == "null"){
    	image.style.visibility = "hidden";
    }
    else{
    	image.style.visibility = "visible";
    	document.getElementById("selectM").value = "null";
    	image.src = "../resources/" + escolha + ".png";
    }
}

function allButtonsHandler(ev){
	var name = ev.currentTarget.id;
	var mainWindow = window.parent;
	switch(name){
		case "backBtn":
			mainWindow.postMessage("EscolhaC-PreEscolhaC", "*");
			break;
		case "beginBtn":
			var arrayNames = JSON.parse(localStorage.getItem("arrayNames"));
			for (var i = 0; i < arrayNames.length; i++) {
				if(arrayNames[i]!=null && arrayNames[i].playerName == localStorage.getItem("playerName")){
					break;
				}
			}

			if(document.getElementById("selectC").value == "boneco"){
				localStorage.setItem("playerType", "boneco");
			}
			if(document.getElementById("selectC").value == "boneca"){
				localStorage.setItem("playerType", "boneca");
			}
			if(document.getElementById("selectC").value == "soldado"){
				localStorage.setItem("playerType", "soldado");
			}

			if(document.getElementById("selectM").value != "null"){
				localStorage.setItem("nivelAtual", document.getElementById("selectM").value);
				mainWindow.postMessage("Character-Campaign", "*");
			}
			else if(document.getElementById("selectL").value != "null"){
				if(arrayNames[i].pontuacaoAux !=null && document.getElementById("selectL").value == arrayNames[i].nivelAtual){
					localStorage.setItem("arrayNames", JSON.stringify(arrayNames));
					mainWindow.postMessage("Character-Campaign", "*");
				}
				else{
					arrayNames[i].nivelAtual = document.getElementById("selectL").value;
					localStorage.setItem("arrayNames", JSON.stringify(arrayNames));
					mainWindow.postMessage("Character-Campaign", "*");
				}
			}
			else{
				alert("Choose one level to play!");
			}
			break;
	}
}

function setPlayerRank(playerName,pontuacao){
    var array = JSON.parse(localStorage.getItem("arrayRankC"));
    if(pontuacao!=0){
        if(array!=null){
            array.push(playerName + ":" +pontuacao.toString());
            array = sortArray(array);
            localStorage.setItem("arrayRankC",  JSON.stringify(array));
        }
        else{
            var array = new Array();
            array[0] = playerName + ":" +pontuacao.toString()
            localStorage.setItem("arrayRankC",  JSON.stringify(array));
        }
    }
}

function sortArray(array){
    var j;
    for(var i=1;i<array.length;i++){
    	if(array[i]!=null){
	        j = i;
	        while(j>0 && array[j]!=null && parseInt(array[j-1].split(":")[1]) < parseInt(array[j].split(":")[1])){
	            var temp = array[j];
	            array[j] = array[j-1];
	            array[j-1] = temp;
	            j--;
	        }
    	}
    }
    return array;
}