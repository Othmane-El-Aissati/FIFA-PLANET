// Importing files
import { addUserToDB } from "./ts/userinfoToDB";

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

// Required user information to register 
interface IUser {
    name :string,
    password :string,
    email :string,
    travel :string,
    score :number,
}

let status: boolean;
let nav: string;

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
    res.render('index', {navigatie: nav});
});

app.get('/about', (req :any, res :any) => {
    if (status == false || status == undefined) {
        nav = "navigatieFalse"
    }
    else{
        nav = "navigatieTrue"
    }
    res.render('about', {navigatie: nav});
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
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let travel = req.body.travel;

    //Making a new user object
    let newUser :IUser = {
        name: username,
        password : password,
        email: email,
        travel: travel,
        score: 0
    };

    //Add new user to DB
    addUserToDB(newUser);
    
    //Redirecting after registration is submitted
    res.redirect('/login');
});

app.get('/fifa', (req :any, res :any) => {
    res.render('fifa');
});

app.get('/fortnite', (req :any, res :any) => {
    res.render('fortnite');
});

app.get('/lego', (req :any, res :any) => {
    res.render('lego');
});

app.get('/lotr', (req :any, res :any) => {
    res.render('lotr');
});

app.get('/fifaSpelen', (req :any, res :any) => {
    res.render('fifaSpelen');
});

// Listens for connections on the specified port 
app.listen(app.get('port'), () => console.log( '[SERVER] http://localhost:' + app.get('port')));
export{};