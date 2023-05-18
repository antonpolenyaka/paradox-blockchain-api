"use strict";

const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/auth');
const { selectError } = require('../lib/errorManager.js');
const MongoDB = require('../models/MongoDB.js');
const dt = require('../lib/dateTimeUtils.js');
const TvlModel = require('../models/TvlModel');

// 7D = 7 days, 1M = 30 days, 3M = 90 days
router.route('/daily/:days').get(authorize, (req, res) => {
    /*  #swagger.tags = ['TVL']
        #swagger.description = 'Endpoint to get last X days data.' 

        #swagger.responses[200] = { 
            schema: { "$ref": "#/definitions/FindedTVLDaily" },
            description: "TVL values." } */

    let replaceError = "Error: unknown";
    try {
        replaceError = `Error: we don't have data in Database`;

        let mcLocal = null;
        let days;
        try {
            days = parseInt(req.params.days);
        } catch {
            days = 7; // default 7 last days
        }

        MongoDB.Connect()
            .then(({ mc, db }) => { // mc - MongoClient, db - Db
                mcLocal = mc;

                // Make filter
                const end = new Date();
                const start = new Date();
                start.setDate(end.getDate() - days);
                const endTimestamp = dt.dateToTimestamp(end);
                const startTimestamp = dt.dateToTimestamp(start);

                // Find entity
                return TvlModel.GetDaily(db, startTimestamp, endTimestamp);
            })
            .then(itemsFinded => {
                res.status(200).json({
                    ok: true,
                    result: {
                        description: `Get last ${days} days'`,
                        entities: itemsFinded,
                    }
                });
                return;
            })
            .catch(err => {
                console.error(err);
                res.json({ ok: false, message: selectError(err.message, replaceError) });
                return;
            })
            .finally(() => {
                if (mcLocal) {
                    MongoDB.Close(mcLocal);
                    mcLocal = null;
                }
            });
    } catch (err) {
        res.json({ ok: false, message: selectError(err.message, replaceError) });
        return;
    }
});

// 1Y = 12 Months
router.route('/monthly/:months').get(authorize, (req, res) => {
    /*  #swagger.tags = ['TVL']
        #swagger.description = 'Endpoint to get last X months data.' 

        #swagger.responses[200] = { 
            schema: { "$ref": "#/definitions/FindedTVLMonthly" },
            description: "TVL values." } */

    let replaceError = "Error: unknown";
    try {
        replaceError = `Error: we don't have data in Database`;

        let mcLocal = null;
        let months;
        try {
            months = parseInt(req.params.months);
        } catch {
            months = 12; // default 12 last months
        }

        MongoDB.Connect()
            .then(({ mc, db }) => { // mc - MongoClient, db - Db
                mcLocal = mc;

                // Make filter
                const end = new Date();
                const start = new Date();
                start.setMonth(end.getMonth() - months);
                const endTimestamp = dt.dateToTimestamp(end);
                const startTimestamp = dt.dateToTimestamp(start);

                // Find entity
                return TvlModel.GetMonthly(db, startTimestamp, endTimestamp);
            })
            .then(itemsFinded => {
                res.status(200).json({
                    ok: true,
                    result: {
                        description: `Get last ${months} months'`,
                        entities: itemsFinded,
                    }
                });
                return;
            })
            .catch(err => {
                console.error(err);
                res.json({ ok: false, message: selectError(err.message, replaceError) });
                return;
            })
            .finally(() => {
                if (mcLocal) {
                    MongoDB.Close(mcLocal);
                    mcLocal = null;
                }
            });
    } catch (err) {
        res.json({ ok: false, message: selectError(err.message, replaceError) });
        return;
    }
});

// ALL
router.route('/annual').get(authorize, (req, res) => {
    /*  #swagger.tags = ['TVL']
        #swagger.description = 'Endpoint to get all data in annual format.' 

        #swagger.responses[200] = { 
            schema: { "$ref": "#/definitions/FindedTVLAnnual" },
            description: "TVL values." } */

    let replaceError = "Error: unknown";
    try {
        replaceError = `Error: we don't have data in Database`;

        let mcLocal = null;

        MongoDB.Connect()
            .then(({ mc, db }) => { // mc - MongoClient, db - Db
                mcLocal = mc;

                // Find entity
                return TvlModel.GetAnnual(db);
            })
            .then(itemsFinded => {
                res.status(200).json({
                    ok: true,
                    result: {
                        description: `Get all data annual'`,
                        entities: itemsFinded,
                    }
                });
                return;
            })
            .catch(err => {
                console.error(err);
                res.json({ ok: false, message: selectError(err.message, replaceError) });
                return;
            })
            .finally(() => {
                if (mcLocal) {
                    MongoDB.Close(mcLocal);
                    mcLocal = null;
                }
            });
    } catch (err) {
        res.json({ ok: false, message: selectError(err.message, replaceError) });
        return;
    }
});

module.exports = router;