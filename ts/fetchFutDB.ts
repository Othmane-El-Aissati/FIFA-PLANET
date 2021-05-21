import { IClubs, ILeague } from "./interfaces";
import { saveLeaguesData, saveClubsData } from "./API_Data";

const fetch = require('node-fetch');

// Clubs total of 40 pages - API link
// https://futdb.app/api/clubs?page=${page}&limit=30

// Leagues total of 3 pages - API link
// https://futdb.app/api/leagues?page=${}&limit=20

const API_TOKEN = "860ce99e-9bd5-4a7b-916d-b862f56b50bb";

// Function to save clubs-data to local file retrieved from the API call  
async function fetchClubs() :Promise<void> {
    let clubs :IClubs[] = [];
    for (let index = 1; index <= 40; index++) {
        await fetch(`https://futdb.app/api/clubs?page=${index}&limit=30`,{
            headers: {
                'Accept': 'application/json',
                'X-AUTH-TOKEN': API_TOKEN
            }
        })
        .then((response :any) => response.json())
        .then((json :any) => {
           clubs.push(...json.items); 
        });
    }
    saveClubsData(clubs);
};

// Function to save leagues-data to local file retrieved from the API call  
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
    saveLeaguesData(leagues);
};

// fetchClubs();
// fetchLeagues();

export{ };