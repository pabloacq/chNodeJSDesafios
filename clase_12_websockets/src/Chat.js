const Contenedor = require('./Contenedor')
var validator = require('validator');


const contendorChat = new Contenedor(__dirname+'/DB/mensajes.json')

function getAllMessages(){
  return contendorChat.getAll()
}

function saveMessage(message){
  if (!isMessageValid(message)) return false
  return contendorChat.save(message)
}


function isMessageValid(message){
  if(!validator.isEmail(message.sender)) return false
  if(message.text.length <1) return false
  return true
}

module.exports = {saveMessage, getAllMessages}