const OSRM_URL = "https://router.project-osrm.org/route/v1";

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
            show: false,
            collapsible: false
        }).addTo(this.map);
    }

    updateRoute() {
        //relevant? nicht relevant? idk
    }

    removeRoute(){
        if(route != null){
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
}
