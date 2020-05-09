import mongoose from 'mongoose'
import config from '../config'

const { host, db_port, database } = config;

const db =  mongoose
  .connect(`mongodb://${host}:${db_port}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to database successfully.'))
  .catch(e => console.log('Error: ', e));

export default db;
