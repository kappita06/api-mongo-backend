const express = require('express');
const router = express.Router();
const Client = require('../models/Cliente')

//listar Clientes
router.get('/', async (req,res) => {
    try{
       const list = await Client.find();
       res.json(list);
    }catch(e){
        res.status(500).json({ error: e.message });
    }
});

// POST - Crear una nueva Cliente
router.post('/', async (req, res) => {
    try {
        const nuevoCliente = new Client(req.body);
        await nuevoCliente.save();
        res.status(201).json(nuevoCliente);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// PUT - Actualizar una Cliente completa
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Client.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, overwrite: true, runValidators: true }
        );
        res.status(200).json(actualizado);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// PATCH - Actualizar parcialmente un Cliente
router.patch('/:id', async (req, res) => {
    try{
        const actualizado =  await Client.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );
        res.status(200).json(actualizado);
    } catch(e){
        res.status(500).json({ error: e.message });
    }
});

// DELETE - Eliminar un Cliente
router.delete('/:id', async (req, res) => {
    try{
        const eliminado = await Client.findByIdAndDelete(req.params.id);
        res.status(200).json(eliminado);
    }catch(e){
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;