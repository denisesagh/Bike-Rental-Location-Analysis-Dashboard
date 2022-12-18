map.on('moveend', function (){
    try{
        let ajaxLoadMHSError;
        $.ajax({
            url: ('../php/POI-Dash-GetDataPOI.php'),
            data: {},
            type: 'GET',
            timeout: 1000,
            dataType: 'json',
            error: ajaxLoadMHSError,
            success: placeMarkersInBounds
        })
    }catch (error){
        console.log("Failed to load POIS!");
    }
});


var markerLayer = null;
function placeMarkersInBounds(myData) {

    let markerCounter = 0;

    var greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var mapBounds = map.getBounds();


    if(markerLayer == null){
        markerLayer = L.layerGroup();
    }else{
        markerLayer.clearLayers();
    }

    myData.forEach(element => {

        markerCounter += 1;

        marker = new L.marker([element.long, element.lat], {
            icon: greenIcon,
        })
            .bindPopup("<b>Name: </b>" + element.POI_Name + "<br><b>Kategorie: </b>" + element.kategorie);

        var shouldBeVisible = mapBounds.contains(marker.getLatLng());

        if (shouldBeVisible && markerCounter <= 300) {
            marker.addTo(markerLayer);
        }
    });
    map.addLayer(markerLayer);
}