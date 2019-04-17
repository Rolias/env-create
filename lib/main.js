const fs = require('fs')
const path = require('path')

const DEFAULT_ENV_FILENAME = '.env.json'
const DEFAULT_ENCODING = 'utf8'
// 435bdf602510013e225b05b790a71b9e104d4358a6f8531cf7757ac8101c04a3
/**
 * 
 * @typedef  {{path?:string, encoding?:string, debug?:boolean}} envVarOptions
 */

/**
 *  Load the passed JSON file synchronously and set up environment vars
 *  NOTE: it's important to do this synchronously so that subsequent 
 *  code can rely on the environment variables existing.
 * @param {envVarOptions=} options 
 * @returns {{status:boolean, messages?:string[], error?:object}}
 */
const load = (options) => {
  const {jsonPath, encoding} = parseOptions(options)
  try {
    const envString = fs.readFileSync(jsonPath, encoding)
    const envJson = JSON.parse(envString)
    const messages = setEnvVars(envJson)
    const debugMessages = ['>>>debug mode<<<', ...messages]
    return {status: true, messages: debugMessages}
  } catch (err) {
    return {status: false, error: err}
  }
}

/**
 * Read each top level key in the passed Json object and if
 * a process environment variable with that key name doesn't exist
 * create the environment variable with the contents of the passed object's
 * key value. 
 * @param {Object} envJson 
 * @returns array of messages (suitable for debugging)
 */
const setEnvVars = (envJson) => {
  const msg = []
  for (const key in envJson) {
    if (!Object.defineProperty.hasOwnProperty.call(process.env, key)) {
      process.env[key] = JSON.stringify(envJson[key])
      msg.push(`>>>Creating ${key}`)
    } else {
      msg.push(`"${key}" is already defined in \`process.env\` and will not be overwritten`)
    }
  }
  return msg
}
/**
 * Parse the options object and set up defaults for any optional properties
 * that aren't explicitly set
 * @param {envVarOptions} options 
 */
const parseOptions = (options) => {
  const jsonPath = (options && options.path) || getDefaultPath()
  const encoding = (options && options.encoding) || DEFAULT_ENCODING
  return {jsonPath, encoding}
}

/**  When no path is passed used the project's folder and file named DEFAULT_ENV_FILENAME
 */
const getDefaultPath = () => path.resolve(process.cwd(), DEFAULT_ENV_FILENAME)

module.exports = {
  load,
  DEFAULT_ENV_FILENAME,
  DEFAULT_ENCODING,
}
