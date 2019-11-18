import mongoose from 'mongoose';
import models from '../models';

// Constants
import { TITLE, POSTER_PATH } from '../constants';

// Errors
import { InvalidRequestFormat } from '../error';

const searchMovieByName = async ({query: {search}}, res, next) => {
   if (!search) return next(new InvalidRequestFormat('Missing element to search'));

   try {
      console.log("search :", search);
      const movies = await models.Movies.find({
         [TITLE]: {
            "$regex": search, "$options": "i"
         }
         // $rename: { '_id': 'id' }
      }).sort({ 
            [TITLE]: 1 
         }).select({
            [TITLE]: 1,
            [POSTER_PATH]: 1
         }).limit(10);
      console.log("Movies :", movies);
      res.status(200).send(movies);
   } catch (err) {
      next(err);
   }
}

const getById = async ({params: {id}}, res, next) => {
   if (!id) return next(new InvalidRequestFormat('Missing id'));

   try {
      const movie = await models.Movies.findById(id);
      res.status(200).send(movie);
   } catch (err) {
      next(err);
   }
};

const post = async ({body}, res, next) => {
   // console.log("REQ: ", req);
   // const { title } = req;
   const { [TITLE]: title } = body;
   console.log("Title :", title);
   console.log("body :", body);
   if (!title) return next(new InvalidRequestFormat('Missing title'))

   try {
      const Movie = new models.Movies(body);
      const movie = await Movie.save()
      res.status(200).json(movie);
   } catch (err) {
      next(err);
   }
   
   // movie.save()
   //    .then(data => res.send(data))
   //    .catch(err => {
   //       console.log("Err :", err);
   //       res.status(500).send({
   //          message: `Error durring the creation of the movie ${title}`
   //       });
   //    });
   // res.send("post");
};

const put = async ({body, params: {id}}, res, next) => {
   const { [TITLE]: title } = body;

   if (!title || !id) return next(new InvalidRequestFormat('Missing title || id'))

   try {
      const movie = await models.Movies.findOneAndUpdate(id, {...body}, {new: true});
      // const test = await movie.select;
      // console.log("Movie :", movie);
      res.status(200).json(movie);
   } catch (err) {
      next(err);
   }
};

const deleteById = async ({params: {id}}, res, next) => {

   console.log("DeleteById");
   if (!id) return next(new InvalidRequestFormat('Missing Id'));

   try {
      await models.Movies.deleteOne({_id: id});
      // console.log("Delete :", deleteMovie);
      res.status(200).send({success: true});
   } catch (err) {
      next(err);
   }
};

export default {
   getById,
   post,
   put,
   deleteById,
   searchMovieByName
}