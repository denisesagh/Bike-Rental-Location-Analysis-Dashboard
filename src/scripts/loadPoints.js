map.on('moveend', function (){

    var Box = map.getBounds();
    let result = Box.toBBoxString().split(/[,]/);

    ajaxloadData(result[0], result[2],  result[1], result[3]);
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

            marker = new L.circleMarker([element.long, element.lat], {
                color: setMarker(element.Type),
                renderer: myRenderer
            })
                .bindPopup("<b>Name: </b>" + element.POI_Name + "<br><b>Kategorie: </b>" + element.kategorie);

        if(markerCounter <= 1000){
            marker.addTo(markerLayer).on('click', onClick);
        }

        markerCounter += 1;
    });

        map.addLayer(markerLayer);
}

function onClick(){
    console.log(this.getLatLng());
}

function setMarker(type){
    let color;
    switch (type){
        case 'POI':
            return color = '#f833ff';
        case 'Fahrradstation':
            return color = '#3388ff';
        default:
            break;
    }
}