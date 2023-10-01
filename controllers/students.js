const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId; // get primary key

const getAllStudents = async (req, res) => {
    //#swagger.tags=['students]
  try {
    console.log("get all test")
    const result = await mongodb.getDb().db().collection("students").find();
    console.log(result)
    result.toArray().then((students) => {
      res.setHeader("Content-Type", "application/json");
      res.status(204).json(students);
      console.log(students)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleStudent = async (req, res) => {
    //#swagger.tags=['students]
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Must use valid Id" });
      }
      const studentId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection("students")
        .find({ _id: studentId });
      const students = await result.toArray();
  
      if (students.length === 0) {
        // student not found; send a 404 (Not Found) response
        res.status(404).json({ message: "Sorry the student you are loooking for can not be found" });
        return;
      }
  
      res.setHeader("Content-Type", "application/json");
      res.status(204).json(students[0]);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

const createStudent = async (req, res) => {
    //#swagger.tags=['students]
  try {
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      favoriteClass: req.body.favoriteClass,
      wandCore: req.body.wandCore,
      wandMaterial: req.body.wandMaterial,
      birthday: req.body.birthday,
      hogwartsHouse: req.body.hogwartsHouse,
    };
    const result = await mongodb
      .getDb()
      .db()
      .collection("students")
      .insertOne(student);
    res.status(204).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateStudent = async (req, res) => {
    //#swagger.tags=['students]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Must use valid Id" });
    };
      // Log the incoming JSON data for debugging
     // console.log("Incoming JSON Data:", req.body);
      //console.log("test")
    const studentId = new ObjectId(req.params.id);
    const updatedstudent = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      favoriteClass: req.body.favoriteClass,
      wandCore: req.body.wandCore,
      wandMaterial: req.body.wandMaterial,
      birthday: req.body.birthday,
      hogwartsHouse: req.body.hogwartsHouse,
    };
    const result = await mongodb
      .getDb()
      .db()
      .collection("students")
      .replaceOne({ _id: studentId }, updatedstudent);
    res.status(204).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteStudent = async (req, res) => {
    //#swagger.tags=['students]
  const studentId = new ObjectId(req.params.id);
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Must use valid Id" });
    };
    const result = await mongodb
      .getDb()
      .db()
      .collection("students")
      .deleteOne({ _id: studentId });
    res.status(204).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
