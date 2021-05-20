import { FILE } from "dns";
import { getLeagues } from "./fetchFutDB";
import {IClubs, ILeague} from "./interfaces";

const fs = require('fs');

// let clubs :IClubs[] = fetchClubs();

// const fileLink :string = '../';

function saveData() {
    try {
        if(!fs.existsSyns('../data/clubs.json')) console.log('hello');

    } catch (error) {
        console.error(error);   
    }
}

saveData();

export{ saveData } ;













// Generating a random number to choose a club 
let randomPage = () :number => {
    const startingPage = 1;
    const totalAmountOfPages = 40;
    const lastRandomNubmer = 0;

    return 0;
};
export{};