import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Product from './Product.js';

const Color = sequelize.define('Color', {
  idx: {
    field: 'color_idx',
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
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
    field: 'color_title',
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  image: {
    field: 'color_image',
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  createDate: {
    field: 'create_date',
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'colors',
  timestamps: false,
});

export default Color;