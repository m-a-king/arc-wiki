import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Category = sequelize.define('Category', {
  category_code: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  category_group_code: {
    type: DataTypes.STRING
  },
  category_title: {
    type: DataTypes.STRING
  },
  category_description: {
    type: DataTypes.TEXT
  },
  category_icon: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'categories',
  timestamps: false
});

export default Category;