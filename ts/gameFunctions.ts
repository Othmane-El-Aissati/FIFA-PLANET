import {getClubs, getLeagues } from "./API_Data";
import {ICombo, ILeagueReturnType} from "./interfaces";

const clubAmount :number = 798;
const leagueAmount :number = 47;
let previousNumber :number = 0;

function getRandomNumber(maxValue :number) {
    let newNumber :number ;
    do {
        // loop continues as long as the new number != to the last number
        newNumber = Math.floor(Math.random() * (maxValue - 0 + 1)) + 0;
    } while (previousNumber === newNumber);
    // save the new nubmer to check for the next check of number
    previousNumber = newNumber;
    return newNumber; 
}

let getCombo = ():ICombo =>{
    let club, clubLeague, league, leagueId;

    club = getClubs()[getRandomNumber(clubAmount)];
    clubLeague = club.league;

    for (let index = 0; index < getLeagues().length; index++) {
        if (clubLeague == getLeagues()[index].id) {
            league = getLeagues()[index].name ;
            leagueId = getLeagues()[index].id ;
        }
    }
    
    let data: ICombo = {club: club.name, clubLeague: clubLeague, league: league, leagueId: leagueId}
    return data;
}

// returns 
function getLeagueAnswers(data: ICombo) :ILeagueReturnType{
    let randomPlace = getRandomNumber(3); 
    let possibleAnswer :string[] = [];
    
    for (let index = 0; index < 4; index++) { //4 anwsers so 4 place (0-1-2-3)
        
        if ( index === randomPlace ) { possibleAnswer[index] = data.league; continue; }

        let league = getLeagues()[getRandomNumber(leagueAmount)];
        
        while (league.id === data.leagueId){
            league = getLeagues()[getRandomNumber(leagueAmount)];
        }
        possibleAnswer[index] = league.name;
    }
    return {correctPosition: randomPlace, chosenClubName: data.club, anwsers: possibleAnswer};
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
    return possibleAnswer;
}

export{getCombo, getLeagueAnswers, getClubAnswers}