GET: /api/productos/ - Devuelve todos los productos disponibles
GET: /api/productos/:id - Devuelve el producto con el id provisto
POST: /api/productos - Crea un producto nuevo, se debe enviar un JSON con el formato:
	{
		"nombre": string,
		"descripcion":string,
		"codigo"?:string,
		"foto"?:string,
		"precio"?:number,
		"stock"?:number
	}
PUT: /api/productos/:id - Actualiza un producto, se debe enviar un JSON con el formato mencionado anteriormente

POST: /api/carrito - Crea un nuevo carrito y devuelve el ID
DELETE: /api/carrito/:id - Elimina el carrito con el id provisto
GET: /api/carrito/:id - Devuelve todos los productos incluidos en el carrito con el id provisto
POST: /api/carrito/:id/productos/:id_prod - Agrega el producto con id=id_prod al carrito con id=id
DELETE:  /api/carrito/:id/productos/:id_prod - Elimina el producto con id=id_prod del carrito con id=id