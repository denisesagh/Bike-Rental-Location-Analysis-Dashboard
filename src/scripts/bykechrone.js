const API_KEY = "5b3ce3597851110001cf62481e9ad655bdbd469ca42072bdf27481e1";
//https://openrouteservice.org/dev/#/home

var isochrone

class BykeChrone {

    //isochrone

    constructor(map, type, poi, range) {
        this.map = map;
        this.type = type;
        this.poi = poi;
        this.range = range;
    }

    createIsochrone() {
        if(isochrone != null){
            isochrone.onRemove();
        }
        this.isochrone = L.control.isochrone({
            apiKey: API_KEY,
            travelMode: this.type,
            poi: this.poi,
            smoothing: 25,
            rangeType: "distance",
            rangeValue: this.range,
            rangeInterval: this.range / 5,
            styleFn: styleIsolines,
            mouseOverFn: highlightIsolines,
            mouseOutFn: resetIsolines,
            clickFn: clickIsolines,
        });
        isochrone = this.isochrone;
        this.isochrone.callApi();
        this.isochrone.addTo(this.map);
    }

    removeIsochrone() {
        if (this.isochrone != null) {
            this.isochrone.onRemove();
            this.map.removeControl(this.isochrone);
        }
    }


}

function resetIsolines(e) {
    // NOTE: as shown in the examples on the Leaflet website, e.target = the layer the user is interacting with
    var layer = e.target;

    isochrone.lastIso.resetStyle(layer);
}

function styleIsolines(feature) {
    // NOTE: You can do some conditional styling by reading the properties of the feature parameter passed to the function
    return {
        color: '#567272',
        opacity: 0.4,
        fillOpacity: 0.2
    };
}

// Example function to style the isoline polygons when the user hovers over them
function highlightIsolines(e) {
    // NOTE: as shown in the examples on the Leaflet website, e.target = the layer the user is interacting with
    var layer = e.target;

    layer.setStyle({
        fillColor: '#2bd966',
        weight: 4,
        fillOpacity: '0.3',
        opacity: '0.5'
    });
}

// Example function to reset the style of the isoline polygons when the user stops hovering over them


// Example function to display information about an isoline in a popup when the user clicks on it
function clickIsolines(e) {
    // NOTE: as shown in the examples on the Leaflet website, e.target = the layer the user is interacting with
    var layer = e.target;
    var props = layer.feature.properties;
    var popupContent = 'Mode of travel: ' + props['Travel mode'] + '<br />Range: 0 - ' + props['Range'] + ' ' + props['Range units'] + '<br />Area: ' + props['Area'] + ' ' + props['Area units'] + '<br />Population: ' + props['Population'];
    if (props.hasOwnProperty('Reach factor')) popupContent += '<br />Reach factor: ' + props['Reach factor'];
    layer.bindPopup(popupContent).openPopup();
}