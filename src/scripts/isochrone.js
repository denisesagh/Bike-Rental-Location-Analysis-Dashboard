const ISO_URL = "";
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

class BykeChrone {
    isochrone;

    request = new XMLHttpRequest();
    query;

    constructor(map, type, source, radius) {
        this.map = map;
        this.request.open('POST', "https://api.openrouteservice.org/v2/isochrones/{0}".format(type));
        this.request.setRequestHeader('Accept', 'application/json, application/geo+json, img/png; charset=utf-8');
        this.request.setRequestHeader('Content-Type', 'application/json');
        this.request.setRequestHeader('Authorization', API_KEY);

        this.request.onreadystatechange = function () {
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                console.log('Body:', JSON.parse(this.responseText));

                var data = JSON.parse(this.responseText);

                L.geoJSON(data, {style: function (){
                    //styles hier oder freilassen für default
                    },}).addTo(map);
            }
        }
        this.query = '{"locations":[[{0},{1}]],"range":[{2},{3}]}'.format(source.lng, source.lat, (radius * 0.66), radius);
        console.log(this.query);
        this.request.send(this.query);
        console.log('Body:', this.request.responseText);
    }
}

function createIso(map, data) {
    var json = JSON.parse(data);
    L.geoJSON(json).addTo(map);
    alert("done shit");
}