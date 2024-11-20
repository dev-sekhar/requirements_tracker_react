/**
 * Main Application Server Configuration
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const organisationRoutes = require('./routes/organisation');
const tenantRoutes = require('./routes/tenant');

const app = express();

// Enable CORS for development with specific origin
app.use(cors({
  origin: 'http://localhost:3001', // Frontend URL
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// API routes
app.use('/api', organisationRoutes);
app.use('/api', tenantRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Something broke!' });
});

module.exports = app;
