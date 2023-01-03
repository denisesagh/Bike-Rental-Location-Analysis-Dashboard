var route;
var isochrones = [];

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
    isochrones.push(new BykeChrone(getMap(), type, coords, range));
    isochrones.at(isochrones.length - 1).createIsochrone();
}

function removeFirstIsochroneFromMap() {
    if (isochrones.length > 0) {
        isochrones.at(0).removeIsochrone();
        isochrones.shift();
    }
}