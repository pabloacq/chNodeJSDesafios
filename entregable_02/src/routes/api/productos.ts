import * as productController from "../../controllers/Producto";
import { Request, Response, NextFunction} from "express";
import express from "express";

const rutaProductos = express.Router();
const administrador = true

function preventNonAdmin(req: Request, res: Response, next: NextFunction ){
  if (administrador) {
    next()
  }
  else{
    console.log(req.route)
    res.status(401).send({error: -1, descripcion: `Ruta ${req.baseUrl} metodo ${req.method} no autorizada`}) 
  }
}

rutaProductos.get("/:id?", async (req: Request, res: Response) => {
  let resData = {};
  let status = 200
  if (req.params.id) {
    resData = await productController.getByID(req.params.id);
    if(!resData) {
      resData = {mensaje:"Producto no encontrado"}
      status = 404
    } 
  } else {
    resData = await productController.getAll();
  }

  res.status(status).json(resData);
});

rutaProductos.post("/",preventNonAdmin, async (req, res) => {
  console.debug(`Post:Productos(/) ${JSON.stringify(req.body)}`)
 
  try {
    const newID = await productController.save(req.body);
    res.status(200).json({ newProductID: newID });
  } catch (error: any) {
    console.error(JSON.stringify(error))
    res.status(error.status || 500).send(error);
  }
});

rutaProductos.put("/:id",preventNonAdmin, async (req, res) => {
  console.debug(`Put:Productos(/:id) ${JSON.stringify(req.body)}`)
  try {
    req.body._id = req.params.id;
    const productoReturn = await productController.update(req.body);
    res.send(productoReturn);
  } catch (error: any) {
    console.error(error)
    res.status(error.status || 500).send(error);
  }
});

rutaProductos.delete("/:id",preventNonAdmin, async (req, res) => {
  try {
    const ID = req.params.id;
    const product = await productController.deleteByID(ID);
    res.json(product);
  } catch (error: any) {
    res.status(error.status || 500).send(error);
  }
});

export default rutaProductos;
