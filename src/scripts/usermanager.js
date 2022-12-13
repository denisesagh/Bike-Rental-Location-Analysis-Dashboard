var username;
var loginStatus;

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function isLogged(){
    //LOGIN CODE
    username = document.querySelector("body > div.user_login_window > div > label > input:nth-child(1)").value;
    let password = document.querySelector("body > div.user_login_window > div > label > input:nth-child(2)").value;
    let hashedPassword = await sha256(password);
    console.log(username);
    //alert (hashedPassword);
    //PHP-Datei muss in htdocs liegen
    try{

        $.ajax({
            url:"../scripts/userlogin.php",    //the page containing php script
            type: "post",    //request type,
            dataType: 'json',
            data: {registration: "success", name: username, password: hashedPassword},
            success:function(result){
                alert("Erfolgreich eingeloggt als " + username);
                loginStatus = "logged";
                let user_id = result.id;
                ShowUserLoggedStatus(user_id, loginStatus);

            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
                alert("Username oder Passwort falsch");
                refreshPage();
            }
        });

    }catch (error){
        console.log("AjaxSendErrorInisLoggedFunction" + error);
    }
}

function ShowUserLoggedStatus(user_id, loginStatus){
    if (loginStatus === "logged"){
        console.log("User with id " + user_id + " is logged"); //USER ID!!!!!!!!!
        document.querySelector("#user_login_logout").style.display = "block";
        let divLoginInput = document.querySelector("body > div.user_login_window > div > label");
        let divLoginInputSubmitter = document.querySelector("#user_login_submit")
        let divLoginWindow = document.querySelector("body > div.user_login_window")
        divLoginWindow.setAttribute("style", "width: 90px");
        divLoginInput.style.display = "none";
        divLoginInputSubmitter.style.display = "none";
    }
}

function displayLoggedUser(){
    if (loginStatus === "logged"){
    alert ("Eingeloggt als " + username);
    }else{
        alert("Du bist nicht eingeloggt");
    }
}

function refreshPage(){
    window.location.reload();
}
