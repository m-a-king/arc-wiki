import Category from '../models/Category.js';
import CategoryGroup from '../models/CategoryGroup.js';

export const getCategoryGroups = async (req, res) => {
  try {
    const categoryGroups = await CategoryGroup.findAll();
    
    res.status(200).json(categoryGroups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{
        model: CategoryGroup,
        required: true,
        as: 'group',
      }]
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};