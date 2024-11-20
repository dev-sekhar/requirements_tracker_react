/**
 * Organisation Routes Handler
 * 
 * This file manages all API routes related to organisation operations in the application.
 * It uses Express Router for route handling and Prisma ORM for database operations.
 * 
 * Key Components:
 * 1. Route Configuration
 *    - Defines API endpoints for organisation operations
 *    - Currently handles GET requests for fetching organisations with tenant details
 * 
 * 2. Database Integration
 *    - Uses Prisma ORM for database operations
 *    - Handles queries to both organization and tenant tables
 * 
 * 3. Error Handling
 *    - Validates input parameters
 *    - Handles database operation errors
 *    - Returns appropriate HTTP status codes
 * 
 * 4. Data Transformation
 *    - Includes tenant name in organisation response
 *    - Flattens response structure for frontend consumption
 * 
 * Current Endpoints:
 * GET /organisations
 *   - Purpose: Retrieves organisations with tenant names
 *   - Parameters: 
 *     - tenantId (query): ID of the tenant to fetch organisations for
 *   - Returns: Array of organisation objects with tenant names
 *   - Error States:
 *     - 500: Internal Server Error (database issues)
 *     - Invalid tenantId handling
 */

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const logger = require('../logger');
const prisma = new PrismaClient();

/**
 * GET /organisations
 * Retrieves all organisations for a given tenant, including tenant name
 * 
 * @param {string} req.query.tenantId - The ID of the tenant to fetch organisations for
 * @returns {Array} - List of organisations with tenant details
 * 
 * Response Format:
 * [
 *   {
 *     id: number,
 *     name: string,
 *     organizationOwner: string,
 *     tenantId: number,
 *     tenantName: string,
 *     ...other organization fields
 *   }
 * ]
 */
router.get('/organisations', async (req, res) => {
  const { tenantId } = req.query;
  logger.info(`Fetching organisations for tenantId: ${tenantId}`);

  try {
    const parsedTenantId = parseInt(tenantId, 10);

    if (isNaN(parsedTenantId)) {
      throw new Error('Invalid tenantId');
    }

    // Query organizations with tenant information
    const organisations = await prisma.organization.findMany({
      where: { 
        tenantId: parsedTenantId 
      },
      include: {
        tenant: {
          select: {
            name: true
          }
        }
      }
    });

    // Transform response to include tenant name directly
    const organisationsWithTenantName = organisations.map(org => ({
      ...org,
      tenantName: org.tenant.name,
      tenant: undefined // Remove nested tenant object
    }));

    logger.info(`Found ${organisations.length} organisations`);
    res.json(organisationsWithTenantName);
  } catch (error) {
    logger.error('Error fetching organisations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * POST /organisations
 * Creates a new organisation for a given tenant
 * 
 * @param {object} req.body - The data for creating a new organisation
 * @returns {object} - The created organisation object
 * 
 * Response Format:
 * {
 *   id: number,
 *   name: string,
 *   organizationOwner: string,
 *   tenantId: number,
 *   tenantName: string,
 *   ...other organisation fields
 * }
 */
router.post('/organisations', async (req, res) => {
  try {
    const { name, organizationOwner, tenantId, createdBy } = req.body;
    console.log('Received request body:', req.body);
    
    // Validate required fields
    if (!name || !organizationOwner || !tenantId || !createdBy) {
      console.error('Missing required fields');
      return res.status(400).json({ 
        error: 'Missing required fields',
        received: { name, organizationOwner, tenantId, createdBy }
      });
    }

    // Log the data we're trying to create
    console.log('Attempting to create organisation with data:', {
      name,
      organizationOwner,
      tenantId: parseInt(tenantId),
      createdBy,
      modifiedBy: createdBy
    });

    const newOrganisation = await prisma.organization.create({
      data: {
        name,
        organizationOwner,
        tenantId: parseInt(tenantId),
        createdBy,
        modifiedBy: createdBy
      },
    });
    
    console.log('Created organisation:', newOrganisation);
    res.status(201).json(newOrganisation);
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ 
      error: 'Failed to create organisation',
      details: error.message 
    });
  }
});

// Add PUT endpoint for editing
router.put('/organisations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, organizationOwner, status, modifiedBy } = req.body;

    const updatedOrganisation = await prisma.organization.update({
      where: { id: parseInt(id) },
      data: {
        name,
        organizationOwner,
        status,
        modifiedBy
      },
    });

    res.json(updatedOrganisation);
  } catch (error) {
    console.error('Error updating organisation:', error);
    res.status(500).json({ error: 'Failed to update organisation' });
  }
});

// Get single organisation by ID
router.get('/organisations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const organisation = await prisma.organization.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!organisation) {
      return res.status(404).json({ error: 'Organisation not found' });
    }

    res.json(organisation);
  } catch (error) {
    console.error('Error fetching organisation:', error);
    res.status(500).json({ error: 'Failed to fetch organisation' });
  }
});

// Update organisation
router.put('/organisations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, organizationOwner, status, modifiedBy } = req.body;

    const updatedOrganisation = await prisma.organization.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name,
        organizationOwner,
        status,
        modifiedBy
      }
    });

    res.json(updatedOrganisation);
  } catch (error) {
    console.error('Error updating organisation:', error);
    res.status(500).json({ error: 'Failed to update organisation' });
  }
});

module.exports = router;
