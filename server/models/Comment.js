import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';
import Review from './Review.js';

const Comment = sequelize.define('Comment', {
  idx: {
    field: 'comment_idx',
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userIdx: {
    field: 'user_idx',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'idx',
    },
  },
  reviewIdx: {
    field: 'review_idx',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Review,
      key: 'idx',
    },
  },
  content: {
    field: 'comment_content',
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
  tableName: 'comments',
  timestamps: false,
});

export default Comment;