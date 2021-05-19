let username = document.getElementById("username")
let email = document.getElementById("email")
let psw = document.getElementById("psw")
let pswRepeat = document.getElementById("psw-repeat")
let travel = document.getElementById("travel")

let check = () => 
{
    if (psw.value === pswRepeat.value) {
        let user = { Email: email.value, Username: username.value, Password: psw.value, Travel: travel.value }
        myJSON = JSON.stringify(user)
        sessionStorage.setItem("usersJSON", myJSON)
        alert(`${user.Username} is geregistreerd`)
        window.location.href = "login";
    }
}