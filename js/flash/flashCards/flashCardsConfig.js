require('./renderer.js')
const fs= require("fs");

fd="";
var arrayDirs=[];

fs.readdir('cards/', (err, dir) => {
   sel=`<select id="img-select" onchange="openFiles(this.value);">
    <!--<option value="-1">random</option>-->

   `;
   bFirstDir=0;
   fd="";
   arrayDirs=[]; z=0;
    for (var i = 0, path; path = dir[i]; i++) {

     

      //console.log(""+path.indexOf("."));
      if(path.indexOf(".")!=0){
        if(!bFirstDir){
          bFirstDir=1;
          fd=path;

        }
        sel+=`<option value="${path}">`+(path)+`</option>`;
        arrayDirs[z]=path; z++;
      }
    }
    sel +="</select>";
    //fd=arrayDirs[_.random(0,arrayDirs.length-1)];
    fd=arrayDirs[0];

    $("#mySelect").html(sel);

    return;

    fs.readdir('images/'+fd, (err, dir) => {
    
    img="";
    for (var i = 0, path; path = dir[i]; i++) {

      //console.log(""+path.indexOf("."));
      if(path.indexOf(".")!=0){
       
        img+=`<img src="images/${fd}/${path}">`;
      }
      if(i==10) break;
    }
    

    $("#images-div").html(img);
 });
});

function openFiles(fdx){
    if(parseInt(fdx)==-1){
      fd=arrayDirs[_.random(0,arrayDirs.length-1)];

    }else{
      fd=fdx;

    }

    return;


    fs.readdir('cards/'+fd, (err, dir) => {
    
    img="";
    for (var i = 0, path; path = dir[i]; i++) {

      //console.log(""+path.indexOf("."));
      if(path.indexOf(".")!=0){
       
        img+=`<img src="cards/${fd}/${path}">`;
      }
      if(i==10) break;
    }
    

    $("#images-div").html(img);
 });


}

bConfig=0; loadedConfigId=0; 
modo=1; // 1->modificar 2->nuevo
noTime=0;

