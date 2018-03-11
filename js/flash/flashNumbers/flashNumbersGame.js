function n(x){ return parseFloat($("#"+x).val()); }

var killTimeout,killTimeout1,tiempoInicial,pasadas,totalPasadas,modoJuego,selectedItems;
var ccg=0;
var t_ini;
var t_fin2;

var nt_t_ini, nt_t_fin, bLastNoTime, lastNoTimeArray=[], nt_pasadas;

etapa=0;

bStart=0;
cartasByFlash=0;

//no time
function nttt(){
	if(noTime){
		
		$("#next-btn").css("width","50%");
		$("#go-btn").css("width","50%");
		
		//$("#go-btn").css("border-style","solid");

	}else{
		$("#next-btn").css("width","0px");
		$("#go-btn").css("width","100%");
	}
}

function jugarRapid(fase){
	
	if(fase==1){
		bStart=!bStart;
		bConfig = 0;
		$("#start-btn").val("stop");
		$("#go-txt").html("stop");

		if(!bStart){
			$("#start-btn").val("start");
			clearTimeout(killTimeout); clearTimeout(killTimeout1);
			$("#screen").html("");
			$("#go-txt").html("GO!");
			etapa=0;
			return;


		}
		etapa=1;

		ccg = n("game");

		modoJuego=2;
		tamano=5;

		clearTimeout(killTimeout); clearTimeout(killTimeout1);

		pasadas=0;

		totalPasadas = parseInt(arrayConfig[ccg].total);
		cartasByFlash = parseInt(arrayConfig[ccg].cartasByFlash);

		selectedItems = [];
		myArray = _.range(1,53);
		myArray = _.shuffle(myArray);

		for(i=0;i<120;i++){

			selectedItems[i] = {};
			
			if(i>51){
				selectedItems[i].mostrar = "1";
				selectedItems[i].txt = "A";
				selectedItems[i].color = "X";
				continue;

			}

			selectedItems[i].mostrar = myArray[i];

			//var arrayColors=["♠","♥","♦","♣"];

			if(myArray[i]<14){selectedItems[i].color = "♥"; }
			if(myArray[i]>13 && myArray[i]<27 ){selectedItems[i].color = "♠"; }
			if(myArray[i]>26 && myArray[i]<40 ){selectedItems[i].color = "♦"; }
			if(myArray[i]>39){selectedItems[i].color = "♣"; }

			if(myArray[i]<11)
				selectedItems[i].txt = myArray[i];

			if(myArray[i]>13 && myArray[i]<24)
				selectedItems[i].txt = myArray[i]-13;

			if(myArray[i]>26 && myArray[i]<37)
				selectedItems[i].txt = myArray[i]-26;

			if(myArray[i]>39 && myArray[i]<50)
				selectedItems[i].txt = myArray[i]-39;

			//A
			if(myArray[i]==1 || myArray[i]==14 || myArray[i]==27 || myArray[i]==40) selectedItems[i].txt="A";
			//j 11 24 37 50
			if(myArray[i]==11 || myArray[i]==24 || myArray[i]==37 || myArray[i]==50) selectedItems[i].txt="J";
			//q
			if(myArray[i]==12 || myArray[i]==25 || myArray[i]==38 || myArray[i]==51) selectedItems[i].txt="Q";
			//k
			if(myArray[i]==13 || myArray[i]==26 || myArray[i]==39 || myArray[i]==52) selectedItems[i].txt="K";

			if(i<totalPasadas){
				//console.log(selectedItems[i].color + " " + selectedItems[i].txt);
			}

			//selectedItems[i].color = myArray[i];
			//selectedItems[i].txt = myArray[i];

		}

		if(noTime){
			lastNoTimeArray=[]
		}
		
		fase=2; t_ini = Date.now();

	}

	
	tiempoInicial = arrayConfig[ccg].times[pasadas];

	if(cartasByFlash==1)
		$("#screen").html(`<br><br><center><b>${pasadas+1}</b></center><br><center><img src="cartas/${selectedItems[pasadas].mostrar}.png"></center>`);
	if(cartasByFlash==2){
		_p1=`<img src="cartas/${selectedItems[pasadas].mostrar}.png">`;
		_p2="";
		if(pasadas+1<totalPasadas)
			_p2=`<img src="cartas/${selectedItems[pasadas+1].mostrar}.png">`;

		$("#screen").html(`<br><br><center><b>${pasadas+1}</b></center><br><center><span>${_p1}</span>&nbsp;<span>${_p2}</span></center>`);
	}
	if(cartasByFlash==3){
		_p1=`<img src="cartas/${selectedItems[pasadas].mostrar}.png">`;
		_p2="";
		if(pasadas+1<totalPasadas)
			_p2=`<img src="cartas/${selectedItems[pasadas+1].mostrar}.png">`;
		_p3="";
		if(pasadas+2<totalPasadas)
			_p3=`<img src="cartas/${selectedItems[pasadas+2].mostrar}.png">`;

		$("#screen").html(`<br><br><center><b>${pasadas+1}</b></center><br><center><span>${_p1}</span>&nbsp;<span>${_p2}</span><span>${_p3}</span></center>`);
	}

	if(!noTime){
		killTimeout = setTimeout(function(){
			t_fin2 = Date.now();

			$("#screen").html("");

			pasadas+=cartasByFlash;

			//console.log(pasadas);
			//console.log(totalPasadas);

			if(pasadas>=totalPasadas){

				//$("#screen").append("<br><br><center><input type=\"button\" value=\"Recall\" id=\"recall\"></center>");

				recall1();

				return;
			}

			killTimeout1 = setTimeout(function(){ jugarRapid(2); }, arrayConfig[ccg].blankTime);

		}, tiempoInicial);
	}else{ //noTime
		nt_t_ini = Date.now();
		bLastNoTime = 1;
	}

}

