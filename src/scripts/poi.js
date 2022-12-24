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
        markerBtn3: null,

        searchBtnClick: null
    }

    searchButton = null;

    constructor(params) {
        this.params = params;
        //this.searchButton = this._createButton(this.params.name);
    }

    createMarker() {

    }

    createButton(name) {
        var btn = document.createElement("button");
        btn.innerHTML = this._formatWithCategoryIcon("  " + this._shortenName(name));
        btn.setAttribute("class", "searchButton");
        btn.type = "button";
        btn.onclick = function (){
            console.log("yea");
        };
        document.getElementById("search_recomendations").appendChild(btn);
       //btn.addEventListener("click", onclick);
        //return btn;
    }

    _shortenName(name) {
        if (name.length >= 30) {
            return name.slice(0, 29) + "...";
        } else {
            return name;
        }
    }

    _formatWithCategoryIcon(text) {
        switch (this.params.category) {
            case "Gastronomie":
                return "<label for=\"myCheck1\"><i class=\"fa-solid fa-utensils iconcheck\"></i>" + text + "</label>";
            case "Öffentliche_Hand":
                return "<label for=\"myCheck2\"><i class=\"fa-solid fa-building iconcheck\" ></i>" + text + "</label>";
            case "Freizeit":
                return "<label for=\"myCheck3\"><i class=\"fa-solid fa-futbol iconcheck\"></i>" + text + "</label>";
            case "Bildung":
                return "<label for=\"myCheck3\"><i class=\"fa-solid fa-book\"></i>" + text + "</label>";
            case "Lebensmittel":
                return "<label for=\"myCheck3\"><i class=\"fa-solid fa-carrot\"></i>" + text + "</label>";
            case "Dienstleistungen_Fachhandel":
                return "<label for=\"myCheck3\"><i class=\"fa-solid fa-bell-concierge\"></i>" + text + "</label>";
            case "Finanzwesen_Versicherungen":
                return "<label for=\"myCheck3\"><i class=\"fa-solid fa-money-bill\"></i>" + text + "</label>";
            case "Gesundheit":
                return "<label for=\"myCheck3\"><i class=\"fa-solid fa-house-medical\"></i>" + text + "</label>";
            case "Shopping":
                return "<label for=\"myCheck3\"><i class=\"fa-solid fa-cart-shopping\"></i>" + text + "</label>";
            case "Religion":
                return "<label for=\"myCheck3\"><i class=\"fa-solid fa-cross\"></i>" + text + "</label>";
            default:
                return "<label for=\"myCheck3\"><i class=\"fa-solid fa-minus\"></i>" + text + "</label>";
        }
    }
}