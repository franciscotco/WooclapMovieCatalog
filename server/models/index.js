import mongoose from 'mongoose';

import Movies from './movies';

import 'dotenv/config';

export const connectDb = () => {
   return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useFindAndModify: false }, (error, client) => {
      if (error) throw error;
      return client;
   });
};
 
const models = { Movies };
 export default models;