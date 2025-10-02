const db = require("../models");
const Course = db.tutorials;
const Op = db.Sequelize.Op;
// Create and Save a new Course
exports.create = (req, res) => {
  // Validate request
  if (!req.body.dept || !req.body.courseNo || !req.body.name) {
    res.status(400).send({
      message: "Content can not be empty! Required fields: dept, courseNo, name"
    });
    return;
  }
  // Create a Course
  const coursedetail = {
    dept: req.body.dept,
    name: req.body.name,
    courseNo: req.body.courseNo,
    level: req.body.level,
    hour: req.body.hour,
    description: req.body.description,
  };
  // Save Course in the database
  Course.create(coursedetail)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course."
      });
    });
};


// Retrieve all Courses from the database.
// Optional ?q=term to search dept, courseNo, or name
exports.findAll = (req, res) => {
  const q = req.query.q;
  var condition = q ? {[Op.or]: [{dept: {[Op.like]: `%${q}%`}},{courseNo: {[Op.like]: `%${q}%`}},{name: { [Op.like]: `%${q}%`}}]}:null;
  Course.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving courses."
      });
    });
};
// Find a single Course with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Course.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Course with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Course with id=" + id
      });
    });
};
// Update a Course by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Course.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Course was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Course with id=" + id
      });
    });
};
// Delete a Course with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Course.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Course was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Course with id=${id}. Maybe Course was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Course with id=" + id
      });
    });
};
// Delete all Courses from the database.
exports.deleteAll = (req, res) => {
  Course.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Courses were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all courses."
      });
    });
};