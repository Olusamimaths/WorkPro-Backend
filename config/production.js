module.exports = {
    env: 'production',
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    jwtsecret: process.env.JWT_KEY,
    port: process.env.PORT || 27017
}