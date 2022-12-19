map.on('moveend', function (){
    //placeMarkersInBounds();
    var Box = map.getBounds();
    //console.log(Box.toBBoxString());
    let str = Box.toBBoxString();
    let result = str.split(/[,]/);
    let longStart = result[1];
    let latStart = result[0];
    let longEnd = result[3];
    let latEnd = result[2];

    console.log(longStart, latStart, longEnd, latEnd);
    ajaxloadData(latStart, latEnd, longStart, longEnd);
});



function ajaxloadData(latStart, latEnd, longStart, longEnd){
    try{
        $.ajax({
            type: 'GET',
            url: ('../php/POI-Dash-GetData.php'),
            dataType: 'json',
            data: {lat1: latStart, lat2: latEnd, long1: longStart, long2: longEnd},
            error: ajaxLoadMHSError,
            success: placeMarkersInBounds
        })
    }catch (error){
        console.log("Failed to load POIS!");
    }
}

function ajaxLoadMHSError(){
    console.log("didnt work");
}


var markerLayer = null;
var myRenderer = L.canvas({padding: 0.5});
function placeMarkersInBounds(myData) {
    let markerCounter = 0;

    if(markerLayer == null){
        markerLayer = L.layerGroup();
    }else{
        markerLayer.clearLayers();
    }

    myData.forEach(element => {

        if(element.Type === "POI"){
            marker = new L.circleMarker([element.long, element.lat], {
                color: '#c9ff33',
                renderer: myRenderer
            })
                .bindPopup("<b>Name: </b>" + element.POI_Name + "<br><b>Kategorie: </b>" + element.kategorie);
        }else{
            marker = new L.circleMarker([element.long, element.lat], {
                color: '#3388ff',
                renderer: myRenderer
            })
                .bindPopup("<b>Name: </b>" + element.POI_Name + "<br><b>Kategorie: </b>" + element.kategorie);
        }


        //marker.addTo(markerLayer);

        if(markerCounter <= 1000){
            marker.addTo(markerLayer);
        }

        markerCounter += 1;
    });

    try {
        map.addLayer(markerLayer);
    }catch (error){
        console.log("MarkerLayer was empty!");
    }

}