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
 */

const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const logger = require("../logger");
const prisma = new PrismaClient();

/**
 * GET /organisations/deleted
 * Retrieves all deleted organisations for a given tenant
 */
router.get("/organisations/deleted", async (req, res) => {
  try {
    const { tenantId } = req.query;

    if (!tenantId) {
      return res.status(400).json({ error: "Tenant ID is required" });
    }

    logger.info(`Fetching deleted organisations for tenantId: ${tenantId}`);

    const deletedOrganisations = await prisma.organization.findMany({
      where: {
        tenantId: parseInt(tenantId),
        status: "Deleted",
      },
      include: {
        tenant: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // Transform response to include tenant name directly
    const organisationsWithTenantName = deletedOrganisations.map((org) => ({
      ...org,
      tenantName: org.tenant.name,
      tenant: undefined,
    }));

    logger.info(`Found ${deletedOrganisations.length} deleted organisations`);
    res.json(organisationsWithTenantName);
  } catch (error) {
    logger.error("Error fetching deleted organisations:", error);
    res.status(500).json({ error: "Failed to fetch deleted organisations" });
  }
});

/**
 * GET /organisations
 * Retrieves all active organisations for a given tenant
 */
router.get("/organisations", async (req, res) => {
  try {
    const tenantId = req.headers['x-tenant-id'];
    
    if (!tenantId) {
      logger.error('No tenant ID provided');
      return res.status(400).json({ error: 'Tenant ID is required' });
    }

    const organisations = await prisma.organization.findMany({
      where: {
        tenantId: parseInt(tenantId)
      }
    });

    res.json(organisations);
  } catch (error) {
    logger.error('Error fetching organisations:', error);
    res.status(500).json({ error: 'Failed to fetch organisations' });
  }
});

/**
 * GET /organisations/:id
 * Retrieves a single organisation by ID
 */
router.get("/organisations/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Organisation ID is required" });
    }

    const organisation = await prisma.organization.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        tenant: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!organisation) {
      return res.status(404).json({ error: "Organisation not found" });
    }

    const organisationWithTenantName = {
      ...organisation,
      tenantName: organisation.tenant.name,
      tenant: undefined,
    };

    res.json(organisationWithTenantName);
  } catch (error) {
    logger.error("Error fetching organisation:", error);
    res.status(500).json({ error: "Failed to fetch organisation" });
  }
});

/**
 * POST /organisations
 * Creates a new organisation
 */
router.post("/organisations", async (req, res) => {
  try {
    const { name, organizationOwner, tenantId, createdBy } = req.body;
    
    // Add detailed validation logging
    console.log('Received create organisation request:', {
      name,
      organizationOwner,
      tenantId,
      createdBy
    });

    // Validate all required fields
    if (!name || !organizationOwner || !tenantId || !createdBy) {
      const missingFields = [];
      if (!name) missingFields.push('name');
      if (!organizationOwner) missingFields.push('organizationOwner');
      if (!tenantId) missingFields.push('tenantId');
      if (!createdBy) missingFields.push('createdBy');

      return res.status(400).json({
        error: 'Missing required fields',
        missingFields,
        received: { name, organizationOwner, tenantId, createdBy }
      });
    }

    // Ensure tenantId is a number
    const parsedTenantId = parseInt(tenantId);
    if (isNaN(parsedTenantId)) {
      return res.status(400).json({
        error: 'Invalid tenantId format',
        received: tenantId
      });
    }

    const newOrganisation = await prisma.organization.create({
      data: {
        name,
        organizationOwner,
        tenantId: parsedTenantId,
        createdBy,
        modifiedBy: createdBy,
        status: 'Active'
      },
      include: {
        tenant: {
          select: {
            name: true
          }
        }
      }
    });

    const organisationWithTenantName = {
      ...newOrganisation,
      tenantName: newOrganisation.tenant.name,
      tenant: undefined
    };

    logger.info('Created organisation:', { id: newOrganisation.id });
    res.status(201).json(organisationWithTenantName);
  } catch (error) {
    logger.error('Error creating organisation:', error);
    res.status(500).json({
      error: 'Failed to create organisation',
      details: error.message
    });
  }
});

