var personalPOIIcon = L.icon({
    iconUrl: '../icon/148764.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
});


function createPersonalPOIMarker(poiName, poiLong, poiLat) {
    L.marker([poiLong, poiLat],
        {icon: personalPOIIcon})
        .addTo(map)
        .bindPopup(poiName, poiLong, poiLat)
        .openPopup();
}


function createPOI() {
    let poiName = document.querySelector("#poiName").value;
    let poiLong = document.querySelector("#poiLat").value;
    let poiLat = document.querySelector("#poiLong").value;

    console.log(poiName + " " + poiLong + " " + poiLat + " ");
    if (loginStatus === "logged") {
        if (poiName !== "" && poiLong !== "" && poiLat !== "") {
            try {

                console.log("Creating POI: " + poiName + " at " + poiLong + ", " + poiLat + " with " + current_user_id);
                $.ajax({
                    url: "../php/poimaker.php",    //the page containing php script
                    type: "post",    //request type,
                    dataType: 'json',
                    data: {
                        make: "make",
                        poiname: poiName,
                        poilong: poiLong,
                        poilat: poiLat,
                        userid: current_user_id,
                    },
                    success: function (result) {
                        //alert(result);
                        alert("POI " + poiName + " erfolgreich erstellt");
                        let reply = result.reply;
                        console.log(reply)
                        createPersonalPOIMarker(poiName, poiLong, poiLat);
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(thrownError);
                        alert("POI konnte nicht erstellt werden");

                        //refreshPage();
                    }
                });

            } catch (error) {
                console.log("AjaxSendErrorInisLoggedFunction" + error);
            }
        } else {
            alert("Bitte alle Felder ausfüllen");
        }

    } else if (loginStatus === "not logged") {
        alert("Bitte einloggen um POI zu erstellen");
    }

}

