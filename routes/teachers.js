const express = require('express');
const router = express.Router();

const teachersController = require('../controllers/teachers');
const validation = require('../middleware/validate');

router.get('/', teachersController.getAllTeachers);

router.get('/:id', teachersController.getSingleTeacher);

router.post('/', validation.saveTeacher, teachersController.createTeacher);

router.put('/:id', validation.saveTeacher, teachersController.updateTeacher);

router.delete('/:id', teachersController.deleteTeacher);

module.exports = router;