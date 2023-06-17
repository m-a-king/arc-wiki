import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const CategoryGroup = sequelize.define('CategoryGroup', {
  category_group_code: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  category_group_title: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'category_groups',
  timestamps: false
});

export default CategoryGroup;