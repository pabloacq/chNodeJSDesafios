const env = process.env.NODE_ENV
const config = {
    logLevel:"info",
    logDefault: "silly",
    errorLogFile: true,
    // logFiles: [
    //     // {filename: "error.log", level: "error"},
    //     // {filename: "debug.log", level: "debug"},
    //     // {filename: "combined.log"}
    // ],
    timestampFormat: "DD-MM-YY HH:mm:ss",
    levelToUpperCase: true,
    format: "timestamp | level | message"
}

module.exports = config