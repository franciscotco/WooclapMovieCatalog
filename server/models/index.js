import mongoose from 'mongoose';

import Movies from './movies';

import 'dotenv/config';

const connectDb = () => {
   return mongoose.connect(process.env.DATABASE_URL_LOCAL, { useNewUrlParser: true, useFindAndModify: false }, (error, client) => {
      if (error) throw error;
      return client;
   });
 };
 
const models = { Movies };
 
export { connectDb };
export default models;