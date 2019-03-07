# env-create

Reads in a valid JSON file and creates environment variables for every top level object found in the resulting object, **unless** an environment variable of that name already exists. It will not overwrite existing environment variables. It will only create environment variables for the top level objects.  

[![NPM version](https://img.shields.io/npm/v/dotenv.svg?style=flat-square)](~https://www.npmjs.com/package/env-create~) 
[![BuildStatus](https://img.shields.io/travis/motdotla/dotenv/master.svg?style=flat-square)](~https://travis-ci.org/Rolias/env-create~)
![Coverage Status](https://img.shields.io/badge/coverage-100%-brightgreen.svg)
<!-- [![Coverage Status](https://coveralls.io/repos/github/Rolias/env-create/badge.svg?branch=master)](https://coveralls.io/github/Rolias/env-create?branch=master) -->

## Installation  

`npm i env-create --save`  
Although at this point you should have made `--save` your default

## Basic use

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

Example of full option object that can be passed in: 

```javascript
{path:"/Some/Path/To/Your/json_env_file.json",
debug: true,
encoding:"utf8"}
```

## Acknowledgement

Inspired by [dotenv](https://github.com/motdotla/dotenv)

