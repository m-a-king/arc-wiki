import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Category = sequelize.define('Category', {
  code: {
    field: 'category_code',
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    field: 'category_title',
    type: DataTypes.STRING,
  },
  desc: {
    field: 'category_description',
    type: DataTypes.TEXT
  },
  icon: {
    field: 'category_icon',
    type: DataTypes.STRING
  },
}, {
  tableName: 'categories',
  timestamps: false,
});

export default Category;