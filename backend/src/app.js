/**
 * Main Application Server Configuration
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const organisationRoutes = require('./routes/organisation');
const tenantRoutes = require('./routes/tenant');
const { PrismaClient } = require('@prisma/client');
const logger = require('./logger');

const app = express();
const prisma = new PrismaClient();

// Extract the port from FRONTEND_URL
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3001';
const frontendUrlPattern = new URL(FRONTEND_URL);
const FRONTEND_PORT = frontendUrlPattern.port;

app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      new RegExp(`^http:\/\/[a-zA-Z0-9-]+\.localhost:${FRONTEND_PORT}$`),  // Any subdomain
      `http://localhost:${FRONTEND_PORT}`  // Regular localhost
    ];
    
    // Allow requests with no origin
    if (!origin) return callback(null, true);
    
    const allowed = allowedOrigins.some(pattern => {
      if (typeof pattern === 'string') {
        return origin === pattern;
      }
      return pattern.test(origin);
    });
    
    if (allowed) {
      callback(null, true);
    } else {
      logger.warn(`Origin ${origin} not allowed by CORS`);
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true
}));

// Middleware to extract tenant from subdomain
app.use(async (req, res, next) => {
  try {
    const host = req.get('host');
    logger.info(`Incoming request host: ${host}`);
    
    // Skip middleware for tenant-related routes
    if (req.path.startsWith('/api/tenants')) {
      return next();
    }

    const subdomain = host.split('.')[0];
    logger.info(`Extracted subdomain: ${subdomain}`);

    // Skip for direct localhost access
    if (subdomain === 'localhost:3001') {
      return next();
    }

    // Find tenant by subdomain
    const tenant = await prisma.tenant.findUnique({
      where: { subdomain }
    });

    if (!tenant) {
      logger.info(`Tenant not found for subdomain: ${subdomain}`);
      return res.status(404).json({ error: 'Tenant not found' });
    }

    logger.info(`Found tenant: ${tenant.name}`);
    req.tenant = tenant;
    next();
  } catch (error) {
    logger.error('Error in tenant middleware:', error);
    next(error);
  }
});

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
