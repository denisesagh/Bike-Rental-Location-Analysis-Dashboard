var map = L.map('map',{
    center: [49.988799, 8.227393],
    zoom: 14
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
var hidemenu = true;
var menu = 0;
myFunction();

var switcher = false;
var lat1, lon1;

function createRoute(fromLat, fromLon, toLat, toLon) {
    L.Routing.control({
        waypoints: [
            L.latLng(fromLat, fromLon),
            L.latLng(toLat, toLon)
        ],
        serviceUrl: "https://router.project-osrm.org/route/v1",
        routeWhileDragging: false
    }).addTo(map);
}
//Utility only
map.on('click', function(e) {
    if(switcher === false){
        lat1 = e.latlng.lat;
        lon1 = e.latlng.lng;
        switcher = true;
    } else {
        createRoute(lat1, lon1, e.latlng.lat, e.latlng.lng);
        switcher = false;
    }
});

function myFunction() {
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

function selectbutton(value){
    menu=value;
    showmenu();
}
