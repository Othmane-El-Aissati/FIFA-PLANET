import { IClubs, ILeague } from "./interfaces";

const fetch = require('node-fetch');

// Clubs total of 40 pages
// https://futdb.app/api/clubs?page=${page}&limit=30

// Leagues total of 3 pages
// https://futdb.app/api/leagues?page=${}&limit=20

const API_TOKEN = "3a99720e-1dd3-41d2-9c9e-8cb226c4b705";
let clubs :IClubs[] = [];
let leagues :ILeague[] = [];

// Generating a random number to choose a club 
let randomPage = () :number => {
    const startingPage = 1;
    const totalAmountOfPages = 40;
    const lastRandomNubmer = 0;

    //Math.floor();

    return 0;
};

// Function to store the clubs in an array 
// ( proventing to many fetches by reusing the array )
let getClubs = async() :Promise<void> => {
    // let fetchClubsJson =  await fetch(`https://futdb.app/api/clubs?page=${1}&limit=30`,{
    //     headers: {
    //         'Accept': 'application/json',
    //         'X-AUTH-TOKEN': API_TOKEN
    //     }
    // });
};

// Function to store all the leagues 
// ( proventing to many fetches by reusing the array )
async function fetchLeagues() :Promise<ILeague[]> {
    for (let index = 1; index < 2; index++) {
        let fetchLeaguesJson =  await fetch(`https://futdb.app/api/leagues?page=${index}&limit=30`,{
            headers: {
                'Accept': 'application/json',
                'X-AUTH-TOKEN': API_TOKEN
            }
        }).then((response :any) => response.json());
        await leagues.push(...fetchLeaguesJson.items);
    }
    console.log("Leageus in array");
    return await leagues;
};

export{ fetchLeagues, leagues };