class POI {
    params = {
        name: "",
        category: "",
        lng: 0.0,
        lat: 0.0,
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
            + formatWithCategoryIcon("  " + shortenName(name, 30), this.params.category) + '</button>';
    }
}

function shortenName(name, length) {
    if (name.length >= length) {
        return name.slice(0, length - 1) + "...";
    } else {
        return name;
    }
}

function addToSelectedPOIs(name, cat, lat, lng) {
    if (firstSelectedPOI == null) {
        document.getElementById("selected-poi1").appendChild(formatSelectedPOI(name, cat, lat, lng, "selected-poi1"));
        firstSelectedPOI = new POI({
            name: name,
            cat: cat,
            lat: lat,
            lng: lng
        });
    } else if (secondSelectedPOI == null) {
        document.getElementById("selected-poi2").appendChild(formatSelectedPOI(name, cat, lat, lng, "selected-poi2"));
        secondSelectedPOI = new POI({
            name: name,
            cat: cat,
            lat: lat,
            lng: lng
        });
    } else {
        alert("please remove one of your selected POIs");
    }
    console.log(name + " " + cat + " " + lat + " " + lng);
}

function formatSelectedPOI(name, cat, lat, lng, elementId) {
    var body = document.createElement("p");
    body.innerHTML += formatWithCategoryIcon("  " + shortenName(name, 20), cat);
    var formattedElement = "\'" + elementId + "\'";
    var buttonRemove = '<button type="button" class="searchButton" onclick="removeSelectedPOI(' + formattedElement + ')">' +
        "Remove" + '</button>'

    formattedElement = lat + "," + lng;
    console.log(formattedElement);
    var buttonIso = '<button type="button" class="searchButton" onclick="addIsochroneToMapRaw(' + formattedElement + ')">' +
        "Show Reach" + '</button>'

    body.innerHTML += buttonIso;
    body.innerHTML += buttonRemove;
    return body;
}

function removeSelectedPOI(elementId) {
    document.getElementById(elementId).innerHTML = "";
    if (elementId === "selected-poi1") {
        firstSelectedPOI = null;
    } else {
        secondSelectedPOI = null;
    }
}

function formatWithCategoryIcon(text, cat) {
    switch (cat) {
        case "Gastronomie":
            return "<i class=\"fa-solid fa-utensils iconcheck\"></i>" + text;
        case "Öffentlich":
            return "<i class=\"fa-solid fa-building iconcheck\" ></i>" + text;
        case "Freizeit":
            return "<i class=\"fa-solid fa-futbol iconcheck\"></i>" + text;
        case "Bildung":
            return "<i class=\"fa-solid fa-book\"></i>" + text;
        case "Lebensmittel":
            return "<i class=\"fa-solid fa-carrot\"></i>" + text;
        case "Dienstleistung":
            return "<i class=\"fa-solid fa-bell-concierge\"></i>" + text;
        case "Finanzwesen":
            return "<i class=\"fa-solid fa-money-bill\"></i>" + text;
        case "Gesundheit":
            return "<i class=\"fa-solid fa-house-medical\"></i>" + text;
        case "Shopping":
            return "<i class=\"fa-solid fa-cart-shopping\"></i>" + text;
        case "Religion":
            return "<i class=\"fa-solid fa-cross\"></i>" + text;
        case "Fahrradstation":
            return "<i class=\"fa-solid fa-bicycle iconcheck\"></i>" + text;
        default:
            return "<i class=\"fa-solid fa-minus\"></i>" + text;
    }
}