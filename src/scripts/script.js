var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    osm = L.tileLayer(osmUrl, {
        maxZoom: 18,
        attribution: osmAttrib
    });

//document.querySelector("#user_login_logout").style.display = "none"
// initialize the map on the "map" div with a given center and zoom
var map = L.map('map', {
    zoomControl: false,
    inertia: true,
    worldCopyJump: true
}).setView([19.04469, 72.9258], 12).addLayer(osm);

//map.on('click', onMapClick);


//ROUTING DEMONSTRATION
var route = new BykeRoute(map, "driving", L.latLng(49.69839, 8.620872), L.latLng(49.988015, 8.228197));
route.createRoute();

var iso = new BykeChrone(map, "foot-walking", L.latLng(49.988015, 8.228197), 2000);
iso.createIsochrone();
/*
function onMapClick(e) {

    var marker = L.marker(e.latlng, {
        draggable: true,
        title: "Resource location",
        alt: "Resource Location",
        riseOnHover: true
    }).addTo(map)
        .bindPopup(e.latlng.toString()).openPopup();
    // Update marker on changing it's position
    marker.on("dragend", function (ev) {
        var chagedPos = ev.target.getLatLng();
        this.bindPopup(chagedPos.toString()).openPopup();
    });
}
*/


var hidemenu = true;
var menu = 0;
myFunction();


function myFunction() {
    //alert("ey")
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
        //menu wird nie gesetzt?? immer nur übergeben durch html -> direkt reine übergebungsvariable machen
        showmenu(menu);
        hidemenu = true;
        radiusbuttons(0);
        selectbutton(0);
    }
}

function showmenu(menu) {
    document.getElementById("buttons");
    var divcheckboxPoi = document.getElementById("checkboxPoi");
    var divslidecontainer = document.getElementById("slidecontainer");
    var divbuttons_walking_bike_car = document.getElementById("buttons_walking-bike-car");

    divcheckboxPoi.style.display = "none";
    divslidecontainer.style.display = "none";
    divbuttons_walking_bike_car.style.display = "none";

    if (menu === 1) {
        divcheckboxPoi.style.display = "block";
    }
    if (menu === 2) {
        divbuttons_walking_bike_car.style.display = "block";
    }
    if (menu === 3) {
        divslidecontainer.style.display = "block";
    }
}

function showUserLogin() {
    document.getElementById("register").style.display = "none";
}

function selectbutton(value) {
    menu = value;
    showmenu(value);
    buttonpressed(value);
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

function buttonpressedRadius(radiusmenu) {
    var buttonWalking = document.getElementById("buttonWalking");
    var buttonBike = document.getElementById("buttonBike");
    var buttonCar = document.getElementById("buttonCar");

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
        $.ajax({
            url: "../scripts/poicollector.php",
            type: "post",
            dataType: 'json',
            data: {
                query: "SELECT * FROM poi WHERE NAME LIKE '%" + searchinput + "%' LIMIT 5"
            },
            success: function (json) {
                var searchResultBuilder = "";
                for (let i = 0; i < json.length; i++) {
                    searchResultBuilder += "<p>" + json[i].name + "</p>";
                }
                document.getElementById("search_recomendations").innerHTML = searchResultBuilder;
            },
            error: function (thrownError) {
                console.log(thrownError.responseText);
            }
        });
        search = true;
        hidemenu = true;
        myFunction();
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

    myFunction();
}
