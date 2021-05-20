// Importing files
//import { addUserToDB } from "./ts/userinfoToDB";
//import { IUser } from "./ts/interfaces";
import { createRequireFromPath } from "module";

const express = require('express');
const ejs = require('ejs');

const PORT :number =  3000;
const app = express();

// Server properties set-up
app.set('port', PORT);
app.set('view engine', 'ejs');

// 'IMPORT' STATIC FILES
app.use(express.static('css'));
app.use(express.static('assets'));
app.use(express.static('js'));
// URL encoded (To extracte user data from body)
app.use(express.json({ limit: '1mb' })); // limit of the 'to be' extracted data
app.use(express.urlencoded({ extended: true}));

let status: boolean;
let nav: string;

interface IAccount{
    name: string,
    password: string,
    travel: string,
    email: string
}

interface ICurrentUser{
    name: string,
    travel: string
}

let accounts: IAccount[] = [
    {name: "oth", password: "123", travel: "fifa", email: "oth@oth.com"},
    {name: "Kr1s", password: "test123", travel: "lord-of-the-rings", email: "kr1s@gmail.com"},
    {name: "account1", password: "account1", travel: "fortnite", email: "account1@gmail.com"}
]

let currentUser: ICurrentUser;

// Routes to the specified path with the specified callback functions
app.get('/', (req :any, res :any) => {
    if (status == false || status == undefined) {
        nav = "navigatieFalse"
    }
    else{
        nav = "navigatieTrue"
    }
    res.render('index', {navigatie: nav});
});

app.get('/index', (req :any, res :any) => {
    if (status == false || status == undefined) {
        nav = "navigatieFalse"
    }
    else{
        nav = "navigatieTrue"
    }
    res.render('index', {navigatie: nav, name: currentUser.name});
});

app.get('/about', (req :any, res :any) => {
    if (status == false || status == undefined) {
        nav = "navigatieFalse"
    }
    else{
        nav = "navigatieTrue"
    }
    res.render('about', {navigatie: nav, name: currentUser.name});
});

app.get('/login', (req :any, res :any) => {
    if (status == false || status == undefined) {
        nav = "navigatieFalse"
    }
    else{
        nav = "navigatieTrue"
    }
    res.render('login', {navigatie: nav, status: status});
});

app.post('/login', (req :any, res :any) => {
    if (status == false || status == undefined) {
        nav = "navigatieFalse"
    }
    else{
        nav = "navigatieTrue"
    }
    let username: string = req.body.username;
    let password: string = req.body.password;
    let check: number = 0;

    for (let index = 0; index < accounts.length; index++) {
        if (username == accounts[index].name && password == accounts[index].password) {
            check = 1;
            currentUser = {name: accounts[index].name, travel: accounts[index].travel}
        }
    }
    if (check == 1) {
        status = true;
        res.redirect('index')
    }
    else{
        res.render('login', {navigatie: nav, status: status});
    }
});

app.get('/registratie', (req :any, res :any) => {
    if (status == false || status == undefined) {
        nav = "navigatieFalse"
    }
    else{
        nav = "navigatieTrue"
    }
    res.render('registratie', {navigatie: nav});
});

app.post('/registratie' ,(req :any, res :any) => {
    // Extracting user info to be saved in the DB
    let username: string = req.body.username;
    let password: string = req.body.password;
    let passwordRepeat: string = req.body.pswRepeat;
    let email: string = req.body.email;
    let travel: string = req.body.travel;

    if (password == passwordRepeat) {
        let account: IAccount = {name: username, password: password, travel: travel, email: email}
        accounts.push(account)
        res.redirect('/login');
    }
    else{
        res.render('registratie')
    }

    /*Making a new user object
    let newUser :IUser = {
        name: username,
        password : password,
        email: email,
        travel: travel,
        score: 0
    };

    //Add new user to DB
    addUserToDB(newUser);*/
});

app.get('/fifa', (req :any, res :any) => {
    res.render('fifa', {name: currentUser.name});
});

app.get('/fortnite', (req :any, res :any) => {
    res.render('fortnite', {name: currentUser.name});
});

app.get('/lego', (req :any, res :any) => {
    res.render('lego', {name: currentUser.name});
});

app.get('/lotr', (req :any, res :any) => {
    res.render('lotr', {name: currentUser.name});
});

app.get('/fifaSpelen', (req :any, res :any) => {
    res.render('fifaSpelen', {name: currentUser.name});
});

app.get('/logout', (req :any, res :any) => {
    status = false;
    res.redirect('index');
});

// Listens for connections on the specified port 
app.listen(app.get('port'), () => console.log( '[SERVER] http://localhost:' + app.get('port')));
export{};