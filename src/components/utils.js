// Constants
import { API_KEY, US_REQ, LANGUAGE_REQ, PAGE_REQ, ADULT_REQ, API_KEY_REQ } from '../constants';

// page: "/search/movie",

export const initRequest = {
   [API_KEY_REQ]: API_KEY,
   [LANGUAGE_REQ]: US_REQ,
   [PAGE_REQ]: 1,
}

export const createRequest = (page, obj) => {
   let request = page + '?';

   Object.keys(obj).forEach(key => {
      if (request !== page + '?')
         request += '&' + key + "=" + obj[key];
      else
         request += key + "=" + obj[key];
   })
   return encodeURI(request);
}