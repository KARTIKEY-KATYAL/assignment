import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

// Create a new contact
export const createContact = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, phone, institution, requirements } = req.body;

    // Check if email already exists
    const existingContact = await prisma.contact.findFirst({
      where: { email }
    });

    if (existingContact) {
      return res.status(409).json({
        error: 'Email already exists',
        message: 'A contact with this email address already exists'
      });
    }

    // Create new contact
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        institution,
        requirements: requirements || null
      }
    });

    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      data: contact
    });

  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create contact'
    });
  }
};

// Get all contacts with pagination
export const getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Optional search functionality
    const search = req.query.search;
    const whereClause = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { institution: { contains: search, mode: 'insensitive' } }
      ]
    } : {};

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          institution: true,
          requirements: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.contact.count({
        where: whereClause
      })
    ]);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch contacts'
    });
  }
};

// Get a specific contact by ID
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await prisma.contact.findUnique({
      where: { id }
    });

    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found',
        message: 'No contact found with the provided ID'
      });
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch contact'
    });
  }
};

// Update a contact
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, institution, requirements } = req.body;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    // Check if contact exists
    const existingContact = await prisma.contact.findUnique({
      where: { id }
    });

    if (!existingContact) {
      return res.status(404).json({
        error: 'Contact not found',
        message: 'No contact found with the provided ID'
      });
    }

    // Check if email is being changed and if it already exists
    if (email !== existingContact.email) {
      const emailExists = await prisma.contact.findFirst({
        where: { 
          email,
          id: { not: id }
        }
      });

      if (emailExists) {
        return res.status(409).json({
          error: 'Email already exists',
          message: 'A contact with this email address already exists'
        });
      }
    }

    // Update contact
    const updatedContact = await prisma.contact.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        institution,
        requirements: requirements || null
      }
    });

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: updatedContact
    });

  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update contact'
    });
  }
};

// Delete a contact
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await prisma.contact.findUnique({
      where: { id }
    });

    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found',
        message: 'No contact found with the provided ID'
      });
    }

    await prisma.contact.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to delete contact'
    });
  }
};

// Get contact statistics
export const getContactStats = async (req, res) => {
  try {
    const [
      totalContacts,
      todayContacts,
      thisMonthContacts,
      institutionStats
    ] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      }),
      prisma.contact.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      }),
      prisma.contact.groupBy({
        by: ['institution'],
        _count: {
          institution: true
        },
        orderBy: {
          _count: {
            institution: 'desc'
          }
        },
        take: 10
      })
    ]);

    res.json({
      success: true,
      data: {
        totalContacts,
        todayContacts,
        thisMonthContacts,
        topInstitutions: institutionStats.map(stat => ({
          institution: stat.institution,
          count: stat._count.institution
        }))
      }
    });

  } catch (error) {
    console.error('Error fetching contact stats:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch contact statistics'
    });
  }
};

// Bulk delete contacts
export const bulkDeleteContacts = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'Please provide an array of contact IDs'
      });
    }

    const deletedCount = await prisma.contact.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });

    res.json({
      success: true,
      message: `Successfully deleted ${deletedCount.count} contacts`
    });

  } catch (error) {
    console.error('Error bulk deleting contacts:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to delete contacts'
    });
  }
};

// Export CSV of contacts
export const exportContacts = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Create CSV header
    const csvHeader = 'ID,Name,Email,Phone,Institution,Requirements,Created At,Updated At\n';
    
    // Create CSV rows
    const csvRows = contacts.map(contact => {
      return [
        contact.id,
        `"${contact.name}"`,
        contact.email,
        contact.phone,
        `"${contact.institution}"`,
        `"${contact.requirements || ''}"`,
        contact.createdAt.toISOString(),
        contact.updatedAt.toISOString()
      ].join(',');
    }).join('\n');

    const csv = csvHeader + csvRows;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=contacts.csv');
    res.send(csv);

  } catch (error) {
    console.error('Error exporting contacts:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to export contacts'
    });
  }
};
