let username = document.getElementById("username")
let password = document.getElementById("password")
let userData = sessionStorage.getItem("usersJSON")
let users = JSON.parse(userData)
let checkLoginUsers = () => {
    if (username.value == users.Username && password.value == users.Password) {
        window.open("index", "_self")
    } 
    else {
            alert("Login failed")
        }
    }