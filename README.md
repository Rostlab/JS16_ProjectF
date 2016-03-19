# JS16_ProjectF [![Build Status](https://travis-ci.org/Rostlab/JS16_ProjectF.svg?branch=react)](https://travis-ci.org/Rostlab/JS16_ProjectF)
In this project we will build a web portal for our GoT data analysis and visualization system. The website will integrate all the apps created in projects B-D with the help of the integration team assigned to Project E.

Staging-Server:
https://got-stats.herokuapp.com/

# Developer information
We're using webpack: https://github.com/webpack/webpack
## Development
* `npm install`
* `npm start`
* Open: http://localhost:8080/

## Build manually
* `npm install`
* `npm run build`

## Deploy to heroku
We use a dedicated 'staging' branch which is automagically deployed to https://got-stats.herokuapp.com/.

**How To Deploy On Staging**:
* git checkout staging
* git pull
* git pull origin develop
* git push 

**NEVER EVER PUSH COMMITS DIRECTLY TO 'staging' !11!!** :bomb: 