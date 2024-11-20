/**
 * Express Server Entry Point
 *
 * This file initializes the Express server and measures startup performance.
 * It handles:
 *
 * 1. Server Initialization
 *    - Imports the configured Express application from app.js
 *    - Measures server startup time using high-resolution timing
 *
 * 2. Server Metrics
 *    - Measures and logs server startup time
 *    - Uses process.hrtime() for precise timing
 */

// Start timing server initialization
const startTime = process.hrtime();

// Import the configured Express application
const app = require('./src/app');

// Set server port
const PORT = process.env.PORT || 3000;

// Start the server and log startup metrics
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('- GET /api/tenants/:id');
    console.log('- GET /api/organisations');
    console.log('- POST /api/organisations');
  });
