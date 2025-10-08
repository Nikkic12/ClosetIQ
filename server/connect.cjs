const { MongoClient } = require("mongodb")
require("dotenv").config({path: "./config.env"})

async function main() {

    const Db = process.env.ATLAS_URI // access environment variable
    const client = new MongoClient(Db) // create new MongoDB client, log in using my credentials

    try {
        await client.connect()
        // test the connection
        const collections = await client.db("closetiq_data").collections()
        // print list of all collection names
        collections.forEach((collection) => console.log(collection.s.namespace.collection)) 
    }
    catch(e) {
        console.error(e)
    }
    finally {
        await client.close()
    }
    
    // when in the servers/ directory, type node connect.cjs to print all the colleciton names
}

main()