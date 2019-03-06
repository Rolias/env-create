const fs = require("fs")
const path = require("path")

const DEFAULT_ENV_FILENAME = ".env.json"
const DEFAULT_ENCODING = "utf8"

/**
 *  Load the passed JSON file synchronously and set up environment vars
 *  NOTE: it's important to do this synchronously so that subsequent 
 *  code can rely on the environment variables existing.
 * @param {Object<path, encoding>} options 
 */
const load = (options = {}) => {
  if (options.path === undefined) {
    options.path = path.resolve(process.cwd(), DEFAULT_ENV_FILENAME)
  }
  if (options.encoding === undefined) {
    options.encoding = DEFAULT_ENCODING
  }

  const envString = fs.readFileSync(options.path, options.encoding)
  const envJson = JSON.parse(envString)
  for (const element in envJson) {
    process.env[element] = JSON.stringify(envJson[element])
  }
}

module.exports = {
  load,
}
