// You can also require other files to run in this process
require('./renderer.js')
const fs= require("fs");
// const ipc = require('electron').ipcRenderer

// ipc.send('hola')
// ipc.on('papa',function(event){
//   console.log("papa");

// });


function n(x){ return parseInt($("#"+x).val()); }


if (window.location.href.substr(-2) !== '?r') {
    location.reload();


    window.location.href = window.location.href + '?r';
    //alert(window.location);
}


bHelp=0;

function help(){
  $("#results-span").html("");

  bHelp=!bHelp;

  if(bHelp){
    $('#screen').html('<br><b>Memory Number!</b><br><br>Press enter to Recall and Answer, Arrow keys to move over the numer inputs on recall step.<br><!--<br>contact: robertchalean@gmail.com-->');
  }else{
    $("#screen").html('');


  }
}

$("#tipo").hide();
$("#config-btn").hide();

modo=0; cifras=2; limiteIzq=0; limiteDer=99;

arrayNumbers=[]; currentTd=0; currentFila=1; currentColumna=1; 

t_ini = 0, t_fin = 0, t_dif = 0, t_total = 0; currentTd=0;
t_ini1 =0, t_fin1 = 0, t_dif1 = 0, t_total1 = 0;

good=0; errors=0;

var z=0;

currentEtapa = 2; //etapa del juego question, recall, answer.

var killTimeout;

$("#recall-btn").hide();
$("#answer-btn").hide();

function play(){

  currentEtapa = 0;

  $("#results-span").html("");

  //decimal
  if(modo==0){
    currentTd=0;

    arrayNumbers = [];

    t=n("tiempo");

    limitI = 0; 

    if(t==5){ limitI=1000/(20*cifras); }
    if(t==15){ limitI=1500/(20*cifras); }
    if(t==30){ limitI=2000/(20*cifras); }
    if(t==60){ limitI=3200/(20*cifras); }

    limitI=parseInt(limitI)+2;

    if(cifras==1){}
    if(cifras==1){}

    poner=`<br><table>`;

    z=0;
    for(i=0;i<limitI;i++){
      if(i==1){
        poner +=`<tr  style="background-color: #d7e5f8; color: #4b5e4f; font-size: 20px;">`;

      }
      if(i>1){
        poner +=`<tr>`;

      }
      
      for(j=0;j<21;j++){
        tdWidth=``;
        if(cifras==1){
          tdWidth=` width="20"`;
        }

        if(i<2){
          if(i==0){
            if(j==0){
              poner += `<td style="background-color: silver; color: black; font-size: 20px; border: 0.5px solid white;" align="center">&nbsp;</td>`;

            }else{
              //numero columna
              poner += `<td style="background-color: silver; color: black; font-size: 20px; border: 0.5px solid white;" align="center" id="columna-${j}" ${tdWidth}><b>${j}</b></td>`;

            }
            

          }
          if(i==1){
            //espacio
            poner += `<td style="background-color: #d7e5f8; color: #4b5e4f; font-size: 20px;" align="center">&nbsp;</td>`;

          }


        }else{
          if(j==0){
            //numero fila
            poner += `<td style="background-color: #83abe3; color: #4b5e4f; font-size: 20px; border: 1px solid white;" align="center" id="fila-${i-1}"><b>${i-1}</b></td>`;
          }else{
            //numero a memorizar
            _n = _.random(limiteIzq,limiteDer);
            

            tamano = (_n+"").length;
            //console.log(tamano + "-" + _n + "-" + cifras);

            if(tamano<cifras){
              _p="";
              for(k=0;k<cifras-tamano;k++){
                _p += "0";
              }
              _n= _p + "" + _n;
            }

            arrayNumbers[z] = _n;

            poner += `<td id="td-${z}" style="background-color: #e6f4e9; color: #8aa08f; font-size: 20px; border: 1px solid #adc6b3;"  align="center">${_n}</td>`;

            z++;

          }//j==0
        }//i<2        
      }//for j
      poner +=`</tr>`;
    }//for i
    poner +=`</table>`;


    $("#screen").html(poner);

    $("#columna-1").css("background-color","#aceac1");
    $("#fila-1").css("background-color","#aceac1"); 
    
    $("#td-0").css("background-color","#e5f994"); $("#td-0").css("color","#400000"); 

    $("#recall-btn").show();

    killTimeout = setTimeout(()=>{
      recall();


    },n("tiempo")*60*1000);


  }else{ //modo==0



  } //modo==0

  t_ini = Date.now();
}

