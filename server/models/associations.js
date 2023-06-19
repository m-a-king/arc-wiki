import CategoryGroup from './CategoryGroup.js';
import Category from './Category.js';
import Product from './Product.js';
import Color from './Color.js';

CategoryGroup.hasMany(Category, { foreignKey: 'groupCode' });
Category.belongsTo(CategoryGroup, { foreignKey: 'groupCode', as: 'group' });

Product.hasMany(Color, { foreignKey: 'productIdx', as: 'colors', onDelete: 'CASCADE' });
Color.belongsTo(Product, { foreignKey: 'productIdx' });