function config(){
	bConfig = !bConfig;

	bStart=0;
	$("#start-btn").val("start");
	clearTimeout(killTimeout); clearTimeout(killTimeout1);
	$("#screen").html("");
	
	if(!bConfig){
		$("#screen").html("");
		return;
	}

	loadedConfigId=0; modo=1;

	menu = "";

	for(i=0;i<arrayConfig.length;i++){
		menu += `<a href="#" onclick="selectConfig(${i});">${arrayConfig[i].nombre}</a><br>`
	}
	menu +=  `<a href="#" onclick="newConfig();">+New</a><br>`


	//velocites

	velocidades = arrayConfig[0].times;

	velocities = "<table>";

	for(i=0;i<velocidades.length;i++){

		velocities += `<tr><td>${i+1} <input type="number" id="velocity-${i}" value="${velocidades[i]}" style="width: 60px;"></td></tr>`;


	}

	velocities +="</table>";

	nombre = arrayConfig[0].nombre;
	cartasByFlash = arrayConfig[0].cartasByFlash;
	total = arrayConfig[0].total;
	tiempoInicial = 	arrayConfig[0].tiempoInicial;
	blankTime =	arrayConfig[0].blankTime;

	selectedConfig=`
		name : <input type="text" value="${nombre}" id="nombre">  cardsByFlash: <input type="number" value="${cartasByFlash}" id="cartasByFlash"> <br>
		numberOfCards : <input type="number" value="${total}" id="numberOfCards"> <!-- inicialTime: <input type="number" value="${tiempoInicial}" id="tiempoInicial"> -->  BlankTime: <input type="number" value="${blankTime}" id="blankTime"> <br>
		putSuggestedVelocities:
		<select id="suggested" style="width: 65px;" onchange="putSuggested();">
				<option value="1750" selected>1.75s</option>
				<option value="1700">1.7s</option>
				<option value="1650">1.65s</option>
				<option value="1600">1.6s</option>
				<option value="1550">1.55s</option>
				<option value="1500">1.5s</option>
				<option value="1450">1.45s</option>
				<option value="1400">1.4s</option>
				<option value="1350">1.35s</option>
				<option value="1300">1.3s</option>
				<option value="1250">1.25s</option>
				<option value="1200">1.2s</option>
				<option value="1150">1.15s</option>
				<option value="1100">1.1s</option>
				<option value="1050">1.05s</option>
				<option value="1000">1.0s</option>
				<option value="950">0.95s</option>
				<option value="900">0.9s</option>
				<option value="850">0.85s</option>
				<option value="800">0.8s</option>
				<option value="750">0.75s</option>
				<option value="700">0.7s</option>
				<option value="650">0.65s</option>
				<option value="600">0.6s</option>
				<option value="550">0.55s</option>
				<option value="500">0.5s</option>
				<option value="450">0.45s</option>
				<option value="400">0.4s</option>
				<option value="350">0.35s</option>
				<option value="300">0.3s</option>
				<option value="250">0.25s</option>
			</select> 
			SetAllTo: <input type="number" value="1750" id="setAllValue"> <input type="button" value="ok" onclick="setAllToFunction()">
			<br>
			<input type="button" value="+" onclick="sumSelectFc(1)">
			<select id="sumSelect" style="width: 65px;">
				<option value="1">1</option>
				<option value="5">5</option>
				<option value="10" selected>10</option>
				<option value="15">15</option>
				<option value="20">20</option>
				<option value="25">25</option>
				<option value="30">30</option>
				<option value="50">50</option>
				<option value="100">100</option>
			</select> 
			<input type="button" value="--" onclick="sumSelectFc(0)">
			<input type="button" value="setNoTimeLastVelocities" onclick="setNoTimeLastVelocities()">
		 <br><br>

		Velocities: <br>

		${velocities}
	`;

	configScreen = `
		<table border="1">
			<tr>
				<td width="200px;" valign="top" style="margin-left:20px;">
					${menu}		
				</td>
				<td width="800px;">
					<div style="float:right;">
						<input type="button" value="save" id="save" onclick="save();">
						<input type="button" value="delete" id="delete" onclick="del();">
					</div>
					<br>
					<div id="currentConfig">
						${selectedConfig}
					</div>
					<br>
					<div style="float:right;">
						<input type="button" value="save" id="save1" onclick="save();">
						<input type="button" value="delete" id="delete1" onclick="del();">
					</div>
				</td>	
			</tr>
		</table>
	`;

	$("#screen").html(configScreen);

}

