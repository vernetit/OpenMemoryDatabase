// You can also require other files to run in this process
require('./renderer.js')
const fs= require("fs");
// const ipc = require('electron').ipcRenderer

// ipc.send('hola')
// ipc.on('papa',function(event){
//   console.log("papa");

// });


function n(x){ return parseInt($("#"+x).val()); }


fd="";
var arrayDirs=[];

fs.readdir('words/', (err, dir) => {
   sel=`<select id="img-select" onchange="/*openFiles(this.value);*/">
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
    fd=arrayDirs[_.random(0,arrayDirs.length-1)];

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

myFile="";

function openFiles(fdx){

    if(parseInt(fdx)==-1){
      fd=arrayDirs[_.random(0,arrayDirs.length-1)];

    }else{
      fd=fdx;

    }

   // const fs = require("fs");

    // // Asynchronous read
    // fs.readFile(fd, function (err, data) {
    //   if (err) {
    //     return console.error(err);
    //   }
    //   console.log("Asynchronous read: " + data.toString());
    // });

    // Synchronous read
    myFile = fs.readFileSync("words/"+fd);
    //alert("Synchronous read: " + data.toString());
    //console.log("Program Ended");

      

    return;
}



if (window.location.href.substr(-2) !== '?r') {
    location.reload();


    window.location.href = window.location.href + '?r';
    //alert(window.location);
}







$("#recall-link").hide();
$("#answer-link").hide();

mode=41;

t_ini = 0, t_fin = 0, t_fin2 = 0, t_dif = 0, t_total = 0;


function answer(){
  mode=2;

  $("#screen").show();
  $("#screen-pregunta").hide();

  $("#definition").show();
  $("#answer-link").hide();

  correctas=0;

  for(i=0;i<preguntas.length;i++){

    $("#mostrar-"+i).append(preguntas[i]+" - "); 

    if(normalize(preguntas[i].toLowerCase())==normalize($("#respuesta-"+i).val().toLowerCase())){
      correctas++;
       $("#respuesta-"+i).css("border-color","green"); 
       $("#mostrar-"+i).css("color","green"); 
     
    }else{

      $("#respuesta-"+i).css("border-color","red");
      $("#respuesta-"+i).css("border-style","dotted");
      $("#mostrar-"+i).css("color","red"); 

    }
  }

  /*
  $(".dropdown").mouseout(function(){
    $(this).next('.dropdown-content').hide();

  });


  $(".dropdown").mouseover(function(){
    //console.log("hola");

    //$(".dropdown-content").show();
    $(this).next('.dropdown-content').show();
    $(this).next('.dropdown-content').mouseout(function(){
      $('.dropdown-content').hide();


    });


  });
  */

  cantidad=n("cantidad"); 

  total = cantidad;
  porcent = correctas * 100 / total;

  porcent = porcent.toFixed(2);

  myDate =  new Date();
  month = myDate.getMonth(); fullYear = myDate.getFullYear(); day = myDate.getDay(); date = myDate.getDate(); year = myDate.getYear();
  ponerFecha = (month + 1) + "/" + date + "/" + fullYear + "<br>";


  t_dif = t_fin - t_ini;

  //$("#stats").html(`tiempo: ${getDuration(t_dif)}`);
  $("#recall").append("<br><br><div style=\"clear: both;\"></div><div style=\"background-color: #3fad46; color:white; width 500px; margin-top: 20px;\">You got " + correctas + " out of " + total + " attempted! (" + porcent  + "% accuracy) in " + getDuration(t_dif) + " " + ponerFecha +  "</div>");

  setTimeout(function(){ mode=3;  },1000);

$(document).keypress(function(e) {
  

  //console.log(e.which);


    switch(e.which) {

      case 13: // right
          if(mode==3){
            goNew();
            return;
          }


      break;

  }

  // prevent the default action (scroll / move caret)
});

}

preguntas = [];
respuestas = [];
xx=0;

function recall(){
  mode=1;

  t_fin = Date.now();
  $("#screen").hide();
  $("#recall").show();
  $("#definition").hide();
  $("#recall-link").hide();
  $("#answer-link").show();

  xx=0;
  $( "#screen a" ).each( function( index, element ){
    //console.log( $( this ).text() );
    preguntas[xx]=$( this ).text();
    //${$( this ).text()}
    $("#recall").append(`<div style="float: left;"><div class="dropdown">${(xx+1)}-<span id="mostrar-${xx}"></span><input type="text" value="" id="respuesta-${xx}" style="width: 80px;">&nbsp;</div><div class="dropdown-content">${preguntas[xx]}</div></div>`)

    $(".dropdown-content").hide();
    
    eval(`
        $("#respuesta-${xx}").keydown(function(event) {
        console.log(event.which);
        if(event.which==13) 
        {
          if(mode==2 || mode==3) return;
          answer();
        }

        if(event.which==39) 
        { 
         $("#respuesta-${xx+1}").focus();
        }

        if(event.which==37) 
        { 
          if(${xx}!=0){
            $("#respuesta-${xx-1}").focus();

          }  
        }

      });

    `);


   
  
    xx++;
  });

  $("#respuesta-0").focus();
}

// function loadUrl(x){
//   <?=$tipo>4?"return;":""?>
//   $("#frame").attr("src", "http://dirae.es/palabras/"+x);
// }

//const fs = require("fs");

//Voy a la palabra
function goNew(){

  $("#screen").html("");
  //window.location.href = "/memoryWord?cantidad="+$("#cantidad").val()+"&tipo="+$("#tipo").val()+"&mode="+$("#mode").val()+"&delay="+$("#delay").val();
  $("#answer-link").hide();
  $("#recall").hide();

  $("#recall").html("®re");

  $("#results-span").html("");

  $("#screen").show();
  $("#screen-pregunta").show();

  t_ini = Date.now();
  mode=0;

   cantidad=n("cantidad"); 

   fdx=$("#img-select").val();

    if(parseInt(fdx)==-1){
      fd=arrayDirs[_.random(0,arrayDirs.length-1)];

    }else{
      fd=fdx;

    }

    $("#recall-link").show();

    

    // // Asynchronous read
    // fs.readFile(fd, function (err, data) {
    //   if (err) {
    //     return console.error(err);
    //   }
    //   console.log("Asynchronous read: " + data.toString());
    // });

    // Synchronous read
    myFile = fs.readFileSync("words/"+fd, 'utf8');
    //alert("Synchronous read: " + data.toString());
    //console.log("Program Ended");

    myArray=myFile.toString().split("\n");
    myArray=_.shuffle(myArray);

    myArray=_.first(myArray,cantidad);

    poner="<br><br>";

    for(i=0;i<myArray.length;i++){

      poner+=`

      <div style="float: left;">${i+1} - <a href="#"style="color: black;">${myArray[i]}</a>&nbsp;</div>

      `;


    }

    $("#screen").html(poner);

}

posicion=0; cadena=[]; bPlay=0;

function play(){
  bPlay = !bPlay

  if(bPlay){
    //$("#play-btn").html("stop");

    xx=0;

    $( "#screen a" ).each( function( index, element ){
    
      cadena[xx]=$( this ).text();
      xx++;

    });

    //console.log(cadena);
    posicion = 0;

    msg = new SpeechSynthesisUtterance(cadena[posicion]);

    msg.rate = 1;

    if (!navigator.appVersion.indexOf("Mac")){
      //console.log("no mac");
      if(language)
        msg.lang="en-US";
      else{
        //console.log("es-Es");
        msg.voiceURI = 'Google español';
        msg.lang="es-ES";
      }
    }
    //if (navigator.appVersion.indexOf("Win")!=-1){
      
    // <? if($bQ){ ?> 
    // msg.voice = currentEnglishVoice;

    // <? }else{ ?>
    // msg.voice = currentSpanishVoice;
    // <? } ?>
    
    //console.log("window");
    //}
    //console.log(navigator.appVersion);

    msg.volume = 0.99;

    window.speechSynthesis.speak(msg);
    //console.log(posicion);
    //console.log(cadena);

    msg.onend = function(e) {
        if(bPlay){
          posicion++;
          setTimeout(function(){

            avanza();
          },n("delay"));
        } 
    };


  }else{
    //$("#play-btn").html("play");
  }
}


function avanza(){
  msg = new SpeechSynthesisUtterance(cadena[posicion]);

  msg.rate = 1;


  if (!navigator.appVersion.indexOf("Mac")){
    //console.log("no mac");
    if(language)
      msg.lang="en-US";
    else{
     // console.log("es-Es");
      msg.voiceURI = 'Google español';
      msg.lang="es-ES";
    }
  }
  //if (navigator.appVersion.indexOf("Win")!=-1){
    
  
  // <? if($bQ){ ?> 
  //   msg.voice = currentEnglishVoice;

  // <? }else{ ?>
  //   msg.voice = currentSpanishVoice;
  // <? } ?>
  //console.log("window");
  //}
  //console.log(navigator.appVersion);

  msg.volume = 0.99;

  window.speechSynthesis.speak(msg);
  
  //console.log(posicion);
  //console.log(cadena);

  msg.onend = function(e) {
      if(bPlay){
        posicion++;
        if(posicion>=cadena.length){
          //console.log("fin");
          bPlay=0;
          posicion=0;
          //$("#play-btn").html("play");
          recall();
          return;
        }
        setTimeout(function(){

            avanza();
        },n("delay"));
        
      }
    
  };
}

$(document).keypress(function(e) {
  

  //console.log(e.which);


  

    switch(e.which) {

      case 13: // right
          if(mode==41){
            goNew();
            return;
          }


          if(mode>0) return;
          recall();
      break;

  }

  // prevent the default action (scroll / move caret)
});

var normalize = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};
 
  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );
 
  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }      
      return ret.join( '' );
  }
 
})();

// <? $mode=1; if(isset($_GET["mode"])){ $mode=intval($_GET["mode"]); } ?>
// <? if($mode==2){ ?> play(); <? } ?>