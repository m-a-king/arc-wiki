import CategoryGroup from './CategoryGroup.js';
import Category from './Category.js';
import Product from './Product.js';
import Color from './Color.js';
import Review from './Review.js';
import User from './User.js';
import Comment from './Comment.js';

CategoryGroup.hasMany(Category, { foreignKey: 'groupCode' });
Category.belongsTo(CategoryGroup, { foreignKey: 'groupCode', as: 'group' });

Product.hasMany(Color, { foreignKey: 'productIdx', as: 'colors', onDelete: 'CASCADE' });
Color.belongsTo(Product, { foreignKey: 'productIdx' });

User.hasMany(Review, { foreignKey: 'userIdx' });
Review.belongsTo(User, { foreignKey: 'userIdx', as: 'user' });

Product.hasMany(Review, { foreignKey: 'productIdx', onDelete: 'CASCADE' });
Review.belongsTo(Product, { foreignKey: 'productIdx', as: 'product' });

User.hasMany(Comment, { foreignKey: 'userIdx' });
Comment.belongsTo(User, { foreignKey: 'userIdx', as: 'user' });

Review.hasMany(Comment, { foreignKey: 'reviewIdx' });
Comment.belongsTo(Review, { foreignKey: 'reviewIdx', as: 'review' });