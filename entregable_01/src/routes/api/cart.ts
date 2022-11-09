import * as cartController from "../../controllers/Cart";
import * as productController from "../../controllers/Producto"
import { Request, Response } from "express";
import express from "express";

const rutaCart = express.Router();

rutaCart.post("/", async (req, res) => {
  try {
    const newID = await cartController.save(req.body);
    res.status(200).json({ newCartID: newID });
  } catch (error: any) {
    console.log(error)
    res.status(error.status || 500).send(error);
  }
});

rutaCart.post("/:id/productos/:id_prod", async (req, res) => {
  try {
    await cartController.addItemToCart(req.params.id_prod, req.params.id, productController)
    res.status(200).send()
  } catch (error: any) {
    res.status(error.status || 500).send(error);
  }
});

rutaCart.get("/:id/productos", async (req, res) => {
  try {
    console.log("trying....")
    const productos = await cartController.getItemsFromCart(req.params.id, productController)
    console.log(productos);
    
    res.status(200).send(productos)
  } catch (error: any) {
    res.status(error.status || 500).send(error);
  }
});

rutaCart.delete("/:id", async (req, res) => {
  try {
    const ID = req.params.id;
    const product = await cartController.deleteByID(ID);
    res.json(product);
  } catch (error: any) {
    res.status(error.status || 500).send(error);
  }
});

rutaCart.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
    const cartID = req.params.id;
    const prodID = req.params.id_prod
    const product = await cartController.deleteItemFromCart(prodID, cartID);
    res.json(product);
  } catch (error: any) {
    res.status(error.status || 500).send(error);
  }
});

export default rutaCart;