function recall(){

  $("#recall-btn").hide();
  $("#answer-btn").show();

  currentEtapa = 1;

  t_fin = Date.now();
  t_ini1 = Date.now();
  clearTimeout(killTimeout)

  $("#screen").html();

  //decimal
  if(modo==0){
    currentTd=0;

    t=n("tiempo");

    limitI = 0; 

    if(t==5){ limitI=1000/(20*cifras); }
    if(t==15){ limitI=1500/(20*cifras); }
    if(t==30){ limitI=2000/(20*cifras); }
    if(t==60){ limitI=3200/(20*cifras); }

    limitI=parseInt(limitI)+2;

    if(cifras==1){}
    if(cifras==1){}

    poner=`<br><table>`;

    z=0;
    for(i=0;i<limitI;i++){
      if(i==1){
        poner +=`<tr  style="background-color: #d7e5f8; color: #4b5e4f; font-size: 20px;">`;

      }
      if(i>1){
        poner +=`<tr>`;

      }
      
      for(j=0;j<21;j++){
        tdWidth=``;
        if(cifras==1){
          tdWidth=` width="20"`;
        }

        if(i<2){
          if(i==0){
            if(j==0){
              poner += `<td style="background-color: silver; color: black; font-size: 20px; border: 0.5px solid white;" align="center">&nbsp;</td>`;

            }else{
              //numero columna
              poner += `<td style="background-color: silver; color: black; font-size: 20px; border: 0.5px solid white;" align="center" id="columna-${j}" ${tdWidth}><b>${j}</b></td>`;

            }
            

          }
          if(i==1){
            //espacio
            poner += `<td style="background-color: #d7e5f8; color: #4b5e4f; font-size: 20px;" align="center">&nbsp;</td>`;

          }


        }else{
          if(j==0){
            //numero fila
            poner += `<td style="background-color: #83abe3; color: #4b5e4f; font-size: 20px; border: 1px solid white;" align="center" id="fila-${i-1}"><b>${i-1}</b></td>`;
          }else{

            /*
            //numero a memorizar
            _n = _.random(limiteIzq,limiteDer);
            arrayNumbers[z] = _n;

            tamano = (_n+"").length;
            //console.log(tamano + "-" + _n + "-" + cifras);

            if(tamano<cifras){
              _p="";
              for(k=0;k<cifras-tamano;k++){
                _p += "0";
              }
              _n= _p + "" + _n;
            }
            */

            poner += `
            <td id="td-${z}" style="background-color: #e6f4e9; color: #8aa08f; font-size: 20px; border: 1px solid #adc6b3;"  align="center">
                <input type="number" style="width: 40px;" value="" id="number-${z}">
            </td>

            `;

            z++;

          }//j==0
        }//i<2        
      }//for j
      poner +=`</tr>`;
    }//for i
    poner +=`</table>`;


    $("#screen").html(poner);

    $("#columna-1").css("background-color","#aceac1");
    $("#fila-1").css("background-color","#aceac1"); 
    
    $("#td-0").css("background-color","#e5f994"); $("#td-0").css("color","#400000"); 
    $("#number-0").css("background-color","#e5f994"); 

    
    $("#number-0").focus();

    a=0;
    for(i=0;i<z;i++){

      eval(`
        $("#number-${a}").click(function(){

          $("#td-"+currentTd).css("background-color","#e6f4e9");
          $("#number-"+currentTd).css("background-color","white"); 

          restTd = currentTd%20+1; 

            if(restTd==1){
              $("#columna-20").css("background-color","silver");
            }

            $("#columna-"+( restTd) ).css("background-color","silver");


            //cf=parseInt((currentTd+1)/20)+1;

            $("#fila-"+currentFila).css("background-color","#83abe3");

          currentTd=${a}; 

          $("#td-"+currentTd).css("background-color","#e5f994"); $("#td-"+currentTd).css("color","#400000"); 

            $("#number-"+currentTd).css("background-color","#e5f994"); 

            _cf=parseInt((currentTd)/20);
            
            if(_cf==0){  _cf=1; }else{
              _cf++;   


            }
            

            //console.log(currentTd+"-"+_cf);      
            $("#fila-"+(_cf+"")).css("background-color","#aceac1"); 
            currentFila = _cf;

                  
            restTd = currentTd%20+1; 

            if(restTd==1){
              $("#columna-20").css("background-color","silver");
            }


            //$("#columna-"+( restTd-1) ).css("background-color","silver");
            
            $("#columna-"+ restTd ).css("background-color","#aceac1");

            $("#number-${a}").focus();
          $("#number-${a}").select();

        });
        
        $("#number-${a}").keypress(function(){
            //console.log("${a}");

          setTimeout(()=>{

            len=($("#number-${a}").val()+"").length;

            if(len==cifras){

              $("#number-${a+1}").css("background-color","#e5f994"); 
              $("#number-${a}").css("background-color","white"); 

              $("#number-${a+1}").focus();
              $("#number-${a+1}").select();

              $("#td-"+currentTd).css("background-color","#e6f4e9"); 
      
                currentTd++;

                $("#td-"+currentTd).css("background-color","#e5f994");

                if(currentTd%20==0){
                  $("#fila-"+currentFila).css("background-color","#83abc3");

                  currentFila++;

                  $("#fila-"+currentFila).css("background-color","#aceac1");
                }

                restTd = currentTd%20+1; 

                if(restTd==1){
                  $("#columna-20").css("background-color","silver");
                }


                $("#columna-"+( restTd-1) ).css("background-color","silver");
                
                $("#columna-"+ restTd ).css("background-color","#aceac1");



            }//len == cifras


          },5); //timeout
          
        }); //change

      `); //eval

      a++;


    }//for i


  }else{ //modo==0



  } //modo==0
}

