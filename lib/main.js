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
 */
const load = (options) => {
  const {jsonPath, encoding, debug} = parseOptions(options)
  if (debug) {console.log('>>>debug mode<<<')}
  try {
    const envString = fs.readFileSync(jsonPath, encoding)

    const envJson = JSON.parse(envString)
    const debugMsg = setEnvVars(envJson)
    if (debug) {
      logDebugMsg(debugMsg)
    }
    return {status: true}
  } catch (err) {
    return {status: false, error: err}
  }
}

const setEnvVars = (envJson) => {
  const debugMsg = []
  for (const key in envJson) {
    if (!Object.defineProperty.hasOwnProperty.call(process.env, key)) {
      process.env[key] = JSON.stringify(envJson[key])
      debugMsg.push(`>>>Creating ${key}`)
    } else {
      debugMsg.push(`"${key}" is already defined in \`process.env\` and will not be overwritten`)
    }
  }
  return debugMsg
}
/**
 * Parse the options and set up defaults for any optional properties
 * that aren't specified
 * @param {envVarOptions} options 
 */
const parseOptions = (options) => {
  const jsonPath = (options && options.path) || getDefaultPath()
  const encoding = (options && options.encoding) || DEFAULT_ENCODING
  const debug = Boolean(options && options.debug)

  return {jsonPath, encoding, debug}
}

const logDebugMsg = (debugMsgArray) => {
  for (const msg of debugMsgArray) {
    console.log(msg)
  }
}
/**  When no path is passed used the project's folder and file named DEFAULT_ENV_FILENAME
 */
const getDefaultPath = () => path.resolve(process.cwd(), DEFAULT_ENV_FILENAME)

module.exports = {
  load,
  DEFAULT_ENV_FILENAME,
  DEFAULT_ENCODING,
}
