function putMenu(){
  var path = window.location.pathname;
  var page = path.split("/").pop();
  
  sel=0;
  
  if(page=="index.html") sel=0;
  if(page=="word.html") sel=1;
  if(page=="decimal.html") sel=2;
  if(page=="face.html") sel=3;
  if(page=="rapidMemory.html") sel=4;

  _template = `
    <select id="appSelected" onchange="changeApp();">
      <option value="0">Images</option>
      <option value="1">Words</option>
      <option value="2">Decimals</option>
      <option value="3">Faces</option>
      <option value="4">Rapid Memory</option>
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