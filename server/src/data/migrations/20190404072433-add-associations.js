export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .transaction(transaction => Promise.all([
      queryInterface.addColumn('projects', 'userId', {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }, { transaction }),
      queryInterface.addColumn('tasks', 'projectId', {
        type: Sequelize.UUID,
        references: {
          model: 'projects',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }, { transaction })
    ])),

  down: queryInterface => queryInterface.sequelize
    .transaction(transaction => Promise.all([
      queryInterface.removeColumn('projects', 'userId', { transaction }),
      queryInterface.removeColumn('tasks', 'projectId', { transaction })
    ]))
};
