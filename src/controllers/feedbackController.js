const Feedback = require('../models/Feedback');
const ApiError = require('../utils/ApiError');

exports.createFeedback = async (req, res, next) => {
  try {
    const { title, message, category, rating } = req.body;

    if (!title || !message || !rating) {
      throw new ApiError(400, 'Title, message and rating are required');
    }

    const feedback = await Feedback.create({
      title,
      message,
      category,
      rating,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Feedback created successfully',
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllFeedback = async (req, res, next) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { createdBy: req.user._id };

    const feedbackList = await Feedback.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedbackList.length,
      data: feedbackList,
    });
  } catch (error) {
    next(error);
  }
};

exports.getFeedbackById = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate('createdBy', 'name email');

    if (!feedback) {
      throw new ApiError(404, 'Feedback not found');
    }

    const isOwner = feedback.createdBy._id.toString() === req.user._id.toString();
    if (req.user.role !== 'admin' && !isOwner) {
      throw new ApiError(403, 'You are not allowed to access this feedback');
    }

    res.status(200).json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      throw new ApiError(404, 'Feedback not found');
    }

    const isOwner = feedback.createdBy.toString() === req.user._id.toString();
    if (req.user.role !== 'admin' && !isOwner) {
      throw new ApiError(403, 'You are not allowed to update this feedback');
    }

    const allowedFields = ['title', 'message', 'category', 'rating', 'status'];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        feedback[field] = req.body[field];
      }
    });

    await feedback.save();

    res.status(200).json({
      success: true,
      message: 'Feedback updated successfully',
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      throw new ApiError(404, 'Feedback not found');
    }

    const isOwner = feedback.createdBy.toString() === req.user._id.toString();
    if (req.user.role !== 'admin' && !isOwner) {
      throw new ApiError(403, 'You are not allowed to delete this feedback');
    }

    await feedback.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Feedback deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
