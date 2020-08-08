export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .query('CREATE EXTENSION IF NOT EXISTS pgcrypto;')
    .then(() => queryInterface.sequelize.transaction(transaction => Promise.all([
      queryInterface.createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('gen_random_uuid()')
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true
        },
        username: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }, { transaction }),
      queryInterface.createTable('projects', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('gen_random_uuid()')
        },
        name: {
          allowNull: false,
          type: Sequelize.TEXT
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }, { transaction }),
      queryInterface.createTable('tasks', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('gen_random_uuid()')
        },
        done: {
          allowNull: false,
          type: Sequelize.BOOLEAN
        },
        description: {
          allowNull: false,
          type: Sequelize.TEXT
        },
        indexTask: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }, { transaction })
    ]))),

  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => Promise.all([
      queryInterface.dropTable('users', { transaction }),
      queryInterface.dropTable('projects', { transaction }),
      queryInterface.dropTable('tasks', { transaction })
    ]))
};
