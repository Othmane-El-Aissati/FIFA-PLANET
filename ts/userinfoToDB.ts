import {client, connect_to_db, close_db_connection, DATABASE, COLLECTION} from "./database_connection";
import { IUser } from "./interfaces";

// start connection to Database
let addUserToDB = async (userData :IUser) => {
    try {
        await connect_to_db();

        // await client.db(DATABASE).collection(COLLECTION).insertMany(movies);
        await client.db(DATABASE).collection(COLLECTION).insertOne(userData);

    } catch (exception) {
        console.error(exception);
    }finally{
        // Making sure the database connection in close regardless of anything
        await close_db_connection();
    }
};

export{addUserToDB};