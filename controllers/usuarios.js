const { response } = require("express");
const Usuarios = require('../models/usuarios.js');

const usuariosGet = async (req, res = response) => {
    try {
        const usuarios = await Usuarios.find();
        res.json({
            ok: true,
            usuarios
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener usuarios de la base de datos'
        });
    }
};

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { nombre, correo } = req.body;

    try {
        const usuario = await Usuarios.findByIdAndUpdate(id, { nombre, correo }, { new: true });

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        res.json({
            ok: true,
            msg: 'Usuario actualizado exitosamente',
            usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el usuario'
        });
    }
};

const usuariosPost = async (req, res = response) => {
    const { nombre, correo, password } = req.body;

    try {
        const nuevoUsuario = new Usuario({
            nombre,
            correo,
            password,
            rol: 'USER_ROL' 
        });

        await nuevoUsuario.save();

        res.json({
            ok: true,
            msg: 'Usuario creado exitosamente',
            usuario: nuevoUsuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el usuario en la base de datos'
        });
    }
};

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    try {
        const usuario = await Usuarios.findByIdAndDelete(id);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        res.json({
            ok: true,
            msg: 'Usuario eliminado exitosamente',
            usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el usuario'
        });
    }
};

const usuariosPatch = async (req, res = response) => {
    const { id } = req.params;
    const { nombre, email } = req.body;

    try {
        const usuario = await Usuarios.findByIdAndUpdate(id, { nombre, email }, { new: true });

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        res.json({
            ok: true,
            msg: 'Usuario actualizado parcialmente exitosamente',
            usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar parcialmente el usuario'
        });
    }
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
};
