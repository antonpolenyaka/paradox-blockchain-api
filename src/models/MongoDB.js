"use strict";

let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;

class MongoDB {

    static Connect() {
        return MongoClient.connect(process.env.DB_CONNECTION_STRING)
            .then(mc => { // mongoClient
                let db = mc.db(process.env.DB_DATABASE);
                return { mc, db };
            });
    }

    static Close(mc) {
        mc.close();
    }
}

module.exports = MongoDB;