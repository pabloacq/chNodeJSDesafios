var moment = require('moment')

class Utils{
    static generateRandomInteger(max, min=0) {
        return Math.floor(Math.random() * (max-min+1)) + min;
    }  

    static addTimeStamp(object){
      return {...object, timeStamp: moment().format("DD/MM/YYYY HH:mm:ss")}
    }
}

module.exports = Utils