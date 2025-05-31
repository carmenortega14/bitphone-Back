const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Cliente
const createCliente = async (req, res) => {
  try {
    const { nombre, email, telefono, direccion } = req.body;
    const cliente = await prisma.cliente.create({
      data: { nombre, email, telefono, direccion }
    });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Clientes
const getAllClientes = async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany({
      include: { pedidos: true }
    });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Cliente by ID
const getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await prisma.cliente.findUnique({
      where: { id: parseInt(id) },
      include: { pedidos: { include: { items: true } } }
    });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Cliente
const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, telefono, direccion } = req.body;
    const cliente = await prisma.cliente.update({
      where: { id: parseInt(id) },
      data: { nombre, email, telefono, direccion }
    });
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Exporting the functions
module.exports = {
  createCliente,
  getAllClientes,
  getClienteById,
  updateCliente
};