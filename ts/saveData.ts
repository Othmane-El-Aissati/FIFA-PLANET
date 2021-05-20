import {IClubs, ILeague} from "./interfaces";

const fs = require('fs');

const clubFileLink :string = '../data/clubs.json';
const leagueFileLink :string = '../data/leagues.json';

function saveClubsData(dataToSave :IClubs[]) {
    try {
        console.log('file searching...');
        if(!fs.existsSync(clubFileLink)){
            console.log('File does not exists!');
            console.log('Creating file...');
            fs.writeFileSync(clubFileLink, JSON.stringify(dataToSave, null, 2));
            console.log('File created.');
        }else{ 
            console.log('file exists');
        } 
    } catch (error) {
        console.error(error);   
    }
}

function saveLeaguesData(dataToSave :ILeague[]) {
    try {
        console.log('file searching...');
        if(!fs.existsSync(leagueFileLink)){
            console.log('File does not exists!');
            console.log('Creating file...');
            fs.writeFileSync(leagueFileLink, JSON.stringify(dataToSave, null, 2));
            console.log('File created.');
        }else{
            console.log('file exists');
        }
    } catch (error) {
        console.error(error);   
    }
}

// TO BE DELETED - saved to readFiles ... later
function refactorFile(){
    try {
        if (fs.existsSync(leagueFileLink)) {
            console.log('Reading file...');
            let data = fs.readFileSync(leagueFileLink);
            console.log('File read.');
            console.log(JSON.parse(data));
        }else console.warn('File does not exists.');
    } catch (error) {
        console.error(error);
    }
}

export{ saveLeaguesData, saveClubsData };