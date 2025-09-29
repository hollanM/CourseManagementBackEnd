module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    dept: {
      type: Sequelize.STRING
    },
    courseNo: {
      type: Sequelize.STRING
    },
    level: {
      type: Sequelize.STRING
    },
    hour: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
  });
  return Tutorial;
};