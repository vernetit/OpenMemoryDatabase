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
	matrix = arrayConfig[0].matrix;
	bTimeArray = arrayConfig[0]._blankTime;

	velocities = "<table>";

	for(i=0;i<velocidades.length;i++){

		velocities += `
			<tr>
				<td>
					${i+1} 
					<input type="number" id="velocity-${i}" value="${velocidades[i]}" style="width: 60px;">

					<input type="number" id="matrix-x-${i}" value="${matrix[i][0]}" style="width: 40px;">
					x
					<input type="number" id="matrix-y-${i}" value="${matrix[i][1]}" style="width: 40px;">
					blankTime
					<input type="number" id="blankTime-${i}" value="${bTimeArray[i]}" style="width: 40px;">
				</td>
			</tr>`;
	}

	velocities +="</table>";

	nombre = arrayConfig[0].nombre;
	cartasByFlash = arrayConfig[0].cartasByFlash;
	total = arrayConfig[0].total;
	tiempoInicial = 	arrayConfig[0].tiempoInicial;
	blankTime =	arrayConfig[0].blankTime;

	selectedConfig=`
		name : <input type="text" value="${nombre}" id="nombre"> <span style="visibility: hidden;"> cardsByFlash: <input type="number" value="${cartasByFlash}" id="cartasByFlash"> </span> <br>
		numberOfMatrix : <input type="number" value="${total}" id="numberOfCards"> <!-- inicialTime: <input type="number" value="${tiempoInicial}" id="tiempoInicial"> -->  <span style="visibility: hidden;"> BlankTime: <input type="number" value="${blankTime}" id="blankTime"> </span> <br>
		putDimension:
		<select id="dimensionMatrix" onchange="putDimension();">
      <option value="0" selected>3x2</option>
      <option value="1">3x4</option>
      <option value="2">3x6</option>
      <option value="3">4x2</option>
      <option value="4">4x4</option>
      <option value="5">4x6</option>
      <option value="6">4x7</option>
    </select> <br>
    <span style="visibility: hidden;">
		putSuggestedVelocities:
		<select id="suggested" style="width: 65px;" onchange="putSuggested();">
				<option value="5000" selected>5s</option>
				<option value="1750">1.75s</option>
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
			</span>
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
	matrix = arrayConfig[loadedConfigId].matrix;
	bTimeArray = arrayConfig[loadedConfigId]._blankTime;

	velocities = "<table>";

	for(i=0;i<velocidades.length;i++){
		velocities += `
			<tr>
				<td>
					${i+1} 
					<input type="number" id="velocity-${i}" value="${velocidades[i]}" style="width: 60px;">

					<input type="number" id="matrix-x-${i}" value="${matrix[i][0]}" style="width: 40px;">
					x
					<input type="number" id="matrix-y-${i}" value="${matrix[i][1]}" style="width: 40px;">
					blankTime
					<input type="number" id="blankTime-${i}" value="${bTimeArray[i]}" style="width: 40px;">
				</td>
			</tr>`;
		//velocities += `<tr><td>${i+1} <input type="number" id="velocity-${i}" value="${velocidades[i]}"  style="width: 60px;"></td></tr>`;
	}

	velocities +="</table>";

	nombre = arrayConfig[loadedConfigId].nombre;
	cartasByFlash = arrayConfig[loadedConfigId].cartasByFlash;
	total = arrayConfig[loadedConfigId].total;
	tiempoInicial = 	arrayConfig[loadedConfigId].tiempoInicial;
	blankTime =	arrayConfig[loadedConfigId].blankTime;

	selectedConfig=`
		name : <input type="text" value="${nombre}" id="nombre"> <span style="visibility: hidden;"> cardsByFlash: <input type="number" value="${cartasByFlash}" id="cartasByFlash"> </span> <br>
		numberOfMatrix : <input type="number" value="${total}" id="numberOfCards"> <!-- inicialTime: <input type="number" value="${tiempoInicial}" id="tiempoInicial"> --> <span style="visibility: hidden;"> BlankTime: <input type="number" value="${blankTime}" id="blankTime"> </span> <br>
		putDimension:
		<select id="dimensionMatrix" onchange="putDimension();">
      <option value="0" selected>3x2</option>
      <option value="1">3x4</option>
      <option value="2">3x6</option>
      <option value="3">4x2</option>
      <option value="4">4x4</option>
      <option value="5">4x6</option>
      <option value="6">4x7</option>
    </select> <br>
		<br>
		<span style="visibility: hidden;">
		putSuggestedVelocities:
		<select id="suggested" style="width: 65px;" onchange="putSuggested();">
				<option value="5000" selected>5s</option>
				<option value="1750">1.75s</option>
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
			</span>
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

	nt=5000;
	nbk=1000;
	_n=nt;
	nb=nbk;

	for(i=0;i<52;i++){

		if(i==3){
			_n = nt * 0.8;
			nb = nbk * 0.8;
		}
		if(i==6){
			_n = nt * 0.64;
			nb = nbk * 0.64;
		}
		if(i==9){
			_n = nt * 0.512;
			nb = nbk * 0.512;
		}
		//if(i==12)
		//	_n = nt * 0.2;

		velocities += `
			<tr>
				<td>
					${i+1} 
					<input type="number" id="velocity-${i}" value="${_n}" style="width: 60px;">

					<input type="number" id="matrix-x-${i}" value="3" style="width: 40px;">
					x
					<input type="number" id="matrix-y-${i}" value="2" style="width: 40px;">
					blankTime
					<input type="number" id="blankTime-${i}" value="${nb}" style="width: 40px;">
				</td>
			</tr>`;


		//velocities += `<tr><td>${i+1} <input type="number" id="velocity-${i}" value="${_n}"  style="width: 60px;"></td></tr>`;

	}

	velocities +="</table>";

	nombre = "";
	cartasByFlash = 1;
	total = 12;
	tiempoInicial = 	100;
	blankTime =	200;

	selectedConfig=`
		name : <input type="text" value="${nombre}" id="nombre"> <span style="visibility: hidden;"> cardsByFlash: <input type="number" value="${cartasByFlash}" id="cartasByFlash"> </span> <br>
		numberOfMatrix : <input type="number" value="${total}" id="numberOfCards"> <!-- inicialTime: <input type="number" value="${tiempoInicial}" id="tiempoInicial"> --> <span style="visibility: hidden;"> BlankTime: <input type="number" value="${blankTime}" id="blankTime"> </span> <br>
		putDimension:
		<select id="dimensionMatrix" onchange="putDimension();">
      <option value="0" selected>3x2</option>
      <option value="1">3x4</option>
      <option value="2">3x6</option>
      <option value="3">4x2</option>
      <option value="4">4x4</option>
      <option value="5">4x6</option>
      <option value="6">4x7</option>
    </select> <br>
		<br>
		<span style="visibility: hidden;">
		putSuggestedVelocities:
		<select id="suggested" style="width: 65px;" onchange="putSuggested();">
				<option value="5000" selected>5s</option>
				<option value="1750">1.75s</option>
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
			</span>
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

	v=[]; _bt=[];
	for(i=0;i<52;i++){
		v[i]=$("#velocity-"+i).val();
		_bt[i]=$("#blankTime-"+i).val();

		if(v[i]<0){
			msj+="\nVelocity-"+(i+1)+" most be positive";
			bError=1;
		}
		if(_bt[i]<0){
			msj+="\nBlankTime-"+(i+1)+" most be positive";
			bError=1;
		}
	}

	mm=[];
	for(i=0;i<52;i++){
		mm[i] = [];
		mm[i][0]=$("#matrix-x-"+i).val();
		
		mm[i][1]=$("#matrix-y-"+i).val();

		if(mm[i][0]<0){
			msj+="\nMatrix-"+(i+1)+" x most be positive";
			bError=1;
		}

		if(mm[i][1]<0){
			msj+="\nMatrix-"+(i+1)+" y most be positive";
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
			
			arrayConfig[loadedConfigId].matrix[i][0]=mm[i][0];
			arrayConfig[loadedConfigId].matrix[i][1]=mm[i][1];

			arrayConfig[loadedConfigId]._blankTime[i]=_bt[i];

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

		arrayConfig[nuevo]._blankTime = [];

		arrayConfig[nuevo].matrix = [];

		for(i=0;i<52;i++){	
			arrayConfig[nuevo].times[i]=v[i];

			arrayConfig[nuevo]._blankTime[i]=_bt[i];

			arrayConfig[nuevo].matrix[i] = [];

			arrayConfig[nuevo].matrix[i][0] = mm[i][0];
			arrayConfig[nuevo].matrix[i][1] = mm[i][1];
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
			poner+=j+" "+arrayConfig[i].times[j]+" "+ arrayConfig[i].matrix[j][0] + "&" + arrayConfig[i].matrix[j][1] + " " + arrayConfig[i]._blankTime[j]  + fc;
		}
	}

	configApp=poner;
	localStorage.setItem("configAppLocalStorageM", configApp);
	
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
				//poner+=j+" "+arrayConfig[i].times[j]+fc;
				poner+=j+" "+ arrayConfig[i].times[j] +" "+ arrayConfig[i].matrix[j][0] + "&" + arrayConfig[i].matrix[j][1] + " " + arrayConfig[i]._blankTime[j] + fc;
			}
		}

		configApp=poner;
		localStorage.setItem("configAppLocalStorageM", configApp);
		
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

		arrayConfig[i].matrix = [];

		arrayConfig[i]._blankTime = [];

		for(j=0;j<res2.length;j++){

			str3 = res2[j];
			res3 = str3.split(" ");
			if(res3.length==3){
				console.log("actualizar");
				
				localStorage.removeItem('configAppLocalStorageM');
				window.location.href= "/flashMatrix";
				
			}else{
				console.log("ultima version");
			}

			arrayConfig[i].times[j] = res3[1];

			//blanktime
			str5 = res3[3];
			arrayConfig[i]._blankTime[j] = parseInt(str5);


			str4 = res3[2];
			res4 = str4.split("&");

			arrayConfig[i].matrix[j] = [];
			arrayConfig[i].matrix[j][0] = res4[0];
			arrayConfig[i].matrix[j][1] = res4[1];
		}

	}
	//console.log(arrayConfig);

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
defaultText=`Default|1|12|1750|200|0 5000 3&2 1000-1 5000 3&2 1000-2 5000 3&2 1000-3 4000 3&2 800-4 4000 3&2 800-5 4000 3&2 800-6 3200 3&2 640-7 3200 3&2 640-8 3200 3&2 640-9 2560 3&2 512-10 2560 3&2 512-11 2560 3&2 512-12 2560 3&2 512-13 2560 3&2 512-14 2560 3&2 512-15 2560 3&2 512-16 2560 3&2 512-17 2560 3&2 512-18 2560 3&2 512-19 2560 3&2 512-20 2560 3&2 512-21 2560 3&2 512-22 2560 3&2 512-23 2560 3&2 512-24 2560 3&2 512-25 2560 3&2 512-26 2560 3&2 512-27 2560 3&2 512-28 2560 3&2 512-29 2560 3&2 512-30 2560 3&2 512-31 2560 3&2 512-32 2560 3&2 512-33 2560 3&2 512-34 2560 3&2 512-35 2560 3&2 512-36 2560 3&2 512-37 2560 3&2 512-38 2560 3&2 512-39 2560 3&2 512-40 2560 3&2 512-41 2560 3&2 512-42 2560 3&2 512-43 2560 3&2 512-44 2560 3&2 512-45 2560 3&2 512-46 2560 3&2 512-47 2560 3&2 512-48 2560 3&2 512-49 2560 3&2 512-50 2560 3&2 512-51 2560 3&2 512`;

/*
old config:

defaultText=`Default|1|12|1750|200|0 5000 3&2-1 5000 3&2-2 5000 3&2-3 4000 3&2-4 4000 3&2-5 4000 3&2-6 3000 3&2-7 3000 3&2-8 3000 3&2-9 2000 3&2-10 2000 3&2-11 2000 3&2-12 1000 3&2-13 1000 3&2-14 1000 3&2-15 1000 3&2-16 1000 3&2-17 1000 3&2-18 1000 3&2-19 1000 3&2-20 1000 3&2-21 1000 3&2-22 1000 3&2-23 1000 3&2-24 1000 3&2-25 1000 3&2-26 1000 3&2-27 1000 3&2-28 1000 3&2-29 1000 3&2-30 1000 3&2-31 1000 3&2-32 1000 3&2-33 1000 3&2-34 1000 3&2-35 1000 3&2-36 1000 3&2-37 1000 3&2-38 1000 3&2-39 1000 3&2-40 1000 3&2-41 1000 3&2-42 1000 3&2-43 1000 3&2-44 1000 3&2-45 1000 3&2-46 1000 3&2-47 1000 3&2-48 1000 3&2-49 1000 3&2-50 1000 3&2-51 1000 3&2@test|1|12|1750|200|0 5000 4&4-1 5000 4&4-2 5000 4&4-3 4000 3&4-4 4000 3&4-5 4000 3&4-6 3000 4&2-7 3000 4&2-8 3000 4&2-9 2000 4&2-10 2000 4&2-11 2000 5&5-12 1000 3&2-13 1000 3&2-14 1000 3&2-15 1000 3&2-16 1000 3&2-17 1000 3&2-18 1000 3&2-19 1000 3&2-20 1000 3&2-21 1000 3&2-22 1000 3&2-23 1000 3&2-24 1000 3&2-25 1000 3&2-26 1000 3&2-27 1000 3&2-28 1000 3&2-29 1000 3&2-30 1000 3&2-31 1000 3&2-32 1000 3&2-33 1000 3&2-34 1000 3&2-35 1000 3&2-36 1000 3&2-37 1000 3&2-38 1000 3&2-39 1000 3&2-40 1000 3&2-41 1000 3&2-42 1000 3&2-43 1000 3&2-44 1000 3&2-45 1000 3&2-46 1000 3&2-47 1000 3&2-48 1000 3&2-49 1000 3&2-50 1000 3&2-51 1000 3&2`;

*/

configApp=localStorage.getItem("configAppLocalStorageM");
//configApp = defaultText;

if(configApp==null){
	
	configApp=defaultText;
	localStorage.setItem("configAppLocalStorageM", configApp);
	
}else{

	//console.log(configApp);

	//console.log(configApp.length);
	//alert(configApp);
	

}

loadConfig();

$(document).keypress(function(event) {
	
	console.log(event.charCode);
	if (event.charCode==100){

		localStorage.removeItem('configAppLocalStorageM');
		window.location.href= "/flashMatrix";
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

function putDimension(){

	nt=$("#dimensionMatrix").val();
	var n=nt;

	if(n==0){ aa=3; bb=2; }
	if(n==1){ aa=3; bb=4; }
	if(n==2){ aa=3; bb=6; }
	if(n==3){ aa=4; bb=2; }
	if(n==4){ aa=4; bb=4; }
	if(n==5){ aa=4; bb=6; }
	if(n==6){ aa=4; bb=7; }

	for(i=0;i<52;i++){


		$("#matrix-x-"+i).val(aa);
		$("#matrix-y-"+i).val(bb);
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
nt=5000;
nbk = 1000;
n=nt;
nb=nbk;
for(i=0;i<52;i++){

	if(i==3){
		n = nt * 0.8;
		nbk = nb * 0.8;
	}
	if(i==6){
		n = nt * 0.64;
		nbk = nb * 0.64;
	}
	if(i==9){
		n = nt * 0.512;
		nbk = nb * 0.512;
	}
	
	//if(i==10){
	//	n = nt * 0.2;
	//}

	poner += i+" "+parseInt(n)+" 3&2"+ " " + nbk + "-";
}
$("#screen").html(poner);
*/


