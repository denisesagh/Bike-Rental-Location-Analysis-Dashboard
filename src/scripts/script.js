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

function getMap(){
    return map;
}

//map.on('click', onMapClick);


//ROUTING DEMONSTRATION
var route = new BykeRoute(map, "driving", L.latLng(49.69839, 8.620872), L.latLng(49.988015, 8.228197));
route.createRoute();

var iso = new BykeChrone(map, "foot-walking", L.latLng(49.988015, 8.228197), 2000);
iso.createIsochrone();

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
    //var divslidecontainer = document.getElementById("slidecontainer");
    var divbuttons_walking_bike_car = document.getElementById("buttons_walking-bike-car");
    var sitezwei = document.getElementsByClassName("zwei");
    var siteeins = document.getElementsByClassName("eins");
    divcheckboxPoi.style.display = "none";
    //divslidecontainer.style.display = "none";
    divbuttons_walking_bike_car.style.display = "none";

    var sitedrei = document.getElementsByClassName("drei"); //divsToHide is an array
    for(var i = 0; i < sitedrei.length; i++){
        sitedrei[i].style.display = "none"; // depending on what you're doing
    }
    for(var i = 0; i < sitezwei.length; i++){
        sitezwei[i].style.display = "none"; // depending on what you're doing
    }
    for(var i = 0; i < siteeins.length; i++){
        siteeins[i].style.display = "none"; // depending on what you're doing
    }



    if (menu === 1) {
        for(var i = 0; i < siteeins.length; i++){
            siteeins[i].style.display = ""; // depending on what you're doing
        }
    }
    if (menu === 2) {
        for(var i = 0; i < sitezwei.length; i++){
            sitezwei[i].style.display = "block"; // depending on what you're doing
        }
    }
    if (menu === 3) {
        for(var i = 0; i < sitedrei.length; i++){
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
    showaddpoi=false;
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
var showaddpoi=false;
function showhideaddpoi(){

    if (showaddpoi){
        document.getElementById("addpoi").style.display="block"
    }
    else{
        document.getElementById("addpoi").style.display="none"
    }

}
function buttonaddpoi(){
    if(showaddpoi){
        showaddpoi=false;
    }
    else {
        showaddpoi=true;
    }
    showhideaddpoi();
}
showhideaddpoi();

var radiusmenuvalue=3;
function sliderbuttons(radiusmenu) {
    var radiusWalking = document.getElementById("buttonradiusWalking");
    var radiusBike = document.getElementById("buttonradiusBike");
    var radiusCar = document.getElementById("buttonradiusCar");
    radiusmenuvalue=radiusmenu
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

var isoradius=5000;
var slider = document.getElementById("myRange");
slider.oninput = function() {
    isoradius=100*this.value
    console.log(isoradius)
}

map.on('click', function(e) {
    console.log(e.latlng.lat, e.latlng.lng);
    clickeventmanger(e.latlng);

});

function clickeventmanger(cords){
    if (menu ===0){


    }
    if (menu ===1){
        document.getElementById("poiLong").value = cords.lng;
        document.getElementById("poiLat").value = cords.lat;

    }
    if (menu ===2){
        routeingpoints(cords)

    }
    if (menu ===3){
        if (radiusmenuvalue===1){
            //removeFirstIsochroneFromMap();
            console.log("1")
            addIsochroneToMap("foot-walking",cords,isoradius);
        }
        if (radiusmenuvalue===2){
            //removeFirstIsochroneFromMap();
            console.log("2")
            addIsochroneToMap("cycling-regular",cords,isoradius);
        }
        if (radiusmenuvalue===3){
            //removeFirstIsochroneFromMap();
            console.log("3")
            addIsochroneToMap("driving-car",cords,isoradius);
        }

    }

}

var route_cords_start = null;
var route_cords_end = null;

function routeingpoints(cord){
    if (route_cords_start===null){
        route_cords_start=cord;
        if(route_cords_end!=null){
            removeRouteFromMap();
            routingtypeselecter(route_cords_start,route_cords_end);
        }
    }
    else {
        route_cords_end=cord;
        removeRouteFromMap();
        routingtypeselecter(route_cords_start,route_cords_end)
    }
}

function routingtypeselecter(start,end){
    if (routingtype===1){
        addRouteToMap("foot",route_cords_start,route_cords_end);
    }
    if (routingtype===2){
        addRouteToMap("bike",route_cords_start,route_cords_end);
    }if (routingtype===3){
        addRouteToMap("car",route_cords_start,route_cords_end);
    }
}

function routing_edit_start(){
    route_cords_start=null;
}


function routing_clear(){
    route_cords_start=null;
    route_cords_end=null;
    removeRouteFromMap();

}



