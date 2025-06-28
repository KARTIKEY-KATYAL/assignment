import express from 'express';
import { body } from 'express-validator';
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  getContactStats,
  bulkDeleteContacts,
  exportContacts
} from '../controllers/contactController.js';

const router = express.Router();

// Validation rules for creating/updating contacts
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone number must be exactly 10 digits'),
  
  body('institution')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Institution name must be between 2 and 200 characters'),
  
  body('requirements')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Requirements must not exceed 500 characters')
];

// Routes
router.post('/', contactValidation, createContact);
router.get('/', getAllContacts);
router.get('/stats', getContactStats);
router.get('/export', exportContacts);
router.get('/:id', getContactById);
router.put('/:id', contactValidation, updateContact);
router.delete('/:id', deleteContact);
router.post('/bulk-delete', bulkDeleteContacts);

export default router;
