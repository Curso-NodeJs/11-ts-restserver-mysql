import express, { Application } from 'express';
import userRoutes from '../routes/usuario.route';
import cors from 'cors';
import db from '../db/connection';

class Server {
    private app:Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        
    }
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        
        // instanciar base de datos
        this.dbConnection();
        
        // Definir middlewares
        this.middlewares();
        
        // Definir rutas
        this.routes();
    }
    
    // conectar base de datos
    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Database Online');
        } catch (error) {
            throw new Error(error);
        }
    }
    
    middlewares(){
        //CORS
        this.app.use( cors({
            
        }) );
        // Lectura el body
        this.app.use( express.json() );
        
        // Carpeta publica
        this.app.use( express.static('public'));
    }
    
    routes(){
        this.app.use( this.apiPaths.usuarios, userRoutes );
    }
    
    listen(){
        this.app.listen(this.port, ()=>{
           console.log('Servidor corriendo en el puerto',this.port); 
        });
    }
}

export default Server;