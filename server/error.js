export class MovieError extends Error {
   constructor() {
     super();
     this.name = this.constructor.name;
   }
}

export class InvalidRequestFormat extends MovieError {
   constructor(message) {
     super();
     this.status = 400;
     this.message = message || "The request format is invalid";
   }
 }