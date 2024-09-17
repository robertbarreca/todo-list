require("dotenv").config()
const { MongoClient, ServerApiVersion } = require("mongodb")

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/"

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
};

let client
// make sure we don't create new client everytime we query
const connectToMongoDb = async () => {
    if (!client) {
        try {
            client = await MongoClient.connect(uri, options)
            console.log("connected to MongoDB")
        } catch (error) {
            console.log("not connected to MongoDB", error)
        }
    }
    return client
}

const getConnectedClient = () => client

module.exports = {connectToMongoDb, getConnectedClient}