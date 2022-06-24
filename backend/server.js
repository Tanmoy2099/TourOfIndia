
const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err, err.name, err.message);
    process.exit(1);
});


const app = require('./app');
const port = process.env.PORT || 5000;

dotenv.config({ path: './.env' });


const DB_URL = process.env.DATABASE.replace('<username>', process.env.USERNAME_DB)
    .replace('<password>', process.env.PASSWORD_DB)

async function main() {
    await mongoose.connect(DB_URL);
}

const server = app.listen(port, () => console.log(`Server is running at port: ${port}`))

main()
    .then(console.log("Successfully connected to Database!"))
    .catch((err) => {
        server.close(() => process.exit(1));
        console.log(err, `Could not connect to Database, ${err.message}`)
    });

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err, err.name, err.message);
    server.close(() => process.exit(1));
});