arrayRespuestas = [];

function answer(){

  currentEtapa = 2;

  $("#answer-btn").hide();

  t_fin1 = Date.now();

  arrayRespuestas=[];

  for(i=0;i<z;i++){

    n0=$("#number-"+i).val();

    if(n0=="" || n0.length!=cifras ){

      if(n0!=""){

        tamano = n0.length;

      
        _p="";
        for(k=0;k<cifras-tamano;k++){
          _p += "0";
        }

        _n= _p + "" + n0;
        
        arrayRespuestas[i] = _n;

      }else{
        arrayRespuestas[i]="-1";

      }
      
    }else{
      arrayRespuestas[i]=n0;

    } 
  }

  //console.log(arrayRespuestas)


  $("#screen").html();
  //decimal
  if(modo==0){
    errors=0; good=0;
    currentTd=0;

    t=n("tiempo");

    limitI = 0; 

    if(t==5){ limitI=1000/(20*cifras); }
    if(t==15){ limitI=1500/(20*cifras); }
    if(t==30){ limitI=2000/(20*cifras); }
    if(t==60){ limitI=3200/(20*cifras); }

    limitI=parseInt(limitI)+2;

    if(cifras==1){}
    if(cifras==1){}

    poner=`<br><br><br><br><br><br><table>`;

    z=0;
    for(i=0;i<limitI;i++){
      if(i==1){
        poner +=`<tr  style="background-color: #d7e5f8; color: #4b5e4f; font-size: 20px;">`;

      }
      if(i>1){
        poner +=`<tr>`;

      }
      
      for(j=0;j<21;j++){
        tdWidth=``;
        if(cifras==1){
          tdWidth=` width="20"`;
        }

        if(i<2){
          if(i==0){
            if(j==0){
              poner += `<td style="background-color: silver; color: black; font-size: 20px; border: 0.5px solid white;" align="center">&nbsp;</td>`;

            }else{
              //numero columna
              poner += `<td style="background-color: silver; color: black; font-size: 20px; border: 0.5px solid white; min-width:40px;" align="center" id="columna-${j}" ${tdWidth}><b>${j}</b></td>`;

            }
            

          }
          if(i==1){
            //espacio
            poner += `<td style="background-color: #d7e5f8; color: #4b5e4f; font-size: 20px;" align="center">&nbsp;</td>`;

          }


        }else{
          if(j==0){
            //numero fila
            poner += `<td style="background-color: #83abe3; color: #4b5e4f; font-size: 20px; border: 1px solid white;" align="center" id="fila-${i-1}"><b>${i-1}</b></td>`;
          }else{

            /*
            //numero a memorizar
            _n = _.random(limiteIzq,limiteDer);
            arrayNumbers[z] = _n;

            tamano = (_n+"").length;
            //console.log(tamano + "-" + _n + "-" + cifras);

            if(tamano<cifras){
              _p="";
              for(k=0;k<cifras-tamano;k++){
                _p += "0";
              }
              _n= _p + "" + _n;
            }
            */

            arrayMicroResp=[];

            n0=""+arrayNumbers[z];
            n1=""+arrayRespuestas[z];

            //console.log(parseInt(n1)!=-1);

            if(parseInt(n1)!=-1){
              for(k=0;k<cifras;k++){

              
                //console.log( parseInt(n0[k]) + "-" + parseInt(n1[k]) );

                if( parseInt(n0[k]) != parseInt(n1[k]) ){
                    
                  arrayMicroResp[k]=0;
                  errors++;
                }else{
                  arrayMicroResp[k]=1;
                  good++;
                }
              }//for k;

              //console.log(arrayMicroResp);


              _poner=`<table><tr>`;       

              for(k=0;k<cifras;k++){
                
                myColor="#a0dd8c"; 
                
                if(!arrayMicroResp[k])
                  myColor="#ffb9b9"; 
                  
                _poner += `<td style="background-color: ${myColor}; color: black;">
                        <b>${n0[k]}</b>
                        <br>
                        <b>${n1[k]}</b>
                      </td>`;
              }
              _poner+=`</tr></table>`;

            }else{ 
              /*
              for(k=0;k<cifras;k++){

              
                //console.log( parseInt(n0[k]) + "-" + parseInt(n1[k]) );
                
                if( parseInt(n0[k]) != parseInt(n1[k]) ){
                    
                  arrayMicroResp[k]=0;
                  errors++;
                }else{
                  arrayMicroResp[k]=1;
                  good++;
                }
              }//for k;
              */
              //console.log(arrayMicroResp);


              _poner=`<table><tr>`;       

              for(k=0;k<cifras;k++){
                
                myColor="#a0dd8c"; 
                
                if(!arrayMicroResp[k])
                  myColor="#ffb9b9"; 
                  
                _poner += `<td style="background-color: white; color: black;">
                        <b>${n0[k]}</b>
                        <br>
                        <b>&nbsp;</b>
                      </td>`;
              }
              _poner+=`</tr></table>`;

              /*
              _poner += `<td style="background-color: white; color: black;">
                        <b>${n0[k]}</b>
                        <br>
                        <b>&nbsp;</b>
                      </td>`;*/
            }

            //console.log(_poner);
                    
            poner += `
            <td id="td-${z}" style="font-size: 20px; border: 1px solid #adc6b3;" align="center">
              ${_poner}
            </td>

            `;

            z++;

          }//j==0
        }//i<2        
      }//for j
      poner +=`</tr>`;
    }//for i
    poner +=`</table>`;

    $("#screen").html(poner);

    total = good+errors;
    if(total==0) total=1;
    porcent = good * 100 / total; 

    t_dif = t_fin - t_ini;
    t_dif1 = t_fin1 - t_ini1;

    myDate =  new Date();
    month = myDate.getMonth(); fullYear = myDate.getFullYear(); day = myDate.getDay(); date = myDate.getDate(); year = myDate.getYear();
    ponerFecha = (month+1) + "/" + date + "/" + fullYear + "<br>";

    poner = `
      <br><br>

      ${good}-${errors} ${porcent.toFixed(2)}% ${ponerFecha}  <!-- Total: ${total} -->  <br>
      
      Memorization time: ${getDuration(t_dif)}  <br>
      Recall time: ${getDuration(t_dif1)}  <br>
    `;


    $("#results-span").html(poner);

  }else{ //modo==0



  } //modo==0
}