function selectConfig(x){
	loadedConfigId=x; modo=1;
	
	//velocites

	velocidades = arrayConfig[loadedConfigId].times;

	velocities = "<table>";

	for(i=0;i<velocidades.length;i++){
		velocities += `<tr><td>${i+1} <input type="number" id="velocity-${i}" value="${velocidades[i]}"  style="width: 60px;"></td></tr>`;
	}

	velocities +="</table>";

	nombre = arrayConfig[loadedConfigId].nombre;
	cartasByFlash = arrayConfig[loadedConfigId].cartasByFlash;
	total = arrayConfig[loadedConfigId].total;
	tiempoInicial = 	arrayConfig[loadedConfigId].tiempoInicial;
	blankTime =	arrayConfig[loadedConfigId].blankTime;

	selectedConfig=`
		name : <input type="text" value="${nombre}" id="nombre">  cardsByFlash: <input type="number" value="${cartasByFlash}" id="cartasByFlash"> <br>
		numberOfCards : <input type="number" value="${total}" id="numberOfCards"> <!-- inicialTime: <input type="number" value="${tiempoInicial}" id="tiempoInicial"> --> BlankTime: <input type="number" value="${blankTime}" id="blankTime"> 
		<br>
		putSuggestedVelocities:
		<select id="suggested" style="width: 65px;" onchange="putSuggested();">
				<option value="1750" selected>1.75s</option>
				<option value="1700">1.7s</option>
				<option value="1650">1.65s</option>
				<option value="1600">1.6s</option>
				<option value="1550">1.55s</option>
				<option value="1500">1.5s</option>
				<option value="1450">1.45s</option>
				<option value="1400">1.4s</option>
				<option value="1350">1.35s</option>
				<option value="1300">1.3s</option>
				<option value="1250">1.25s</option>
				<option value="1200">1.2s</option>
				<option value="1150">1.15s</option>
				<option value="1100">1.1s</option>
				<option value="1050">1.05s</option>
				<option value="1000">1.0s</option>
				<option value="950">0.95s</option>
				<option value="900">0.9s</option>
				<option value="850">0.85s</option>
				<option value="800">0.8s</option>
				<option value="750">0.75s</option>
				<option value="700">0.7s</option>
				<option value="650">0.65s</option>
				<option value="600">0.6s</option>
				<option value="550">0.55s</option>
				<option value="500">0.5s</option>
				<option value="450">0.45s</option>
				<option value="400">0.4s</option>
				<option value="350">0.35s</option>
				<option value="300">0.3s</option>
				<option value="250">0.25s</option>
			</select> 
			SetAllTo: <input type="number" value="1750" id="setAllValue"> <input type="button" value="ok" onclick="setAllToFunction()">
			<br>
			<input type="button" value="+" onclick="sumSelectFc(1)">
			<select id="sumSelect" style="width: 65px;">
				<option value="1">1</option>
				<option value="5">5</option>
				<option value="10" selected>10</option>
				<option value="15">15</option>
				<option value="20">20</option>
				<option value="25">25</option>
				<option value="30">30</option>
				<option value="50">50</option>
				<option value="100">100</option>
			</select> 
			<input type="button" value="--" onclick="sumSelectFc(0)">
			<input type="button" value="setNoTimeLastVelocities" onclick="setNoTimeLastVelocities()">
		<br><br>

		Velocities: <br>

		${velocities}
	`;

	$("#currentConfig").html(selectedConfig);

}

function newConfig(){

	loadedConfigId=-1; modo=2;
	
	//velocites

	velocities = "<table>";

	nt=1750;
	_n=nt;

	for(i=0;i<52;i++){

		if(i==3)
			_n = nt * 0.8;
		if(i==6)
			_n = nt * 0.6;
		if(i==9)
			_n = nt * 0.4;
		if(i==12)
			_n = nt * 0.2;


		velocities += `<tr><td>${i+1} <input type="number" id="velocity-${i}" value="${_n}"  style="width: 60px;"></td></tr>`;

	}

	velocities +="</table>";

	nombre = "";
	cartasByFlash = 1;
	total = 15;
	tiempoInicial = 	100;
	blankTime =	200;

	selectedConfig=`
		name : <input type="text" value="${nombre}" id="nombre">  cardsByFlash: <input type="number" value="${cartasByFlash}" id="cartasByFlash"> <br>
		numberOfCards : <input type="number" value="${total}" id="numberOfCards"> <!-- inicialTime: <input type="number" value="${tiempoInicial}" id="tiempoInicial"> --> BlankTime: <input type="number" value="${blankTime}" id="blankTime"> 
		<br>
		putSuggestedVelocities:
		<select id="suggested" style="width: 65px;" onchange="putSuggested();">
				<option value="1750" selected>1.75s</option>
				<option value="1700">1.7s</option>
				<option value="1650">1.65s</option>
				<option value="1600">1.6s</option>
				<option value="1550">1.55s</option>
				<option value="1500">1.5s</option>
				<option value="1450">1.45s</option>
				<option value="1400">1.4s</option>
				<option value="1350">1.35s</option>
				<option value="1300">1.3s</option>
				<option value="1250">1.25s</option>
				<option value="1200">1.2s</option>
				<option value="1150">1.15s</option>
				<option value="1100">1.1s</option>
				<option value="1050">1.05s</option>
				<option value="1000">1.0s</option>
				<option value="950">0.95s</option>
				<option value="900">0.9s</option>
				<option value="850">0.85s</option>
				<option value="800">0.8s</option>
				<option value="750">0.75s</option>
				<option value="700">0.7s</option>
				<option value="650">0.65s</option>
				<option value="600">0.6s</option>
				<option value="550">0.55s</option>
				<option value="500">0.5s</option>
				<option value="450">0.45s</option>
				<option value="400">0.4s</option>
				<option value="350">0.35s</option>
				<option value="300">0.3s</option>
				<option value="250">0.25s</option>
			</select> 
			SetAllTo: <input type="number" value="1750" id="setAllValue"> <input type="button" value="ok" onclick="setAllToFunction()">
			<br>
			<input type="button" value="+" onclick="sumSelectFc(1)">
			<select id="sumSelect" style="width: 65px;">
				<option value="1">1</option>
				<option value="5">5</option>
				<option value="10" selected>10</option>
				<option value="15">15</option>
				<option value="20">20</option>
				<option value="25">25</option>
				<option value="30">30</option>
				<option value="50">50</option>
				<option value="100">100</option>
			</select> 
			<input type="button" value="--" onclick="sumSelectFc(0)">
			<input type="button" value="setNoTimeLastVelocities" onclick="setNoTimeLastVelocities()">

		<br><br>

		Velocities: <br>

		${velocities}
	`;


	$("#currentConfig").html(selectedConfig);

}

