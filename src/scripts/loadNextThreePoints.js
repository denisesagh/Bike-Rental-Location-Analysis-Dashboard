function getThreeNext(name, long, lat, kategorie, id) {
    ajaxloadDataNextThreeMarkers(id);
    marker = new L.circleMarker([long, lat], {
        color: setMarkerColor(kategorie),
        renderer: myRenderer
    })
        .bindPopup("<b>Name: </b>" + name + "<br><b>Kategorie: </b>" + kategorie).addTo(markerLayer);
}


function ajaxloadDataNextThreeMarkers(id) {
    try {
        $.ajax({
            type: 'GET',
            url: ('../php/POI-Dash-GetData.php'),
            dataType: 'json',
            data: {ID: id},
            error: ajaxLoadMHSError,
            success: function (result) {
                placeMarkersInBounds(result, 3)
            }
        })
    } catch (error) {
        console.log("Failed to load POIS!");
    }
}

function ajaxLoadMHSError() {
    console.log("couldn't load next three markers");
}