export default (orm, DataTypes) => {
  const Project = orm.define('project', {
    name: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  return Project;
};