/**
 * PUT /organisations/:id
 * Updates an existing organisation
 */
router.put("/organisations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, organizationOwner, status, modifiedBy } = req.body;

    if (!modifiedBy) {
      return res.status(400).json({ 
        error: "Modified by is required",
        code: 'MISSING_REQUIRED_FIELD'
      });
    }

    const updatedOrganisation = await prisma.organization.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        organizationOwner,
        status,
        modifiedBy,
        updatedAt: new Date(),
      },
      include: {
        tenant: {
          select: {
            name: true,
          },
        },
      },
    });

    const organisationWithTenantName = {
      ...updatedOrganisation,
      tenantName: updatedOrganisation.tenant.name,
      tenant: undefined,
    };

    res.json({
      data: organisationWithTenantName,
      message: "Organisation updated successfully"
    });
  } catch (error) {
    logger.error("Error updating organisation:", error);
    res.status(500).json({ error: "Failed to update organisation" });
  }
});

/**
 * DELETE /organisations/:id
 * Marks an organisation as deleted
 */
router.delete("/organisations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrganisation = await prisma.organization.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: "Deleted",
        updatedAt: new Date(),
      },
      include: {
        tenant: {
          select: {
            name: true,
          },
        },
      },
    });

    const organisationWithTenantName = {
      ...updatedOrganisation,
      tenantName: updatedOrganisation.tenant.name,
      tenant: undefined,
    };

    res.json(organisationWithTenantName);
  } catch (error) {
    logger.error("Error deleting organisation:", error);
    res.status(500).json({ error: "Failed to delete organisation" });
  }
});

/**
 * GET /tenants/:tenantId/organisations
 * Retrieves all organisations for a specific tenant
 */
router.get('/tenants/:tenantId/organisations', async (req, res) => {
  try {
    const { tenantId } = req.params;
    
    logger.info(`Fetching organizations for tenant ${tenantId}`);

    const organisations = await prisma.organization.findMany({
      where: {
        tenantId: parseInt(tenantId)
      },
      orderBy: {
        name: 'asc'
      }
    });

    logger.info(`Found ${organisations.length} organizations`);
    res.json(organisations);
  } catch (error) {
    logger.error('Error fetching organizations:', error);
    res.status(500).json({ error: 'Failed to fetch organizations' });
  }
});

/**
 * POST /tenants/:tenantId/organisations
 * Creates a new organisation under a specific tenant
 */
router.post('/tenants/:tenantId/organisations', async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { name, organizationOwner, createdBy, status } = req.body;

    logger.info(`Validating organisation creation for tenant ${tenantId}:`, {
      name,
      organizationOwner
    });

    // Check if organization with same name exists for this tenant
    const existingOrg = await prisma.organization.findFirst({
      where: {
        name,
        tenantId: parseInt(tenantId)
      }
    });

    if (existingOrg) {
      // This is a normal business case, not an error
      logger.info(`Organisation "${name}" already exists for tenant ${tenantId}`);
      return res.status(409).json({ 
        error: `Organisation "${name}" already exists`,
        code: 'DUPLICATE_NAME'
      });
    }

    const newOrganisation = await prisma.organization.create({
      data: {
        name,
        organizationOwner,
        tenantId: parseInt(tenantId),
        createdBy,
        modifiedBy: createdBy,
        status: status || 'Active'
      }
    });

    logger.info(`Created organisation "${name}" with ID ${newOrganisation.id}`);
    res.status(201).json(newOrganisation);
  } catch (error) {
    logger.error('Unexpected error creating organisation:', error);
    res.status(500).json({ 
      error: 'Failed to create organisation',
      details: error.message 
    });
  }
});

/**
 * GET /tenants/:tenantId/organisations/:id
 * Retrieves a single organisation by ID for a specific tenant
 */
