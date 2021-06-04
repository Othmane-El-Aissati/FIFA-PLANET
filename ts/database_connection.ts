const {MongoClient, ObjectId} = require('mongodb');
import { IUser } from "./interfaces";

// Link to MongoDB
const mongoDB_URI :any = 'mongodb+srv://TestUser1:IAmATestUser@webontwikkelingdb.bcnwb.mongodb.net/myWebOntwikkelingDB?retryWrites=true&w=majority';

// MongoDB Client Connection
const client = new MongoClient( mongoDB_URI , { useUnifiedTopology: true });
let openConnection = async() => { await client.connect(); }

// Database name & collection name
const DATABASE :string = 'FifaPlanetDB';
const COLLECTION :string = 'Users';

let addUserToDB = async (userData :IUser) => {
    try {
        //await client.connect()
        await client.db(DATABASE).collection(COLLECTION).insertOne(userData);
    } catch (error) {
        console.log(error)
    }
    /*finally{
        client.close()
    }*/
};

/*let getUsersFromDB = async () =>{
    let data: IUser[] = [];
    try {
        await client.connect()
        let users = await client.db(DATABASE).collection(COLLECTION).find({});
        data = await users.toArray();
        return data;
    } catch (error) {
        console.log(error)
    }
    finally{
        client.close()
    }
    return data;
}*/

const getUsersFromDB = async(): Promise<IUser[]> =>{
    let data: IUser[] = [];
    try {
        //await client.connect()
        let users = await client.db(DATABASE).collection(COLLECTION).find({});
        data = await users.toArray();
        
    } catch (error) {
        console.log(error)
    }
    /*finally{
        client.close()
    }*/
    return data;
}

let updateUserScore = async(userID :number, newScore :number) => {
    try {
        
        // Finding user's data
        await client.db(DATABASE).collection(COLLECTION).updateOne(
            { _id: ObjectId(userID) }, 
            { $set: { score: newScore } },
            { upsert: true } // makes een new score if does not exists
        );

        console.log('User score saved...');    
    } catch (error) {
        console.error(error);
    }
};

export{addUserToDB, getUsersFromDB, openConnection, updateUserScore};