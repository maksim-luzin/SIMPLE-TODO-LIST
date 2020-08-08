export default (orm, DataTypes) => {
  const Comment = orm.define('task', {
    done: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    indexTask: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  return Comment;
};