$("#bin-span").hide();

$("#tipo").change(()=>{
  if(n("tipo")){
    $("#bin-span").show();
    $("#dec-span").hide();
    modo=1;

  }else{
    modo=0;

    $("#bin-span").hide();
    $("#dec-span").show();
  }
});

$("#cifras").change(()=>{
  c=n("cifras");
  if(c==0){ $("#limiteIzq").val("0"); $("#limiteDer").val("9"); cifras=1; }
  if(c==1){ $("#limiteIzq").val("0"); $("#limiteDer").val("99"); cifras=2; }
  if(c==2){ $("#limiteIzq").val("0"); $("#limiteDer").val("999"); cifras=3; }
  if(c==3){ $("#limiteIzq").val("0"); $("#limiteDer").val("9999");  cifras=4; }

  limiteIzq = n("limiteIzq");
  limiteDer = n("limiteDer");
});

$("#limiteIzq, #limiteDer").change(()=>{
  limiteIzq = n("limiteIzq");
  limiteDer = n("limiteDer");
});
  
function n(x){ return parseInt($("#"+x).val()); }

direccion=0;


$(document).keydown(function(e) {
  // // prevent the default action (scroll / move caret)
  
  //console.log(e.which);

  //if(currentEtapa !=0) return;

  switch(e.which) {
        case 13: 
          
          if(currentEtapa==0){ recall(); break; }
          if(currentEtapa==1){ answer(); break; }
          if(currentEtapa==2){ play(); break; }

          break;

        case 37: // left

          if(currentTd==0)
            break;
          
                    
        $("#number-"+currentTd).css("background-color","white"); 

          $("#td-"+currentTd).css("background-color","#e6f4e9"); $("#td-"+currentTd).css("color","#8aa08f"); 
          
          currentTd--;

          $("#td-"+currentTd).css("background-color","#e5f994"); $("#td-"+currentTd).css("color","#400000"); 

          $("#number-"+currentTd).css("background-color","#e5f994"); 

          if(currentTd%20==19){

            $("#fila-"+currentFila).css("background-color","#83abe3");

            

            currentFila--; 

            $("#fila-"+currentFila).css("background-color","#aceac1");
            
          }

          restTd = currentTd%20+1; 

          if(restTd==1){
            $("#columna-20").css("background-color","silver");
          }


          $("#columna-"+( restTd+1) ).css("background-color","silver");
          
          $("#columna-"+ restTd ).css("background-color","#aceac1");

          if(currentEtapa==1){

            $("#number-"+currentTd).focus(); 
            $("#number-"+currentTd).select(); 

          }

        
          
        break;

         case 65: // left
          direccion=0;
          
        break;

        case 38: // up
          if(currentTd-20<0)
            break;
          
                    
        $("#number-"+currentTd).css("background-color","white"); 

          $("#td-"+currentTd).css("background-color","#e6f4e9"); $("#td-"+currentTd).css("color","#8aa08f"); 
          
          currentTd-=20;

          $("#td-"+currentTd).css("background-color","#e5f994"); $("#td-"+currentTd).css("color","#400000"); 

          $("#number-"+currentTd).css("background-color","#e5f994"); 

          $("#fila-"+currentFila).css("background-color","#83abe3");

          _cf=parseInt((currentTd)/20);
            
          if(_cf==0){  _cf=1; }else{
              _cf++;   


         }      
        
          currentFila=_cf;

          $("#fila-"+currentFila).css("background-color","#aceac1");

          restTd = currentTd%20+1; 

          if(restTd==1){
            $("#columna-20").css("background-color","silver");
          }


          $("#columna-"+( restTd+1) ).css("background-color","silver");
          
          $("#columna-"+ restTd ).css("background-color","#aceac1");

          if(currentEtapa==1){

            $("#number-"+currentTd).focus(); 
            $("#number-"+currentTd).select(); 

          }


        break;

        case 87: // up
          direccion=2;

          
        break;

        case 39: // right   

          if(currentTd==z-1)
            break;
  
          $("#td-"+currentTd).css("background-color","#e6f4e9"); $("#td-"+currentTd).css("color","#8aa08f"); 

          $("#number-"+currentTd).css("background-color","white"); 
        
          currentTd++;

          $("#td-"+currentTd).css("background-color","#e5f994"); $("#td-"+currentTd).css("color","#400000"); 

          $("#number-"+currentTd).css("background-color","#e5f994"); 

          if(currentTd%20==0){
            $("#fila-"+currentFila).css("background-color","#83abe3");

            currentFila++;

            $("#fila-"+currentFila).css("background-color","#aceac1");
          }

          restTd = currentTd%20+1; 

          if(restTd==1){
            $("#columna-20").css("background-color","silver");
          }


          $("#columna-"+( restTd-1) ).css("background-color","silver");
          
          $("#columna-"+ restTd ).css("background-color","#aceac1");

          if(currentEtapa==1){

            $("#number-"+currentTd).focus(); 
            $("#number-"+currentTd).select(); 
            
          }
        break;

        case 68: // right
          direccion=1;
        break;

        case 40: // down
          if(currentTd+20>z-1)
            break;

          console.log("up");
  
          $("#td-"+currentTd).css("background-color","#e6f4e9"); $("#td-"+currentTd).css("color","#8aa08f"); 

          $("#number-"+currentTd).css("background-color","white"); 
        
          currentTd+=20;

          $("#td-"+currentTd).css("background-color","#e5f994"); $("#td-"+currentTd).css("color","#400000"); 

          $("#number-"+currentTd).css("background-color","#e5f994"); 

          $("#fila-"+currentFila).css("background-color","#83abe3");

          _cf=parseInt((currentTd)/20);
            
          if(_cf==0){  _cf=1; }else{
              _cf++;   


         }      
        
          currentFila=_cf;

          $("#fila-"+currentFila).css("background-color","#aceac1");
          

          restTd = currentTd%20+1; 

          if(restTd==1){
            $("#columna-20").css("background-color","silver");
          }


          $("#columna-"+( restTd-1) ).css("background-color","silver");
          
          $("#columna-"+ restTd ).css("background-color","#aceac1");

          if(currentEtapa==1){

            $("#number-"+currentTd).focus(); 
            $("#number-"+currentTd).select(); 
          
          }
          
        break;

        case 83: // down
          direccion=3;
          
        break;

        default: return; // exit this handler for other keys
    }

    e.preventDefault();
  
    
});


//start();
//recall();