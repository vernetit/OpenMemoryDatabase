// You can also require other files to run in this process
require('./renderer.js')
const fs= require("fs");

Waud.init();

// const ipc = require('electron').ipcRenderer

// ipc.send('hola')
// ipc.on('papa',function(event){
//   console.log("papa");

// });

function n(x){ return parseFloat($("#"+x).val()); }


var killTimer;

var tamImage="75px";

fd="";
var arrayDirs=[];

fs.readdir('sounds/', (err, dir) => {
   sel=`<select id="img-select" onchange="openFiles(this.value);">
    <option value="-1">random</option>

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

/*
const selectDirBtn = document.getElementById('select-directory')

selectDirBtn.addEventListener('click', function (event) {
  ipc.send('open-file-dialog')
 
})
*/



//document.getElementById('selected-file').innerHTML = `You selected:`
/*
ipc.on('flash', function () {
  //location.reload();
  //alert("hola");
});
*/
function openFiles(fdx){

    if(parseInt(fdx)==-1){
      fd=arrayDirs[_.random(0,arrayDirs.length-1)];

    }else{
      fd=fdx;

    }

    return;

    fs.readdir('images/'+fd, (err, dir) => {
    
    img="";
    for (var i = 0, path; path = dir[i]; i++) {

      //console.log(""+path.indexOf("."));
      if(path.indexOf(".")!=0){
       
        img+=`<img src="sounds/${fd}/${path}">`;
      }
      if(i==10) break;
    }
    

    $("#images-div").html(img);
 });

}

var t_ini;
var t_fin;
var t_dif;

var cantidadImagenes=n("cantidadImg");

$("#recall-btn").hide(); 
$("#answer-btn").hide(); 

zPreload=0;
zPreload2=0;

function preload(arrayOfImages) {
  
    
    $("#screen").html("Loading...");
    $("#preload").show(); 
    zPreload=0;
    zPreload2++;

    for(i=0;i<arrayImages.length;i++){

      //console.log(`<img src="${arrayImages[i]}" id="imgPreload-${zPreload}">`);

       $("#preload").append(`<img src="${rootDir}${arrayImages[i]}" id="imgPreload-${zPreload}-${zPreload2}" width="32" height="32" style="opacity: 0.1;">`);

       $(`#imgPreload-${zPreload}-${zPreload2}`).on("load",function(){

          imgLoadedCount++; 
          if(imgLoadedCount>cantidadImagenes-1 || imgLoadedCount==totalImages){ 

            if(cantidadImagenes==30) tamImage="65px";
            if(cantidadImagenes==60) tamImage="65px";
            if(cantidadImagenes==90) tamImage="55px";

            $("#screen").html(""); 
            $("#preload").hide(); 
            $("#recall-btn").show(); 
            bRecall=0;
            //$("#controls-div").show();
            killTimer=setTimeout(function(){ if(bRecall){ return; } recall(); },n("timer")*60*1000);

            init(0);
            //recall();
         }
       });

       zPreload++;

    }
    
} 

arrayImages=[];
arrayImagesRespuestas=[];
imgLoadedCount=0;


Array.prototype.extend = function (other_array) {
    /* you should include a test to check whether other_array really is an array */
    other_array.forEach(function(v) {this.push(v)}, this);    
}

//arrayImages1 = _.extend(arrayImages);
arrayImages1 = [];

contador = 1;

function init(x){

  //return recall();

  if(contador>totalImages){

    recall(); return;
  }

  if(contador>maxContador) maxContador=contador;

  if(contador==nextLoad){
    __aux=[];

    for(i=0;i<30;i++){

      if(arrayImages2[nextLoad+15+i]==null) break;

      __aux[i]=arrayImages2[nextLoad+15+i];
      arrayMySound[nextLoad+15+i] = new WaudSound(rootDir+__aux[i]);
      //$("#preload").append(`<img src="${rootDir}${__aux[i]}"  width="32" height="32" style="opacity: 0.1;">`);


    }

    arrayImages.extend(__aux);
    console.log(__aux);

    nextLoad+=30;

  }

  name="";

  if(bShowName) name=`<br>${arrayImages[contador-1].replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, "")}`;

  $("#screen").html(`<center><h3>${contador}</h3>${name}<!--<br><img src="${rootDir}${arrayImages[contador-1]}" class="myImage">--></center>`);

  if(contador>1) arrayMySound[contador-2].stop();
  arrayMySound[contador-1].play();

 
/*
  if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
    $("#screen").append(`
      <br>
      <center><input type="button" value="Next" onclick="next();" style="font-size: 30px;"></center>
    `);
  }*/

  if(x==0){

    t_ini = Date.now();
  }

}

