const Task = require('../models/Task');


exports.getTasks = async (req, res, next) => {
  try {
    const { status, search, sort = '-createdAt' } = req.query;

    
    const query = { userId: req.userId };


    if (status && status !== 'all') {
      query.status = status;
    }

   
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

 
    const tasks = await Task.find(query).sort(sort);

    res.json({
      count: tasks.length,
      tasks
    });
  } catch (error) {
    next(error);
  }
};


exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({ 
        error: 'Task not found' 
      });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};


exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.create({
      userId: req.userId,
      title,
      description,
      status: status || 'pending'
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};


exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    
    let task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({ 
        error: 'Task not found' 
      });
    }

  
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    await task.save();

    res.json(task);
  } catch (error) {
    next(error);
  }
};


exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({ 
        error: 'Task not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Task deleted successfully' 
    });
  } catch (error) {
    next(error);
  }
};


exports.getTaskStats = async (req, res, next) => {
  try {
    const stats = await Task.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedStats = {
      total: 0,
      pending: 0,
      'in-progress': 0,
      completed: 0
    };

    stats.forEach(stat => {
      formattedStats[stat._id] = stat.count;
      formattedStats.total += stat.count;
    });

    res.json(formattedStats);
  } catch (error) {
    next(error);
  }
};
