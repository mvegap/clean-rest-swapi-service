# Clean REST SWAPI Service

This is a simple REST service that uses the [SWAPI](https://swapi.co/) API to provide a clean REST API for the Star Wars universe.

## Usage

### Get all people

`GET /people`

### Get a person by ID

`GET /people/{id}`

### Get all planets

`GET /planets`

### Get a planet by ID

`GET /planets/{id}`

### Get all starships

`GET /starships`

### Get a starship by ID

`GET /starships/{id}`

## Running the service

### Docker

`docker run -p 8080:8080 -t clean-rest-swapi-service`
