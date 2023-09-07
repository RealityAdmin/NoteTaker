const { MongoClient } = require("mongodb");
const uri = process.env.ATLAS_URI;

class Connection {
    constructor() {
        this.client = new MongoClient(uri);
    }

    async init() {
        await this.client.connect();
        console.log('Connected');

        this.notes = this.client.db("User's Notes");
    }
}

module.exports = new Connection();