const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Create Categoria
const createCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const categoria = await prisma.categoria.create({
      data: { nombre, descripcion }
    });
    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Categorias
const getAllCategorias = async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany({
      include: { celulares: true }
    });
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Categoria by ID
const getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await prisma.categoria.findUnique({
      where: { id: parseInt(id) },
      include: { celulares: true }
    });
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Categoria
const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const categoria = await prisma.categoria.update({
      where: { id: parseInt(id) },
      data: { nombre, descripcion }
    });
    res.json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Categoria
const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await prisma.categoria.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Categoría eliminada', categoria });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Export the controller functions
module.exports = {
  createCategoria,
  getAllCategorias,
  getCategoriaById,
  updateCategoria,
  deleteCategoria
};