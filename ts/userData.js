//import { IUser } from "./interfaces";

const fs = require('fs'); 

const userFileLink = './data/users.json';
function saveUserData(newUser){
    try {
        // Checking if user.json file exists, if not, create with empty array
        if (!fs.existsSync(userFileLink)) {
            console.warn('File does not exists.');
            fs.writeFileSync(userFileLink, JSON.stringify({users: []}, null, 2) );
            console.log('File created.');
        }
        
        // Parsing existing data to a JSON object from users.json file to update it 
        let data = JSON.parse(fs.readFileSync(userFileLink));
        console.log('File found. Adding user...');
        data.users.push(newUser);

        // Writing updated data to a JSON file
        fs.writeFileSync(userFileLink, JSON.stringify(data, null, 2));
        console.log('User saved.');

    } catch (error) {
        console.error(error);
    }
}

function getUsers(){
    let data = JSON.parse(fs.readFileSync(userFileLink));
    // Returns an array of registered users
    return data;
}

function updateScore(username, newScore){
    let user = getUsers().users;
    console.log(user);
    for (let index = 0; index < user.length; index++) {
        if (user[index].name === username) {
            console.log('UPDATING...');
            user[index].score = newScore;
            console.log(`Score of user: ${user[index].name} changed to ${user[index].score}`);
        }
    } 
    fs.writeFileSync(userFileLink, JSON.stringify({users: user}, null, 2));
}

export{ saveUserData, getUsers, updateScore };