import mongoose from 'mongoose';

// Constants
import { TITLE, DATE, POSTER_PATH, RATINGS, GENRES } from '../constants';

const moviesSchema = new mongoose.Schema({
   [TITLE]: {
      type: String,
      required: true,
   },
   [DATE]: {
      type: String,
      required: false,
   },
   [POSTER_PATH]: {
      type: String,
      required: false,
   },
   [RATINGS]: {
      type: String,
      required: false,
   },
   [GENRES]: {
      type: [mongoose.Schema.Types.Mixed],
      required: false,
   }
});

const Movies = mongoose.model('movies', moviesSchema);

export default Movies;