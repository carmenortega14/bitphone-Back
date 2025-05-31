const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Marca
const createMarca = async (req, res) => {
  try {
    const { nombre, descripcion, paisOrigen, fechaFundacion } = req.body;
    const marca = await prisma.marca.create({
      data: {
        nombre,
        descripcion,
        paisOrigen,
        fechaFundacion: fechaFundacion ? new Date(fechaFundacion) : null
      }
    });
    res.status(201).json(marca);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Marcas
const getAllMarcas = async (req, res) => {
  try {
    const marcas = await prisma.marca.findMany();
    res.json(marcas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Marca by ID
const getMarcaById = async (req, res) => {
  try {
    const { id } = req.params;
    const marca = await prisma.marca.findUnique({
      where: { id: parseInt(id) },
      include: { celulares: true }
    });
    if (!marca) {
      return res.status(404).json({ error: 'Marca no encontrada' });
    }
    res.json(marca);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Marca
const updateMarca = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, paisOrigen, fechaFundacion } = req.body;
    const marca = await prisma.marca.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        descripcion,
        paisOrigen,
        fechaFundacion: fechaFundacion ? new Date(fechaFundacion) : null
      }
    });
    res.json(marca);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Exporta las funciones del controlador
module.exports = {
  createMarca,
  getAllMarcas,
  getMarcaById,
  updateMarca
};