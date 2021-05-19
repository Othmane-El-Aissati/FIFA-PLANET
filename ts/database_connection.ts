const {MongoClient} = require('mongodb');

// Link to MongoDB
const mongoDB_URI :any = 'mongodb+srv://TestUser1:IAmATestUser@webontwikkelingdb.bcnwb.mongodb.net/myWebOntwikkelingDB?retryWrites=true&w=majority';

// MongoDB Client Connection
const client = new MongoClient( mongoDB_URI , { useUnifiedTopology: true });

const DATABASE :string = 'FifaPlanetDB';
const COLLECTION :string = 'Users';

let connect_to_db = async() => {
    try {
        // Creating a connection to the database
        await client.connect();

    } catch (exception) {
        console.error(exception);
        // Close databse connection in case of an occurred error
        await client.close();
    } 
};

let close_db_connection =  async() => {
    // Making sure the database connection in close regardless of anything
    await client.close();
};

export{};