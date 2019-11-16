"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
var postgresConfig = {
    host: process.env.POSTGRES_ENDPOINT,
    database: process.env.POSTGRES_INSTANCE_ID,
    port: 5432,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD
};
exports.postgresConfig = postgresConfig;
