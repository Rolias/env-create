const fs = require('fs')
const path = require('path')

const DEFAULT_ENV_FILENAME = '.env.json'
const DEFAULT_ENCODING = 'utf8'

/**
 *  Load the passed JSON file synchronously and set up environment vars
 *  NOTE: it's important to do this synchronously so that subsequent 
 *  code can rely on the environment variables existing.
 * @param {Object<path, encoding>} options 
 */
const load = (options) => {
  const debug = Boolean(options && options.debug)
  let jsonPath = (options && options.path) || getDefaultPath()
  const encoding = (options && options.encoding) || DEFAULT_ENCODING

  if (jsonPath.length < 1) {jsonPath = getDefaultPath()}

  if (debug) {console.log('>>>debug mode<<<')}

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

const getDefaultPath = () => path.resolve(process.cwd(), DEFAULT_ENV_FILENAME)

module.exports = {
  load,
  DEFAULT_ENV_FILENAME,
  DEFAULT_ENCODING,
}
