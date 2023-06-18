import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Material = sequelize.define('Material', {
  code: {
    field: 'material_code',
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    field: 'material_title',
    type: DataTypes.STRING,
  },
  desc: {
    field: 'material_description',
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'materials',
  timestamps: false,
});

export default Material;