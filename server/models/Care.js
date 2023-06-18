import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Care = sequelize.define('Care', {
  code: {
    field: 'care_code',
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    field: 'care_title',
    type: DataTypes.STRING,
  },
  desc: {
    field: 'care_description',
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'cares',
  timestamps: false,
});

export default Care;