import { MongoClient } from 'mongodb';

const uri = process.env.URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.DBNAME || 'todos';

const connection = new MongoClient(uri);
const database = connection.db(dbName);
export { database };
