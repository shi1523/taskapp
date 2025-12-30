const User = require('../models/User');

ofile

exports.getProfile = async (req, res, next) => {
  try {
    
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt
    });
  } catch (error) {
    next(error);
  }
};


exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }

    
    if (name) user.name = name;
    if (email) {
      
      const existingUser = await User.findOne({ 
        email, 
        _id: { $ne: req.userId } 
      });
      
      if (existingUser) {
        return res.status(400).json({ 
          error: 'Email already in use' 
        });
      }
      
      user.email = email;
    }

    await user.save();

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      updatedAt: user.updatedAt
    });
  } catch (error) {
    next(error);
  }
};


exports.deleteAccount = async (req, res, next) => {
  try {
    const Task = require('../models/Task');

  
    await Task.deleteMany({ userId: req.userId });

 
    await User.findByIdAndDelete(req.userId);

    res.json({ 
      success: true,
      message: 'Account deleted successfully' 
    });
  } catch (error) {
    next(error);
  }
};
