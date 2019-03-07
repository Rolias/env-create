# env-create

Reads in a valid JSON file and creates environment variables for every top level object found in the resulting object, **unless** an environment variable of that name already exists. It will not overwrite existing environment variables. It will only create environment variables for the top level objects.  

[![NPM version](https://img.shields.io/npm/v/env-create.svg?style=flat-square)](~https://www.npmjs.com/package/env-create~) 
![BuildStatus](https://img.shields.io/travis/Rolias/env-create.svg)
![Coverage Status](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

## Installation  

`npm i env-create --save`  
Although at this point you should have made `--save` your default

## Basic usage

Let's assume you have a `.env.json` at the root level of your project with the following contents

```JSON
{
  "secret1": {
      "client_id": "123445",
  },
  "secret2": {
    "access_token": "reallylongtoken",
  },
}
```

Somewhere early in your code before you need the environment variables you add  

```javascript
require('env-create').load() 
const firstSecret = JSON.parse(process.env.secret1);
const secondSecret = JSON.parse(process.env.secret2);
```

The `load()` method will create a process environment variable for every top level object in the the default `.env.json` file located at the root of your project. The `load()` method optionally takes a JSON object with properties for `path, debug,` and `encoding`. All three properties are optional.  

## Option usage

Using a relative path to go up one folder out of your project and into an ENV_VARS folder to get the file named `gsweet.env.json`

```javascript
require('env-create').load({path: "../ENV_VARS/gsweet.env.json", encode: "utf8", debug: "true"});) 
const firstSecret = JSON.parse(process.env.secret1);
const secondSecret = JSON.parse(process.env.secret2);
```

## Acknowledgement

Inspired by [dotenv](https://github.com/motdotla/dotenv)
