import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes';
import models, { connectDb } from './models';

import 'dotenv/config';

// export { connectDb };

export const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/movies', routes.movies);

const eraseDatabaseOnSync = false;

const port = process.env.PORT || 5000;

const server = async () => {
  if (eraseDatabaseOnSync) {
    await models.Movies.deleteMany({});
    console.log("DELETE")
  }
  app.listen(port, () =>
    console.log(`App listening on port ${port}!`)
  );
}

// server();

connectDb()
  .then(() => server())
  .catch(err => {
    console.log(err);
    process.exit(1);
  });