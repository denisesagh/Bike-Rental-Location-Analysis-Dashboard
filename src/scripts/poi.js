class POI {
    params = {
        name: "",
        category: "",
        lng: 0.0,
        lat: 0.0,
        station_id: 0,
        user_id: 0,

        markerBtn1: null,
        markerBtn2: null,
        markerBtn3: null
    }

    searchButton = null;

    constructor(params) {
        this.params = params;
        this.searchButton = this._createButton(this.params.name);
    }

    _createButton(name){
        var btn = document.createElement("button");
        btn.innerHTML(this._shortenName(name));
    }

    _shortenName(name){
        if(name.length >= 25){
            return name.slice(0, 24) + "...";
        } else {
            return name;
        }
    }

}