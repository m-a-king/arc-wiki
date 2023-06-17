import Category from './Category.js';
import CategoryGroup from './CategoryGroup.js';

Category.belongsTo(CategoryGroup, { foreignKey: 'category_group_code' });
CategoryGroup.hasMany(Category, { foreignKey: 'category_group_code' });