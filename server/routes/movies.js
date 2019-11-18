import { Router } from 'express';

import controllers from '../controllers';

const router = Router();
router.get('/', controllers.movies.searchMovieByName);
router.get('/:id', controllers.movies.getById);
router.post('/', controllers.movies.post);
router.put('/:id', controllers.movies.put);
router.delete('/:id', controllers.movies.deleteById);

export default router;