// const { employee } = require("../models");
const { details } = require("../models");
const db = require("../models");
const Details = db.details;

// Create and Save a new Employee
exports.create = (req, res) => {
  // Create a Employee
  const age = req.body.age;
  const ageRange = getAgeRange(age);
  const details = new Details({
        name:req.body.name,
        domin:req.body.domin,
        age:req.body.age,
        city:req.body.city,
        age_range:ageRange
  });

  // Save Tutorial in the database
 details
    .save(details)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const age = req.body.age;
    const ageRange = getAgeRange(age);
  
    details.findByIdAndUpdate(
      id,
      { $set: {  age_range: ageRange } },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update employee with id=${id}. Maybe Tutorial was not found!`,
          });
        } else res.send({ message: "Employee was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating employee with id=" + id,
        });
      });
  };
  
  // Function to calculate the age range based on the age
  function getAgeRange(age) {
    const lowerBound = Math.floor((age - 1) / 10) * 10 + 1;
    const upperBound = lowerBound + 9;
    return `${lowerBound}-${upperBound}`;
  }
