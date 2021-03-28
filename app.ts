import dotenv from "dotenv"; /* Para administrar las variables de entorno */
import Servidor from "./models/server"; /* importa la lógica del servidor */

dotenv.config(); /* ser la configuracion del dotenv */


const servidor = new Servidor(); /* instancia del Servidor */

servidor.listen(); /*  llama al metodo listen del servidor */