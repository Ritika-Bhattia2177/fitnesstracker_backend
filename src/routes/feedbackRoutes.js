const express = require('express');
const {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').post(createFeedback).get(getAllFeedback);
router.route('/:id').get(getFeedbackById).put(updateFeedback).delete(deleteFeedback);

module.exports = router;