function save(){

	if(loadedConfigId==0){
		alert("This is the default config and can not be changed.");
		return;
	}

	lc=loadedConfigId; //!important

	nombre = $("#nombre").val();
	cartasByFlash = $("#cartasByFlash").val();
	total = $("#numberOfCards").val();
	blankTime =	$("#blankTime").val();

	msj=""; bError=0;

	if(nombre.length<3){ msj+="Incorrect name length."; bError=1; }else{
		for(i=0;i<arrayConfig.length;i++){
			if(i!=loadedConfigId){
				if(arrayConfig[i].nombre==nombre){
					msj +="Repeated name.";
					bError=1;
					break;
				}
			}
		}
	}

	if(cartasByFlash<1 || cartasByFlash>3){
		msj+="\nQuantity of cards per flash most be in values (1 to 3)."
		bError=1;
	}

	if(total<1 || total>52){
		msj+="\nTotal cards most be in values (1 to 52)."
		bError=1;
	}

	if(blankTime<0){
		msj+="\nBlankTime most be positive ."
		bError=1;
	}

	v=[];
	for(i=0;i<52;i++){
		v[i]=$("#velocity-"+i).val();

		if(v[i]<0){
			msj+="\nVelocity-"+(i+1)+" most be positive";
			bError=1;
		}
	}

	if(bError){ alert(msj); return; }

	if(modo==1){ //modif
		arrayConfig[loadedConfigId].nombre = nombre;
		arrayConfig[loadedConfigId].cartasByFlash = cartasByFlash;
		arrayConfig[loadedConfigId].total = total;
		arrayConfig[loadedConfigId].tiempoInicial = 1750;
		arrayConfig[loadedConfigId].blankTime = blankTime;

		for(i=0;i<52;i++){
			arrayConfig[loadedConfigId].times[i]=v[i];
		}

	}else{ //new
		nuevo = arrayConfig.length;
		arrayConfig[nuevo] = {};

		
		arrayConfig[nuevo].nombre = nombre;
		arrayConfig[nuevo].cartasByFlash = cartasByFlash;
		arrayConfig[nuevo].total = total;
		arrayConfig[nuevo].tiempoInicial = 1750;
		arrayConfig[nuevo].blankTime = blankTime;

		arrayConfig[nuevo].times = [];

		for(i=0;i<52;i++){	
			arrayConfig[nuevo].times[i]=v[i];
		}

		lc=nuevo;
	}
/*
	`Default|1|15|1750|200|0 1750-1 1750-2 1750-3 1400-4 1400-5 1400-6 1050-7 1050-8 1050-9 700-10 700-11 700-12 350-13 350-14 350-15 350-16 350-17 350-18 350-19 350-20 350-21 350-22 350-23 350-24 350-25 350-26 350-27 350-28 350-29 350-30 350-31 350-32 350-33 350-34 350-35 350-36 350-37 350-38 350-39 350-40 350-41 350-42 350-43 350-44 350-45 350-46 350-47 350-48 350-49 350-50 350-51 350@Canola|1|15|1750|200|0 1750-1 1750-2 1750-3 1400-4 1400-5 1400-6 1050-7 1050-8 1050-9 700-10 700-11 700-12 350-13 350-14 350-15 350-16 350-17 350-18 350-19 350-20 350-21 350-22 350-23 350-24 350-25 350-26 350-27 350-28 350-29 350-30 350-31 350-32 350-33 350-34 350-35 350-36 350-37 350-38 350-39 350-40 350-41 350-42 350-43 350-44 350-45 350-46 350-47 350-48 350-49 350-50 350-51 350`;
*/
	poner = "";
	for(i=0;i<arrayConfig.length;i++){
		fc="";
		if(i>0) fc="@";

		poner += fc+arrayConfig[i].nombre+"|"+arrayConfig[i].cartasByFlash+"|"+arrayConfig[i].total+"|"+arrayConfig[i].tiempoInicial+"|"+arrayConfig[i].blankTime+"|";

		for(j=0;j<52;j++){
			fc="-"
			if(j==51) fc="";
			poner+=j+" "+arrayConfig[i].times[j]+fc;
		}
	}

	configApp=poner;
	localStorage.setItem("configAppLocalStorageFC", configApp);
	
	bConfig=0; loadConfig(); config(); selectConfig(lc);


}

