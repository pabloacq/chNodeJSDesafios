var moment = require('moment')
const { performance } = require('perf_hooks');

class Utils{
    static generateRandomInteger(max, min=0) {
        return Math.floor(Math.random() * (max-min+1)) + min;
    }  

    static addTimeStamp(object){
      return {...object, timeStamp: moment().format("DD/MM/YYYY HH:mm:ss")}
    }

    static timeIt(callback, name=undefined)
    {
        const t0 = performance.now()
        const a = callback()
        console.log(`Function ${name || callback.name} took ${(performance.now()-t0).toFixed(2)} ms. ` )
        return a
    }
}

module.exports = Utils






