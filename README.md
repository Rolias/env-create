# env-create

Reads in a valid JSON file and creates environment variables for every top level object found in the resulting object, **unless** an environment variable of that name already exists. It will not overwrite existing environment variables. It will only create environment variables for the top level objects.  

[![NPM version](https://img.shields.io/npm/v/env-create.svg?style=flat-square)](~https://www.npmjs.com/package/env-create~) 
![BuildStatus](https://img.shields.io/travis/Rolias/env-create.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/51a7c2ddffdc29ba06b5/maintainability)](https://codeclimate.com/github/Rolias/env-create/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/51a7c2ddffdc29ba06b5/test_coverage)](https://codeclimate.com/github/Rolias/env-create/test_coverage)
[![Inline docs](https://inch-ci.org/github/Rolias/env-create.svg?branch=master)](https://github.com/Rolias/env-create)
<!-- How to do it using img.shield.io [![Test Coverage](https://img.shields.io/codeclimate/coverage/Rolias/env-create.svg)](https://codeclimate.com/github/Rolias/env-create/test_coverage)
-->

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

The `load()` method will create a process environment variable for every top level object in the the default `.env.json` file located at the root of your project. The `load()` method optionally takes a JSON object with properties for `path`, and `encoding`. Both properties are optional.  The function returns an array of messages. If an environment variable already existed and would have been overwritten there were will be a message letting you know that.

## Option usage

Using a relative path to go up one folder out of your project and into an ENV_VARS folder to get the file named `gsweet.env.json`

```javascript
require('env-create').load({
    path: "../ENV_VARS/gsweet.env.json", 
    encode: "utf8"))  
const firstSecret = JSON.parse(process.env.secret1);
const secondSecret = JSON.parse(process.env.secret2);
```

You can also use an absolute path which is likely preferred if you store authentication data that is required among multiple projects

```javascript
const result = require('env-create').load({
  path: "/User/yourUserName/ENV_VARS/gsweet.env.json",
  encode: "utf8"))
```

## Acknowledgement

Inspired by [dotenv](https://github.com/motdotla/dotenv)
