import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('arc_wiki', '', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;