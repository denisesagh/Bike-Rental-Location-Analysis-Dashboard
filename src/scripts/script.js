var map = L.map('map',{
    center: [49.988799, 8.227393],
    zoom: 14
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
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
