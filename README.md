# Full stack project with multi technologies Nodejs, React, Typescript, MySQL, Webpack, Heroku

This project was bootstrapped with [Create React App]

## Available Scripts

For Development, on the project root:
## `npm run dev`
Runs the backend, open [http://localhost:8082/] on the browser, with mysql connections on localhost.\
All connection parameters are defined in .env file  

## `cd ./frontend, npm run dev`
open [http://localhost:3000/] on the browser to start the React app.
Runs the webpack dev server on frontend.

For Production, on the project root:
## `npm run build`
Heroku will automatically implements:
### `heroku-perbuild` to install dependencies for backend and frontend on Heroku
Then Heroku will implement `build`:
### `build` to build for Nodejs and React Apps
Then Heroku will start both backend and frontend apps: 
### `start`

To view the fullstack app on heroku:
##  (https://integratedsuite-bd9c2e7e4b3b.herokuapp.com/).