tamano = 10;

var arrayColors=["♠","♥","♦","♣"];
var arrayDirecciones=["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

function recall1(){
	etapa=2;

  recall = []; t_fin = Date.now();
  for (var i = 0; i < 120; i++) {
  		recall[i]={};
  		recall[i].txt="x";
  		recall[i].color="x";
  };

  //selectedItemsRnd = selectedItems.slice();
  //selectedItemsRnd = selectedItemsRnd.sort(function() {return Math.random() - 0.5});
  /*
  poner2 = "<table border=\"0\">";
  z=0;
  for(i=0;i<tamano;i++){
    recall[z] = "#FFFFFF";  
    poner2 += "<tr>";

		for(j=0;j<tamano;j++){

			idRnd = selectedItemsRnd[z];

			//poner2 += "<td><div class=\"dropdown\"><a href=\"#\" class=\"dropbtn\" style=\"text-decoration: none;\"><div style=\"background-color: " + colores[idRnd][1] + "; width: 30px; height: 30px;  z-index: 90;\" onclick=\"contestar(fff,'" + colores[idRnd][1] + "');\" title=\"" + colores[idRnd][0] + "\">&nbsp;</div></a><div class=\"dropdown-content\" style=\"z-index: 100; display:none;\"></div></div></td>";


			z++;
		}
		poner2 += "</tr>";
  }
  poner2 += "</table>";
  */

  poner2=`<div>`;

	for (var i = 0; i < arrayColors.length; i++) {
		bgColor="black";
		if(arrayColors[i]=="♥" || arrayColors[i]=="♦")
			bgColor="red";

		poner2+=`<div class="respuesta-color-class-zzz" id="respuesta-color-id-zzz-${i}" style="color: ${bgColor}; width:20px; height:20px; float: left; border-style: solid; border-width: 2px; border-color: white;" onclick="contestarColor(zzz,'${arrayColors[i]}','${i}');">${arrayColors[i]}</div>`;
	};
	poner2+=`<br><div style="clear: both"></div>`;
	for (var i = 0; i < arrayDirecciones.length; i++) {
		poner2+=`<div class="respuesta-txt-class-zzz" id="respuesta-txt-id-zzz-${i}"  style="width: 20px; height:20px; float: left; border-style: solid; border-width: 2px;  border-color: white;" onclick="contestarDireccion(zzz,'${arrayDirecciones[i]}','${i}');">${arrayDirecciones[i]}</div>`;
	};

  poner2+= `<br></div>`;

  poner = "<input type=\"button\" value=\"Answer\" id=\"answer1\"><br><br><table border=\"1\" style=\"border: 1px solid gray;  border-collapse: collapse;\">";

  z=0;
	for(i=0;i<26;i++){
		if(z>=totalPasadas){
			continue;
		}

		poner += "<tr>";

		if(bMovil){
			tamano=3;
		}

		for(j=0;j<tamano;j++){

			poner3 = poner2;
			poner3 = poner3.replace(/zzz/g,z);
			//console.log(poner3);

			if(modoJuego==1){
				poner += `<td><center>${z+1}</center>  <br> ${poner3}</td>`;


			}else{
				if(z>=totalPasadas){
					poner += `<td>&nbsp;</td>`;

				}else{
					poner += `<td><center>${z+1}</center> <br> ${poner3}</td>`;
				}
			}
			z++;
		}
		poner += "</tr>";
	}
	poner += "</table>";
  
  //$("#screen").html(poner);
  $("#screen").html(poner);
  $("#screen").append("<br><input type=\"button\" value=\"Answer\" id=\"answer\">");

  $("#answer").click(answer);
  $("#answer1").click(answer);
}

correctas = 0;

function answer(){
	etapa = 0;

	location.href = "#top";

  z=0; correctas=0;
  poner = "<div id=\"stats\"></div><br><br><table border=\"0\">";

	for(i=0;i<27;i++){
	 
		poner += "<tr>";

		if(bMovil){
			tamano=3;
		}

		for(j=0;j<tamano;j++){

			border = "";
			//idSelectedItem = selectedItems[z];

			border = " border: 1px solid green;";
			if(selectedItems[z].color!=recall[z].color || selectedItems[z].txt!=recall[z].txt){
				border = " border: 1px solid red;";

				if(modoJuego==1){
					poner += "<td>" +
				      "<div style=\"width 32px; height: 30px !important; " + border + "\">" +
				        "<div style=\"color: #" + selectedItems[z].color + "; width: 20px; height: 40px;  float: left; font-size: 20px;\">" + selectedItems[z].txt + "</div>" + 
				        "<div style=\"color: #" + recall[z].color + "; width: 20px; height: 40px; float: left; font-size: 20px;\">" + recall[z].txt + "</div>" +
				      "</div>" + 
				    "</td>";


				}else{

						if(z>=totalPasadas){
							poner += `<td>&nbsp;</td>`;

						}else{
							bgColor="black";
							if(selectedItems[z].color=="♥" || selectedItems[z].color=="♦")
								bgColor="red";

							bgColor1="black";
							if(recall[z].color=="♥" || recall[z].color=="♦")
								bgColor1="red";

							poner += "<td>" +
								 "<center>" + (z+1) + "</center><br>" +	
						      "<div style=\"width 32px; height: 30px !important; " + border + "\">" +
						        "<div style=\"color: " + bgColor + "; width: 25px; height: 80px;  float: left; font-size: 16px; padding-top: 5px;\">" + selectedItems[z].color + "<span style=\"color: black;\">" + selectedItems[z].txt + "<span>" + "</div>" + 
						        "<div style=\"color: " + bgColor1 + "; width: 25px; height: 80px; float: left; font-size: 16px; padding-top: 5px;\">" + recall[z].color + "<span style=\"color: black;\">" + recall[z].txt + "</span>" +  "</div>" +
						      "</div>" + 
						    "</td>";


						}
				}
				

			}else{
				

				if(modoJuego==1){
					correctas++;

					poner += "<td>" +
					      "<div style=\"width 32px; height: 30px !important; " + border + "\">" +          
					        "<div style=\"color: #" + recall[z].color + "; width: 40px; height: 40px; float: left; font-size: 20px;\"><center>" + recall[z].txt + "</center></div>" +
					      "</div>" + 
					    "</td>";
				}else{
					if(z>=totalPasadas){
							poner += `<td>&nbsp;</td>`;

						}else{
							correctas++;

							bgColor1="black";
							if(recall[z].color=="♥" || recall[z].color=="♦")
								bgColor1="red";

							poner += "<td>" +
							"<center>" + (z+1) + "</center><br>" +	
					      "<div style=\"width 32px; height: 30px !important; " + border + "\">" +          
					        "<div style=\"color: " + bgColor1 + "; width: 50px; height: 80px; float: left; font-size: 16px;  padding-top: 5px;\"><center>" + recall[z].color + "<span style=\"color: black;\">" + recall[z].txt + "</span>" + "</center></div>" +
					      "</div>" + 
					    "</td>";

						}
				}
			}

			z++;
		}//for j
		poner += "</tr>";
	}//for i
	poner += "</table>";

	bStart=0;
	$("#start-btn").val("start");
	$("#go-txt").html("GO!");

	myDate =  new Date();
	month = myDate.getMonth(); fullYear = myDate.getFullYear(); day = myDate.getDay(); date = myDate.getDate(); year = myDate.getYear();
	ponerFecha = (month+1) + "/" + date + "/" + fullYear + "<br>";

	if(modoJuego==1){

		tt = (parseInt(tamano)*parseInt(tamano));
		porcent = correctas * 100 / tt; 

		t_dif = t_fin - t_ini;

		$("#screen").html(poner);
		$("#screen").append("<br><br><div style=\"background-color: #3fad46; color:white; width 500px;\">You got " + correctas + " out of " + tt + " attempted! (" + porcent.toFixed(2)  + "% accuracy) in " + getDuration(t_dif) + ", " + ponerFecha +  "</div>");
		// $("#screen").append("<br><input type=\"button\" value=\"Agregar al Ranking\" id=\"addRank\">");

	}else{

		tt = (parseInt(tamano)*parseInt(tamano));
		porcent = correctas * 100 / totalPasadas; 

		t_dif = t_fin2 - t_ini;

		$("#screen").html(poner);

		//$("#screen").append("<br><br><div style=\"background-color: #3fad46; color:white; width 500px;\">You got " + correctas + " out of " + totalPasadas + " attempted! (" + porcent.toFixed(2)  + "% accuracy) in " + getDuration(t_dif) + ", " + ponerFecha +  "</div>");
		
		$("#stats").append("<br><br><div style=\"background-color: #3fad46; color:white; width 500px;\">You got " + correctas + " out of " + totalPasadas + " attempted! (" + porcent.toFixed(2)  + "% accuracy) in " + getDuration(t_dif) + ", " + ponerFecha +  "</div>");
		// $("#screen").append("<br><input type=\"button\" value=\"Agregar al Ranking\" id=\"addRank\">");

	}
}


function contestarDireccion(x,y,z){

	if(recall[x].txt==y){
		$(".respuesta-txt-class-"+x).css("border-color","white");
		recall[x].txt="x";
		return;
	}

  //console.log(x + " = " + y);
  //$("#respuesta"+x).css("background-color",y);
  $(".respuesta-txt-class-"+x).css("border-color","white");

  $("#respuesta-txt-id-"+x+"-"+z).css("border-color","black");
  recall[x].txt=y;
}

function contestarColor(x,y,z){
	if(recall[x].color==y){
		$(".respuesta-color-class-"+x).css("border-color","white");
		recall[x].color="x";
		return;
	}

  //console.log(x + " = " + y);
  $(".respuesta-color-class-"+x).css("border-color","white");

  $("#respuesta-color-id-"+x+"-"+z).css("border-color","black");
  //$("#respuesta"+x).css("background-color",y);
  recall[x].color=y;
  
}

$(document).keydown(function(event) {
	
	if (event.which==39){

		if(etapa==0){

			noTime=1;
			$("#noTime").prop( "checked", true );

			$("#next-btn").css("width","50%");
			$("#go-btn").css("width","50%");

			jugarRapid(1);

			return;

		}

		//nextCard
		if(etapa==1 && noTime){
			nt_t_fin =  Date.now();
			lastNoTimeArray[pasadas] = parseInt(nt_t_fin - nt_t_ini);

			t_fin2 = Date.now();

			$("#screen").html("");

			

			pasadas+=cartasByFlash;

			if(pasadas>=totalPasadas){

				//$("#screen").append("<br><br><center><input type=\"button\" value=\"Recall\" id=\"recall\"></center>");

				recall1();

				return;
			}


			jugarRapid(2);


		}//etapa==1

		
	}//event
});

function next(){
	if(etapa==0){

			noTime=1;
			$("#noTime").prop( "checked", true );

			$("#next-btn").css("width","50%");
			$("#go-btn").css("width","50%");

			jugarRapid(1);

			return;

	}


	//next
	if(etapa==1 && noTime){
		nt_t_fin =  Date.now();
		lastNoTimeArray[pasadas] = parseInt(nt_t_fin - nt_t_ini);

		t_fin2 = Date.now();

		$("#screen").html("");

		pasadas+=cartasByFlash;

		if(pasadas>=totalPasadas){

			//$("#screen").append("<br><br><center><input type=\"button\" value=\"Recall\" id=\"recall\"></center>");

			recall1();

			return;
		}

		jugarRapid(2);

	}

}

var getDuration = function(millis){
	var dur = {};
	var units = [
	    {label:"millis",    mod:1000},
	    {label:"seconds",   mod:60},
	    {label:"minutes",   mod:60},
	    {label:"hours",     mod:24},
	    {label:"days",      mod:31}
	];
	// calculate the individual unit values...
	units.forEach(function(u){
	    millis = (millis - (dur[u.label] = (millis % u.mod))) / u.mod;
	});
	// convert object to a string representation...
	var nonZero = function(u){ return dur[u.label]; };
	dur.toString = function(){
	    return units
	        .reverse()
	        .filter(nonZero)
	        .map(function(u){
	            return dur[u.label] + " " + (dur[u.label]==1?u.label.slice(0,-1):u.label);
	        })
	        .join(', ');
	};
	return dur;
};