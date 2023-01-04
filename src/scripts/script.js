var modus = "light";

var map = L.map('map', {
    zoomControl: false,
    inertia: true,
    worldCopyJump: true
}).setView([49.988015, 8.228197], 12);
lightmode();
var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});


function darkmode() {
    if (modus === "light") {
        console.log("darkmode");
        map.addLayer(Stadia_AlidadeSmoothDark);
        modus = "dark";
        map.removeLayer(osm);
    } else {
        map.removeLayer(Stadia_AlidadeSmoothDark)
        lightmode();
    }

}

console.log("lightmode");

function lightmode() {

    var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, {
            maxZoom: 18,
            attribution: osmAttrib
        });

    map.addLayer(osm);
    modus = "light";

}


//document.querySelector("#user_login_logout").style.display = "none"
// initialize the map on the "map" div with a given center and zoom


function getMap() {
    return map;
}

//map.on('click', onMapClick);


function getMap() {
    return map;
}

//map.on('click', onMapClick);


//ROUTING DEMONSTRATION
/*
var route = new BykeRoute(map, "driving", L.latLng(49.69839, 8.620872), L.latLng(49.988015, 8.228197));
route.createRoute();

var iso = new BykeChrone(map, "foot-walking", L.latLng(49.988015, 8.228197), 2000);
iso.createIsochrone();
*/
var firstSelectedPOI = null;
var secondSelectedPOI = null;

var hidemenu = true;
var menu = 0;
handleUIState();


function handleUIState() {
    var divbuttons = document.getElementById("buttons");
    var divcheckboxPoi = document.getElementById("checkboxPoi");
    var divslidecontainer = document.getElementById("slidecontainer");
    var divbuttons_walking_bike_car = document.getElementById("buttons_walking-bike-car");

    if (hidemenu === true) {
        document.getElementById("menu").style.background = "transparent";
        divbuttons.style.display = "none";
        menu = 0;
        showmenu(0);
        hidemenu = false;
    } else {
        document.getElementById("menu").style.background = "grey";
        divbuttons.style.display = "block";
        showmenu(menu);
        hidemenu = true;
        radiusbuttons(0);
        selectbutton(0);
    }
}

function showmenu(menu) {
    document.getElementById("buttons");
    var divcheckboxPoi = document.getElementById("checkboxPoi");
    //var divslidecontainer = document.getElementById("slidecontainer");
    var divbuttons_walking_bike_car = document.getElementById("buttons_walking-bike-car");
    var sitezwei = document.getElementsByClassName("zwei");
    var siteeins = document.getElementsByClassName("eins");
    divcheckboxPoi.style.display = "none";
    //divslidecontainer.style.display = "none";
    divbuttons_walking_bike_car.style.display = "none";

    var sitedrei = document.getElementsByClassName("drei"); //divsToHide is an array
    for (var i = 0; i < sitedrei.length; i++) {
        sitedrei[i].style.display = "none"; // depending on what you're doing
    }
    for (var i = 0; i < sitezwei.length; i++) {
        sitezwei[i].style.display = "none"; // depending on what you're doing
    }
    for (var i = 0; i < siteeins.length; i++) {
        siteeins[i].style.display = "none"; // depending on what you're doing
    }


    if (menu === 1) {
        for (var i = 0; i < siteeins.length; i++) {
            siteeins[i].style.display = ""; // depending on what you're doing
        }
    }
    if (menu === 2) {
        for (var i = 0; i < sitezwei.length; i++) {
            sitezwei[i].style.display = "block"; // depending on what you're doing
        }
    }
    if (menu === 3) {
        for (var i = 0; i < sitedrei.length; i++) {
            sitedrei[i].style.display = "block"; // depending on what you're doing
        }
    }
}

function showUserLogin() {
    document.getElementById("register").style.display = "none";
}

function selectbutton(value) {
    menu = value;
    showmenu(value);
    buttonpressed(value);
    showaddpoi = false;
    showhideaddpoi();
}

function buttonpressed(menu) {
    var buttonWaypoint = document.getElementById("buttonWaypoint");
    var buttonRoute = document.getElementById("buttonRoute");
    var buttonRadius = document.getElementById("buttonRadius");

    buttonWaypoint.classList.remove("buttonselected");
    buttonRoute.classList.remove("buttonselected");
    buttonRadius.classList.remove("buttonselected");

    if (menu === 1) {
        buttonWaypoint.classList.add("buttonselected");
    }
    if (menu === 2) {
        buttonRoute.classList.add("buttonselected");
    }
    if (menu === 3) {
        buttonRadius.classList.add("buttonselected");
    }
}

//TODO: get rid of this or add relevant functionality
function radiusbuttons(value) {
    buttonpressedRadius(value);
}

var routingtype = 3;

function buttonpressedRadius(radiusmenu) {
    var buttonWalking = document.getElementById("buttonWalking");
    var buttonBike = document.getElementById("buttonBike");
    var buttonCar = document.getElementById("buttonCar");
    var routingtype = radiusmenu;
    buttonWalking.classList.remove("buttonselected");
    buttonBike.classList.remove("buttonselected");
    buttonCar.classList.remove("buttonselected");

    if (radiusmenu === 1) {
        buttonWalking.classList.add("buttonselected");
    }
    if (radiusmenu === 2) {
        buttonBike.classList.add("buttonselected");
    }
    if (radiusmenu === 3) {
        buttonCar.classList.add("buttonselected");
    }
}

var search = false;

function searchround() {
    var search_recomendations = document.getElementById("search_recomendations");
    if (search === true) {
        search_recomendations.style.display = "block";
        document.querySelector(".search").setAttribute("id", "searchbarround");
    }
    if (search === false) {
        search_recomendations.style.display = "none";
        console.log();
        document.querySelector(".search").removeAttribute("id")
    }
}

