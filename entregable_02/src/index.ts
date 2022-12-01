console.clear()
require('dotenv').config()
require('./services/logger').config()
console.info("Starting...")
console.info(`Usando ${process.env.DB} como base de datos`)

import { HTTPServer } from "./services/server";
import { AddressInfo } from "net";
const PORT = 8080;

const appServer = HTTPServer.listen(PORT, () => {
  const addressInfo = appServer.address() as AddressInfo;
  console.info(`Servidor http escuchando en el puerto ${addressInfo.port}`);
});

appServer.on("error", (error) => console.log(`Error en el servidor ${error}`));
