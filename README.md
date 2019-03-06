# dotenv-json

Reads in a valid JSON file and creates environment variables for every top level object found in the resulting object. Inspired by [dotenv](https://github.com/motdotla/dotenv) which reads text files. Useful when you want to store JSON objects in an environment variable as strings. 

## Basic use
```javascript
const 
```

## Why would I need this?

Assume you have some credential JSON objects that look similar to this:
```JSON
{
  "secret1": {
    "installed": {
      "client_id": "123445",
      "client_secret":"5678",
    }
  },
  "secret2": {
    "access_token": "reallylongtooken",
    "refresh_token": "somethingelse",
    "token_type": "Bearer",
  },
}
```
When you type that in a JSON file you get help to know you've typed it correctly, so it's nice to just read the JSON directly. 