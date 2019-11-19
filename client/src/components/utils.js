// Constants
import { API_KEY, US_REQ, LANGUAGE_REQ, PAGE_REQ, API_KEY_REQ } from '../constants';

// page: "/search/movie",

export const initRequest = {
   [API_KEY_REQ]: API_KEY,
   [LANGUAGE_REQ]: US_REQ,
   [PAGE_REQ]: 1,
}

export const createRequest = (page, obj) => {
   let request = "";
   if (page)
      request = page + '?';

   Object.keys(obj).forEach(key => {
      if (request !== page + '?' && request !== "")
         request += '&';
      if (Array.isArray(obj[key])) {
         let cnt = 0;
         while (cnt < obj[key].length) {
            // console.log("obj", obj[key][cnt]);
            request =+ key + "[" + cnt + "]=" + obj[key][cnt];
            cnt += 1;
         }
      } else {
         request += key + "=" + obj[key];
      }
   })
   return encodeURI(request);
}