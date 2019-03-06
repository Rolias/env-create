# dotenv-json

Reads in a valid JSON file and creates environment variables for every top level object found in the resulting object. Inspired by [dotenv](https://github.com/motdotla/dotenv) which reads text files. Useful when you want to store JSON objects in an environment variable as strings. 

## Basic use

Let's assume you have a `.env.json` at the root level of your project with the following contents

```JSON
{
  "secret1": {
      "client_id": "123445",
  },
  "secret2": {
    "access_token": "reallylongtooken",
  },
}
```

Somewhere early in your code before you need the environment variables you add 

```javascript
require('dotenv-json`).load() 
const firstSecret = JSON.parse(process.env.secret1);
const secondSecret = JSON.parse(process.env.secret2);
```

The `load()` method will create a process environment variable for every top level object in the the default `.env.json` file. The `load()` method optionally takes a JSON object with properties for `path, debug,` and `encoding`. All three properties are optional. The encoding for reading in the file defaults to `utf8`.

Example: 

```JSON
{path:"/Some/Path/To/Your/json_env_file.json",
debug: true,
encoding:"utf8"}
```

## Acknowledgement

Inspired by [dotenv](https://github.com/motdotla/dotenv)

