# Accommodation Search

## Technical Coding Test

This project has a simple setup with an api, hooked up to MongoDB and a frontend piece initiated
with [vite](https://vitejs.dev/).

## Install and run

From the project root:

```
npm install
```

### Run

Once install has finished, you can use the following to run both the API and UI:

```
npm run start
```

### API

To run the API separately, navigate to the `./packages/api` folder

```
$ cd packages/api
```

And run the `api` server with

```
$ npm run dev
```

The API should start at http://localhost:3001

### Client

To run the `client` server separately, navigate to the `./packages/client` folder

```
$ cd ./packages/client
```

And run the `client` with

```
$ npm run start
```

The UI should start at http://localhost:3000

### Database connection & environment variables

By default, the code is set up to start and seed a MongoDB in-memory server, which should be sufficient for the test.
The database URL will be logged on startup, and the seed data can be found at ./packages/api/db/seeds.

If this setup does not work for you or if you prefer to use your own MongoDB server, you can create a .env file. In the
./packages/api folder, create a .env file (or rename the existing .env.sample) and fill in the environment variables.

## Task at hand

When the project is up and running, you should see a search-bar on the screen. This one is currently hooked up to the
`/hotels` endpoint.
When you type in a partial string that is part of the name of the hotel, it should appear on the screen.
Ie. type in `resort` and you should see some Hotels where the word `resort` is present.

You will also see 2 headings called **"Countries"** and **"Cities"**.

The assignment is to build a performant way to search for Hotels, Cities or Countries.
Partial searches will be fine. Hotels will need to filterable by location as well.
Ie. The search `uni` should render

- Hotels that are located in the United States, United Kingdom or have the word `uni` in the hotel name.
- Countries that have `uni` in their name Ie. United States, United Kingdom
- No Cities as there is no match

Clicking the close button within the search field should clear out the field and results.

When clicking on one of the `Hotels`, `Cities` or `Countries` links, the application should redirect to the relevant
page and render the selected `Hotel`, `City` or `Country` as a heading.

### Limitations

Given the time constraints, we do not expect a fully production-ready solution. We're primarily interested in the
approach and the overall quality of the solution.
Feel free to modify the current codebase as needed, including adding or removing dependencies.
For larger or more time-intensive changes, you're welcome to outline your ideas in the write-up section below and
discuss them further during the call.

<img src="./assets/search-example.png" width="400px" />

### Write-up

<!-- Write-up/conclusion section -->

_When all the behaviour is implemented, feel free to add some observations or conclusions you like to share in the
section_

#### Running the app

In base directory:

* run `npm run start` to start the app;
* run `npm run test:api` to run api tests;
* run `npm run test:client:e2e` to run client e2e tests while the app is running.

#### General thoughts/comments

* I used mongoose, because I have worked with it before;
* I ordered api and client into a better folder structure;
* For search fields I added index to have more efficient queries when performing search;
* Caching for both FE and BE;
* I added some basic unit/integration tests for api and some basic e2e tests for the client;
* It might be worth limiting results for each category and have a separate page to list all hotels/countries/cities.

#### The following improvements that could be made

Overall:

* Have a proper way to share collection types across both api and client.
  I created a quick and very poor approach with ./packages/models.

Backend:

* Replace ./packages/api/utils/searchCache.ts with redis;
* Use Elasticsearch/Algolia/typesense for better/more scalable search performance;
* Better error handling with more descriptive messages;
* More test coverage;
* Better environment variable management;
* Do search result grouping within query and not after it,
  I did not want to spend too much time remembering/figuring out how to do it
* Add slug for hotels/countries/cities;
* Have proper logging solution.

Frontend:

* Better accessibility for search experience;
* Error boundaries;
* Not found page;
* More test coverage;
* Use slugs for individual hotel/country/city for better SEO;
* Strip out data-testid attributes when building the app;
* Fix Cypress types.

### Database structure

#### Hotels Collection

```json
[
  {
    "chain_name": "Samed Resorts Group",
    "hotel_name": "Sai Kaew Beach Resort",
    "addressline1": "8/1 Moo 4 Tumbon Phe Muang",
    "addressline2": "",
    "zipcode": "21160",
    "city": "Koh Samet",
    "state": "Rayong",
    "country": "Thailand",
    "countryisocode": "TH",
    "star_rating": 4
  },
  {
    /* ... */
  }
]
```

#### Cities Collection

```json
[
  {
    "name": "Auckland"
  },
  {
    /* ... */
  }
]
```

#### Countries Collection

```json
[
  {
    "country": "Belgium",
    "countryisocode": "BE"
  },
  {
    /* ... */
  }
]
```
