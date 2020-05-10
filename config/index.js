// eslint-disable-next-line import/no-dynamic-require
const config = require(`./${process.env.NODE_ENV || 'development'}`);
export default config;
