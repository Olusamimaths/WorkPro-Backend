module.exports = {
  env: 'development',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DEV_DB_NAME,
  jwtsecret: 'notSoSecret',
  host: 'localhost',
  port: process.env.PORT || 27017,
};
