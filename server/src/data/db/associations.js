export default models => {
  const {
    User,
    Project,
    Task
  } = models;

  User.hasMany(Project);

  Project.belongsTo(User);
  Project.hasMany(Task);

  Task.belongsTo(Project);
};
