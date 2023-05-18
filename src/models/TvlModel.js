"use strict";

class TvlModel {

    static GetDaily(db, startTimestamp, endTimestamp) {
        return db.collection('daily-tvl')
            .find({
                timestamp: {
                    $gte: startTimestamp,
                    $lte: endTimestamp
                }
            }).project({ _id: 0, updateTimestamp: 0, validValues: 0 })
            .sort( { timestamp: 1 } )
            .toArray();
    }

    static GetMonthly(db, startTimestamp, endTimestamp) {
        return db.collection('monthly-tvl')
            .find({
                timestamp: {
                    $gte: startTimestamp,
                    $lte: endTimestamp
                }
            }).project({ _id: 0, updateTimestamp: 0, validValues: 0, originValues: 0 })
            .sort( { timestamp: 1 } )
            .toArray();
    }

    static GetAnnual(db) {
        return db.collection('annual-tvl')
            .find()
            .project({ _id: 0, updateTimestamp: 0, validValues: 0, originValues: 0 })
            .sort( { timestamp: 1 } )
            .toArray();
    }
}

module.exports = TvlModel;