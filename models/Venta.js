const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const ventaSchema = new Schema({
    cliente_id: { 
        type: Types.ObjectId, 
        ref: 'Cliente',  
        required: true 
    },
    producto_id: { 
        type: Types.ObjectId, 
        ref: 'Producto',
        required: true
    },
    tipo_documento: { 
        type: String, 
        enum: ['factura', 'boleta'], 
        required: true
    },
    num_serie: { 
        type: String, 
        required: true 
    },
    cantidad: { 
        type: Number, 
        required: true 
    },
    precio: { 
        type: Number, 
        required: true 
    },
    total: { 
        type: Number, 
        required: true 
    },
    fecha: { 
        type: Date, 
        default: Date.now  
    }
}, {
    timestamps: {createdAt: 'fecha', updatedAt: false}
});

module.exports = mongoose.model('Venta', ventaSchema);
