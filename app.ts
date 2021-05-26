import dotenv from 'dotenv';
import Server from './models/server.model';

//configurar dotEnv
dotenv.config();

const server = new Server();

server.listen();