const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET single tenant
router.get('/tenants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching tenant with id:', id);

    const tenant = await prisma.tenant.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    res.json(tenant);
  } catch (error) {
    console.error('Error fetching tenant:', error);
    res.status(500).json({ error: 'Failed to fetch tenant' });
  }
});

module.exports = router; 