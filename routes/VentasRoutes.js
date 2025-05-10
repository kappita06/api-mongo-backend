const express = require('express');
const router = express.Router();
const Vent = require('../models/Venta')

//listar Ventas
router.get('/', async (req, res) => {
    try {
        const userAgent = req.headers['user-agent'];
        let ventass;

        if (userAgent && userAgent.includes('Postman')) {
            ventass = await Vent.find({}, { _id: 0, cliente_id: 0, producto_id: 0, fecha: 0 });
        } else {
            ventass = await Vent.find();
        }

        res.json(ventass);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener productos');
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