var source = document.getElementById('source21');


var searchinput = "";
var onSearchInput = function (e) {
    //console.log(searchinput)
    searchinput = document.getElementById('source21').value;
    if (searchinput === "") {
        search = false
        searchround();
    } else {
        //TODO: SQL in PHP auslegen, sicherheitsgefahr KRITISCH!
        $.ajax({
            url: "../php/PoiSearchCollector.php",
            type: "post",
            dataType: 'json',
            data: {
                input: searchinput
            },
            success: function (json) {
                document.getElementById("search_recomendations").innerHTML = "";
                for (let i = 0; i < json.length; i++) {
                    var result = new POI({
                        name: json[i].name,
                        category: json[i].cat,
                        lng: json[i].lng,
                        lat: json[i].lat,
                        station_id: json[i].sid,
                        user_id: json[i].uid,
                    });
                    document.getElementById("search_recomendations").innerHTML += result.searchButton;
                    document.getElementById("search_recomendations").innerHTML += "<br>";
                }
            },
            error: function (thrownError) {
                console.log(thrownError.responseText);
            }
        });
        search = true;
        hidemenu = true;
        handleUIState();
        searchround();
    }

}

source.addEventListener('input', onSearchInput);
//source.addEventListener('propertychange', onSearchInput); // for IE8
// Firefox/Edge18-/IE9+ don’t fire on <select><option>
// source.addEventListener('change', inputHandler);

searchround();

function burgermenu() {
    if (search) {
        search = false;
        document.getElementById('source21').value = "";
        searchround();


    }

    handleUIState();
}

var showaddpoi = false;

function showhideaddpoi() {

    if (showaddpoi) {
        document.getElementById("addpoi").style.display = "block"
    } else {
        document.getElementById("addpoi").style.display = "none"
    }

}

function buttonaddpoi() {
    showaddpoi = !showaddpoi;
    showhideaddpoi();
}

showhideaddpoi();

var radiusmenuvalue = 3;

function sliderbuttons(radiusmenu) {
    var radiusWalking = document.getElementById("buttonradiusWalking");
    var radiusBike = document.getElementById("buttonradiusBike");
    var radiusCar = document.getElementById("buttonradiusCar");
    radiusmenuvalue = radiusmenu
    radiusWalking.classList.remove("buttonselected");
    radiusBike.classList.remove("buttonselected");
    radiusCar.classList.remove("buttonselected");

    if (radiusmenu === 1) {
        radiusWalking.classList.add("buttonselected");
    }
    if (radiusmenu === 2) {
        radiusBike.classList.add("buttonselected");
    }
    if (radiusmenu === 3) {
        radiusCar.classList.add("buttonselected");
    }
}

var isoradius = 5000;
var slider = document.getElementById("myRange");
slider.oninput = function () {
    isoradius = 100 * this.value
    console.log(isoradius)
}

map.on('click', function (e) {
    console.log(e.latlng.lat, e.latlng.lng);
    clickeventmanger(e.latlng);
});

function clickeventmanger(cords) {
    if (menu === 0) {


    }
    if (menu === 1) {
        document.getElementById("poiLong").value = cords.lng;
        document.getElementById("poiLat").value = cords.lat;

    }
    if (menu === 2) {
        routeingpoints(cords)

    }
    if (menu === 3) {
        if (radiusmenuvalue === 1) {
            console.log("1");
            addIsochroneToMap("foot-walking", cords, isoradius);
        }
        if (radiusmenuvalue === 2) {
            console.log("2");
            addIsochroneToMap("cycling-regular", cords, isoradius);
        }
        if (radiusmenuvalue === 3) {
            console.log("3");
            addIsochroneToMap("driving-car", cords, isoradius);
        }

    }

}

var route_cords_start = null;
var route_cords_end = null;

function routeingpoints(cord) {
    if (route_cords_start === null) {
        route_cords_start = cord;
        if (route_cords_end != null) {
            removeRouteFromMap();
            routingtypeselecter(route_cords_start, route_cords_end);
        }
    } else {
        route_cords_end = cord;
        removeRouteFromMap();
        routingtypeselecter(route_cords_start, route_cords_end)
    }
}

function routingtypeselecter(start, end) {
    if (routingtype === 1) {
        addRouteToMap("foot", route_cords_start, route_cords_end);
    }
    if (routingtype === 2) {
        addRouteToMap("bike", route_cords_start, route_cords_end);
    }
    if (routingtype === 3) {
        addRouteToMap("car", route_cords_start, route_cords_end);
    }
}

function routing_edit_start() {
    route_cords_start = null;
}


function routing_clear() {
    route_cords_start = null;
    route_cords_end = null;
    removeRouteFromMap();
    removeFirstIsochroneFromMap();
}

function createRouteWithSearchSelection() {
    if (firstSelectedPOI != null && secondSelectedPOI != null) {
        removeRouteFromMap();
        var start = new L.latLng(firstSelectedPOI.params.lat, firstSelectedPOI.params.lng);
        var dest = new L.latLng(secondSelectedPOI.params.lat, secondSelectedPOI.params.lng);
        if (routingtype === 1) {
            addRouteToMap("foot", start, dest);
        } else if (routingtype === 2) {
            addRouteToMap("bike", start, dest);
        } else if (routingtype === 3) {
            addRouteToMap("car", start, dest);
        } else {
            addRouteToMap("car", start, dest);
        }
    }
}

function getIsoType() {
    if (radiusmenuvalue === 1) {
        return "foot-walking";
    } else if (radiusmenuvalue === 2) {
        return "cycling-regular";
    } else {
        return "driving-car";
    }
}



