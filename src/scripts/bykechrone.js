const API_KEY = "5b3ce3597851110001cf62481e9ad655bdbd469ca42072bdf27481e1";
//https://openrouteservice.org/dev/#/home

var isochrone

class BykeChrone {
    constructor(map, type, poi, range) {
        this.map = map;
        this.type = type;
        this.poi = poi;
        this.range = range;
    }

    createIsochrone() {
        this.isochrone = L.control.isochrone({
            apiKey: API_KEY,
            travelMode: this.type,
            poi: this.poi,
            smoothing: 10,
            rangeType: "distance",
            rangeValue: this.range,
            rangeInterval: this.range / 5,
            styleEvnt: styleIsolines,
            mouseOverEvnt: highlightIsolines,
            mouseOutEvnt: resetIsolines,
            clickEvnt: clickIsolines,
        });
        isochrone = this.isochrone;
        this.isochrone.callApi();
        this.isochrone.addTo(this.map);
        map.setView(this.poi, 12);
    }

    removeIsochrone() {
        if (this.isochrone != null) {
            this.isochrone.onRemove();
        }
    }
}

function resetIsolines(e) {
    var layer = e.target;

    isochrone.lastIso.resetStyle(layer);
}

function styleIsolines(feature) {
    return {
        color: '#567272',
        opacity: 0.4,
        fillOpacity: 0.2
    };
}

function highlightIsolines(e) {
    var layer = e.target;

    layer.setStyle({
        fillColor: '#2bd966',
        weight: 4,
        fillOpacity: '0.3',
        opacity: '0.5'
    });
}

function clickIsolines(e) {
    var layer = e.target;
    var props = layer.feature.properties;
    var popupContent = 'Mode of travel: ' + props['Travel mode'] + '<br />Range: 0 - ' + props['Range'] + ' ' + 'km' + '<br />Population: ' + props['Population'];
    if (props.hasOwnProperty('Reach factor')) popupContent += '<br />Reach factor: ' + props['Reach factor'];
    layer.bindPopup(popupContent).openPopup();
}