var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    osm = L.tileLayer(osmUrl, {
        maxZoom: 18,
        attribution: osmAttrib
    });

document.querySelector("#user_login_logout").style.display = "none"
// initialize the map on the "map" div with a given center and zoom
var map = L.map('map', {
    zoomControl: false,
    inertia: true,
    worldCopyJump: true
}).setView([19.04469, 72.9258], 12).addLayer(osm);

map.on('click', onMapClick);


//ROUTING DEMONSTRATION
var route = new BykeRoute(map, "driving", L.latLng(49.69839,  8.620872), L.latLng(49.988015,  8.228197));
route.createRoute();
route.showPlan();

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
