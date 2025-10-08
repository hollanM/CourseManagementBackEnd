module.exports = (sequelize, Sequelize) => {
  const CourseDetail = sequelize.define("coursedetail", {
    dept: 
    {
      type: Sequelize.STRING
    },
    name: 
    {
      type: Sequelize.STRING
    },
    courseNo: 
    {
      type: Sequelize.STRING
    },
    level: 
    {
      type: Sequelize.STRING
    },
    hour: 
    {
      type: Sequelize.STRING
    },
    description: 
    {
      type: Sequelize.TEXT
    },
  }, {
    tableName: "coursedetails",     
    freezeTableName: true,            // prevent Sequelize from pluralizing
    timestamps: true                  // include createdAt and updatedAt    
  });
  return CourseDetail;
  };