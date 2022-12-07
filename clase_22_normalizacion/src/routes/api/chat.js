const Chat = require('../../Chat')
const express = require('express')
const {normalize, schema} = require('normalizr')
const { denormalize } = require('normalizr')

const rutaChat = express.Router()



rutaChat.get('/raw', async (req, res) => {
  res.json(await Chat.getAllMessages())
})

rutaChat.get('/normalizado', async (req, res) => {

    res.json(await normalizeMessages())
  })

rutaChat.get('/desnormalizado', async(req,res)=>{
    const normalized = await normalizeMessages()
    const denormalized = await denormalize(normalized.result,chatSchema(),normalized.entities )
    res.json(denormalized)
})

async function normalizeMessages(){
    data = await Chat.getAllMessages()
    return normalize(data,chatSchema())
}

function chatSchema(){
    const user = new schema.Entity('user', {}, {idAttribute: 'email'})
    const message = new schema.Entity('message', {sender:user})
    return finalSchema = [message]
}


module.exports = rutaChat