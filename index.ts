// Importing files
//import { addUserToDB } from "./ts/userinfoToDB";
import { saveUserData, getUsers, updateScore } from './ts/userData';
import { IClubs, IUser } from "./ts/interfaces";
import { getClubs, getLeagues } from "./ts/API_Data";

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
app.use(express.static('data'));
// URL encoded (To extracte user data from body)
app.use(express.json({ limit: '1mb' })); // limit of the 'to be' extracted data
app.use(express.urlencoded({ extended: true}));

let status: boolean;
let nav: string;

interface ICurrentUser{
    name: string,
    travel: string
}

let currentUser: ICurrentUser;

function getRandom(max :number) {
    return Math.floor(Math.random() * (max - 0 + 1)) + 0;
}

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
    let accounts: IUser[] = getUsers().users;
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
        let account: IUser = {name: username, password: password, email: email, travel: travel, score: 0}
        saveUserData(account)
        //accounts.push(account)
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
    const clubAmount :number = 797;
    const leagueAmount :number = 48;

    let clubName :IClubs = getClubs()[getRandom(clubAmount)];

    document.getElementsByClassName('answer-btn')[0]?.addEventListener('click', ()=>{
        console.log('I got clicked');
    });

    res.render('fifaSpelen', {
        name: currentUser.name,
        club1: clubName.name,
        leagueAnswer1: getLeagues()[getRandom(leagueAmount)].name,
        leagueAnswer2: getLeagues()[getRandom(leagueAmount)].name,
        leagueAnswer3: getLeagues()[getRandom(leagueAmount)].name,
        leagueAnswer4: getLeagues()[getRandom(leagueAmount)].name
    });
});

app.get('/logout', (req :any, res :any) => {
    status = false;
    res.redirect('index');
});

// Listens for connections on the specified port 
app.listen(app.get('port'), () => console.log( '[SERVER] http://localhost:' + app.get('port')));
export{};