bDebug=0;
bRecall=1;

function next(){
  if(bRecall) return;

  if(contador<totalImages){
    contador++;
    init(1);
  }else{

    recall();
  }

}

$("#answer-control").hide();
var ultimo=0;
var myPosition=0;
var auxRecall=[];

var _myPlay;

function playSound(x){
   // arrayMySound[contador-1].stop();

   
  // var sounds = document.getElementsByTagName('audio');
  // for(i=0; i<sounds.length; i++) sounds[i].pause();

   stopAllSound();

   sel=0;

   for(i=0;i<maxContador;i++){
    

    if(x==arrayImages[i]) sel=i;
      
  }
  arrayMySound[sel].play();

}

function stopAllSound(){
   for(i=0;i<maxContador;i++){ arrayMySound[i].stop(); }

}

var myRow=5;

function recall(){

  t_fin = Date.now();
  myRow=n("myRow")  

  arrayMySound[contador-1].stop();

  $("#recall-btn").hide(); 
  $("#answer-btn").show();

  bRecall=1;

  console.log("recall")

  clearTimeout(killTimer)

  _a=[];
  _x=0; _x1=0;
  _p=`<br><table>`
  i=0;
  bBreak=0;
  auxRecall=[];

  _count=1;

  for(;;){

    _p+=`
    <div id="results-div"></div>
    <tr>`
    _a=[];
    for(j=0;j<myRow;j++){
      if(i+j>=maxContador) break;
      if(arrayImages[j]==null) break;
      _a[j]=arrayImages[i+j];
    }
    _a=_.shuffle(_a);

    for(j=0;j<myRow;j++){


      if(_a[j]==null){
        _p+=`<td>&nbsp;</td>`
        bBreak=1; // debug

      }else{

        auxRecall[_x]=_a[j];

        name=``; if(bShowName) name=`<br>${_a[j].replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, "")}`;

        _p+=`<td>
          <div id="r-${_x}">
          <center>  
            ${_count}<br>
            <div id="c-${_x}"></div>
            <div id="c1-${_x}">
              <a href="#" onclick="playSound('${rootDir}${_a[j]}');" style="text-decoration: none;">▶</a>
              <!--<img src="${rootDir}${_a[j]}" width="64" height="64"  onclick="if($(this).css('zoom')==1) $(this).css('zoom',2.5); else $(this).css('zoom',1);">-->
              ${name}
              <span class="hideAll"> 
                <br>
                <input type="number" value="" style="width: 30px;" onkeypress="myKey(${_x},this.value);" onClick="this.select();" id="i-${_x}">
              </span>
            </div>
          </center>
          </div>
        </td>`

        _x++;
        _count++;

      }

    }
    _p+=`</tr>`
    i+=myRow;
    if(bBreak) break;
    //if(i>=100) break; // debug

  }
  _p+=`</table>`

  $("#screen").html(_p);

  $("#answer-control").show();
  $("#i-0").focus();
  ultimo=_x;
  myPosition=0;
  // maxContador=100; //debug

}

function myKey(x,y){
  console.log(y)
  if(isNaN(y)){
    $("#i-"+x).val("");

  }else{
    if(x==ultimo-1){ $("#i-"+x).select(); return; }
    $("#i-"+(x+1)).focus();
    $("#i-"+(x+1)).select();
    myPosition=x+1;
  }
}