function del(){

	if(loadedConfigId==0){
		alert("This is the default config and can not be changed.");
		return;
	}

	if(confirm("Do you want to delete this config?")){
		a = []; z=0;
		for(i=0;i<arrayConfig.length;i++){
			if(i!=loadedConfigId){
				a[z] = arrayConfig[i];
				z++;
			}
		}
		arrayConfig = a; 

		poner = "";

		for(i=0;i<arrayConfig.length;i++){
			fc="";
			if(i>0) fc="@";

			poner += fc+arrayConfig[i].nombre+"|"+arrayConfig[i].cartasByFlash+"|"+arrayConfig[i].total+"|"+arrayConfig[i].tiempoInicial+"|"+arrayConfig[i].blankTime+"|";

			for(j=0;j<52;j++){
				fc="-"
				if(j==51) fc="";
				poner+=j+" "+arrayConfig[i].times[j]+fc;
			}
		}

		configApp=poner;
		localStorage.setItem("configAppLocalStorageFC", configApp);
		
		bConfig=0; loadConfig(); config();
	}
}


arrayConfig=[]

function loadConfig(){
	$("#game").html("");
	//str = `Default|1|15|1750|200|0 1750-1 1750-2 1750-3 1400-4 1400-5 1400-6 1050-7 1050-8 1050-9 700-10 700-11 700-12 350-13 350-14 350-15 350-16 350-17 350-18 350-19 350-20 350-21 350-22 350-23 350-24 350-25 350-26 350-27 350-28 350-29 350-30 350-31 350-32 350-33 350-34 350-35 350-36 350-37 350-38 350-39 350-40 350-41 350-42 350-43 350-44 350-45 350-46 350-47 350-48 350-49 350-50 350-51 350@Canola|1|15|1750|200|0 1750-1 1750-2 1750-3 1400-4 1400-5 1400-6 1050-7 1050-8 1050-9 700-10 700-11 700-12 350-13 350-14 350-15 350-16 350-17 350-18 350-19 350-20 350-21 350-22 350-23 350-24 350-25 350-26 350-27 350-28 350-29 350-30 350-31 350-32 350-33 350-34 350-35 350-36 350-37 350-38 350-39 350-40 350-41 350-42 350-43 350-44 350-45 350-46 350-47 350-48 350-49 350-50 350-51 350`;
	str = configApp;
	res = str.split("@");

	for(i=0;i<res.length;i++){
		str1 = res[i];
		res1 = str1.split("|");

		arrayConfig[i] = {};

		arrayConfig[i].nombre = res1[0];
		arrayConfig[i].cartasByFlash = res1[1];
		arrayConfig[i].total = res1[2];
		arrayConfig[i].tiempoInicial = res1[3];
		arrayConfig[i].blankTime = res1[4];

		str2 = res1[5];
		res2 = str2.split("-");

		arrayConfig[i].times = [];

		for(j=0;j<res2.length;j++){

			str3 = res2[j];
			res3 = str3.split(" ");

			arrayConfig[i].times[j] = res3[1];
		}

	}
	console.log(arrayConfig);

	//cargo la config en el front-end

	for(i=0;i<arrayConfig.length;i++){
		$('#game').append($('<option>', {
			value: i,
			text: arrayConfig[i].nombre
		}));
	}

	//config();

}


