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
    route.route.on('routesfound', function (e) {
        let distance = e.routes[0].summary.totalDistance;
        let time = e.routes[0].summary.totalTime;
        document.getElementById("infosmenuzwei").innerHTML = "<br>" + parseFloat(distance / 1000).toFixed(2) + "km / "
            + parseFloat(time / 60).toFixed(2) + "min<br><br>";
    });
}

function removeRouteFromMap() {
    if (route != null) {
        route.removeRoute();
        route = null;
        document.getElementById("infosmenuzwei").innerHTML = "";
    }
}

function updateRouteOnMap(lat, lng){
    this.route.updateRoute(lat, lng);
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

function addIsochroneToMapRaw(lat, lng) {
    var coords = new L.latLng(lat, lng);
    if (iso != null) {
        iso.removeIsochrone();
        iso = null;
    }
    iso = new BykeChrone(getMap(), getIsoType(), coords, isoradius);
    iso.createIsochrone();
}

function removeFirstIsochroneFromMap() {
    if (iso != null) {
        iso.removeIsochrone();
        iso = null;
    }
}