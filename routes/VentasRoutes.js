const express = require('express');
const router = express.Router();
const Vent = require('../models/Venta')

//listar Ventas
router.get('/', async (req,res) => {
    try{
       const list = await Vent.find();
       res.json(list);
    }catch(e){
        res.status(500).json({ error: e.message });
    }
});

// POST - Crear una nueva Venta
router.post('/', async (req, res) => {
    try {
        const nuevaVenta = new Vent(req.body);
        await nuevaVenta.save();
        res.status(201).json(nuevaVenta);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// PUT - Actualizar una Venta completa
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Vent.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, overwrite: true, runValidators: true }
        );
        res.status(200).json(actualizado);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// PATCH - Actualizar parcialmente una Venta
router.patch('/:id', async (req, res) => {
    try{
        const actualizado =  await Vent.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );
        res.status(200).json(actualizado);
    } catch(e){
        res.status(500).json({ error: e.message });
    }
});

// DELETE - Eliminar una Venta
router.delete('/:id', async (req, res) => {
    try{
        const eliminado = await Vent.findByIdAndDelete(req.params.id);
        res.status(200).json(eliminado);
    }catch(e){
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;