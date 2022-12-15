const chatForm = document.getElementById("chatForm")
const chatHistory = document.getElementById("chatHistory")
const output = document.getElementById("output")

const chatMessageTemplate = '<div>'
  + '<span class="fw-bold text-primary">#sender#</span>'
  + '<span class="text-brown">[#timestamp#]</span>:'
  + '<span class="text-success fst-italic"> #message# </span></div>'

socket.emit('chatConnection')


chatForm.addEventListener('submit', (e) => {
  e.preventDefault()

  output.innerHTML = ""
  const sender = {
    email: e.target.email.value,
    nombre: e.target.nombre.value,
    apellido: e.target.apellido.value,
    edad: e.target.edad.value, 
    alias: e.target.alias.value, 
    avatar: e.target.avatar.value
  }
  const mensaje = { sender: sender, text: e.target.chatMessage.value }

  if (isValidMessage(mensaje)) {
    socket.emit("sentMessage", mensaje)
  } else {
    output.innerHTML = "Debe ingresar datos validos en todos los campos"
  }

})

socket.on('newMessage', (data) => {

  data.forEach(message => {
    let chatMessage = chatMessageTemplate
    chatMessage = chatMessage.replace('#sender#', message.sender.email)
    chatMessage = chatMessage.replace('#timestamp#', message.timeStamp)
    chatMessage = chatMessage.replace('#message#', message.text)
    chatHistory.insertBefore(CreateHTMLElementFrom(chatMessage), chatHistory.firstChild);
  });

})


function isValidMessage(message) {
  if (!(message.sender.nombre && message.sender.apellido && message.sender.edad && message.sender.alias && message.sender.avatar && message.sender.email)) return false
  if (!validator.isEmail(message.sender.email)) return false
  if (!message.text.length > 0) return false

  return true
}

