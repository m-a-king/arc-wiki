import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  idx: {
    field: 'user_idx',
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id: {
    field: 'user_id',
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    field: 'user_password',
    type: DataTypes.CHAR(64),
    allowNull: false,
  },
  nickname: {
    field: 'user_nickname',
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  name: {
    field: 'user_name',
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    field: 'user_email',
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  isAdmin: {
    field: 'is_admin',
    type: DataTypes.INTEGER,
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
  tableName: 'users',
  timestamps: false,
});

export default User;