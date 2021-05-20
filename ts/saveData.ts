import { FILE } from "dns";
import { getLeagues } from "./fetchFutDB";
import {IClubs, ILeague} from "./interfaces";

const fs = require('fs');

// let clubs :IClubs[] = fetchClubs();

const clubFileLink :string = '../data/clubs.json';
const leagueFileLink :string = '../data/leagues.json';

function saveData(dataToSave :ILeague[]) {
    try {
        console.log('file searching...');
        // fs.writeFileSync(fileLink, JSON.stringify({name: "lrys", age: 12}));
        // if (fs.existsSync(clubFileLink)) {
        //     console.log('file exists');
        // }

        if(!fs.existsSync(leagueFileLink)){
            console.log('File does not exists!');
            console.log('Creating file...');
            fs.writeFileSync(leagueFileLink, JSON.stringify(dataToSave));
        }else{
            console.log('file exists');
        }
       

    } catch (error) {
        console.error(error);   
    }
}

// Generating a random number to choose a club 
let randomPage = () :number => {
    const startingPage = 1;
    const totalAmountOfPages = 40;
    const lastRandomNubmer = 0;

    return 0;
};
export{ saveData };