map.on('moveend', function (){
    loadMarkers();
});

function checkFilterSelected(){
    let filterArray = [];


    if (document.querySelector('.checkboxcheck').checked) {

                filterArray.push();
                console.log(filterArray);

    }
    else {
                filterArray = filterArray.filter(e => e !== "test");
                console.log(filterArray);
    }

    return filterArray;
}

function loadMarkers(){

    var Box = map.getBounds();
    let MapBounds = Box.toBBoxString().split(/[,]/);

    const userID = 1;
    let filterArray = checkFilterSelected();

    if(filterArray.length === 0){
        filterArray = ["empty"];
        ajaxloadData(MapBounds[0], MapBounds[2],  MapBounds[1], MapBounds[3], userID, filterArray);
    }else {
        ajaxloadData(MapBounds[0], MapBounds[2],  MapBounds[1], MapBounds[3], userID, filterArray);
    }

}

function ajaxloadData(latStart, latEnd, longStart, longEnd, userID, filterArray){
    try{
        $.ajax({
            type: 'GET',
            url: ('../php/POI-Dash-GetData.php'),
            dataType: 'json',
            data: {lat1: latStart, lat2: latEnd, long1: longStart, long2: longEnd, userID: userID, filterArray: filterArray},
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
                color: setMarkerColor(element.kategorie),
                renderer: myRenderer
            })
                .bindPopup("<b>Name: </b>" + element.name + "<br><b>Kategorie: </b>" + element.kategorie);

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

function setMarkerColor(type){
    switch (type){
        case 'Fahrradstation':
            return '#ffd333';
        case 'Gastronomie':
            return '#775619';
        case 'Öffentlich':
            return '#050465';
        case 'Freizeit':
            return '#0d4f10';
        case 'Bildung':
            return '#d00d1d';
        case 'Lebensmittel':
            return '#77ab82';
        case 'Dienstleistung':
            return '#6e6a64';
        case 'Shopping':
            return '#12778a';
        case 'Sonstige':
            return '#6c0b9b';
        default:
            break;
    }
}