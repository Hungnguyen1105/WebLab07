var express = require('express');
var router = express.Router();

const StudentModel = require('../models/StudentModel');

// URL : localhost:3001/student
router.get('/', async (req, res) => {
   // SQL : SELECT * FROM student
   var students = await StudentModel.find();
   //res.send(students);
   // render ra file view : views/student/index.hbs và gửi kèm data thông qua biến 'students'
   res.render('student/index', { students: students });
})

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   // SELECT * FROM student WHERE id = 'id'
   var student = await StudentModel.findById(id);
   res.render('student/detail', { student: student });
})

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   await StudentModel.findByIdAndDelete(id);
   console.log('Delete student succeed');
   res.redirect('/student');
})

router.get('/add', (req, res) => {
   res.render('student/add');
})

router.post('/add', async (req, res) => {
   var student = req.body;
   await StudentModel.create(student);
   console.log('Add student succeed !');
   res.redirect('/student');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var student = await StudentModel.findById(id);
   res.render('student/edit', { student: student })
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var student = req.body;
   await StudentModel.findByIdAndUpdate(id, student);
   console.log('Update student succeed !');
   res.redirect('/student');
})

module.exports = router;