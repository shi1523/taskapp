const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');
const { taskValidation } = require('../middleware/validator');
const auth = require('../middleware/auth');


router.use(auth);


router.get('/stats', getTaskStats);


router.get('/', getTasks);


router.get('/:id', getTask);


router.post('/', taskValidation, createTask);


router.put('/:id', taskValidation, updateTask);


router.delete('/:id', deleteTask);

module.exports = router;
