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
        this.searchButton = this.createButton(this.params.name);
    }

    createMarker() {

    }

    createButton(name) {
        var addParams = '\'' + this.params.name + '\', \'' + this.params.category + '\', '
            + this.params.lat + ', ' + this.params.lng;
        return '<button type="button" class="searchButton" onclick="addToSelectedPOIs(' + addParams + ')">'
            + formatWithCategoryIcon("  " + this._shortenName(name), this.params.category) + '</button>';
    }

    _shortenName(name) {
        if (name.length >= 30) {
            return name.slice(0, 29) + "...";
        } else {
            return name;
        }
    }
}

function addToSelectedPOIs(name, cat, lat, lng) {
    if (firstSelectedPOI === false) {
        document.getElementById("selected-poi1").appendChild(formatSelectedPOI(name, cat, lat, lng, "selected-poi1"));
        firstSelectedPOI = true;
    } else if (secondSelectedPOI === false) {
        document.getElementById("selected-poi2").appendChild(formatSelectedPOI(name, cat, lat, lng, "selected-poi2"));
        secondSelectedPOI = true;
    } else {
        alert("please remove one of your selected POIs");
    }
    console.log(name + " " + cat + " " + lat + " " + lng);
}

function formatSelectedPOI(name, cat, lat, lng, elementId) {
    var body = document.createElement("p");
    body.innerHTML += formatWithCategoryIcon("  " + name, cat);
    var formattedElement = "\'" + elementId + "\'";
    var buttonRemove = '<button type="button" class="searchButton" onclick="removeSelectedPOI(' + formattedElement + ')">' +
        "Remove" + '</button>'
    body.innerHTML += buttonRemove;

    return body;
}

function removeSelectedPOI(elementId) {
    document.getElementById(elementId).innerHTML = "";
    if (elementId === "selected-poi1") {
        firstSelectedPOI = false;
    } else {
        secondSelectedPOI = false;
    }
}

function formatWithCategoryIcon(text, cat) {
    switch (cat) {
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