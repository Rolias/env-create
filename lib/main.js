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
  const debug = Boolean(options && options.debug)
  if (options.path === undefined) {
    options.path = path.resolve(process.cwd(), DEFAULT_ENV_FILENAME)
  }
  if (options.encoding === undefined) {
    options.encoding = DEFAULT_ENCODING
  }
  if (debug) {console.log("debug mode")}
  const envString = fs.readFileSync(options.path, options.encoding)
  const envJson = JSON.parse(envString)
  for (const key in envJson) {
    if (!Object.defineProperty.hasOwnProperty.call(process.env, key)) {
      process.env[key] = JSON.stringify(envJson[key])
    } else if (debug) {
      console.log(`"${key}" is already defined in \`process.env\` and will not be overwritten`)
    }
  }
}

// load({path: "/Users/tod-gentille/dev/node/ENV_VARS/gsweet.env.json"})
// console.log(process.env.client_secret)

module.exports = {
  load,
}
