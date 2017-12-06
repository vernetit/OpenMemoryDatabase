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

fs.readdir('faces/male/', (err, dir) => {
   sel=`<select id="maleImage-select" onchange="/*openFiles(this.value);*/">
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

    $("#maleImage").html(sel);

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

fs.readdir('names/male/', (err, dir) => {
   sel=`<select id="maleName-select" onchange="/*openFiles(this.value);*/">
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

    $("#maleName").html(sel);

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

fs.readdir('faces/female/', (err, dir) => {
   sel=`<select id="femaleImage-select" onchange="/*openFiles(this.value);*/">
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

    $("#femaleImage").html(sel);

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

fs.readdir('names/female/', (err, dir) => {
   sel=`<select id="femaleName-select" onchange="/*openFiles(this.value);*/">
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

    $("#femaleName").html(sel);

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

fs.readdir('surnames/', (err, dir) => {
   sel=`<select id="surname-select" onchange="/*openFiles(this.value);*/">
    <option value="-1">none</option>

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

    $("#surname").html(sel);

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


// x=$("#nombres-mujer").html();
// x=x.replace(/ /g, "<br>");
// $("#screen").html(x);

$("#recall-btn").hide();
$("#answer-btn").hide();
$("#goTo0-btn").hide();

var t_ini;
var t_fin;
var t_dif;

//Jena Malone
arrayPreloadImages=[];

accion=0;

zPreload=0;
imgLoadedCount=0;

var contador;

function preload() {

    $("#preload").html(""); $("#preload").show(); 

    for(i=0;i<arrayPreloadImages.length;i++){

      //console.log(`<img src="${arrayImages[i]}" id="imgPreload-${zPreload}">`);

       $("#preload").append(`<img src="${arrayPreloadImages[i]}" id="imgPreload-${zPreload}"  width="32" height="32" style="opacity: 0.5;">`);

       $(`#imgPreload-${zPreload}`).on("load",function(){
          
          imgLoadedCount++;

          if(imgLoadedCount==arrayPreloadImages.length){      

            //$("#screen").html(""); 
            $("#preload").hide(); 
            $("#loading").hide(); 
             $("#stop1").show();
            //$("#recall-btn").show(); 
            $("#controls-div").show();

            //console.log(imgLoadedCount);

            setTimeout(play(2),500); 
                         
           // init(0);

         }
       });

     zPreload++;

  } //end for
} //end preload

// <? include "db/worldPositions.php"; ?>

arrayImages=[];
arrayImages1=[];
arrayFaces=[];
arrayNames=[];

myFiles=[];
myFiles1=[];
bOk=0;
arr4=[];

var kill6;

bApellido=0;

function nextLoad(){
    arrayFaces=[];
    arrayImages1=[];
    arrayImages=[];

    myFile = fs.readFileSync("names/male/"+$("#maleName-select").val());
    $("#nombres-hombre").html(myFile.toString().replace(/\n/g, " "))

    myFile = fs.readFileSync("names/female/"+$("#femaleName-select").val());
    $("#nombres-mujer").html(myFile.toString().replace(/\n/g, " "))


    if($("#surname-select").val()!="-1"){
      myFile = fs.readFileSync("surnames/"+$("#surname-select").val());
      $("#surnames-txt").html(myFile.toString().replace(/\n/g, " "))
      //alert($("#surnames-txt").html());

      txt=$("#surnames-txt").html();
      arr4=txt.split(" ");
      arr4=_.shuffle(arr4);

      for(i=0;i<30;i++){
        arrayImages[i]=arr4[i];
      }
      bApellido=1;
  
    }else{

      bApellido=0;
    }
    
    myFiles=_.shuffle(myFiles);
    myFiles1=_.shuffle(myFiles1);

    // num=_.range(1,155);
    // num=_.shuffle(num);

    for(i=0;i<15;i++){
      arrayImages1[i]=myFiles[i];
    }

    // num=_.range(1,155);
    // num=_.shuffle(num);

    for(i=15;i<30;i++){
      arrayImages1[i]=myFiles1[i];
    }


    arrayPreloadImages = _.extend(arrayImages1);

    txt=$("#nombres-hombre").html();
    arr=txt.split(" ");
    arr=_.shuffle(arr);

    for(i=0;i<15;i++){
      arrayFaces[i]=[];

      arrayFaces[i][0]=capitalizeFirstLetter(arr[i]);
      arrayFaces[i][1]=arrayImages1[i];
      //arrayFaces[i][2]=arrayImages[i];
    }

    txt=$("#nombres-mujer").html();
    arr=txt.split(" ");
    arr=_.shuffle(arr);

    for(i=15;i<30;i++){
      arrayFaces[i]=[];

      arrayFaces[i][0]=capitalizeFirstLetter(arr[i]);
      arrayFaces[i][1]=arrayImages1[i];
      //arrayFaces[i][2]=arrayImages[i];
    }

    if(bApellido){
      for(i=0;i<30;i++){
        arrayFaces[i][2]=capitalizeFirstLetter(arrayImages[i]);

      }


    }else{
      for(i=0;i<30;i++){
        arrayFaces[i][2]="xxxxx";

      }


    }
   

    arrayFaces=_.shuffle(arrayFaces);

    //console.log(arrayFaces);


    preload();
}

bFirst=0;

function play(x){



  if(x==1){
    /*
    $("#start-btn").val("start");
    accion=0;
    clearTimeout(kill);
    clearTimeout(kill1);
    $("#screen").html("");
    $("#results-span").html("");

*/
    return;


  }

  if(x==0){

    bFirst=0;

    bOk=0;
    $("#screen").html("");

    zPreload=0; 
    imgLoadedCount=0;
    arrayFaces=[];
    arrayPreloadImages=[];
    myFiles=[];
    myFiles1=[];
    arrayImages=[];
    arrayImages1=[];
    $("#preload").html("");


    contador=0;

    // aux=_.shuffle(myLibrary);
    // aux= _.first(aux,30);

    // for(i=0;i<aux.length;i++){
 
    //     zzz=1;
       
    //     latitude=(aux[i][0]*zzz)+"";
    //     longitude=(aux[i][1]*zzz)+"";
        
    //     xx=(longitude+"").split(".");
        
    //     xx=xx[1];
    //     heading=_.random(0,360);

    //     if(xx.length==8){
    //       console.log("indoor");

    //       latitude=parseFloat(latitude).toFixed(7);
    //       longitude=parseFloat(longitude).toFixed(7);

    //       arrayImages[i]=`https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${latitude},${longitude}&heading=${heading}&pitch=28&scale=2&key=AIzaSyB-CedQccD4tyO5TGMOSb5s1fMb-c6Nh-A`;

          

    //         https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${latitude},${longitude}&heading=100&pitch=28&scale=2&key=AIzaSyB-CedQccD4tyO5TGMOSb5s1fMb-c6Nh-A
          

    //     }else{
    //       arrayImages[i]=`https://maps.googleapis.com/maps/api/streetview?size=600x600&location=${latitude},${longitude}
    //       &fov=90&heading=${heading}&pitch=10
    //       &key=AIzaSyB-CedQccD4tyO5TGMOSb5s1fMb-c6Nh-A`;


    //     }

    //     /*
    //     arrayImages[i]=`https://maps.googleapis.com/maps/api/streetview?size=600x600&location=${latitude},${longitude}
    //   &fov=90&heading=235&pitch=10
    //   &key=AIzaSyB-CedQccD4tyO5TGMOSb5s1fMb-c6Nh-A`;*/

    // }


    fs.readdir('faces/male/'+$("#maleImage-select").val(), (err, dir) => {
      xx=0;
    
    img="";
    for (var i = 0, path; path = dir[i]; i++) {

      //console.log(""+path.indexOf("."));
      if(path.indexOf(".")!=0 || path.indexOf(".jpg")!=-1 || path.indexOf(".png")!=-1  || path.indexOf(".jpeg")!=-1 || path.indexOf(".gif")!=-1 || path.indexOf(".bmp")!=-1){
       
        myFiles[xx]='faces/male/'+$("#maleImage-select").val()+"/"+path;
        xx++;
      }
      
    }
    bOk++;
   
  });

  fs.readdir('faces/female/'+$("#femaleImage-select").val(), (err, dir) => {
      xx=0;
    
    img="";
    for (var i = 0, path; path = dir[i]; i++) {

      //console.log(""+path.indexOf("."));
      if(path.indexOf(".")!=0 || path.indexOf(".jpg")!=-1 || path.indexOf(".png")!=-1  || path.indexOf(".jpeg")!=-1 || path.indexOf(".gif")!=-1 || path.indexOf(".bmp")!=-1){
       
        myFiles1[xx]='faces/female/'+$("#femaleImage-select").val()+"/"+path;
        xx++;
      }
      
    }

    bOk++;
   
  });


    kill6=setInterval(function(){

      if(bOk==2){ clearInterval(kill6); bOk++; nextLoad();  } 
    },100);

    return;
  }
  $("#recall-btn").show();
  $("#goTo0-btn").show();

  $("#screen").html(`
    <center>
    <h3>${contador+1}</h3>
    <br><img src="${arrayFaces[contador][1]}" class="img-face">
    <br><b>${arrayFaces[contador][0]}</b>
    <br><b>${bApellido?arrayFaces[contador][2]:""}</b>
    <!--<br><img src="${arrayFaces[contador][2]}" style="zoom: 0.8">-->

    </center>`)

  if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
    $("#screen").append(`
      <br>
      <center><input type="button" value="Next" onclick="next();" style="font-size: 30px;"></center>
    `);
  }

  if(x==2 && !bFirst){
    bFirst=!bFirst;


    t_ini = Date.now();
  }
}

arrayFacesUnsorted=[];
arrayImagesUnsorted=[];

arrayImagesRespuestas=[];

function recall(){
  t_fin = Date.now();

  $("#goTo0-btn").hide();

  arrayFacesUnsorted=_.extend(arrayFaces);
  arrayFacesUnsorted=_.shuffle(arrayFacesUnsorted);

  arrayImagesUnsorted=_.extend(arrayImages);
  arrayImagesUnsorted=_.shuffle(arrayImagesUnsorted);

  for(i=0;i<30;i++){

    arrayImagesRespuestas[i]=-1;
  }

  z=0;

  poner=`<div id="answer-div" style="float: left;"></div><div style="clear:both"></div><table style="" id="mySuperTable">`;
  for(i=0;i<3;i++){
    poner+="<tr>";

    for(j=0;j<10;j++){


      
      _p=`display:none;`;
      if(bApellido){
        _p="";
      }

      poner+=`
        <td id="td-resp-1-${z}">

          <img src="${arrayFacesUnsorted[z][1]}" class="img-face2" id="face-img-{z}" onmouseover="ponerPreview2(${z});">
          <br>
          <div class="correccion" id="td-resp-2-${z}"></div>
          <input type="text" value="" id="face-txt-${z}" style="width:75px; text-align: center;">
          <span style="${_p}">
          <br>
          <div class="correccion" id="td-resp-3-${z}"></div>
          <input type="text" value="" id="face-txt1-${z}" style="width:75px; text-align: center;">
          </span>
          <!--<br>
          <div style="width: 75px; height:75px; background-color: gray; text-align: -webkit-center;" onclick="select(0,${z});" id="td-resp-${z}"><center><b>${z+1}</b></center></div>-->
        </td>

      `;

      z++;


    }

    poner+="</tr>";
  }
  poner+="</table>"

  _poner=`
    <table>
      <tr>
        <td>${poner}</td>
        <td> 
          <div id="preview-div" style="float: left; border: 1px; width: 388px; height: 250px; background-color: gray; display:none;"></div>
        </td>
      </tr>
    </table>
  `;

  $("#screen").html("<br>"+_poner);

  z=0;
  preg=`<table>`;
  for(i=0;i<2;i++){
    preg+="<tr>";
    for(j=0;j<15;j++){

      preg+=`<td style="width: 75px; height: 75px; background-color: gray;" onmouseover="ponerPreview(${z});" onclick="select(1,${z});" id="td-preg-${z}"><center><img src="${arrayImagesUnsorted[z]}" width="75px" height="75px"></td>`;
      //console.log(preg);
      z++;
    }
    preg+=`</tr>`;
  }
  preg+=`</table>`;

  poner=`
  <br>
  <div class="misPreguntas" style="display:none;"> 
      ${preg}
  </div>
  `;



  $("#screen").append(poner);

  $("#recall-btn").hide();
  $("#answer-btn").show();
  $(".correccion").hide();
  
}


function answer(){
  $(".misPreguntas").hide();

  //console.log("ansewer");

  $("#preguntas-div").hide();
  $("#debug-div").hide();
  $("#answer-btn").hide();
  $("#preview-div").hide();

  correctas=0;

  for(i=0;i<30;i++){
    //$("#td-resp-1-${i}").css("height",(parseInt($("#td-resp-1-${i}").height())+10)+"px");

    if((arrayFacesUnsorted[i][2].toUpperCase()==$("#face-txt1-"+i).val().toUpperCase() || !bApellido ) && arrayFacesUnsorted[i][0].toUpperCase()==$("#face-txt-"+i).val().toUpperCase() ){
      correctas++;
      //$("#td-resp-"+i).css("border","2px solid green");
      $("#td-resp-1-"+i).css("border","2px solid green");
      $(`#face-txt-${i}`).css("border","2px solid green");
      $(`#face-txt1-${i}`).css("border","2px solid green");

    }else{

      // bChangeHeight=0;
      // if(arrayImagesRespuestas[i]==-1){
      //   poner=``;
      //   $(`#td-resp-${i}`).css("border","2px solid red");
      // }else{
      //   if(arrayImagesRespuestas[i]!=arrayFacesUnsorted[i][2]){
      //     poner=`<img src="${arrayImagesRespuestas[i]}" width="75px" height="75px">`;
      //     bChangeHeight=1;
      //     $(`#td-resp-${i}`).css("border","2px solid red");
      //   }else{
      //     $(`#td-resp-${i}`).css("border","2px solid green");
      //   }
      // }

      // $("#td-resp-"+i).html(`
      //   <center>
      //     <img src="${arrayFacesUnsorted[i][2]}" width="75px" height="75px" style="margin-top: 5px;">
      //     <br>
      //     ${poner}
      //   </center>
      // `);
      // if(bChangeHeight)
      //   $("#td-resp-"+i).css("height","150px");

      // $("#td-resp-1-"+i).css("border","2px solid red");

      if(bApellido){
         if(arrayFacesUnsorted[i][2].toUpperCase()!=$("#face-txt1-"+i).val().toUpperCase()){

         $("#td-resp-3-"+i).html("<center>"+arrayFacesUnsorted[i][2]+"</center>");
         $("#td-resp-3-"+i).show();
         $(`#face-txt1-${i}`).css("border","2px solid red");
         $("#td-resp-3-"+i).css("color","red");
        }else{
        $(`#face-txt1-${i}`).css("border","2px solid green");


        }


      }
     

      if(arrayFacesUnsorted[i][0].toUpperCase()!=$("#face-txt-"+i).val().toUpperCase()){

         $("#td-resp-2-"+i).html("<center>"+arrayFacesUnsorted[i][0]+"</center>");
         $("#td-resp-2-"+i).show();
         $(`#face-txt-${i}`).css("border","2px solid red");
         $("#td-resp-2-"+i).css("color","red");
      }else{
        $(`#face-txt-${i}`).css("border","2px solid green");


      }

    }//error

  }

  myDate =  new Date();
  month = myDate.getMonth(); fullYear = myDate.getFullYear(); day = myDate.getDay(); date = myDate.getDate(); year = myDate.getYear();
  ponerFecha = (month+1) + "/" + date + "/" + fullYear + "<br>";

  tt = 30;
  porcent = correctas * 100 / tt;

  t_dif = t_fin - t_ini;

  //$("#answer-div").html(poner);
  $("#answer-div").append("<br><br><div style=\"background-color: #3fad46; color:white; width 500px;\">You got " + correctas + " out of " + tt + " attempted! (" + porcent.toFixed(2)  + "% accuracy) in " + getDuration(t_dif) + ", " + ponerFecha +  "</div>");

  //$("#mySuperTable tr").height("155%");
  //$("#mySuperTable td").width("155%");

}

selectANum=-1;
selectAWord="";
selectAtype=-1;

selectBNum=-1;
selectBWord="";
selectBtype=-1;

function capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1); } 
//arr=_.extend(nombresMujer); for(i=0;i<arr.length;i++){ $("#output").append(arr[i]+" "); }
//num=_.range(1,155);
//num=_.first(num,150);
//num=_.shuffle(num);