//nombre cartas_x_flash total tiempo_inicial blank_time
defaultText=`Default|1|15|1750|200|0 1750-1 1750-2 1750-3 1400-4 1400-5 1400-6 1050-7 1050-8 1050-9 700-10 700-11 700-12 350-13 350-14 350-15 350-16 350-17 350-18 350-19 350-20 350-21 350-22 350-23 350-24 350-25 350-26 350-27 350-28 350-29 350-30 350-31 350-32 350-33 350-34 350-35 350-36 350-37 350-38 350-39 350-40 350-41 350-42 350-43 350-44 350-45 350-46 350-47 350-48 350-49 350-50 350-51 350`;

configApp=localStorage.getItem("configAppLocalStorageFC");
//configApp = defaultText;

if(configApp==null){
	
	configApp=defaultText;
	localStorage.setItem("configAppLocalStorageFC", configApp);
	
}else{
	//console.log(configApp);

}

loadConfig();

$(document).keypress(function(event) {
	
	console.log(event.charCode);
	if (event.charCode==100){

		localStorage.removeItem('configAppLocalStorageFC');
		window.location.href= "/flashCards";
	}
	if (event.charCode==32){
		jugarRapid(1);
		event.preventDefault();

	}

});

function putSuggested(){

	nt=$("#suggested").val();
	var n=nt;

	for(i=0;i<52;i++){

		if(i==3)
			n = nt * 0.8;
		if(i==6)
			n = nt * 0.6;
		if(i==9)
			n = nt * 0.4;
		if(i==12)
			n = nt * 0.2;

		if(n<121){
			n=120;
		}

		$("#velocity-"+i).val(parseInt(n));
	}

}

function setAllToFunction(){

	var n=$("#setAllValue").val();
	

	for(i=0;i<52;i++){

		$("#velocity-"+i).val(parseInt(n));
	}

}

function setNoTimeLastVelocities(){

	if(bLastNoTime){
		for(i=0;i<lastNoTimeArray.length;i++){
		
			if (lastNoTimeArray[i] == null){
    			lastNoTimeArray[i] = 0;
			}
		

			$("#velocity-"+i).val(lastNoTimeArray[i]);
		}
	}else{

		alert("NoTime is not used in this session.")
	}
}

function sumSelectFc(x){

	var n=parseInt($("#sumSelect").val());

	if(!x)
		n=-n;

	

	for(i=0;i<52;i++){
		__vel = parseInt($("#velocity-"+i).val());

		if(__vel+n>0){
			__vel += n;
			$("#velocity-"+i).val(__vel);	
		}

	}
}

/*
poner="";
nt=1750;
n=nt;
for(i=0;i<52;i++){

	if(i==3)
		n = nt * 0.8;
	if(i==6)
		n = nt * 0.6;
	if(i==9)
		n = nt * 0.4;
	if(i==12)
		n = nt * 0.2;

	poner += i+" "+parseInt(n)+"-";
}
$("#screen").html(poner);
*/


