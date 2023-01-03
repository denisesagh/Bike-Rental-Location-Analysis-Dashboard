var route;
var iso;

/*
type: car, bike, foot
start: L.latLng(X.Y, X.Y)
destination: L.latLng(X.Y, X.Y)
 */
function addRouteToMap(type, start, destination) {
    route = new BykeRoute(getMap(), type, start, destination);
    route.createRoute();
}

function removeRouteFromMap() {
    if (route != null) {
        route.removeRoute();
        route = null;
    }
}

/*
types: driving-car, cycling-regular/cycling-road, foot-walking
coords: L.latLng(X.Y, X.Y)
range: 100-10000 UNBEDINGT DARAUF BEGRENZEN!!!
 */
function addIsochroneToMap(type, coords, range) {
    if (iso != null) {
        iso.removeIsochrone();
        iso = null;
    }
    iso = new BykeChrone(getMap(), type, coords, range);
    iso.createIsochrone();
}

function addIsochroneToMap(type, lat, lng, range) {
    var coords = new L.latLng(lat, lng);
    if (iso != null) {
        iso.removeIsochrone();
        iso = null;
    }
    iso = new BykeChrone(getMap(), type, coords, range);
    iso.createIsochrone();
}

function removeFirstIsochroneFromMap() {
    if (iso != null) {
        iso.removeIsochrone();
        iso = null;
    }
}