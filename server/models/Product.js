import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Product = sequelize.define('Product', {
  idx: {
    field: 'product_idx',
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    field: 'product_title',
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  desc: {
    field: 'product_description',
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    field: 'product_price',
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  size: {
    field: 'product_size',
    type: DataTypes.TEXT,
    allowNull: true,
  },
  weight: {
    field: 'product_weight',
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  featureCodes: {
    field: 'feature_codes',
    type: DataTypes.TEXT,
    allowNull: true,
  },
  materialCodes: {
    field: 'material_codes',
    type: DataTypes.TEXT,
    allowNull: true,
  },
  careCodes: {
    field: 'care_codes',
    type: DataTypes.TEXT,
    allowNull: true,
  },
  categoryCodes: {
    field: 'category_codes',
    type: DataTypes.TEXT,
    allowNull: false,
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
  tableName: 'products',
  timestamps: false,
});

export default Product;