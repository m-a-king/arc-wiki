import Category from '../models/Category.js';
import CategoryGroup from '../models/CategoryGroup.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{
        model: CategoryGroup,
        required: true
      }]
    });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};