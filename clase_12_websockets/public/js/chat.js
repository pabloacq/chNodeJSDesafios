const chatForm = document.getElementById("chatForm")
const chatHistory = document.getElementById("chatHistory")
const output = document.getElementById("output")

const chatMessageTemplate = '<div>'
                            + '<span class="fw-bold text-primary">#sender#</span>'
                            + '<span class="text-brown">[#timestamp#]</span>:'
                            + '<span class="text-success fst-italic"> #message# </span></div>'

socket.emit('chatConnection')


chatForm.addEventListener('submit', (e) =>{
  e.preventDefault()

  output.innerHTML = ""
  const mensaje = {sender: e.target.email.value, text: e.target.chatMessage.value}

  if (isValidMessage(mensaje)){
    socket.emit("sentMessage", mensaje)
  }else{
    output.innerHTML = "Ingrese un email y un mensaje validos"
  }
  
})

socket.on('newMessage', (data) => {

  data.forEach(message => {
    let chatMessage = chatMessageTemplate
    chatMessage = chatMessage.replace('#sender#', message.sender)
    
    chatMessage = chatMessage.replace('#timestamp#', message.timeStamp)
    chatMessage = chatMessage.replace('#message#', message.text)
    chatHistory.insertBefore(CreateHTMLElementFrom(chatMessage), chatHistory.firstChild);
  });
  
})


function isValidMessage(message){
  if (!validator.isEmail(message.sender)) return false
  if (!message.text.length > 0) return false
  return true
}

