import {client, connect_to_db, close_db_connection, DATABASE, COLLECTION} from "./database_connection";

let updateUserScore = async() => {
    try {
        await connect_to_db();
        
        // Finding user's data
        await client.db(DATABASE).collection(COLLECTION).findOne({

        }).toArray();

        // Updating user's score
        
    
    } catch (exception) {
        console.error(exception);
    }finally{
        await close_db_connection();
    }
};