function answer(){
  stopAllSound();
  $("#answer-control").hide();
  $("#answer-btn").hide();
   $(".hideAll").hide();

  bAnswer=1;
  console.log("ansewer");

  correctas=0;

  //maxContador=30;

   row=0;
    arrayR=[];

    for(i=0;i<maxContador;i++){
      if(i%myRow==0 && i!=0) row+=myRow;
      c=n("i-"+i);
      if(isNaN(c) || row+c>maxContador) continue;
      arrayR[c+row]=auxRecall[i];
    }


   for(i=0;i<maxContador;i++){

    // $("#c-"+i).html(`<img src="${rootDir}${arrayImages[i]}" width="76" height="76"  onclick="if($(this).css('zoom')==1) $(this).css('zoom',2.5); else $(this).css('zoom',1);">`)

    name=``; if(bShowName) name=`<br>${arrayImages[i].replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, "")}`;
    $("#c-"+i).html(`<a href="#" onclick="playSound('${rootDir}${arrayImages[i]}');" style="text-decoration: none;">▶</a>${name}`)

    if(arrayR[i]==null){
      $("#r-"+i).css("border","2px solid red");
      //$("#c1-"+i).html('');
      $("#c1-"+i).css('visibility', 'hidden');
      continue;
    }

    if(arrayImages[i]==arrayR[i]){
      correctas++;
      $("#r-"+i).css("border","2px solid green");
      // $("#c1-"+i).html('');
      $("#c1-"+i).css('visibility', 'hidden');

    }else{
      $("#r-"+i).css("border","2px solid red")
      // $("#c1-"+i).html(`<img src="${rootDir}${arrayR[i]}" width="76" height="76"  onclick="if($(this).css('zoom')==1) $(this).css('zoom',2.5); else $(this).css('zoom',1);">`)
      name=``; if(bShowName) name=`<br>${arrayR[i].replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, "")}`;
      $("#c1-"+i).html(`<a href="#" onclick="playSound('${rootDir}${arrayR[i]}');" style="text-decoration: none;">▶</a>${name}`)

    }

  }


  // for(i=0;i<maxContador;i++){
  //   if(i%10==0 && i!=0) row+=10;

  //   $("#c-"+i).html(`<a href="#" onclick="playSound('${rootDir}${arrayImages[i]}');" style="text-decoration: none;">▶</a>`)
  //   //$("#c-"+i).html(`<img src="${rootDir}${arrayImages[i]}" width="64" height="64"  onclick="if($(this).css('zoom')==1) $(this).css('zoom',2.5); else $(this).css('zoom',1);">`)

  //   //if($("#i"+i).val()=="") continue;
  //   //$("#i"+i).attr('disabled','disabled');

  //   c=n("i-"+i);

  //   if(isNaN(c) || row+c>maxContador ){
  //     $("#r-"+i).css("border","2px solid red");
  //      $("#c1-"+i).html('');
  //     continue;


  //   } 

  //   console.log(arrayImages[i]+" "+auxRecall[row+c]);

  //   if(arrayImages[row+c]==auxRecall[i]){
  //     correctas++;
  //     $("#r-"+i).css("border","2px solid green");
  //     $("#c1-"+i).html('');

  //   }else{
  //     $("#r-"+i).css("border","2px solid red")
  //     $("#c1-"+i).html(`<a href="#" onclick="playSound('${rootDir}${arrayImages[row+c]}');" style="text-decoration: none;">▶</a>`)
  //     // $("#c1-"+i).html(`<img src="${rootDir}${arrayImages[row+c]}" width="64" height="64"  onclick="if($(this).css('zoom')==1) $(this).css('zoom',2.5); else $(this).css('zoom',1);">`)

  //   }

  // }

  myDate =  new Date();
  month = myDate.getMonth(); fullYear = myDate.getFullYear(); day = myDate.getDay(); date = myDate.getDate(); year = myDate.getYear();
  ponerFecha = (month+1) + "/" + date + "/" + fullYear + "<br>";

  tt = maxContador;
  porcent = correctas * 100 / tt; 

  t_dif = t_fin - t_ini;

  //$("#answer-div").html(poner);
  $("#results-div").html("<br><br><div style=\"background-color: #3fad46; color:white; width 500px;\">You got " + correctas + " out of " + tt + " attempted! (" + porcent.toFixed(2)  + "% accuracy) in " + getDuration(t_dif) + ", " + ponerFecha +  "</div><br>");
  $('#results-div').focus(); 

}



selectANum=-1;
selectAWord="";
selectAtype=-1;

selectBNum=-1;
selectBWord="";
selectBtype=-1;

function limpiarBordes(){
  for(i=0;i<cantidadImagenes;i++){
     $("#td-resp-"+i).css("border","1px solid black");
  }

}

bAnswer=0;

