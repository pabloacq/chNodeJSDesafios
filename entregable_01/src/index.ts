import { HTTPServer } from "./services/server";
import { AddressInfo } from "net";
const PORT = 8080;

const appServer = HTTPServer.listen(PORT, () => {
  const addressInfo = appServer.address() as AddressInfo;
  console.log(`Servidor http escuchando en el puerto ${addressInfo.port}`);
});

appServer.on("error", (error) => console.log(`Error en el servidor ${error}`));

console.log(appServer.rawListeners('get'))