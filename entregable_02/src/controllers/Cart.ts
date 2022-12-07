import { iCart } from '../daos/schemas/Cart'
import { daoCart as CartRepo } from '../daos'


const cartRepo = new CartRepo();

export async function save(cart: iCart = {}): Promise<string> {
  let prodID = "";
  cart.timestamp = Date.now()
  prodID = await cartRepo.save(cart);
  return prodID;
}

export async function getByID(id: string): Promise<iCart> {
  console.debug(`Cart.getByID with id ${id}`)
  return await cartRepo.getByID(id);
}

export async function getAll() {
  return await cartRepo.getAll();
}

export async function update(cart: iCart) {
  console.log("Cart.update")
  return await cartRepo.update(cart);
}

export async function deleteAll() {
  await cartRepo.deleteAll();
}

export async function deleteByID(id: string) {
  return await cartRepo.deleteByID(id);
}

export async function addItemToCart(itemID: string, cartID: string, itemController: any) {
  console.debug(`addItemToCart: Adding item ${itemID} to cart ${cartID}`)
  const cart = await getByID(cartID)
  const item = await itemController.getByID(itemID)


  if (!cart) throw { status: 422, message: "Cart not found" }
  if (!item) throw { status: 422, message: "Item not found" }

  const newCart: iCart = { _id: cart._id, products: cart.products || [] }
  if (newCart.products != undefined) {
    newCart.products.push({ id: itemID, timestamp: Date.now() });
  }



  console.log(typeof newCart)
  console.log(newCart.constructor.name)
  console.debug(`New cart products ${JSON.stringify(newCart.products)}`)
  console.debug(`New cart ${JSON.stringify(newCart)}`)

  const updatedCard = await update(newCart);
  return
}

export async function getItemsFromCart(cartID: string, itemController: any): Promise<Array<any>> {
  console.log("Function: GetItemsFromCart")
  const cart = await getByID(cartID);

  if (!cart) throw { status: 422, message: "Cart not found" }

  console.log(`cart.products ${JSON.stringify(cart.products)}`)
  if (!cart.products) return []

  const items: Array<any> = []

  for (const element of cart.products) {
    const item = await itemController.getByID(element.id)
    items.push(item)
  }

  console.log(`Items to be returned ${JSON.stringify(items)}`)
  return items
}

export async function deleteItemFromCart(itemID: string, cartID: string) {
  const cart = await getByID(cartID);

  if (!cart) throw { status: 422, message: "Cart not found" }

  console.log(`Productos: ${cart.products?.length}`)
  console.debug(`Deleting item with ID ${itemID} from cart ${cartID} with products ${JSON.stringify(cart.products)}`)
  if (!cart.products || cart.products.length === 0) throw { status: 422, message: "Item not in cart" }

  try {
    const oldProductQ = cart.products.length
    const itemIndex = cart.products.findIndex(element => element.id == itemID)
    console.log(itemIndex)
    if (itemIndex < 0) throw { status: 422, message: "Item not in cart" }
    const res = cart.products.splice(itemIndex, 1)
    await update(cart)
    console.debug(`Product removed old products: ${oldProductQ}, current products ${cart.products.length}`)
    return res
  } catch (error) {
    console.error(JSON.stringify(error))
    throw error
  }



}