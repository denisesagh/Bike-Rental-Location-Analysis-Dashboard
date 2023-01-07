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
                    bounceOnAddOptions: {
                        duration: 1000,
                        height: 800,
                    },
                    icon: L.icon({
                        iconUrl: 'https://i.imgur.com/bjyhBXS.png',
                        iconSize: [40, 40],
                        iconAnchor: [28, 28],
                        popupAnchor: [-3, -76],
                        shadowSize: [68, 95],
                        shadowAnchor: [22, 94]
                    }),
                    opacity: 0.85,
                });
            },
            show: false,
            collapsible: false
        });
        //TODO: Style and fix
        //this.route.createContainer("iternary");
        this.route.addTo(this.map);
    }

    updateRoute() {
        //relevant? nicht relevant? idk
    }

    removeRoute() {
        if (route != null) {
            this.map.removeControl(this.route);
            this.route = null;
        }
    }

    showPlan() {
        this.route.show();
    }

    hidePlan() {
        this.route.hide();
    }

    getTime(){
        return this.route.summary.totalTime;
    }

    getDistance(){
        return this.route.summary.totalDistance;
    }
}
