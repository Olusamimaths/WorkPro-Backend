import dotenv from "dotenv";

dotenv.config();

const {
  DB_USER,
  DEV_DB_NAME,
  DB_PASSWORD,
  TEST_DB_NAME,
  PROD_DB_HOST,
  PROD_DB_USER,
  PROD_DB_NAME,
  PROD_DB_PASSWORD,
  JWT_KEY
} = process.env;

const config = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DEV_DB_NAME,
    jwtsecret: "notSoSecret",
    host: "localhost",
    port: 27017
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: TEST_DB_NAME,
    jwtsecret: "notSoSecretToo",
    host: "127.0.0.1",
    port: 27017
  },
  production: {
    username: PROD_DB_USER,
    password: PROD_DB_PASSWORD,
    database: PROD_DB_NAME,
    host: PROD_DB_HOST,
    jwtsecret: JWT_KEY,
    port: 27017
  }
};

export default config;