"use strict";

const selectError = (realError, replaceMessage) => {
    const devMode = process.env.DEV_MODE;
    let message;
    if(devMode.toString() === "true") {
        message = realError;
    } else {
        message = replaceMessage;
    }
    return message;
}

const selectInfo = (realInfo, replaceMessage) => {
    const devMode = process.env.DEV_MODE;
    let message;
    if(devMode.toString() === "true") {
        message = realInfo;
    } else {
        message = replaceMessage;
    }
    return message;
}

module.exports = { selectError, selectInfo };