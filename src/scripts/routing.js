var OSRM_URL = "https://router.project-osrm.org/route/v1";

class BykeRoute {
    route;

    constructor(map, routeType, source, target) {
        this.map = map;
        this.routeType = routeType;
        this.source = source;
        this.target = target;
    }

    createRoute() {
        this.route = L.Routing.control({
            waypoints: [
                this.source,
                this.target
            ],
            addWaypoints: false,
            draggableWaypoints: false,
            routeWhileDragging: false,
            router: new L.Routing.OSRMv1({serviceUrl: OSRM_URL, profile: this.routeType}),
            lineOptions: {
                styles: [{color: '#2e4f3a', opacity: 0.15, weight: 7},
                    {color: '#396444', opacity: 0.6, weight: 4},
                    {color: '#60a175', opacity: 0.8, weight: 2, dashArray: '7,12'}]
            },
            createMarker: function (i, waypoint, n) {
                return L.marker(waypoint.latLng, {
                    draggable: false,
                    bounceOnAdd: false,
                    icon: L.icon({
                        iconUrl: 'https://i.imgur.com/bjyhBXS.png',
                        iconSize: [40, 40],
                        iconAnchor: [28, 28]
                    }),
                    opacity: 0.85,
                });
            },
            show: false,
            collapsible: false
        });
        this.route.addTo(this.map);
    }

    updateRoute(lat, lng, selected) {
        if(this.route != null) {
            var context = this;
            this.removeRoute();
            $.ajax({
                context: context,
                url: "../php/GetFallbackStation.php",
                type: "get",
                dataType: 'json',
                data: {
                    latitude: lat,
                    longitude: lng
                },
                success: function (json) {
                    var coords = L.latLng(json[1].lat, json[1].lng);
                    console.log(coords + " " + context.source + " " + context.target);
                    if (selected === 0) {
                        context.source = coords;
                        context.createRoute();
                    } else {
                        context.target = coords;
                        context.createRoute();
                    }
                    context.updateData();
                },
                error: function (thrownError) {
                    console.log(thrownError.responseText);
                }
            });
        }
    }

    removeRoute() {
        if (route != null) {
            this.map.removeControl(this.route);
            this.route = null;
        }
    }

    updateData(){
        this.route.on('routesfound', function (e) {
            let distance = e.routes[0].summary.totalDistance;
            let time = e.routes[0].summary.totalTime;
            document.getElementById("infosmenuzwei").innerHTML = "<br>" + parseFloat(distance / 1000).toFixed(2) + "km / "
                + parseFloat(time / 60).toFixed(2) + "min<br><br>";
        });
    }

    showPlan() {
        this.route.show();
    }

    hidePlan() {
        this.route.hide();
    }
}
