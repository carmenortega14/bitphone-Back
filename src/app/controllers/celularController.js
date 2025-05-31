const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Create Celular
const createCelular = async (req, res) => {
  try {
    const { modelo, descripcion, precio, stock, imagenUrl, color, 
            almacenamiento, ram, pantalla, sistemaOperativo, marcaId } = req.body;
    const celular = await prisma.celular.create({
      data: {
        modelo,
        descripcion,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        imagenUrl,
        color,
        almacenamiento: parseInt(almacenamiento),
        ram: parseInt(ram),
        pantalla: parseFloat(pantalla),
        sistemaOperativo,
        marcaId: parseInt(marcaId)
      }
    });
    res.status(201).json(celular);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Celulares
const getAllCelulares = async (req, res) => {
  try {
    const celulares = await prisma.celular.findMany({
      include: { marca: true, categorias: true }
    });
    res.json(celulares);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Celular by ID
const getCelularById = async (req, res) => {
  try {
    const { id } = req.params;
    const celular = await prisma.celular.findUnique({
      where: { id: parseInt(id) },
      include: { marca: true, categorias: true, pedidos: true }
    });
    if (!celular) {
      return res.status(404).json({ error: 'Celular no encontrado' });
    }
    res.json(celular);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Celular
const updateCelular = async (req, res) => {
  try {
    const { id } = req.params;
    const { modelo, descripcion, precio, stock, imagenUrl, color, 
            almacenamiento, ram, pantalla, sistemaOperativo, marcaId } = req.body;
    const celular = await prisma.celular.update({
      where: { id: parseInt(id) },
      data: {
        modelo,
        descripcion,
        precio: precio ? parseFloat(precio) : undefined,
        stock: stock ? parseInt(stock) : undefined,
        imagenUrl,
        color,
        almacenamiento: almacenamiento ? parseInt(almacenamiento) : undefined,
        ram: ram ? parseInt(ram) : undefined,
        pantalla: pantalla ? parseFloat(pantalla) : undefined,
        sistemaOperativo,
        marcaId: marcaId ? parseInt(marcaId) : undefined
      }
    });
    res.json(celular);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Celular
const deleteCelular = async (req, res) => {
  try {
    const { id } = req.params;
    const celular = await prisma.celular.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Celular eliminado', celular });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCelular,
  getAllCelulares,
  getCelularById,
  updateCelular,
  deleteCelular
};