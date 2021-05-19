import {client, connect_to_db, close_db_connection} from "./database_connection";


const DATABASE :string = 'FifaPlanetDB'
const COLLECTION :string = 'Users';

// Required user information to register 
interface IUSerInfo {
    name :string,
    password :string,
    email :string,
    score :number,
}

// start connection to Database
let addUserToDB = async () => {
    try {
        await connect_to_db();

        // await client.db(DATABASE).collection(COLLECTION).insertMany(movies);


    } catch (exception) {
        console.error(exception);
    }finally{
        await close_db_connection();
    }
};

export{};