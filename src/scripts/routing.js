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
