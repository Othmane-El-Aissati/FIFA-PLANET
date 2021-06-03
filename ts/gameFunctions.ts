import {getClubs, getLeagues } from "./API_Data";
import {ICombo, ILeagueReturnType, ISeparatedClubs} from "./interfaces";

const clubAmount :number = 798;
const leagueAmount :number = 47;
let previousNumber :number = 0;
let wrongClubsAnwsers :string[] = [];

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
    let possibleAnswers :string[] = [];
    
    for (let index = 0; index < 4; index++) { //4 anwsers so 4 place (0-1-2-3)
        
        if ( index === randomPlace ) { possibleAnswers[index] = data.league; continue; }

        let league = getLeagues()[getRandomNumber(leagueAmount)];
        
        while (league.id === data.leagueId){
            league = getLeagues()[getRandomNumber(leagueAmount)];
        }
        possibleAnswers[index] = league.name;
    }
    return {correctPosition: randomPlace, chosenName: data.club, anwsers: possibleAnswers};
}

let getAllClubsInLeague = (data: ICombo): ISeparatedClubs => {
    let correctClubsAnwsers: string[] = [];
    let wrongClubsAnwsers :string[] = [];

    for (let index = 0; index < getClubs().length; index++) {
        if (data.club == getClubs()[index].name) { continue; }

        if (data.leagueId === getClubs()[index].league) {
            correctClubsAnwsers.push(getClubs()[index].name);
        }else{
            wrongClubsAnwsers.push(getClubs()[index].name);
        }
    }
    return { correctClubs: correctClubsAnwsers, wrongClubs: wrongClubsAnwsers };
}

function getClubAnswers(data: ICombo) :ILeagueReturnType {
    let listOfPossibleClubs = getAllClubsInLeague(data);
    let randomPlace = getRandomNumber(3);
    let possibleAnswers :string[] = [];
    
    for (let index = 0; index < 4; index++) { 
        // assigning correct random clubs from the list to the possible anwsers list
        if ( index === randomPlace ) { 
            let randomCorrectClub = getRandomNumber(listOfPossibleClubs.correctClubs.length);
            possibleAnswers[index] = listOfPossibleClubs.correctClubs[randomCorrectClub]; 
            continue; 
        }

        // getting a random place from the list and assignes it to possible anwsers
        let randomWrongClub = getRandomNumber(listOfPossibleClubs.wrongClubs.length);
        possibleAnswers[index] = listOfPossibleClubs.wrongClubs[randomWrongClub];
    }
    return {correctPosition: randomPlace, chosenName: data.league, anwsers: possibleAnswers};
}

export{getCombo, getLeagueAnswers, getClubAnswers}