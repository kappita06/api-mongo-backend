const express = require('express');
const router = express.Router();
const Product = require('../models/Producto');


//listar Productos
router.get('/', async (req,res) => {
    try{
       const list = await Product.find();
       res.json(list);
    }catch(e){
        res.status(500).json({ error: e.message });
    }
});

// POST - Crear una nuevo Producto
router.post('/', async (req,res)=>{

    try{
        const prod = await new Product({
            nombre:             req.body.nombre,
            precio:             req.body.precio,
            categoria_id:       req.body.categoria_id,
            stock:              req.body.stock,
            caracteristicas:    req.body.caracteristicas   
        }).save();
        res.status(201).json(prod);
    }catch (e){
        res.status(400).json({error: e.message});
    }
});

// PUT - Actualizar una Producto completa
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, overwrite: true, runValidators: true }
        );
        res.status(200).json(actualizado);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// PATCH - Actualizar parcialmente un producto
router.patch('/:id', async (req, res) => {
    try{
        const actualizado =  await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );
        res.status(200).json(actualizado);
    } catch(e){
        res.status(500).json({ error: e.message });
    }
});

// DELETE - Eliminar un producto
router.delete('/:id', async (req, res) => {
    try{
        const eliminado = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json(eliminado);
    }catch(e){
        res.status(500).json({ error: e.message });
    }
});


module.exports = router;