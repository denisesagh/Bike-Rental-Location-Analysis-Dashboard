const API_KEY = "5b3ce3597851110001cf62481e9ad655bdbd469ca42072bdf27481e1";
//https://openrouteservice.org/dev/#/home

String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match;
    });
};

L.Control.Isochrone = L.Control.extend({
    options: {
        position: 'topleft',
        pane: 'overlayPane',

        apiKey: "",
        travelMode: "car-driving",
        poi: L.latLng(49.988015, 8.228197),
        rangeType: "distance",
        rangeValue: 5,
        rangeInterval: 0,
        rangeControlDistanceUnits: "km",
        smoothing: 0,
        attributes: '"area","reachfactor","total_pop"',

        //function calls
        styleFn: null,
        mouseOverFn: null,
        mouseOutFn: null,
        clickFn: null,

        showOriginMarker: true,
        markerFn: null
    },

    onAdd: function (map) {
        this._map = map;

        this.lastIso = null;
        this.groupIso = L.geoJSON(null, {style: this.options.styleFn});

        this._container = L.DomUtil.create('div', 'leaflet-bar ');
        L.DomEvent.disableClickPropagation(this._container);
        return this._container;
    },

    onRemove: function (map) {
        this.isolinesGroup.removeFrom(this._map);
        this.isolinesGroup.clearLayers();
    },

    callApi: function () {
        var context = this;

        if (window.XMLHttpRequest) {

            var requestBody = '{"locations":[[' + context.options.poi.lng + ',' + context.options.poi.lat + ']],"attributes":[' + this.options.attributes + '],"smoothing":' + this.options.smoothing + ',';
            requestBody += '"range_type":"' + this.options.rangeType + '","area_units":"' + this.options.rangeControlDistanceUnits + '","range":[' + this.options.rangeValue + '],"interval":'+this.options.rangeInterval+'}';

            var request = new XMLHttpRequest();

            request.open('POST', 'https://api.openrouteservice.org/v2/isochrones/' + this.options.travelMode);

            request.setRequestHeader('Content-Type', 'application/geo+json; charset=utf-8');
            request.setRequestHeader('Authorization', this.options.apiKey);

            request.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    var data = JSON.parse(this.responseText);
                    console.log(data);
                    if (data.hasOwnProperty('features')) {
                        data.features.reverse();
                        for (var i = 0; i < data.features.length; i++) {
                            var props = data.features[i].properties;
                            var range = props.value / 1000;

                            var newProps = {
                                'Travel mode': context.options.travelMode,
                                'Measure': context.options.rangeType,
                                'Range': range,
                                'Latitude': props.center[1],
                                'Longitude': props.center[0]
                            }
                            if (props.hasOwnProperty('total_pop')) newProps['Population'] = props.total_pop;
                            if (props.hasOwnProperty('reachfactor')) newProps['Reach factor'] = props.reachfactor;
                            data.features[i].properties = newProps;
                        }

                        context.lastIso = L.geoJSON(data, {style: context.options.styleFn});

                        context.lastIso.eachLayer(function (layer) {
                            // Iterate through each layer adding events if applicable
                            layer.on({
                                mouseover: (function (e) {
                                    if (context.options.mouseOverFn != null) context.options.mouseOverFn(e)
                                }),
                                mouseout: (function (e) {
                                    if (context.options.mouseOutFn != null) context.options.mouseOutFn(e)
                                }),
                                click: (function (e) {
                                    if (context.options.clickFn != null) context.options.clickFn(e);
                                })
                            });
                        });
                        if (context.options.showOriginMarker) {
                            var originMarker;

                            if (context.options.markerFn != null) {
                                originMarker = context.options.markerFn(context.options.poi, context.options.travelMode, context.options.rangeType);
                            }
                            else {
                                // Create a default marker for the origin of the isolines group
                                originMarker = L.circleMarker(context.options.poi, { radius: 3, weight: 0, fillColor: '#0073d4', fillOpacity: 1 });
                            }

                            // Add the marker to the isolines GeoJSON
                            originMarker.addTo(context.lastIso);
                        }
                        context.lastIso.addTo(context.groupIso);

                        // Add the isolines GeoJSON FeatureGroup to the map if it isn't already
                        if (!context._map.hasLayer(context.groupIso)) context.groupIso.addTo(context._map);
                    }
                }
            }
        }
        request.send(requestBody);
    }
});

L.control.isochrone = function (options) {
    return new L.Control.Isochrone(options);
};

class BykeChrone {

    isochrone
    constructor(map, type, poi, range) {
        this.map = map;
        this.type = type;
        this.poi = poi;
        this.range = range;
    }

    createIsochrone(){
        this.isochrone = L.control.isochrone({
            apiKey: API_KEY,
            travelMode: this.type,
            poi: this.poi,
            smoothing: 0.5,
            rangeValue: this.range,
            rangeInterval: this.range / 5,
        });

        this.isochrone.callApi();
        this.isochrone.addTo(this.map);
    }

    removeIsochrone(){
        if(this.isochrone != null){
            this.map.removeControl(this.isochrone);
            this.isochrone = null;
        }
    }
}