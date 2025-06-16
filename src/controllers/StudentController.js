const express = require('express');
const router = express.Router();
const StudentService = require('../services/StudentService');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/', async (req, res) => {
  try {
    const student = await StudentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const students = await StudentService.getAllStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const student = await StudentService.getStudentById(req.params.id);
    res.json(student);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const student = await StudentService.updateStudent(req.params.id, req.body);
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const student = await StudentService.deleteStudent(req.params.id);
    res.json({ message: 'Student deleted successfully', student });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router; 