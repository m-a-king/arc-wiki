import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';
import Product from './Product.js';

const Review = sequelize.define('Review', {
  idx: {
    field: 'review_idx',
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userIdx: {
    field: 'user_idx',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'idx',
    },
  },
  productIdx: {
    field: 'product_idx',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'idx',
    },
  },
  title: {
    field: 'review_title',
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  content: {
    field: 'review_content',
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    field: 'review_image',
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  rating: {
    field: 'review_rating',
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true,
  },
  createDate: {
    field: 'create_date',
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updateDate: {
    field: 'update_date',
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'reviews',
  timestamps: false,
});

export default Review;