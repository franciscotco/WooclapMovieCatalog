
// Routes
export const ID_MOVIE = 'id_movie'
export const ID_DB = 'id_db';
export const ROOT = '/';
export const ROOT_DB = ROOT + ':' + ID_DB;
export const HOME = '/home';
export const SEARCH = HOME + '/search';
export const SEARCH_DB = SEARCH + '/:'+ ID_DB;
export const MOVIE = HOME + '/movie';
export const MOVIE_DB = MOVIE + '/:' + ID_MOVIE + '/:' + ID_DB;

// ID_DB
export const LOCAL_DB = 'local';
export const TM_DB = 'tmdb';

// export const MOVIE = '/detail'
// export const SEARCH_MOVIE = '/search';

// API TMDB
export const API_KEY = '6dcb54a8f06bb6506f9df08eefb9b46f';
export const FETCH_MOVIE = '/search/movie';
export const URI = 'https://api.themoviedb.org/3';
export const MOVIE_DETAIL = '/movie';

// Image Size
export const URL_IMG_180 = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
export const URL_IMG_300 = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';

// Request
export const US_REQ = 'en-US';
export const API_KEY_REQ = 'api_key';
export const LANGUAGE_REQ = 'language';
export const PAGE_REQ = 'page';
export const ADULT_REQ = 'include_adult';
export const QUERY_REQ = 'query';