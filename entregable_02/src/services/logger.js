//  Dependencies
//  - dotenv (optional)
//  - winston
//
//  log_config env variable (must install dotenv) = Config file name, it must be on the same folder as this library - Default logconf.js
//
//  Config variables:
//  logLevel = Log Level ('info', 'debug', 'error', 'warn', 'silly', etc.), default value: info
//  consoleLogDefault = level for console.log, console.log will be replaced by this level, default value: info
//  logFiles = Array of {filename: "error.log", level: "error"}, default: [] if no values are provided no files will be used for logging
//  timestampFormat = default: "DD-MM-YY hh:mm:ss" 
//  levelToUpperCase = default: true
//  format = output format using timestamp, level and message, default: "timestamp | level | message"
//
//

const winston = require('winston');

const logConfigFile = process.env.log_config || 'logconf.js'
let logConfig

try {
  logConfig = require(`./${logConfigFile}`)
}
catch (error) {
  logConfig = {}
}

const logLevel = logConfig.logLevel || "info"
const consoleLogDefault = logConfig.logDefault || "info"
const transports = getTransports(logConfig)

const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: transports,
});
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    "prettyPrint": true,
    "format": customFmt(true),
    level: logLevel,
  }));
}

//
// Custom formatter
//
function customFmt(colorize) {
  const upperCase = logConfig.levelToUpperCase || true
  const format = logConfig.format || "timestamp | level | message"
  const pre = winston.format.combine(
    winston.format(info => {
      info.level = upperCase ? info.level.toUpperCase() : info.level
      
      info.message = typeof info.message =='string' ? info.message : JSON.stringify(info.message)
      return info;
    })(),
    colorize && process.env.NODE_ENV !== 'production' ? winston.format.colorize() : winston.format(info => info)(),
    winston.format.timestamp({ format: logConfig.timestampFormat || "DD-MM-YY hh:mm:ss" }),
    winston.format.printf(info => { 
      let fmt = format
      fmt = fmt.replace("timestamp", info.timestamp)
      fmt = fmt.replace("level", info.level)
      fmt = fmt.replace("message", info.message)
      return fmt
    }),
  )
  return pre
}

//
//  The actual log function
//
function log(message, level) {

  if (logger.levels[level] || logger.levels[level] == 0) {
    logger.log({ message: message, level: level })
  }
  else {
    console.log(JSON.stringify(logger.levels))
    console.log(level)
    logger.info(message)
  }

}

//
//  Replace console.log() with this logger
//
function config() {
  global.console.log = (message, level = consoleLogDefault) => log(message, level.toLowerCase())
  global.console.error = (message) => log(message, "error")
  global.console.debug = (message) => log(message, "debug")
  global.console.info = (message) => log(message, "info")
  global.console.warn = (message) => log(message, "warn")

  console.debug("Logger configuration loaded")
}


function getTransports(config) {
  const transports = []
  for (const transport of config.logFiles || []) {
    transport.format = customFmt(false)
    transports.push(new winston.transports.File(transport))
  }

  return transports
}

module.exports.config = config
module.exports.log = log