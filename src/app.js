const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());
app.use(morgan('dev'));

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Too many requests, please try again later',
});

app.use('/api', apiLimiter);

// Root Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Feedback Tracker Backend Running Successfully',
  });
});

// Health Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Feedback Tracker API is running',
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;