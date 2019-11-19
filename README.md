# wooclap-movie-catalog
Rest server in Nodejs with Express and React view

#### Clone the project on your computer with the git command:

```
git clone git@github.com:franciscotco/wooclap-movie-catalog.git
```

Run the app with docker-compose file to deploy the server on docker.

### Install

Make sure you have __installed docker and mongodb__ on your computer, if not [install here](https://docs.docker.com/install/linux/docker-ce/ubuntu/) do not forget to select the install for your own system and start them.

#### Go at the root of the repository to build and run your app with :

```
docker-compose up --build
```

### API and View 

`The docker-compose run a server on localhost port 5000 and deploy a React view on localhost port 3000`

* All the methods are available at 'http://localhost:5000/api/movies/'
* The home view is available at 'http://localhost:3000/home'


> @method['POST']: - 'Content-Type': 'application/json'
```
* Take 5 body parameters : { 
    original_title : 'string', /* mandatory */
    genres: ['object'], 
    vote_average: 'string', 
    poster_path: 'string',
    release_date: 'string'
  }
```
* Save a new movie in the database
* Available on post request at __http://localhost:5000/api/movies__

> @method['DELETE']:
* Take 1 parameter `id`
* Delete the movie of the according id
* Available on delete request at __http://localhost:5000/api/movies/:id__


> @method['PUT']:
* Take 1 parameter `id`
```
* Take 5 body parameters : { 
    original_title : 'string', /* mandatory */
    genres: ['object'], 
    vote_average: 'string', 
    poster_path: 'string',
    release_date: 'string'
  }
 ```
* Update the movie of the according id
* Available on put request at __http://localhost:5000/api/movies/:id__

> @method['GET']:
* Take 1 parameter `id`
* Return the movie of the according id
* Available on get request at __http://localhost:5000/api/movies/:id__

> @method['GET']:
* Take 1 query parameter `search`
* Return the first 10 movies with the substring search in their original_title
* Available on get request at __http://localhost:5000/api/movies?search=movie_name__

