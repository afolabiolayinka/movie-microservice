# A Movie Archive Microservice - Sample

## Prerequisites

You need to have `docker` and `docker-compose` installed on your computer to run the services
You need to get an API Key from https://omdbapi.com/

# Authorization service

To authorize users send a POST request to localhost:3000/auth
## Sample Users
The auth service defines two user accounts that you should use

1. `Basic` user

```
 username: 'basic-thomas'
 password: 'sR-_pcoow-27-6PAwCD8'
```

1. `Premium` user

```
username: 'premium-jim'
password: 'GBLtTyq3E_UNjFnpo9m6'
```
# Usage

## Notes:
1. Please import the "movie_microservice.postman_collection.json" into your Postman application.
2. First you need to authenticate user buy running the auth request before creating a movie or selecting the ones in the database.
3. The authentication service runs on port `3000` while the movie service runs on port `8080`
4. The `KEY` used is the one you get from `https://omdbapi.com`. It serves as the JWT Secret key too
5. In-memory is used for the sample. That means if the application stops the database is erased too.

## Run services with:
```
sudo JWT_SECRET={KEY} docker-compose up -d
```
## Stop services with:
```
sudo docker-compose down
```
## Run test with:
```
sudo JWT_SECRET={KEY} npm test
```