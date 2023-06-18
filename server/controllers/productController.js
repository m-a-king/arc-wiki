import Feature from '../models/Feature.js';
import Material from '../models/Material.js';
import Care from '../models/Care.js';
import Product from '../models/Product.js';
import Color from '../models/Color.js';

export const getFeatures = async (req, res) => {
  try {
    const features = await Feature.findAll();
    res.json(features);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMaterials = async (req, res) => {
  try {
    const materials = await Material.findAll();
    res.json(materials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCares = async (req, res) => {
  try {
    const cares = await Care.findAll();
    res.json(cares);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = req.body;
    const createdProduct = await Product.create(product);

    const colorData = product.colors.map((c) => ({
      productIdx: createdProduct.idx,
      title: c.title,
      image: c.image,
    }));
    await Color.bulkCreate(colorData);
    
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};