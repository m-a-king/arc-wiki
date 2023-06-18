import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Feature = sequelize.define('Feature', {
  code: {
    field: 'feature_code',
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    field: 'feature_title',
    type: DataTypes.STRING,
  },
  desc: {
    field: 'feature_description',
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'features',
  timestamps: false,
});

export default Feature;