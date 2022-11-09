import { CartRepo, iCart } from "../models/Cart";

const cartRepo = new CartRepo();

export async function save(cart: iCart = {}): Promise<string> {
  let prodID = "";
  cart.timestamp = Date.now()
  prodID = await cartRepo.save(cart);
  return prodID;
}

export async function getByID(id: string): Promise<iCart> {
  return await cartRepo.getByID(id);
}

export async function getAll() {
  return await cartRepo.getAll();
}

export async function update(cart: iCart) {
  return await cartRepo.update(cart);
}

export async function deleteAll() {
  await cartRepo.deleteAll();
}

export async function deleteByID(id: string) {
  return await cartRepo.deleteByID(id);
}

export async function addItemToCart(itemID: string, cartID: string, itemController: any){
  const cart = await getByID(cartID);
  const item = await itemController.getByID(itemID)

  if (!cart) throw {status:422, message: "Cart not found"}
  if (!item) throw {status:422, message: "Item not found"}
  
  cart.products || (cart.products = []);
  cart.products.push({id: itemID, timestamp: Date.now()});
  const updatedCard = await update(cart);
  return
}

export async function getItemsFromCart(cartID: string, itemController: any): Promise<Array<any>>{
  
  const cart = await getByID(cartID);

  if (!cart) throw {status:422, message: "Cart not found"}
  
  if (!cart.products) return []

  const items: Array<any> = []

  for (const element of cart.products){
    const item = await itemController.getByID(element.id)
    console.log(element)
    items.push(item)
  }

  return items
}

export async function deleteItemFromCart(itemID: string, cartID: string){
  const cart = await getByID(cartID);

  if (!cart) throw {status:422, message: "Cart not found"}
  if (!cart.products || cart.products.length === 0) throw {status:422, message: "Item not in cart"}

  const itemIndex = cart.products.findIndex(element => element.id == itemID)

  if (itemIndex < 0) throw {status:422, message: "Item not in cart"}

  const res = cart.products.splice(itemIndex,1)
  await update(cart)
  return res
}