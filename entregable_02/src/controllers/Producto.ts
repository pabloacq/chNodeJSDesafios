import {iProduct } from "../daos/schemas/Product";
import {daoProducto as ProductRepo} from '../daos'

const productRepo = new ProductRepo();

export async function save(producto: iProduct): Promise<string> {
  let prodID = "";
  prodID = await productRepo.save(producto);
  return prodID;
}

export async function getByID(id: string): Promise<iProduct> {
  console.debug(`Producto.getByID with id ${id}`)
  return await productRepo.getByID(id);
}

export async function getAll() {
  return await productRepo.getAll();
}

export async function update(producto: iProduct) {
  return await productRepo.update(producto);
}

export async function deleteAll() {
  await productRepo.deleteAll();
}

export async function deleteByID(id: string) {
  return await productRepo.deleteByID(id);
}
