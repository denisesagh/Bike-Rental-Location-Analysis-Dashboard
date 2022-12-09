
var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    osm = L.tileLayer(osmUrl, {
        maxZoom: 18,
        attribution: osmAttrib
    });

// initialize the map on the "map" div with a given center and zoom
var map = L.map('map').setView([19.04469, 72.9258], 12).addLayer(osm);

map.on('click', onMapClick);

function onMapClick(e) {

    var marker = L.marker(e.latlng, {
        draggable: true,
        title: "Resource location",
        alt: "Resource Location",
        riseOnHover: true
    }).addTo(map)
        .bindPopup(e.latlng.toString()).openPopup();

    // Update marker on changing it's position
    marker.on("dragend", function(ev) {

        var chagedPos = ev.target.getLatLng();
        this.bindPopup(chagedPos.toString()).openPopup();

    });
}

var hidemenu=true;
var menu=0;
myFunction();


function myFunction(){
    //alert("ey")
    var divbuttons = document.getElementById("buttons");
    var divcheckboxPoi = document.getElementById("checkboxPoi");
    var divslidecontainer = document.getElementById("slidecontainer");
    var divbuttons_walking_bike_car = document.getElementById("buttons_walking-bike-car");
    if (hidemenu == true){


        document.getElementById("menu").style.background = "transparent";
        divbuttons.style.display = "none";
        menu=0;
        showmenu();
        hidemenu = false;
    }
    else{
        document.getElementById("menu").style.background = "grey";
        divbuttons.style.display = "block";
        showmenu();
        hidemenu = true;
        radiusbuttons(0);
        selectbutton(0);
    }
}

function showmenu(){
    document.getElementById("buttons");
    var divcheckboxPoi = document.getElementById("checkboxPoi");
    var divslidecontainer = document.getElementById("slidecontainer");
    var divbuttons_walking_bike_car = document.getElementById("buttons_walking-bike-car");
    if (menu ==0){
        divcheckboxPoi.style.display = "none";
        divslidecontainer.style.display = "none";
        divbuttons_walking_bike_car.style.display = "none";
    }
    if (menu == 1){
        divcheckboxPoi.style.display = "block";
        divslidecontainer.style.display = "none";
        divbuttons_walking_bike_car.style.display = "none";
    }
    if (menu ==2){
        divcheckboxPoi.style.display = "none";
        divslidecontainer.style.display = "none";
        divbuttons_walking_bike_car.style.display = "block";
    }
    if (menu ==3){
        divcheckboxPoi.style.display = "none";
        divslidecontainer.style.display = "block";
        divbuttons_walking_bike_car.style.display = "none";
    }
}

function showUserLogin(){

    document.getElementById("register").style.display = "none";

}

function selectbutton(value){
    menu=value;
    showmenu();
    buttonpressed();
}

function buttonpressed(){
    var buttonWaypoint = document.getElementById("buttonWaypoint");
    var buttonRoute = document.getElementById("buttonRoute");
    var buttonRadius= document.getElementById("buttonRadius");
    if (menu ==1){
        buttonWaypoint.classList.add("buttonselected");
        buttonRoute.classList.remove("buttonselected")
        buttonRadius.classList.remove("buttonselected")

    }
    if (menu ==2){
        buttonWaypoint.classList.remove("buttonselected");
        buttonRoute.classList.add("buttonselected")
        buttonRadius.classList.remove("buttonselected")

    }
    if (menu ==3){
        buttonWaypoint.classList.remove("buttonselected");
        buttonRoute.classList.remove("buttonselected")
        buttonRadius.classList.add("buttonselected")

    }
    if (menu ==0){
        buttonWaypoint.classList.remove("buttonselected");
        buttonRoute.classList.remove("buttonselected")
        buttonRadius.classList.remove("buttonselected")

    }
}
var radiusmenu=0;
function radiusbuttons(value){
    radiusmenu = value;
    buttonpressedRadius();
}

function buttonpressedRadius(){
    var buttonWalking = document.getElementById("buttonWalking");
    var buttonBike = document.getElementById("buttonBike");
    var buttonCar = document.getElementById("buttonCar");

    if (radiusmenu == 0){
        buttonWalking.classList.remove("buttonselected");
        buttonBike.classList.remove("buttonselected");
        buttonCar.classList.remove("buttonselected");
    }
    if (radiusmenu == 1){
        buttonWalking.classList.add("buttonselected");
        buttonBike.classList.remove("buttonselected");
        buttonCar.classList.remove("buttonselected");
    }
    if (radiusmenu == 2){
        buttonWalking.classList.remove("buttonselected");
        buttonBike.classList.add("buttonselected");
        buttonCar.classList.remove("buttonselected");
    }
    if (radiusmenu == 3){
        buttonWalking.classList.remove("buttonselected");
        buttonBike.classList.remove("buttonselected");
        buttonCar.classList.add("buttonselected");
    }

}
