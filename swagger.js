"use strict";

require("dotenv").config();
const swaggerAutogen = require('swagger-autogen')();

const port = process.env.PORT || 4242;
let host;
let schemes;
if (process.env.LOCALHOST && process.env.LOCALHOST === "true") {
    host = `localhost:${port}`;
    schemes = ['http', 'https'];
} else {
    host = process.env.DOMAIN;
    schemes = ['https', 'http'];
}

const doc = {
    info: {
        version: "1.0.0",
        title: "Blockchain API",
        description: "Documentation Blockchain API.",
    },
    host,
    basePath: "/",
    schemes,
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "TVL",
            "description": "TVL Endpoinds"
        }
    ],
    securityDefinitions: {
        apiKeyAuth: {
            type: "apiKey",
            in: "header",       // can be "header", "query" or "cookie"
            name: "X-API-KEY",  // name of the header, query parameter or cookie
            description: "any description...",
        }
    },
    definitions: {
        FindedTVLDaily: {
            "ok": true,
            "result": {
                "description": "Get last 1 days'",
                "entities": [
                    {
                        "timestamp": 1683849600,
                        "day": "12/05/2023",
                        "value": 0
                    }
                ]
            }
        },
        FindedTVLMonthly: {
            "ok": true,
            "result": {
                "description": "Get last 1 months'",
                "entities": [
                    {
                        "timestamp": 1680307200,
                        "month": "04/2023",
                        "value": 0
                    }
                ]
            }
        },
        FindedTVLAnnual: {
            "ok": true,
            "result": {
                "description": "Get all data annual'",
                "entities": [
                    {
                        "timestamp": 1672531200,
                        "year": "2023",
                        "value": 625000253
                    }
                ]
            }
        },
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./src/app'); // Project's root file
});