// You can also require other files to run in this process
require('./renderer.js')
const fs= require("fs");

// const ipc = require('electron').ipcRenderer

// ipc.send('hola')
// ipc.on('papa',function(event){
//   console.log("papa");

// });


function n(x){ return parseInt($("#"+x).val()); }


var tamImage="75px";

fd="";
var arrayDirs=[];

fs.readdir('images/', (err, dir) => {
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
       
        img+=`<img src="images/${fd}/${path}">`;
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

       $("#preload").append(`<img src="${rootDir}${arrayImages[i]}" id="imgPreload-${zPreload}-${zPreload2}"  width="32" height="32" style="opacity: 0.1;">`);

       $(`#imgPreload-${zPreload}-${zPreload2}`).on("load",function(){

          imgLoadedCount++; 
          if(imgLoadedCount>cantidadImagenes-1){ 

            if(cantidadImagenes==30) tamImage="65px";
            if(cantidadImagenes==60) tamImage="65px";
            if(cantidadImagenes==90) tamImage="55px";

            $("#screen").html(""); 
            $("#preload").hide(); 
            $("#recall-btn").show(); 
            bRecall=0;
            //$("#controls-div").show();
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



//arrayImages1 = _.extend(arrayImages);
arrayImages1 = [];

contador = 1;
function init(x){


  //return recall();
  
  $("#screen").html(`<center><h3>${contador}</h3><br><img src="${rootDir}${arrayImages[contador-1]}" class="myImage"></center>`);
 
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

  if(contador<cantidadImagenes){
    contador++;
    init(1);
  }else{

    recall();
  }

}

function recall(){
  t_fin = Date.now();

  bRecall=1;

  $("#recall-btn").hide(); 
  $("#answer-btn").show(); 

  arrayImages1 = _.shuffle(arrayImages1);

  for(i=0;i<cantidadImagenes;i++){

    arrayImagesRespuestas[i]=-1;
  }



  console.log("recall");
  z=1;
  resp=`<table>`;
  for(i=0;i<cantidadImagenes/10;i++){
    resp+="<tr>";
    for(j=0;j<10;j++){
      resp+=`<td style="width: ${tamImage} ; height: ${tamImage} ; background-color: gray;" onclick="select(0,${z-1});" id="td-resp-${z-1}"><center><b>${z}</b></center></td>`;
      z++;
    }
    resp+=`</tr>`;
  }
  resp+=`</table>`;

  preg="";

  z=1;
  preg=`<table>`;
  for(i=0;i<cantidadImagenes/15;i++){
    preg+="<tr>";
    for(j=0;j<15;j++){
      preg+=`<td style="width: ${tamImage} ; height: ${tamImage} ; background-color: gray;" onmouseover="ponerPreview(${z-1});" onclick="select(1,${z-1});" id="td-preg-${z-1}"><center><img src="${rootDir}${arrayImages1[z-1]}" width="${tamImage} " height="${tamImage} "></td>`;
      z++;
    }
    preg+=`</tr>`;
  }
  preg+=`</table>`;

  debug=``;

  if(bDebug){

    z=1;
    debug=`<table>`;
    for(i=0;i<2;i++){
      debug+="<tr>";
      for(j=0;j<15;j++){
        debug+=`<td style="width: ${tamImage} ; height: ${tamImage} ; background-color: gray;"><center><img src="${rootDir}${arrayImages[z-1]}" width="${tamImage} " height="${tamImage} "></td>`;
        z++;
      }
      debug+=`</tr>`;
    }
    debug+=`</table>`;


  }

  poner = `
  <div id="answer-div" style="float: left;">

    
  </div>
  <div style="clear: both;"></div>
  <br>
  <div id="respuestas-div" style="float: left;">
    ${resp}
  </div>
  <div id="preview-div" style="float: left; border: 1px; width: 300px; height: 225px; background-color: gray;">
  </div>
  <br><br>
  <div id="preguntas-div" style="float: left;">
    ${preg}
  </div>  
  <br><br>
  <div id="debug-div" style="float: left;">
    ${debug}
  </div>  
  `;

  $("#screen").html(poner);

  /*
  selectAtype=0;
  selectANum=0;
  selectAWord=-1;
  */

  selectBtype=0;
  selectBNum=0;
  selectBWord=-1;

  $("#td-resp-0").css("border","2px solid green");
}//recall



function answer(){

  console.log("ansewer");

  $("#preguntas-div").hide();
  $("#debug-div").hide();
  $("#answer-btn").hide();
  $("#preview-div").hide();

  correctas=0;

  if(cantidadImagenes==30) tamImage1="85px";
  if(cantidadImagenes==60) tamImage1="80px";
  if(cantidadImagenes==90) tamImage1="75px";

  for(i=0;i<cantidadImagenes;i++){

    if(arrayImagesRespuestas[i]==arrayImages[i]){
      correctas++;
      $("#td-resp-"+i).css("border","2px solid green");

    }else{


      if(arrayImagesRespuestas[i]==-1)
        poner=``;
      else
        poner=`<img src="${rootDir}${arrayImagesRespuestas[i]}" width="${tamImage1}" height="${tamImage1}">`;

      $("#td-resp-"+i).html(`
        <center>
          <img src="${rootDir}${arrayImages[i]}" width="${tamImage1}" height="${tamImage1}" style="margin-top: 5px;">
          <br>
          ${poner}                
          

        </center>

      `);

      $("#td-resp-"+i).css("border","2px solid red")

    }

  }

  myDate =  new Date();
  month = myDate.getMonth(); fullYear = myDate.getFullYear(); day = myDate.getDay(); date = myDate.getDate(); year = myDate.getYear();
  ponerFecha = (month+1) + "/" + date + "/" + fullYear + "<br>";

  tt = cantidadImagenes;
  porcent = correctas * 100 / tt; 

  t_dif = t_fin - t_ini;

  //$("#answer-div").html(poner);
  $("#answer-div").append("<br><br><div style=\"background-color: #3fad46; color:white; width 500px;\">You got " + correctas + " out of " + tt + " attempted! (" + porcent.toFixed(2)  + "% accuracy) in " + getDuration(t_dif) + ", " + ponerFecha +  "</div>");
    
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

function select(x,y){
  if(x==0){ //respuestas

    if(arrayImagesRespuestas[y]==-1){
      limpiarBordes();
      $("#td-resp-"+y).css("border","2px solid green");

      selectBNum=y;
      selectBWord="";
      selectBtype=0;


      
    }else{
      selectBNum=y;
      selectBWord="";
      selectBtype=0;

      limpiarBordes();
      $("#td-resp-"+y).css("border","2px solid green");
     

      $("#td-resp-"+y).html(`<center><b>${y+1}</b></center>`);

      for(i=0;i<cantidadImagenes;i++){
            if(arrayImagesRespuestas[y]==arrayImages1[i]){
              $("#td-preg-"+i).html(`<img src="${rootDir}${arrayImages1[i]}" width="${tamImage} " height="${tamImage} ">`);
             
            }
        }
      arrayImagesRespuestas[y]=-1



    }

    return;

    if(selectAtype==-1){

      if(arrayImagesRespuestas[y]==-1)
        return;

      $("#preview-div").html(`<center><img src="${rootDir}${arrayImagesRespuestas[y]}" width="300px" height="225px"></center>`);
  
      selectAtype=0;
      selectANum=y;
      selectAWord=arrayImagesRespuestas[y];
      
      return;
    }

    if(selectAtype==1){


      if(arrayImagesRespuestas[y]==-1){
        console.log("change");
        
        $("#td-resp-"+y).html(`<img src="${rootDir}${arrayImages1[selectANum]}" width="${tamImage} " height="${tamImage} ">`);
        $("#td-preg-"+selectANum).html(`&nbsp;`);
        $("#preview-div").html(`&nbsp;`);
        arrayImagesRespuestas[y]=arrayImages1[selectANum];

        selectAtype=-1;
        selectANum=-1;
        selectAWord="";

        return;
      }

      if(arrayImagesRespuestas[y]!=-1){

        for(i=0;i<cantidadImagenes;i++){
          if(arrayImagesRespuestas[y]==arrayImages1[i]){
            $("#td-preg-"+i).html(`<img src="${rootDir}${arrayImages1[i]}" width="${tamImage} " height="${tamImage} ">`);

          }
        }

        $("#td-resp-"+y).html(`<img src="${rootDir}${arrayImages1[selectANum]}" width="${tamImage} " height="${tamImage} ">`);
        $("#td-preg-"+selectANum).html(`&nbsp;`);
        $("#preview-div").html(`&nbsp;`);
        arrayImagesRespuestas[y]=arrayImages1[selectANum];

        selectAtype=-1;
        selectANum=-1;
        selectAWord="";

      }
    }

    if(selectAtype==0){

      if(arrayImagesRespuestas[y]==-1){
        console.log("change");
        
        $("#td-resp-"+y).html(`<img src="${rootDir}${arrayImagesRespuestas[selectANum]}" width="${tamImage} " height="${tamImage} ">`);
        $("#td-resp-"+selectANum).html(`<center><b>${selectANum+1}</b></center>`);
        //$("#td-preg-"+selectANum).html(`&nbsp;`);
        $("#preview-div").html(`&nbsp;`);
        arrayImagesRespuestas[y]=arrayImagesRespuestas[selectANum];
        arrayImagesRespuestas[selectANum]=-1;

        selectAtype=-1;
        selectANum=-1;
        selectAWord="";

        return;
      }else{

        console.log("change");

        cacheImg=arrayImagesRespuestas[selectANum];
        arrayImagesRespuestas[selectANum]=arrayImagesRespuestas[y];
        arrayImagesRespuestas[y]=cacheImg;
        
        $("#td-resp-"+y).html(`<img src="${rootDir}${arrayImagesRespuestas[y]}" width="${tamImage} " height="${tamImage} ">`);
        $("#td-resp-"+selectANum).html(`<img src="${rootDir}${arrayImagesRespuestas[selectANum]}" width="${tamImage} " height="${tamImage} ">`);
        //$("#td-resp-"+selectANum).html(`<center><b>${selectANum+1}</b></center>`);
        //$("#td-preg-"+selectANum).html(`&nbsp;`);
        $("#preview-div").html(`&nbsp;`);
        //arrayImagesRespuestas[y]=arrayImagesRespuestas[selectANum];
        //arrayImagesRespuestas[selectANum]=-1;

        selectAtype=-1;
        selectANum=-1;
        selectAWord="";

        return;

      }
    }
  }//x==0

  if(x==1){//pregunta
     if(selectBtype==0){

        for(i=0;i<cantidadImagenes;i++){
            if(arrayImagesRespuestas[i]==arrayImages1[y]){
              selectAtype=-1;
              selectANum=-1;
              selectAWord="";

              return;
            }
        }




        $("#td-resp-"+selectBNum).html(`<img src="${rootDir}${arrayImages1[y]}" width="${tamImage} " height="${tamImage} ">`);
        $("#td-preg-"+y).html(`&nbsp;`);
        $("#preview-div").html(`&nbsp;`);
        arrayImagesRespuestas[selectBNum]=arrayImages1[y];

        bEncontrado=0;
        limpiarBordes();
        for(i=selectBNum;i<cantidadImagenes;i++){
            if(arrayImagesRespuestas[i]==-1){
              bEncontrado=1;
              selectBNum=i;
              $("#td-resp-"+i).css("border","2px solid green");

              return;
            }
        }
        for(i=0;i<cantidadImagenes;i++){
            if(arrayImagesRespuestas[i]==-1){
              bEncontrado=1;        
              selectBNum=i;

              $("#td-resp-"+i).css("border","2px solid green");

              return;
            }
        }

        /*
        selectAtype=-1;
        selectANum=-1;
        selectAWord="";
        */
        return;
    }

    if(selectAtype==-1 || selectAtype==1){

    
      for(i=0;i<cantidadImagenes;i++){
        if(arrayImagesRespuestas[i]==arrayImages1[y]){
          selectAtype=-1;
          selectANum=-1;
          selectAWord="";

          return;
        }
      }

      $("#preview-div").html(`<center><img src="${rootDir}${arrayImages1[y]}" width="300px" height="225px"></center>`);

      selectAtype=x;
      selectANum=y;
      selectAWord=arrayImages1[y];

      return;


    }

    if(selectAtype==0){

      console.log("retornar");

      if(arrayImagesRespuestas[selectANum]==-1)
        return;

      bExisteImagen=0;
      posicion=-1;
      
      //if(selectANum!=-1){

        for(i=0;i<cantidadImagenes;i++){
          if(arrayImagesRespuestas[selectANum]==arrayImages1[i]){
            bExisteImagen=1;
            posicion=i;
            break;
          }
        }
      //}

      if(bExisteImagen){
      
        $("#td-resp-"+selectANum).html(`<center><b>${selectANum+1}</b></center>`);
        $("#td-preg-"+posicion).html(`<img src="${rootDir}${arrayImagesRespuestas[selectANum]}" width="${tamImage} " height="${tamImage} ">`);
        arrayImagesRespuestas[selectANum]=-1;
        
      }

      $("#preview-div").html(`&nbsp;`);

      selectAtype=-1;
      selectANum=-1;
      selectAWord="";

    } 
  }
}

$(document).keydown(function(e) {
  
  //console.log(e.which);

  console.log(e.which);
  

    switch(e.which) {

        case 37: // left
        if(bRecall) break;
        if(contador>1){
          contador--;
          init(1);
        }
          
        break;

       case 65: // left
        
       break;

       case 38: // up
          
       break;

       case 87: // up
        
        break;

       case 39: // right
       if(bRecall) break;
        if(contador<cantidadImagenes){
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

function startGame(){

  bRecall=1;

  $("#preload").html("");

  contador = 1;
  imgLoadedCount=0;

  myFiles = [];
  arrayImages = [];
  arrayImages1 = [];

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

  $("#recall-btn").hide(); 
  $("#answer-btn").hide(); 

  xx=0;

  if(parseInt($("#img-select").val())==-1){
      fd=arrayDirs[_.random(0,arrayDirs.length-1)];

    }

      //fd=fdx;

  fs.readdir('images/'+fd, (err, dir) => {
    
    img="";
    for (var i = 0, path; path = dir[i]; i++) {

      //console.log(""+path.indexOf("."));
      if(path.indexOf(".")!=0 || path.indexOf(".jpg")!=-1 || path.indexOf(".png")!=-1  || path.indexOf(".jpeg")!=-1 || path.indexOf(".gif")!=-1 || path.indexOf(".bmp")!=-1){
       
        myFiles[xx]=path;
        xx++;
      }
      
    }
    
    x=_.range(0,i);
    x=_.shuffle(x);
    x=_.first(x,cantidadImagenes);
   
    //console.log(x);


    for(i=0;i<cantidadImagenes;i++){

      arrayImages[i]=`images/${fd}/`+myFiles[x[i]];
     // console.log(i);
      //console.log(arrayImages[i]);
    }

    //console.log(arrayImages.length);
    arrayImages1=_.extend(arrayImages);
    
    preload();
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

