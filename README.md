# JS16_ProjectF [![Build Status](https://travis-ci.org/Rostlab/JS16_ProjectF.svg?branch=react)](https://travis-ci.org/Rostlab/JS16_ProjectF) [![Code Climate](https://codeclimate.com/github/Rostlab/JS16_ProjectF/badges/gpa.svg)](https://codeclimate.com/github/Rostlab/JS16_ProjectF) [![Codacy Badge](https://api.codacy.com/project/badge/grade/cee88a696a9749aa98ea9987ba91b926)](https://www.codacy.com/app/mail_25/JS16_ProjectF)

[![Join the chat at https://gitter.im/Rostlab/JS16_ProjectF](https://badges.gitter.im/Rostlab/JS16_ProjectF.svg)](https://gitter.im/Rostlab/JS16_ProjectF?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
In this project we will build a web portal for our GoT data analysis and visualization system. The website will integrate all the apps created in projects B-D with the help of the integration team assigned to Project E.

Staging-Server:
https://got-stats.herokuapp.com/

# Developer information
We're using webpack: https://github.com/webpack/webpack

## Requirements:

**Please make a config.json in folder config and set up your setting**

1. Duplicate the config.default.json to config.json
2. Add twitter access keys to gotsent in the config
3. Add mongodb access url to gotsent.mongo.uri in the config (ask @yashha for an access)

`gotsent.mongo.uri = "mongodb://<user>:<pass>@<server>/<db>"`

## Development
* `npm install`
* `npm start`
* Open: http://localhost:8080/

## Build manually
* `npm install`
* `npm run build`

## serve files
* `npm install`
* `npm run serve`

## Deploy to heroku
We use a dedicated 'staging' branch which is automagically deployed to https://got-stats.herokuapp.com/.

**How To Deploy On Staging**:
* git checkout staging
* git pull
* git pull origin develop
* git push

**NEVER EVER PUSH COMMITS DIRECTLY TO 'staging' !11!!** :bomb:
