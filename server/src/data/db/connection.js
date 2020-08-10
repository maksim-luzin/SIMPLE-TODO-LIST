import Sequelize from 'sequelize';
import * as developConfig from '../../config/dbConfig';

export default new Sequelize(process.env.NODE_ENV === 'production'
  ? process.env.DATABASE_URL
  : developConfig);
