import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes';
import models, { connectDb } from './models';

// Import config
import 'dotenv/config';

const app = express();

// Parser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/movies', routes.movies);

// Launch server
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

// Connect server with mongoose
connectDb()
  .then(() => server())
  .catch(err => {
    console.log(err);
    process.exit(1);
  });