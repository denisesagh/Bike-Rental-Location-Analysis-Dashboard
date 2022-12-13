function isLogged(){
    //LOGIN CODE
    return true;
}

function ShowUserLoggedStatus(){
    if (isLogged()){
        console.log("User is logged");
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
    alert("Eingelogged als "); //ADD USERNAME
}

function refreshPage(){
    window.location.reload();
}