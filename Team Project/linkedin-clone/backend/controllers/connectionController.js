const User = require('../models/User');
const AppError = require('../utils/appError');

exports.sendRequest = async (req, res, next) => {
  try {
    const receiverId = req.params.userId;
    const senderId = req.user.id;

    if (receiverId === senderId) {
      return next(new AppError('Cannot connect with yourself', 400));
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) return next(new AppError('User not found', 404));

    if (receiver.connections.includes(senderId)) {
      return next(new AppError('Already connected with this user', 400));
    }

    const existingRequest = receiver.connectionRequests.find(
      req => req.from.toString() === senderId
    );
    if (existingRequest) {
      return next(new AppError('Connection request already sent', 400));
    }

    receiver.connectionRequests.push({ from: senderId });
    await receiver.save();

    res.json({ success: true, message: 'Connection request sent' });
  } catch (error) {
    next(error);
  }
};

exports.getRequests = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('connectionRequests.from', 'name headline');
    
    const pendingRequests = user.connectionRequests.filter(r => r.status === 'pending');
    res.json({ success: true, requests: pendingRequests });
  } catch (error) {
    next(error);
  }
};

exports.acceptRequest = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const request = user.connectionRequests.id(req.params.requestId);
    
    if (!request) return next(new AppError('Request not found', 404));
    if (request.status !== 'pending') {
      return next(new AppError('Request already processed', 400));
    }

    request.status = 'accepted';
    user.connections.push(request.from);
    await user.save();

    const sender = await User.findById(request.from);
    sender.connections.push(req.user.id);
    await sender.save();

    res.json({ success: true, message: 'Connection accepted' });
  } catch (error) {
    next(error);
  }
};

exports.rejectRequest = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const request = user.connectionRequests.id(req.params.requestId);
    
    if (!request) return next(new AppError('Request not found', 404));
    
    request.status = 'rejected';
    await user.save();

    res.json({ success: true, message: 'Connection rejected' });
  } catch (error) {
    next(error);
  }
};

exports.getConnections = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('connections', 'name headline skills');
    
    res.json({ success: true, connections: user.connections });
  } catch (error) {
    next(error);
  }
};