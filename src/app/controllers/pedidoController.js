const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Pedido
const createPedido = async (req, res) => {
  try {
    const { clienteId, items, total, direccionEnvio, metodoPago } = req.body;
    
    const pedido = await prisma.pedido.create({
      data: {
        clienteId: parseInt(clienteId),
        total: parseFloat(total),
        direccionEnvio,
        metodoPago,
        items: {
          create: items.map(item => ({
            cantidad: parseInt(item.cantidad),
            precioUnitario: parseFloat(item.precioUnitario),
            celularId: parseInt(item.celularId)
          }))
        }
      },
      include: { items: true, cliente: true }
    });
    
    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Pedidos
const getAllPedidos = async (req, res) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      include: { cliente: true, items: { include: { celular: true } } }
    });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Pedido by ID
const getPedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await prisma.pedido.findUnique({
      where: { id: parseInt(id) },
      include: { 
        cliente: true, 
        items: { 
          include: { 
            celular: { include: { marca: true } } 
          } 
        } 
      }
    });
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Pedido (estado principalmente)
const updatePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const pedido = await prisma.pedido.update({
      where: { id: parseInt(id) },
      data: { estado }
    });
    res.json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/** --------------------------------------------------------------------------- */

// Create ItemPedido
const createItemPedido = async (req, res) => {
  try {
    const { pedidoId, celularId, cantidad, precioUnitario } = req.body;
    const item = await prisma.itemPedido.create({
      data: {
        pedidoId: parseInt(pedidoId),
        celularId: parseInt(celularId),
        cantidad: parseInt(cantidad),
        precioUnitario: parseFloat(precioUnitario)
      },
      include: { celular: true, pedido: true }
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All ItemsPedido
const getAllItemsPedido = async (req, res) => {
  try {
    const items = await prisma.itemPedido.findMany({
      include: { celular: true, pedido: true }
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get ItemPedido by ID
const getItemPedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.itemPedido.findUnique({
      where: { id: parseInt(id) },
      include: { celular: true, pedido: true }
    });
    if (!item) {
      return res.status(404).json({ error: 'Item no encontrado' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update ItemPedido
const updateItemPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad, precioUnitario } = req.body;
    const item = await prisma.itemPedido.update({
      where: { id: parseInt(id) },
      data: {
        cantidad: cantidad ? parseInt(cantidad) : undefined,
        precioUnitario: precioUnitario ? parseFloat(precioUnitario) : undefined
      }
    });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Export all functions
module.exports = {
  createPedido,
  getAllPedidos,
  getPedidoById,
  updatePedido,
  createItemPedido,
  getAllItemsPedido,
  getItemPedidoById,
  updateItemPedido
};