$(document).keydown(function(e) {
  
  //console.log(e.which);

  console.log(e.which);

    if(bAnswer) return;
  

    switch(e.which) {
        case 13:
          if(bRecall){
            bAnswer=1;
            answer();
          }


          break;

         case 32:
          if(bRecall || bAnswer){
            stopAllSound();
            return;

          } 

           init(1);

         break;

        case 37: // left
        if(bRecall){

          
          if(myPosition>0){
            myPosition--;
            $("#i-"+myPosition).focus();
            $("#i-"+myPosition).select();

          } 


          break;

        } 
        if(contador>1){
          stopAllSound();
          contador--;
          init(1);
        }
          
        break;

       case 65: // left
        
       break;

       case 38: // up
         if(bRecall){
          
          if(myPosition-10>=0){
            myPosition-=10;
            $("#i-"+myPosition).focus();
            $("#i-"+myPosition).select();

          } 


          break;

        } 

          
       break;

       case 40: // down
        if(bRecall){

          
          if(myPosition+10<=maxContador){
            myPosition+=10;
            $("#i-"+myPosition).focus();
            $("#i-"+myPosition).select();

          } 


          break;

        } 
        
        break;

       case 39: // right

       if(bRecall){
         if(myPosition<maxContador){
            myPosition++;
            $("#i-"+myPosition).focus();
            $("#i-"+myPosition).select();

          } 
         break;

       }
        
        if(contador<totalImages){
          contador++;
          init(1);
        }else{

          recall();
        }


        break;

        case 68: // right
          
        break;

        case 40: // down
        
          
          
        break;

        case 83: // down

     
          
        break;

        default: return; // exit this handler for other keys


    }
  

    e.preventDefault(); // prevent the default action (scroll / move caret)
});




function ponerPreview(x){

  if(selectANum!=-1)
    return;

  pon=`<center><img src="${rootDir}${arrayImages1[x]}" width="300px" height="225px"></center>`;
  console.log(pon);
  $("#preview-div").html(pon);


}

var nextLoad=0;
var arrayImages2=[];
var totalImages=0;
var maxContador=0;
var arrayMySound=[];

function startGame(){
  stopAllSound();
  clearTimeout(killTimer)

  arrayMySound=[];

  bRecall=0; bAnswer=0;

  $("#preload").html("");

  contador = 1;
  imgLoadedCount=0;

  myFiles = [];
  arrayImages = [];
  arrayImages1 = [];
  arrayImages2 = [];

  maxContador=0;


  selectANum=-1;
  selectAWord="";
  selectAtype=-1;

  selectBNum=-1;
  selectBWord="";
  selectBtype=-1;

  var t_ini;
  var t_fin;
  var t_dif;

  zPreload=0;

  cantidadImagenes=n("cantidadImg");

  $("#recall-btn").show();

  $("#answer-btn").hide(); 

  xx=0;

  if(parseInt($("#img-select").val())==-1){
      fd=arrayDirs[_.random(0,arrayDirs.length-1)];

    }

      //fd=fdx;

  fs.readdir('sounds/'+fd, (err, dir) => {
    
    img="";
    for (var i = 0, path; path = dir[i]; i++) {

      //console.log(""+path.indexOf("."));
      if(path.indexOf(".")!=0 || path.indexOf(".mp3")!=-1 || path.indexOf(".wav")!=-1  || path.indexOf(".ogg")!=-1){
       
        myFiles[xx]=path;
        xx++;
      }
      
    }
    
    x=_.range(0,i);
    x=_.shuffle(x);
    
    //console.log(x);

    totalImages=x.length;

    for(i=0;i<totalImages;i++){

      arrayImages2[i]=`sounds/${fd}/`+myFiles[x[i]];
    }

    //console.log(arrayImages2)

    x=_.first(x,cantidadImagenes);


    for(i=0;i<cantidadImagenes;i++){

      arrayImages[i]=`sounds/${fd}/`+myFiles[x[i]];
      console.log(rootDir+arrayImages[i])
      arrayMySound[i] = new WaudSound(rootDir+arrayImages[i]);
     // console.log(i);
      //console.log(arrayImages[i]);
    }

    //console.log(arrayImages.length);
    arrayImages1=_.extend(arrayImages);

    nextLoad=15;

    $("#preload").html("")
    $("#screen").html("<center>Loading...</center>")


    setTimeout(function(){

       bRecall=0;
            //$("#controls-div").show();
      killTimer=setTimeout(function(){ if(bRecall){ return; } recall(); },n("timer")*60*1000);

      init(0);

     },4000)
    
    //preload();
  });



}
/*
ipc.send('sync', 1);
ipc.on('ping', (event, arg) => {  
    // Print 5
    alert();

  
    location.reload();
    
});
*/
if (window.location.href.substr(-2) !== '?r') {
    location.reload();

    window.location.href = window.location.href + '?r';
    //alert(window.location);
}


// setTimeout(function(){ 
//   //$("#img-select").val("IAM"); //debug
//   openFiles("IAM")
//   startGame();
//   setTimeout(function(){ return; recall(); },1000);

// },1000);

