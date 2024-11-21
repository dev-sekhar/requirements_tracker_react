const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const logger = require('../logger');
const prisma = new PrismaClient();

// GET single tenant
router.get('/tenants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    logger.info('Fetching tenant with id:', id);

    const tenant = await prisma.tenant.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!tenant) {
      logger.info(`No tenant found with id: ${id}`);
      return res.status(404).json({ error: 'Tenant not found' });
    }

    logger.info(`Found tenant: ${tenant.name}`);
    res.json(tenant);
  } catch (error) {
    logger.error('Error fetching tenant:', error);
    res.status(500).json({ error: 'Failed to fetch tenant' });
  }
});

/**
 * GET /api/tenants/by-subdomain/:subdomain
 * Retrieves tenant information based on subdomain
 */
router.get('/tenants/by-subdomain/:subdomain', async (req, res) => {
  try {
    const { subdomain } = req.params;
    logger.info(`Fetching tenant by subdomain: ${subdomain}`);

    const tenant = await prisma.tenant.findUnique({
      where: { subdomain }
    });

    if (!tenant) {
      logger.info(`No tenant found for subdomain: ${subdomain}`);
      return res.status(404).json({ error: 'Tenant not found' });
    }

    logger.info(`Found tenant: ${tenant.name}`);
    res.json(tenant);
  } catch (error) {
    logger.error('Error fetching tenant by subdomain:', error);
    res.status(500).json({ error: 'Failed to fetch tenant' });
  }
});

// Get all tenants
router.get('/tenants', async (req, res) => {
  try {
    logger.info('Fetching all tenants');
    
    const tenants = await prisma.tenant.findMany({
      select: {
        id: true,
        name: true,
        subdomain: true,
        status: true
      },
      where: {
        status: 'Active'  // Only show active tenants
      },
      orderBy: {
        name: 'asc'
      }
    });

    logger.info(`Found ${tenants.length} tenants`);
    res.json(tenants);
  } catch (error) {
    logger.error('Error fetching tenants:', error);
    res.status(500).json({ error: 'Failed to fetch tenants' });
  }
});

module.exports = router; 