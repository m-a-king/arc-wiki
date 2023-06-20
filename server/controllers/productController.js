import Feature from '../models/Feature.js';
import Material from '../models/Material.js';
import Care from '../models/Care.js';
import Product from '../models/Product.js';
import Color from '../models/Color.js';
import Review from '../models/Review.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';

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
    const products = await Product.findAll({
      include: [{
          model: Color,
          required: true,
          as: 'colors',
      }],
      order: [
        [
          'createDate',
          'DESC',
        ],
        [
          {
            model: Color,
            as: 'colors',
          },
          'idx',
          'ASC',
        ],
      ],
    });
    
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { idx } = req.params;

    const product = await Product.findByPk(idx, {
      include: [
        {
          model: Color,
          as: 'colors',
        },
      ],
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = req.body;
    
    const createdProduct = await Product.create(product);

    const colors = req.files.map((file, index) => ({
      productIdx: createdProduct.idx,
      title: req.body[`colors[${index}].title`],
      image: `/colors/${file.filename}`,
    }));
    await Color.bulkCreate(colors);
    
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['idx', 'id', 'name', 'nickname'],
        },
        {
          model: Product,
          as: 'product',
          attributes: ['idx', 'title', 'desc'],
        },
      ],
      order: [
        ['createDate', 'DESC'],
      ],
    });
    
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getReview = async (req, res) => {
  try {
    const { idx } = req.params;
    
    const review = await Review.findByPk(idx, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['idx', 'id', 'name', 'nickname'],
        },
        {
          model: Product,
          as: 'product',
          attributes: ['idx', 'title', 'desc'],
        },
      ],
    });
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addReview = async (req, res) => {
  try {
    const review = req.body;
    review.userIdx = req.user.idx;
    review.image = `/review/${req.file.filename}`;

    const createdReview = await Review.create(review);

    res.status(201).json(createdReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['idx', 'nickname'],
        },
        {
          model: Review,
          as: 'review',
          attributes: ['idx', 'title'],
        },
      ],
      order: [
        ['createDate', 'DESC'],
      ],
    });
    
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addComment = async (req, res) => {
  try {
    const comment = req.body;
    comment.userIdx = req.user.idx;

    const createdComment = await Comment.create(comment);

    res.status(201).json(createdComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};