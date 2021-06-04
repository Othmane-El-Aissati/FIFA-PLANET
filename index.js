// Importing files
//import { saveUserData, getUsers, updateScore } from './ts/userData';
//import { ICombo, IUser, ICurrentUser, ILeagueReturnType } from "./ts/interfaces";
import {getCombo, getLeagueAnswers, getClubAnswers} from "./ts/gameFunctions.js";
import {addUserToDB, getUsersFromDB, openConnection, updateUserScore} from "./ts/database_connection.js";

const {MongoClient} = require('mongodb');
const express = require('express');
const ejs = require('ejs');
const axios = require('axios');

const PORT =  3000;
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

let status;
let nav;

let comboClubLeague;
let clubLeagueCombo;
let correctAnwser;
let score;
let userID;

let currentUser = {name: "", travel: ""};


// Routes to the specified path with the specified callback functions
app.get('/', (req, res) => {
    if (status == false || status == undefined) {
        nav = "navigatieFalse"
    }
    else{
        nav = "navigatieTrue"
    }
    res.render('index', {navigatie: nav});
});

app.get('/index', (req, res) => {
    if (status == false || status == undefined) {
        nav = "navigatieFalse"
    }
    else{
        nav = "navigatieTrue"
    }
    res.render('index', {navigatie: nav, name: currentUser.name});
});

app.get('/about', (req, res) => {
    if (status == false || status == undefined) {
        nav = "navigatieFalse"
    }
    else{
        nav = "navigatieTrue"
    }
    res.render('about', {navigatie: nav, name: currentUser.name});
});

app.get('/login', (req, res) => {
    if (status == false || status == undefined) {
        nav = "navigatieFalse"
    }
    else{
        nav = "navigatieTrue"
    }
    res.render('login', {navigatie: nav, status: status});
});

app.post('/login', async(req, res) => {
    if (status == false || status == undefined) {
        nav = "navigatieFalse"
    }
    else{
        nav = "navigatieTrue"
    }
    let username = req.body.username;
    let password = req.body.password;
    let check = 0;
    //let accounts: IUser[] = getUsers().users;
    //let accounts: IUser[] = getUsersFromDB();
    let accounts = await getUsersFromDB();
    for (let index = 0; index < accounts.length; index++) {
        if (username == accounts[index].name && password == accounts[index].password) {
            check = 1;
            currentUser = {name: accounts[index].name, travel: accounts[index].travel}
            score = accounts[index].score;
            userID = accounts[index]._id;
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

app.get('/registratie', (req, res) => {
    if (status == false || status == undefined) {
        nav = "navigatieFalse"
    }
    else{
        nav = "navigatieTrue"
    }
    res.render('registratie', {navigatie: nav});
});

app.post('/registratie' ,(req, res) => {
    // Extracting user info to be saved in the DB
    let username = req.body.username;
    let password = req.body.password;
    let passwordRepeat = req.body.pswRepeat;
    let email = req.body.email;
    let travel = req.body.travel;

    if (password == passwordRepeat) {
        let account = {name: username, password: password, email: email, travel: travel, score: 0}
        addUserToDB(account);
        //saveUserData(account)
        //accounts.push(account)
        res.redirect('/login');
    }
    else{
        res.render('registratie')
    }

});

app.get('/fifa', (req, res) => {
    res.render('fifa', {name: currentUser.name, travel: currentUser.travel});
});

app.get('/fortnite', (req, res) => {
    res.render('fortnite', {name: currentUser.name, travel: currentUser.travel});
});

app.get('/lego', (req, res) => {
    res.render('lego', {name: currentUser.name, travel: currentUser.travel});
});

app.get('/lotr', (req, res) => {
    res.render('lotr', {name: currentUser.name, travel: currentUser.travel});
});

app.get('/fifaSpelen', (req, res) => {

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
        usersScore: score
    });
});

// next stage in te game where user gets to choice which club is playing in a league 
app.get('/fifaSpelen/:nextStage', (req, res) => {

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
        usersScore: score
    });
});

// checking the answer, if correct return true (color changes to green) else false (color changes to red)
app.post('/fifaSpelen/check', (req, res) => {

    let chosenAnwser = req.body.chosenAnwser;

    console.log({score})

    if (Number(chosenAnwser) === correctAnwser) {
        score++; // +1 point if anwsered correctly
        res.json(true);
    }else{
        res.json(false);
    }
})

app.post('/fifaSpelen/stopGame', async(req, res) => {
    await updateUserScore(userID, score);
    res.json({newScore: score});
})

app.get('/logout', (req, res) => {
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