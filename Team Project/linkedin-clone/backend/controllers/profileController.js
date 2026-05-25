const User = require('../models/User');
const AppError = require('../utils/appError');

exports.getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('connections', 'name headline skills')
      .populate('connectionRequests.from', 'name headline');
    
    if (!user) return next(new AppError('Profile not found', 404));
    
    res.json({ success: true, profile: user });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { headline, skills, experience, education, profilePicture } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { headline, skills, experience, education, profilePicture },
      { new: true, runValidators: true }
    );

    res.json({ success: true, profile: user });
  } catch (error) {
    next(error);
  }
};

exports.getProfileById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -connectionRequests')
      .populate('connections', 'name headline');
    
    if (!user) return next(new AppError('User not found', 404));
    
    res.json({ success: true, profile: user });
  } catch (error) {
    next(error);
  }
};

exports.searchProfiles = async (req, res, next) => {
  try {
    const { skill } = req.query;
    let query = {};
    
    if (skill) {
      query.skills = { $regex: skill, $options: 'i' };
    }
    
    const users = await User.find(query).select('name headline skills');
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    next(error);
  }
};