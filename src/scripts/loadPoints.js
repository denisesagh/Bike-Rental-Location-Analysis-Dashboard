let filterArray = [];
let CustomArray = [];

var map = L.map('map', {
    zoomControl: false,
    inertia: true,
    worldCopyJump: true
});

map.on('load',  function () {
    document.getElementById("myCheck0").checked = true;
    loadMarkers("Fahrradstation");
});

map.setView([53.605544099238, 9.992752075195314], 15);
function lightmode() {

    var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, {
            maxZoom: 18,
            attribution: osmAttrib
        });

    map.addLayer(osm);
    modus = "light";

}

map.on('moveend', function () {

    if(!(document.getElementById('myonoffswitch').checked && document.getElementById('myCheck0').checked) && !(document.getElementById('myonoffswitch').checked && !document.getElementById('myCheck0').checked)){
        loadMarkers();
    }
    loadNextThreeBikeStations(CustomArray[0], CustomArray[1]);
});

var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});
lightmode();


function checkFilterSelected(value) {

        if(!filterArray.includes(value)){
            filterArray.push(value);
        }else {
            filterArray = filterArray.filter(e => e !== value);
        }

    return filterArray;
}

function getFilterArray(){
    return filterArray;
}

function getMapBounds(){
    var Box = map.getBounds();
    return Box.toBBoxString().split(/[,]/);
}
function loadMarkers(value) {

    let MapBounds = getMapBounds();
    let filterArray = checkFilterSelected(value);


    if (filterArray.length !== 0) {
        ajaxloadData(MapBounds[0], MapBounds[2], MapBounds[1], MapBounds[3], current_user_id, filterArray);
    }else {
        clearMap();
    }

}

function ajaxloadData(latStart, latEnd, longStart, longEnd, userID, filterArray) {
    try {
        $.ajax({
            type: 'GET',
            url: ('../php/GetData.php'),
            dataType: 'json',
            data: {
                lat1: latStart,
                lat2: latEnd,
                long1: longStart,
                long2: longEnd,
                userID: userID,
                filterArray: filterArray
            },
            error: ajaxLoadMHSError,
            success: function (result) {
                placeMarkersInBounds(result, 2500)
            }
        })
    } catch (error) {
        console.log(error);
    }
}

function ajaxLoadMHSError() {
    console.log("didnt work");
}


var markerLayer = null;
var myRenderer = L.canvas({padding: 0.5});

function placeMarkersInBounds(myData, limit) {
    let markerCounter = 0;
    clearMap();
    myData.forEach(element => {

        marker = new L.circleMarker([element.long, element.lat], {
            color: setMarkerColor(element.kategorie),
            renderer: myRenderer
        })
            .bindPopup("<b>Name: </b>" + element.name + "<br><b>Kategorie: </b>" + element.kategorie);

        if (markerCounter <= limit || element.kategorie === "Fahrradstation") {
            marker.addTo(markerLayer).on('click', onClick);
        }

        markerCounter += 1;
    });

    map.addLayer(markerLayer);
}

function clearMap(){
    if (markerLayer == null) {
        markerLayer = L.layerGroup();
    } else {
        markerLayer.clearLayers();
    }
}

function loadNextThreePOIS(latitude, longitude){
    if(document.getElementById('myonoffswitch').checked && document.getElementById('myCheck0').checked){
        try {
            $.ajax({
                type: 'GET',
                url: ('../php/GetNextThreePOIS.php'),
                dataType: 'json',
                data: {
                    lat: latitude,
                    long: longitude,
                },
                error: ajaxLoadMHSError,
                success: function (result) {
                    placeMarkersInBounds(result, 209);
                }
            })
        }catch (e){
            console.log(e);
        }
    }
}

function loadNextThreeBikeStations(latitude, longitude){
    if(document.getElementById('myonoffswitch').checked && !document.getElementById('myCheck0').checked){
        let MapBounds = getMapBounds();

        try {
            $.ajax({
                type: 'GET',
                url: ('../php/GetNextThreeBikeStations.php'),
                dataType: 'json',
                data: {
                    lat1: MapBounds[0],
                    lat2: MapBounds[2],
                    long1: MapBounds[1],
                    long2: MapBounds[3],
                    latPOI: latitude,
                    longPOI: longitude,
                    kategorie: getFilterArray()
                },
                error: ajaxLoadMHSError,
                success: function (result) {
                    placeMarkersInBounds(result, 1000);
                }
            })
        }catch (e){
            console.log(e);
        }
    }
}

function onClick() {
    const coordinates = this.getLatLng().toString().split(/([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)/);

    let latitude = coordinates[1];
    let longitude = coordinates[5];

    CustomArray = [];
    CustomArray.push(latitude);
    CustomArray.push(longitude);

    loadNextThreePOIS(latitude, longitude);
    loadNextThreeBikeStations(latitude, longitude);



}

function setMarkerColor(type) {
    switch (type) {
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
            return '#0b9363';
        case 'Religion':
            return '#bb49f8';
        case 'Finanzwesen':
            return '#525a94';
        case 'CustomUserPOI':
            return '#000000';
        default:
            break;
    }
}