router.get('/tenants/:tenantId/organisations/:id', async (req, res) => {
  try {
    const { tenantId, id } = req.params;
    
    logger.info(`Fetching organisation ${id} for tenant ${tenantId}`);

    const organisation = await prisma.organization.findFirst({
      where: {
        id: parseInt(id),
        tenantId: parseInt(tenantId)
      },
      include: {
        tenant: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!organisation) {
      logger.info(`Organisation ${id} not found for tenant ${tenantId}`);
      return res.status(404).json({ error: "Organisation not found" });
    }

    const organisationWithTenantName = {
      ...organisation,
      tenantName: organisation.tenant.name,
      tenant: undefined,
    };

    res.json(organisationWithTenantName);
  } catch (error) {
    logger.error("Error fetching organisation:", error);
    res.status(500).json({ error: "Failed to fetch organisation" });
  }
});

/**
 * DELETE /tenants/:tenantId/organisations/:id
 * Marks an organisation as deleted for a specific tenant
 */
router.delete('/tenants/:tenantId/organisations/:id', async (req, res) => {
  try {
    const { tenantId, id } = req.params;
    
    logger.info(`Deleting organisation ${id} for tenant ${tenantId}`);

    const organisation = await prisma.organization.findFirst({
      where: {
        id: parseInt(id),
        tenantId: parseInt(tenantId)
      }
    });

    if (!organisation) {
      logger.info(`Organisation ${id} not found for tenant ${tenantId}`);
      return res.status(404).json({ error: "Organisation not found" });
    }

    const updatedOrganisation = await prisma.organization.update({
      where: {
        id: parseInt(id),
        tenantId: parseInt(tenantId)
      },
      data: {
        status: "Deleted",
        updatedAt: new Date(),
      },
      include: {
        tenant: {
          select: {
            name: true,
          },
        },
      },
    });

    const organisationWithTenantName = {
      ...updatedOrganisation,
      tenantName: updatedOrganisation.tenant.name,
      tenant: undefined,
    };

    logger.info(`Successfully deleted organisation ${id}`);
    res.json(organisationWithTenantName);
  } catch (error) {
    logger.error("Error deleting organisation:", error);
    res.status(500).json({ error: "Failed to delete organisation" });
  }
});

/**
 * PUT /tenants/:tenantId/organisations/:id
 * Updates an existing organisation for a specific tenant
 */
router.put('/tenants/:tenantId/organisations/:id', async (req, res) => {
  try {
    const { tenantId, id } = req.params;
    const { name, organizationOwner, modifiedBy, status } = req.body;
    
    logger.info(`Updating organisation ${id} for tenant ${tenantId}`);

    // First check if the organisation exists
    const existingOrg = await prisma.organization.findFirst({
      where: {
        id: parseInt(id),
        tenantId: parseInt(tenantId)
      }
    });

    if (!existingOrg) {
      logger.info(`Organisation ${id} not found for tenant ${tenantId}`);
      return res.status(404).json({ error: "Organisation not found" });
    }

    // Check if new name conflicts with existing organisation
    if (name && name !== existingOrg.name) {
      const duplicateOrg = await prisma.organization.findFirst({
        where: {
          name,
          tenantId: parseInt(tenantId),
          id: { not: parseInt(id) } // Exclude current org from check
        }
      });

      if (duplicateOrg) {
        logger.info(`Organisation name "${name}" already exists for tenant ${tenantId}`);
        return res.status(409).json({ 
          error: `Organisation "${name}" already exists`,
          code: 'DUPLICATE_NAME'
        });
      }
    }

    // Update the organisation
    const updatedOrganisation = await prisma.organization.update({
      where: {
        id: parseInt(id),
        tenantId: parseInt(tenantId)
      },
      data: {
        ...(name && { name }),
        ...(organizationOwner && { organizationOwner }),
        ...(status && { status }),
        modifiedBy,
        updatedAt: new Date()
      },
      include: {
        tenant: {
          select: {
            name: true,
          },
        },
      },
    });

    const organisationWithTenantName = {
      ...updatedOrganisation,
      tenantName: updatedOrganisation.tenant.name,
      tenant: undefined,
    };

    logger.info(`Successfully updated organisation ${id}`);
    res.json({
      data: organisationWithTenantName,
      message: "Organisation updated successfully"
    });
  } catch (error) {
    logger.error("Error updating organisation:", error);
    res.status(500).json({ 
      error: "Failed to update organisation",
      details: error.message,
      code: 'UPDATE_FAILED'
    });
  }
});

module.exports = router;
