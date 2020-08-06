'use strict';

require('dotenv').load();


const config = require('@jwerre/secrets').configSync({
  region: process.env.AWS_REGION,
  id: process.env.AWS_SECRET_ID,
});


const REQUIRED_KEYS = [
  // 'DB_USER',
  // 'DB_PASSWORD',
  // 'DB_NAME',
  // 'DB_HOST',
  'JWT_TOKEN',
  'TOKEN_EXPIRATION_TIME',
];

REQUIRED_KEYS.forEach((key) => {
  if (!(key in process.env)) {
    throw new Error(`Missing required config key: ${key}`);
  }
});



const {
  // DB_USER,
  // DB_PASSWORD,
  // DB_NAME,
  // DB_HOST,
  AWS_SECRET_ID,
  JWT_TOKEN,
  TOKEN_EXPIRATION_TIME,
} = process.env;

module.exports = {
  JWT_TOKEN,
  TOKEN_EXPIRATION_TIME: Number(TOKEN_EXPIRATION_TIME),

  // Sequelize config, sourced based on current NODE_ENV from models/index.js file
  [process.env.NODE_ENV || 'development']: {
    username: config[AWS_SECRET_ID].username,
    password:  config[AWS_SECRET_ID].password || null,
    database: config[AWS_SECRET_ID].dbInstanceIdentifier,
    host: config[AWS_SECRET_ID].host,
    port: config[AWS_SECRET_ID].port,
    dialect: 'mysql',
  },
};
