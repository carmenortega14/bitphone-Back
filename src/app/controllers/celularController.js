const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');

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

// Obtener todos los celulares con imágenes y relaciones
const getAllCelulares = async (req, res) => {
  try {
    const celulares = await prisma.celular.findMany({
      include: { 
        marca: {
          select: {
            id: true,
            nombre: true,
            paisOrigen: true
          }
        },
        categorias: {
          select: {
            id: true,
            nombre: true
          }
        }
      }
    });

    // Mapear los resultados para incluir URLs completas de imágenes
    const celularesConImagen = celulares.map(celular => ({
      ...celular,
      // Construir URL completa de la imagen
      imagenUrl: celular.imagenUrl 
        ? `${req.protocol}://${req.get('host')}${celular.imagenUrl}`
        : null
    }));

    res.json(celularesConImagen);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener celulares',
      details: error.message 
    });
  }
};

// Obtener un celular por ID con imagen
const getCelularById = async (req, res) => {
  try {
    const { id } = req.params;
    const celular = await prisma.celular.findUnique({
      where: { id: parseInt(id) },
      include: { 
        marca: true,
        categorias: true
      }
    });

    if (!celular) {
      return res.status(404).json({ error: 'Celular no encontrado' });
    }

    // Añadir URL completa de la imagen
    const celularConImagen = {
      ...celular,
      imagenUrl: celular.imagenUrl 
        ? `${req.protocol}://${req.get('host')}${celular.imagenUrl}`
        : null
    };

    res.json(celularConImagen);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener el celular',
      details: error.message 
    });
  }
};
// // Get All Celulares
// const getAllCelulares = async (req, res) => {
//   try {
//     const celulares = await prisma.celular.findMany({
//       include: { marca: true, categorias: true }
//     });
//     res.json(celulares);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get Celular by ID
// const getCelularById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const celular = await prisma.celular.findUnique({
//       where: { id: parseInt(id) },
//       include: { marca: true, categorias: true, pedidos: true }
//     });
//     if (!celular) {
//       return res.status(404).json({ error: 'Celular no encontrado' });
//     }
//     res.json(celular);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Update Celular
// const updateCelular = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { modelo, descripcion, precio, stock, imagenUrl, color,
//       almacenamiento, ram, pantalla, sistemaOperativo, marcaId } = req.body;
//     const celular = await prisma.celular.update({
//       where: { id: parseInt(id) },
//       data: {
//         modelo,
//         descripcion,
//         precio: precio ? parseFloat(precio) : undefined,
//         stock: stock ? parseInt(stock) : undefined,
//         imagenUrl,
//         color,
//         almacenamiento: almacenamiento ? parseInt(almacenamiento) : undefined,
//         ram: ram ? parseInt(ram) : undefined,
//         pantalla: pantalla ? parseFloat(pantalla) : undefined,
//         sistemaOperativo,
//         marcaId: marcaId ? parseInt(marcaId) : undefined
//       }
//     });
//     res.json(celular);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const updateCelular = async (req, res) => {
  try {
    const { id } = req.params;
    const { modelo, descripcion, precio, stock, color,
      almacenamiento, ram, pantalla, sistemaOperativo, marcaId, categoriaIds } = req.body;

    // Primero actualiza el celular
    const celularActualizado = await prisma.celular.update({
      where: { id: parseInt(id) },
      data: {
        modelo,
        descripcion,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        color,
        almacenamiento: parseInt(almacenamiento),
        ram: parseInt(ram),
        pantalla: parseFloat(pantalla),
        sistemaOperativo,
        marcaId: parseInt(marcaId)
      }
    });

    // Luego actualiza las categorías si se proporcionaron
    if (categoriaIds && Array.isArray(categoriaIds)) {
      await prisma.celular.update({
        where: { id: parseInt(id) },
        data: {
          categorias: {
            set: [], // Limpia las relaciones existentes
            connect: categoriaIds.map(id => ({ id: parseInt(id) }))
          }
        }
      });
    }

    res.json(celularActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCelularConImagen = async (req, res) => {
  try {
    const { id } = req.params;
    const { modelo, descripcion, precio, stock, color,
      almacenamiento, ram, pantalla, sistemaOperativo, marcaId, categoriaIds } = req.body;

    // Ruta de la nueva imagen
    const imagenUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Actualiza el celular con la nueva imagen
    const celularActualizado = await prisma.celular.update({
      where: { id: parseInt(id) },
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

    // Actualiza categorías si se proporcionaron
    if (categoriaIds && Array.isArray(categoriaIds)) {
      await prisma.celular.update({
        where: { id: parseInt(id) },
        data: {
          categorias: {
            set: [],
            connect: categoriaIds.map(id => ({ id: parseInt(id) }))
          }
        }
      });
    }

    res.json(celularActualizado);
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
  updateCelularConImagen,
  deleteCelular
};