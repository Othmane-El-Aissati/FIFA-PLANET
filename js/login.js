let username = document.getElementById("username")
let password = document.getElementById("password")
let userData = sessionStorage.getItem("usersJSON")
let users = JSON.parse(userData)
let checkLoginUsers = () => {
    if (username.value == users.Username && password.value == users.Password) {
        window.open("../htmlLogin/index.html", "_self")
    } else {
        alert("Login failed")
    }
}