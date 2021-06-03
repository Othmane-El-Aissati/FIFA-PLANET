// Importing files
//import { addUserToDB } from "./ts/userinfoToDB";
const {MongoClient} = require('mongodb');
import { saveUserData, getUsers, updateScore } from './ts/userData';
import { ICombo, IUser, ICurrentUser, ILeagueReturnType } from "./ts/interfaces";
import {getCombo, getLeagueAnswers, getClubAnswers} from "./ts/gameFunctions";
import {addUserToDB, getUsersFromDB, openConnection} from "./ts/database_connection";

const express = require('express');
const ejs = require('ejs');
const axios = require('axios');

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


let connect = async () => {
    await openConnection();
}
connect();


let status: boolean;
let nav: string;

let comboClubLeague :ILeagueReturnType;
let clubLeagueCombo :ICombo;
let correctAnwser :number;

let currentUser: ICurrentUser = {name: "", travel: ""};


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

app.post('/login', async(req :any, res :any) => {
    if (status == false || status == undefined) {
        nav = "navigatieFalse"
    }
    else{
        nav = "navigatieTrue"
    }
    let username: string = req.body.username;
    let password: string = req.body.password;
    let check: number = 0;
    //let accounts: IUser[] = getUsers().users;
    //let accounts: IUser[] = getUsersFromDB();
    let accounts: IUser[] = await getUsersFromDB();
    for (let index = 0; index < accounts.length; index++) {
        if (username == accounts[index].name && password == accounts[index].password) {
            check = 1;
            currentUser = {name: accounts[index].name, travel: accounts[index].travel}
        }
    }
    if (check == 1) {
        status = true;
        console.log(currentUser.travel)
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
        addUserToDB(account);
        //saveUserData(account)
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
    res.render('fifa', {name: currentUser.name, travel: currentUser.travel});
});

app.get('/fortnite', (req :any, res :any) => {
    res.render('fortnite', {name: currentUser.name, travel: currentUser.travel});
});

app.get('/lego', (req :any, res :any) => {
    res.render('lego', {name: currentUser.name, travel: currentUser.travel});
});

app.get('/lotr', (req :any, res :any) => {
    res.render('lotr', {name: currentUser.name, travel: currentUser.travel});
});

app.get('/fifaSpelen', (req :any, res :any) => {

    // globally assign the combination of club with their league
    clubLeagueCombo = getCombo();

    comboClubLeague = getLeagueAnswers(clubLeagueCombo);
    correctAnwser = comboClubLeague.correctPosition;
    console.log(`correct club anwser on : ${correctAnwser+1}`);
    
    res.render('fifaSpelen', {
        name: currentUser.name,
        clubName: comboClubLeague.chosenName,
        word1: "IN",
        word2: "LEAGUE",
        word3: "",
        word4: "CLUB",
        answer1: comboClubLeague.anwsers[0],
        answer2: comboClubLeague.anwsers[1],
        answer3: comboClubLeague.anwsers[2],
        answer4: comboClubLeague.anwsers[3],
        usersScore: 0
    });
});

// next stage in te game where user gets to choice which club is playing in a league 
app.get('/fifaSpelen/:nextStage', (req :any, res :any) => {

    let possibleClubAnwsers = getClubAnswers(clubLeagueCombo);
    correctAnwser = possibleClubAnwsers.correctPosition;
    console.log(`correct league anwser on : ${correctAnwser+1}`);

    res.render('fifaSpelen', {
        name: currentUser.name,
        clubName: possibleClubAnwsers.chosenName,
        word1: "",
        word2: "CLUB",
        word3: "NOG IN",
        word4: "LEAGUE",
        answer1: possibleClubAnwsers.anwsers[0],
        answer2: possibleClubAnwsers.anwsers[1],
        answer3: possibleClubAnwsers.anwsers[2],
        answer4: possibleClubAnwsers.anwsers[3],
        usersScore: 0
    });
});

// checking the answer, if correct return true (color changes to green) else false (color changes to red)
app.post('/fifaSpelen/check', (req: any, res: any) => {

    let chosenAnwser = req.body.chosenAnwser;

    if (Number(chosenAnwser) === correctAnwser) {
        res.json(true);
    }else{
        res.json(false);
    }
})


app.get('/logout', (req :any, res :any) => {
    status = false;
    res.redirect('index');
});

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    
    app.close(() => {
        console.log('Http server closed.');
    });
});

// Listens for connections on the specified port 
app.listen(app.get('port'), () => console.log( '[SERVER] http://localhost:' + app.get('port')));


export{  };