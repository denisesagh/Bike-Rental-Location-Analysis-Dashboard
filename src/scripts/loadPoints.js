let filterArray = [];

var map = L.map('map', {
    zoomControl: false,
    inertia: true,
    worldCopyJump: true
});

map.on('load',  function () {
    loadMarkers("empty");
    filterArray = [];
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
    loadMarkers();
});

var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});
lightmode();

function checkFilterSelected(value) {

        if(!filterArray.includes(value)){
            console.log(value);
            filterArray.push(value);
            console.log(filterArray);
        }else {
            filterArray = filterArray.filter(e => e !== value);
        }

    return filterArray;
}

function loadMarkers(value) {

    var Box = map.getBounds();
    let MapBounds = Box.toBBoxString().split(/[,]/);

    let userID;
    let filterArray = checkFilterSelected(value);

    if(loginStatus === "logged"){
        userID = current_user_id;
        console.log(userID);
        console.log("User id übergeben");
    }else {
        userID = 0;
        console.log("Keine User id übergeben");
    }

    if (filterArray.length === 0) {
        filterArray = ["empty"];
        ajaxloadData(MapBounds[0], MapBounds[2], MapBounds[1], MapBounds[3], userID, filterArray);
    } else {
        ajaxloadData(MapBounds[0], MapBounds[2], MapBounds[1], MapBounds[3], userID, filterArray);
    }

}

function ajaxloadData(latStart, latEnd, longStart, longEnd, userID, filterArray) {
    try {
        $.ajax({
            type: 'GET',
            url: ('../php/POI-Dash-GetData.php'),
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
                placeMarkersInBounds(result, 1000)
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

    if (markerLayer == null) {
        markerLayer = L.layerGroup();
    } else {
        markerLayer.clearLayers();
    }

    myData.forEach(element => {

        marker = new L.circleMarker([element.long, element.lat], {
            color: setMarkerColor(element.kategorie),
            renderer: myRenderer
        })
            .bindPopup("<b>Name: </b>" + element.name + "<br><b>Kategorie: </b>" + element.kategorie);

        if (markerCounter <= limit) {
            marker.addTo(markerLayer).on('click', onClick);
        }

        markerCounter += 1;
    });

    map.addLayer(markerLayer);
}

function onClick() {
    //console.log(this.getLatLng());
    const coordinates = this.getLatLng().toString().split(/([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)/);

    let latitude = coordinates[1];
    let longitude = coordinates[2];

    /*
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
                placeMarkersInBounds(result, 3)
            }
        })
    }catch (e){

    }

     */
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
            return '#6c0b9b';
        default:
            return '#000000';
    }
}