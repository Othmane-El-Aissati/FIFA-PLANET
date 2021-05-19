const {MongoClient} = require('mongodb');

// Link to MongoDB
const mongoDB_URI :any = 'mongodb+srv://TestUser1:IAmATestUser@webontwikkelingdb.bcnwb.mongodb.net/myWebOntwikkelingDB?retryWrites=true&w=majority';

// MongoDB Client Connection
const client = new MongoClient( mongoDB_URI , { useUnifiedTopology: true });

let connect_to_db = async() => {
    try {
        // Creating a connection to the database
        await client.connect();

    } catch (exception) {
        // Close databse connection in case of an occurred error
        await client.close();
        // Show the occured error after closed connection
        console.error(exception);
    } 
};

let close_db_connection =  async() => {
    // Making sure the database connection in close regardless of anything
    await client.close();
};

export{client, connect_to_db, close_db_connection};