const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId; // get primary key

const {isauthenticated} = require('../middleware/authenticate')

const getAllTeachers = async (req, res) => {
    //#swagger.tags=['teachers]
  try {
    //console.log("get all test")
    const result = await mongodb.getDb().db().collection("Teachers").find();
    //console.log(result)
    result.toArray().then((teachers) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(teachers);
      //console.log(teachers)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleTeacher = async (req, res) => {
    //#swagger.tags=['teachers]
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Must use valid Id" });
      };
      const teacherId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection("Teachers")
        .find({ _id: teacherId });
      const teachers = await result.toArray();
  
      if (teachers.length === 0) {
        // teacher not found; send a 404 (Not Found) response
        res.status(404).json({ message: "Sorry the teacher you are loooking for can not be found" });
        return;
      }
  
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(teachers[0]);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

const createTeacher = async (req, res) => {
    //#swagger.tags=['teachers]
  try {
    const teacher = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      class: req.body.favoriteClass,
      wandCore: req.body.wandCore,
      wandMaterial: req.body.wandMaterial,
      birthday: req.body.birthday,
      hogwartsHouse: req.body.hogwartsHouse,
    };
    const result = await mongodb
      .getDb()
      .db()
      .collection("Teachers")
      .insertOne(teacher);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTeacher = async (req, res) => {
    //#swagger.tags=['teachers]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Must use valid Id" });
    }
      // Log the incoming JSON data for debugging
     // console.log("Incoming JSON Data:", req.body);
      //console.log("test")
    const teacherId = new ObjectId(req.params.id);
    const updatedteacher = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      class: req.body.favoriteClass,
      wandCore: req.body.wandCore,
      wandMaterial: req.body.wandMaterial,
      birthday: req.body.birthday,
      hogwartsHouse: req.body.hogwartsHouse,
    };
    const result = await mongodb
      .getDb()
      .db()
      .collection("Teachers")
      .replaceOne({ _id: teacherId }, updatedteacher);
    res.status(204).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTeacher = async (req, res) => {
    //#swagger.tags=['teachers]
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Must use valid Id" });
      }
    const teacherId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("Teachers")
      .deleteOne({ _id: teacherId });
    res.status(204).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllTeachers,
  getSingleTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
