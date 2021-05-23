import {getClubs, getLeagues } from "./API_Data";
import {ICombo} from "./interfaces";

const clubAmount :number = 797;
const leagueAmount :number = 48;

function getRandomNumber(maxValue :number) {
    return Math.floor(Math.random() * (maxValue - 0 + 1)) + 0;
}

let getCombo = ():ICombo =>{
    let club, clubLeague, league, leagueId;
    let randomNumber = getRandomNumber(clubAmount);
    club = getClubs()[randomNumber];
    clubLeague = getClubs()[randomNumber].league;
    for (let index = 0; index < getLeagues().length; index++) {
        if (club.league == getLeagues()[index].id) {
            league = getLeagues()[index].name
            leagueId = getLeagues()[index].id
        }
    }
    let data: ICombo = {club: club.name, clubLeague: clubLeague, league: league, leagueId: leagueId}
    return data;
}

function getLeagueAnswers(data: ICombo) :string[]{
    let randomPlace = getRandomNumber(3);
    let possibleAnswer :string[] = []; 
    
    for (let index = 0; index < 4; index++) {
        if ( index == randomPlace ) {
            possibleAnswer[index] = data.league;
        }else{
          let league = getLeagues()[getRandomNumber(leagueAmount)];
        if( league.id != data.leagueId) possibleAnswer[index] = league.name;}
    }
    return possibleAnswer
}

let getAllClubsInLeague = (data: ICombo): string[] =>{
    let list: string[] = [];
    for (let index = 0; index < getClubs().length; index++) {
        if (getClubs()[index].league == data.clubLeague && getClubs()[index].name != data.club) {
            list.push(getClubs()[index].name)
        }
    }
    return list;
}

function getClubAnswers(data: ICombo) :string[]{
    let randomPlace = getRandomNumber(3);
    let possibleAnswer :string[] = [];
    let listCorrectClubs: string[] = getAllClubsInLeague(data);
    let correctClub: string = listCorrectClubs[getRandomNumber(listCorrectClubs.length)]; 
    
    for (let index = 0; index < 4; index++) {
        if ( index == randomPlace ) {
            possibleAnswer[index] = correctClub;
        }else{
          let club = getClubs()[getRandomNumber(clubAmount)];
        if( club.league != data.leagueId) possibleAnswer[index] = club.name;}
    }
    return possibleAnswer
}

export{getCombo, getLeagueAnswers, getClubAnswers}