//for(i=0;i<num.length;i++){ $("#output").append(`<img src="faces/female/${num[i]+".png"}" class="img-face">`); }
//for(i=0;i<num.length;i++){ $("#output").append(`<img src="faces/male/${num[i]+".png"}" class="img-face">`); }

bRecall=0;

function next(){
  if(bRecall) return;

  if(contador<29){
    contador++;
    play(2);
  }else{

    recall();
  }

}

function ponerPreview(x){

  //if(selectANum!=-1)
  // return;

  pon=`<center><img src="${arrayImagesUnsorted[x]}" width="388px" height="250px"></center>`;
  //console.log(pon);
  $("#preview-div").html(pon);

}

function ponerPreview2(x){

  //if(selectANum!=-1)
  // return;
  pon=`<center><img src="${arrayFacesUnsorted[x][1]}" width="388px" height="250px"></center>`;
  //console.log(pon);
  $("#preview-div").html(pon);

}


function select(x,y){
  if(x==0){
    /*
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
             $("#td-preg-"+i).html(`<img src="${arrayImages1[i]}" width="75px" height="75px">`);
            
           }
       }
     arrayImagesRespuestas[y]=-1



   }

  return;*/

    if(selectAtype==-1){

      if(arrayImagesRespuestas[y]==-1)
        return;

      $("#preview-div").html(`<center><img src="${arrayImagesRespuestas[y]}" width="388px" height="250px"></center>`);

      selectAtype=0;
      selectANum=y;
      selectAWord=arrayImagesRespuestas[y];

      return;
    }

    if(selectAtype==1){


      if(arrayImagesRespuestas[y]==-1){
        //console.log("change");

        $("#td-resp-"+y).html(`<img src="${arrayImagesUnsorted[selectANum]}" width="75px" height="75px">`);
        $("#td-preg-"+selectANum).html(`&nbsp;`);
        $("#preview-div").html(`&nbsp;`);
        arrayImagesRespuestas[y]=arrayImagesUnsorted[selectANum];

        selectAtype=-1;
        selectANum=-1;
        selectAWord="";

        return;
      }

      if(arrayImagesRespuestas[y]!=-1){

        for(i=0;i<30;i++){
          if(arrayImagesRespuestas[y]==arrayImagesUnsorted[i]){
            $("#td-preg-"+i).html(`<img src="${arrayImagesUnsorted[i]}" width="75px" height="75px">`);

          }
        }

        $("#td-resp-"+y).html(`<img src="${arrayImagesUnsorted[selectANum]}" width="75px" height="75px">`);
        $("#td-preg-"+selectANum).html(`&nbsp;`);
        $("#preview-div").html(`&nbsp;`);
        arrayImagesRespuestas[y]=arrayImagesUnsorted[selectANum];

        selectAtype=-1;
        selectANum=-1;
        selectAWord="";

      }
    }

    if(selectAtype==0){

      if(arrayImagesRespuestas[y]==-1){
        //console.log("change");

        $("#td-resp-"+y).html(`<img src="${arrayImagesRespuestas[selectANum]}" width="75px" height="75px">`);
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

        //console.log("change");

        cacheImg=arrayImagesRespuestas[selectANum];
        arrayImagesRespuestas[selectANum]=arrayImagesRespuestas[y];
        arrayImagesRespuestas[y]=cacheImg;

        $("#td-resp-"+y).html(`<img src="${arrayImagesRespuestas[y]}" width="75px" height="75px">`);
        $("#td-resp-"+selectANum).html(`<img src="${arrayImagesRespuestas[selectANum]}" width="75px" height="75px">`);
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
  }

  if(x==1){/*
  if(selectBtype==0){

        for(i=0;i<cantidadImagenes;i++){
            if(arrayImagesRespuestas[i]==arrayImages1[y]){
              selectAtype=-1;
              selectANum=-1;
              selectAWord="";

              return;
            }
        }




        $("#td-resp-"+selectBNum).html(`<img src="${arrayImages1[y]}" width="75px" height="75px">`);
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

        
        return;
  }*/


    if(selectAtype==-1 || selectAtype==1){

      for(i=0;i<30;i++){
        if(arrayImagesRespuestas[i]==arrayImagesUnsorted[y]){
          selectAtype=-1;
          selectANum=-1;
          selectAWord="";

          return;
        }
      }

      $("#preview-div").html(`<center><img src="${arrayImagesUnsorted[y]}" width="388px" height="250px"></center>`);

      selectAtype=x;
      selectANum=y;
      selectAWord=arrayImagesUnsorted[y];

      return;


    }

    if(selectAtype==0){

      //console.log("retornar");

      if(arrayImagesRespuestas[selectANum]==-1)
        return;

      bExisteImagen=0;
      posicion=-1;

      //if(selectANum!=-1){

        for(i=0;i<30;i++){
          if(arrayImagesRespuestas[selectANum]==arrayImagesUnsorted[i]){
            bExisteImagen=1;
            posicion=i;
            break;
          }
        }
      //}

      if(bExisteImagen){

        $("#td-resp-"+selectANum).html(`<center><b>${selectANum+1}</b></center>`);
        $("#td-preg-"+posicion).html(`<img src="${arrayImagesRespuestas[selectANum]}" width="75px" height="75px">`);
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

  //console.log(e.which);


    switch(e.which) {

        case 37: // left
        if(bRecall) break;
        if(contador>0){
          contador--;
          play(2);
        }

        break;
          /*
       case 65: // left

       break;

       case 38: // up

       break;

       case 87: // up

        break;
        */
       case 39: // right
       if(bRecall) break;
        if(contador<29){
          contador++;
          play(2);
        }else{

          recall();
        }


        break;
        /*
        case 68: // right

        break;

        case 40: // down


        break;

        case 83: // down


        break;
            */
        default: return; // exit this handler for other keys


    }


    e.preventDefault(); // prevent the default action (scroll / move caret)
});



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
