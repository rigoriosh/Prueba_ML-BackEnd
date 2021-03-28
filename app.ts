import dotenv from "dotenv";
import Servidor from "./models/server";

dotenv.config();


const servidor = new Servidor();

servidor.listen();