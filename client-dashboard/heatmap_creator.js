var h337 = require('heatmap.js');
var heatmap_instance = null;
var elementId = ".heatmap" 

document.onload = run()
console.log("run")
function run(){
    initialise()
    fetch("http://127.0.0.1:5000/getData").then(r => r.json()).then(updateHeatMap(r))
}

function initialise(){
    heatmap_instance = h337.create({
        container: document.getElementById(elementId),
        maxOpacity: .6,
        radius: 50,
        blur: .90,
        backgroundColor: 'rgba(0, 0, 58, 0.96)'
    })
}
function updateHeatMap(eyeJson){
  var eyeData = eyeJson["data"]
  for(var i = 0;i<eyeData;i++){
      var x_coord= eyeData[i]['x']
      var y_coord = eyeData[i]['y']
      var weight = 1
      heatmap_instance.addData({
          x : x_coord,
          y : y_coord,
          value: weight
      })
  }
}
