import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  user_idx: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  user_password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
  },
  user_nickname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  user_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  create_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  update_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

export default User;