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

        styleEvnt: null,
        mouseOverEvnt: null,
        mouseOutEvnt: null,
        clickEvnt: null,

        showOriginMarker: true,
        markerFn: null
    },

    onAdd: function (map) {
        this._map = map;

        this.lastIso = null;
        //this.groupIso = L.geoJSON(null, {style: this.options.styleFn});
        this.groupIso = new L.LayerGroup();
        this.groupIso.addTo(this._map);
        this._container = L.DomUtil.create('div', 'leaflet-bar ');
        L.DomEvent.disableClickPropagation(this._container);
        return this._container;
    },

    onRemove: function () {
        if (this.lastIso != null) {
            this.groupIso.removeLayer(this.lastIso);
            this.groupIso.removeFrom(this._map);
        }
    },

    callApi: function () {
        var context = this;

        if (window.XMLHttpRequest) {

            var requestBody = '{"locations":[[' + context.options.poi.lng + ',' + context.options.poi.lat + ']],"attributes":[' + this.options.attributes + '],"smoothing":' + this.options.smoothing + ',';
            requestBody += '"range_type":"' + this.options.rangeType + '","area_units":"' + this.options.rangeControlDistanceUnits + '","range":[' + this.options.rangeValue + '],"interval":' + this.options.rangeInterval + '}';

            var request = new XMLHttpRequest();

            request.open('POST', 'https://api.openrouteservice.org/v2/isochrones/' + this.options.travelMode);

            request.setRequestHeader('Content-Type', 'application/geo+json; charset=utf-8');
            request.setRequestHeader('Authorization', this.options.apiKey);

            request.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    var data = JSON.parse(this.responseText);
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

                        context.lastIso = L.geoJSON(data, {style: context.options.styleEvnt});

                        context.lastIso.eachLayer(function (layer) {
                            layer.on({
                                mouseover: (function (e) {
                                    if (context.options.mouseOverEvnt != null) context.options.mouseOverEvnt(e)
                                }),
                                mouseout: (function (e) {
                                    if (context.options.mouseOutEvnt != null) context.options.mouseOutEvnt(e)
                                }),
                                click: (function (e) {
                                    if (context.options.clickEvnt != null) context.options.clickEvnt(e);
                                })
                            });
                        });
                        if (context.options.showOriginMarker) {
                            var originMarker;

                            if (context.options.markerFn != null) {
                                originMarker = context.options.markerFn(context.options.poi, context.options.travelMode, context.options.rangeType);
                            } else {
                                originMarker = L.circleMarker(context.options.poi, {
                                    radius: 3,
                                    weight: 0,
                                    fillColor: '#0073d4',
                                    fillOpacity: 1
                                });
                            }
                            originMarker.addTo(context.lastIso);
                        }
                        context.lastIso.addTo(context.groupIso);
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


