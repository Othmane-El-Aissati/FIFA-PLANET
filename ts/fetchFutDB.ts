import { IClubs, ILeague } from "./interfaces";
import {} 

const fetch = require('node-fetch');

// Clubs total of 40 pages
// https://futdb.app/api/clubs?page=${page}&limit=30

// Leagues total of 3 pages
// https://futdb.app/api/leagues?page=${}&limit=20

const API_TOKEN = "3a99720e-1dd3-41d2-9c9e-8cb226c4b705";

// Function to store the clubs in an array 
// ( proventing to many fetches by reusing the array )
async function fetchClubs() :Promise<IClubs[]> {
    let clubs :IClubs[] = [];
    for (let index = 1; index <= 40; index++) {
        let fetchClubsJson =  await fetch(`https://futdb.app/api/clubs?page=${index}&limit=30`,{
            headers: {
                'Accept': 'application/json',
                'X-AUTH-TOKEN': API_TOKEN
            }
        }).then((response :any) => response.json())
        .then((json :any) => {
           clubs.push(...json.items); 
        });
    }

    return await clubs;
};

// Function to store all the leagues 
// ( proventing to many fetches by reusing the array )
async function fetchLeagues() :Promise<void> {
    let leagues :ILeague[] = [];
    for (let index = 1; index < 4; index++) {
        await fetch(`https://futdb.app/api/leagues?page=${index}&limit=30`,{
            headers: {
                'Accept': 'application/json',
                'X-AUTH-TOKEN': API_TOKEN
            }
        })
        .then((response :any) => response.json())
        .then((json :any) => {
            leagues.push(...json.items);
        });
    }

};

console.log(fetchLeagues());

export{ fetchLeagues };