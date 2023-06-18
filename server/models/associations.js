import Category from './Category.js';
import CategoryGroup from './CategoryGroup.js';

Category.belongsTo(CategoryGroup, { foreignKey: 'category_group_code', as: 'group' });
CategoryGroup.hasMany(Category, { foreignKey: 'category_group_code' });