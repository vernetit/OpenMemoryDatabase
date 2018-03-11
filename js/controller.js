function putMenu(){
  var path = window.location.pathname;
  var page = path.split("/").pop();
  
  sel=0;
  
  if(page=="index.html") sel=0;
  if(page=="word.html") sel=1;
  if(page=="decimal.html") sel=2;
  if(page=="face.html") sel=3;
  if(page=="rapidMemory.html") sel=4;
  if(page=="imagesTime.html") sel=5;
  if(page=="sounds.html") sel=6;
  if(page=="cards.html") sel=7;
  if(page=="figures.html") sel=8;
  if(page=="matrix.html") sel=9;
  if(page=="help.html") sel=10;

  _template = `
    <select id="appSelected" onchange="changeApp();">
      <option value="0">Images</option>
      <option value="1">Words</option>
      <option value="2">Decimals</option>
      <option value="3">Faces</option>
      <option value="4">Rapid Memory</option>
      <option value="5">Images by Time</option>
      <option value="6">Sounds</option>
      <option value="7">Cards</option>
      <option value="8">Figures and Colors</option>
      <option value="9">Matrix</option>
      <option value="10">Help</option>
    </select>
  `;
  $("#menu-modules").html(_template);
  $("#appSelected").val(sel);
}

function changeApp(){
  go=n("appSelected");

  if(go==0) window.location.href="index.html";
  if(go==1) window.location.href="word.html";
  if(go==2) window.location.href="decimal.html";
  if(go==3) window.location.href="face.html";
  if(go==4) window.location.href="rapidMemory.html";
  if(go==5) window.location.href="imagesTime.html";
  if(go==6) window.location.href="sounds.html";
  if(go==7) window.location.href="cards.html";
  if(go==8) window.location.href="figures.html";
  if(go==9) window.location.href="matrix.html";
  if(go==10) window.location.href="help.html";

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

putMenu();