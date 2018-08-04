var heatmap_instance = null;
var elementId = ".heatmap" 

window.onload = run
console.log("run");

function run(){
    initialise()
    var url = new URL("http://127.0.0.1:5000/getData")
    websiteParam = window.location.search.substr(1)
    params = {website:websiteParam}
    url.search = new URLSearchParams(params)
    fetch(url).then(function(r){ r.json().then(function(j){updateHeatMap(j)})})
}

function initialise(){
    heatmap_instance = h337.create({
        container: document.querySelector(elementId),
        maxOpacity: .6,
        radius: 50,
        blur: .90,
        backgroundColor: 'rgba(0, 0, 0, 0.96)'
    })
}


function updateHeatMap(eyeJson){
  console.log(eyeJson)
  var eyeData = eyeJson["data"]
  for(var i = 0;i< eyeData.length;i++){
      var x_coord= eyeData[i]['x']
      var y_coord = eyeData[i]['y']
      var weight = 3
      console.log("adding data")
      heatmap_instance.addData({
          x : x_coord,
          y : y_coord,
          value: weight
      })
  }

}
