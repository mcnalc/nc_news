# Northcoders News

Northcoders News is an app in a similar style to Reddit, where users can post and read articles and comments on a variety of topics. This repo contains the front end of the project, which was built using React.

I previously created a RESTful API using Express.js and a MongoDB database.

[Back-end live link](https://clairencnews.herokuapp.com/api)

[Back-end repo](https://github.com/mcnalc/BE2-northcoders-news)

## Functionality

Users can...

- log in with their username and are given an error message if the username does not exist
- log out of the app
- view titles, snippets and topic categories for all articles posted on the homepage
- filter articles by topic
- click on an article title and snippet to view the full article and its comments
- post new articles and comment on existing articles
- delete comments they have made
- upvote or downvote articles

## Getting started

### Installing the app

1. Clone this repo

```
git clone https://github.com/mcnalc/nc_news
```

2. cd into the cloned repo and install all package dependencies

```
npm install
```

The dependencies which will install are:

- react
- axios
- @reach/router

### Running the app

Run a local version of the app on localhost:3000

```
npm start
```

This will start up the development server and open the app in a new browser tab. As there is no functionality for registering as a new user, you can log in as 'jessjelly', with no password required.

## Deployment

The project has been deployed to Netlify. The back end has been deployed to Heroku (see links above).

## Author

Claire M
Github - mcnalc
