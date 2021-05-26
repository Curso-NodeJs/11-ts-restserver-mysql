import { Request, Response } from "express";
import Usuario from '../models/usuario.model';


export const getUsuarios = async(req: Request, res: Response)=>{
    
    const usuarios = await Usuario.findAll();
    
    res.json({
        ok: true,
        usuarios
    })
}

export const getUsuario = async(req: Request, res: Response)=>{
    
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (usuario){
        return res.json({
            ok: true,
            usuario
        })
    } else {
        return res.status(404).json({
            ok: false,
            msg: `No existe un usuario por id: ${id}`
        })
    }
    
}

export const postUsuario = async(req: Request, res: Response)=>{
    
    const { body } = req;
    try {
        
        const existeEmail = await Usuario.findOne({
            where:{
                email: body.email
            }
        });
        
        if (existeEmail){
            return res.status(400).json({
                ok: false,
                msg: `Ya existe un usuario con el email: ${ body.email }`
            })
        }
        
        const usuario = new Usuario(body);
        await usuario.save();
        
        return res.json({
            ok: true,
            usuario
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        })
    }
    
}

export const putUsuario = async(req: Request, res: Response)=>{
    
    const { id } = req.params;
    const { body } = req;
    
    try {
        
        const usuario = await Usuario.findByPk(id);
        if (!usuario){
            return res.status(404).json({
                ok: false,
                msg: `No existe un usuario con el id: ${ id }`
            });
        }
        
        await usuario.update(body);
        return res.json({
            ok: true,
            usuario
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        })
    }
}


export const deleteUsuario = async(req: Request, res: Response)=>{
    
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
        if (!usuario){
            return res.status(404).json({
                ok: false,
                msg: `No existe un usuario con el id: ${ id }`
            });
        }
        
        // eliminacion fisica
        // await usuario.destroy();
        
        // eliminación logica (se pasa el estado a false para indicar desactivado)
        await usuario.update({ estado:false });
        
    res.json({
        ok: true,
        msg: 'usuario borrado',
        usuario
    })
}