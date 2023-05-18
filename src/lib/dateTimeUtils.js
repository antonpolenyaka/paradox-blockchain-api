const fNow = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const currentDateAndTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return currentDateAndTime;
}

const unixTimestampInMilliseconds = () => {
    return Date.now();
}

// In seconds
const unixTimestamp = () => {
    return Math.floor(Date.now() / 1000);
}

const getStartOfDayTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000); // Multiplicar por 1000 para convertir a milisegundos
    date.setUTCHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 UTC

    const startOfDayTimestamp = Math.floor(date.getTime() / 1000); // Dividir por 1000 para convertir a segundos

    return startOfDayTimestamp;
}

// In seconds
const dateToTimestamp = (date) => {
    const timestampInSeconds = Math.floor(date.getTime() / 1000);
    return timestampInSeconds;
}

// In seconds Day
const dateToTimestampD000 = (date) => {
    date.setUTCHours(0, 0, 0, 0); // Establecer la hora
    return dateToTimestamp(date);
}

// In seconds Month
const dateToTimestampM000 = (date) => {
    date.setUTCHours(0, 0, 0, 0); // Establecer la hora
    date.setDate(1); // Establecer el día como el primer día del mes
    return dateToTimestamp(date);
}

// In seconds Year
const dateToTimestampY000 = (date) => {
    date.setUTCHours(0, 0, 0, 0); // Establecer la hora
    date.setUTCMonth(0, 1); // Establecer el mes como enero y el día como el primer día del año
    return dateToTimestamp(date);
}

// End of Day
const dateToTimestampD999 = (date) => {
    date.setUTCHours(23, 59, 59, 999); // Establecer la hora
    return dateToTimestamp(date);
}

// End of Month
const dateToTimestampM999 = (date) => {
    date.setUTCHours(23, 59, 59, 999); // Establecer la hora
    date.setUTCMonth(date.getUTCMonth() + 1, 0); // Establecer el mes siguiente y el día anterior al primer día del mes siguiente
    return dateToTimestamp(date);
}

// End of Year
const dateToTimestampY999 = (date) => {
    date.setUTCHours(23, 59, 59, 999); // Establecer la hora
    date.setUTCMonth(11, 31); // Establecer el mes y el día
    return dateToTimestamp(date);
}

const timestampToHumanDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}

const timestampToHumanDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

const timestampToHumanMonth = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);

    const formattedDate = `${month}/${year}`;
    return formattedDate;
}

const timestampToHumanYear = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();

    const formattedDate = `${year}`;
    return formattedDate;
}

const incrementToNextMonth = (date) => {
    const newDate = new Date(date.getTime());
    newDate.setUTCDate(1);
    newDate.setUTCMonth(newDate.getUTCMonth() + 1);
    return newDate;
}

const incrementToNextYear = (date) => {
    const newDate = new Date(date.getTime());
    newDate.setUTCFullYear(newDate.getUTCFullYear() + 1);
    newDate.setUTCMonth(0);
    newDate.setUTCDate(1);
    return newDate;
}

module.exports = { 
    fNow, 
    unixTimestampInMilliseconds, 
    unixTimestamp, 
    getStartOfDayTimestamp, 
    dateToTimestamp,
    dateToTimestampD000,
    dateToTimestampM000,
    dateToTimestampY000,
    dateToTimestampD999,
    dateToTimestampM999,
    dateToTimestampY999,
    timestampToHumanDate,
    timestampToHumanDay,
    timestampToHumanMonth,
    timestampToHumanYear,
    incrementToNextMonth,
    incrementToNextYear
};