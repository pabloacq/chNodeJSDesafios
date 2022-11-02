const socket = io.connect();

const productTableHeader ='<div class="row flex-row border-bottom border-secondary">'
                         +  '<div class="col-1"><span>ID</span></div>'
                         +  '<div class="col-8"><span>Title</span></div>'
                         +  '<div class="col-1"><span>Price</span></div>'
                         +  '<div class="col-1"><span>Thumbnail</span></div>'
                         + '</div>'

const productRow = '<div class="row flex-row border-bottom border-secondary">'
                 + '  <div class="col-1"><span>#id#</span></div>'
                 + '  <div class="col-8"><span>#title#</span></div>'
                 + '  <div class="col-1"><span>#price#</span></div>'
                 + '    <div class="col-1 d-flex align-items-center"><img class="thumbnail" src="#thumbnail#" /></div>'
                 + '</div>'

const form = document.getElementById("formProducto")




socket.on('envioDataDeProductos', (data) => {
  const productsTable = document.getElementById("productsTable")

  if (productsTable.childElementCount < 1) {
    productsTable.appendChild(CreateHTMLElementFrom(productTableHeader))
  }

  data.productos.forEach(producto => {
    let productHTML = productRow
    productHTML = productHTML.replace("#id#", producto.id)
    productHTML = productHTML.replace("#title#", producto.title)
    productHTML = productHTML.replace("#price#", producto.price)
    productHTML =productHTML.replace("#thumbnail#", producto.thumbnail)
    productsTable.appendChild(CreateHTMLElementFrom(productHTML))
  });
  
})

function CreateHTMLElementFrom(HTMLString){
  const template = document.createElement('template');
    template.innerHTML = HTMLString;
    return template.content.firstChild
}


form.addEventListener('submit', async (e) =>  {
  e.preventDefault()
  url = e.target.action

  const formData  = new FormData(e.target);


 await fetch(url, {
    method: 'POST',
    body: formData
  })
  socket.emit("productAdded")
})