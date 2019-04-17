const fs = require('fs')
const path = require('path')

const DEFAULT_ENV_FILENAME = '.env.json'
const DEFAULT_ENCODING = 'utf8'
/**
 * 
 * @typedef  {{path?:string, encoding?:string, debug?:boolean}} envVarOptions
 */

/**
 *  Load the passed JSON file synchronously and set up environment vars
 *  NOTE: it's important to do this synchronously so that subsequent 
 *  code can rely on the environment variables existing.
 * @param {envVarOptions} options 
 */
const load = (options) => {
  const {jsonPath, encoding, debug} = parseOptions(options)

  try {
    const envString = fs.readFileSync(jsonPath, encoding)

    const envJson = JSON.parse(envString)
    for (const key in envJson) {
      if (!Object.defineProperty.hasOwnProperty.call(process.env, key)) {
        process.env[key] = JSON.stringify(envJson[key])
        if (debug) {console.log(`>>>Creating ${key}`)}
      } else if (debug) {
        console.log(`"${key}" is already defined in \`process.env\` and will not be overwritten`)
      }
    }
    return ({status: true})
  } catch (err) {
    return {status: false, error: err}
  }
}

/**
 * Parse the options and set up defaults for any optional properties
 * that aren't specified
 * @param {envVarOptions} options 
 */
const parseOptions = (options) => {
  let jsonPath = (options && options.path) || getDefaultPath()
  if (jsonPath.length < 1) {jsonPath = getDefaultPath()}
  const encoding = (options && options.encoding) || DEFAULT_ENCODING
  const debug = Boolean(options && options.debug)
  if (debug) {console.log('>>>debug mode<<<')}
  return {jsonPath, encoding, debug}
}

/**  When no path is passed used the project's folder and file named DEFAULT_ENV_FILENAME
 */
const getDefaultPath = () => path.resolve(process.cwd(), DEFAULT_ENV_FILENAME)

module.exports = {
  load,
  DEFAULT_ENV_FILENAME,
  DEFAULT_ENCODING,
}
