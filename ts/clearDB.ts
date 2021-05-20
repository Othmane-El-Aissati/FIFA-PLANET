import {client, connect_to_db, close_db_connection, DATABASE, COLLECTION} from "./database_connection";
import { IUser } from "./interfaces";

// Before clearing the database, data will be saved just in case
let saveAllUsers: IUser[] = [];

// -- TO BE USED WITH CAUTION -- 
let saveAndClearDB = async() => {
    try {
        await connect_to_db();

        // Saving the existing data form database before deleting it
        let allRegisteredUsers :IUser[] = await client.db(DATABASE).collection(COLLECTION).find({}).toArray();
        saveAllUsers  = [...allRegisteredUsers];

        // Clearing the database
        await client.db(DATABASE).collection(COLLECTION).deleteMany({});
        console.warn("DATABASE CLEARED");

    } catch (exception) {
        console.error(exception);
    }finally{
        // Making sure the database connection in close regardless of anything
        await close_db_connection();
    }
};
