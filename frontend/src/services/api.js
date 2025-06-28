import API_CONFIG from '../config/api.js';

// Base API utility class
class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Contact-specific API methods
class ContactAPI extends ApiService {
  constructor() {
    super();
    this.endpoint = API_CONFIG.ENDPOINTS.CONTACTS;
  }

  // Create a new contact
  async createContact(contactData) {
    return this.post(this.endpoint, contactData);
  }

  // Get all contacts with pagination and search
  async getContacts(params = {}) {
    return this.get(this.endpoint, params);
  }

  // Get contact statistics
  async getContactStats() {
    return this.get(`${this.endpoint}/stats`);
  }

  // Get a specific contact by ID
  async getContact(id) {
    return this.get(`${this.endpoint}/${id}`);
  }

  // Update a contact
  async updateContact(id, contactData) {
    return this.put(`${this.endpoint}/${id}`, contactData);
  }

  // Delete a contact
  async deleteContact(id) {
    return this.delete(`${this.endpoint}/${id}`);
  }

  // Bulk delete contacts
  async bulkDeleteContacts(ids) {
    return this.post(`${this.endpoint}/bulk-delete`, { ids });
  }

  // Export contacts as CSV
  async exportContacts() {
    const url = `${this.baseURL}${this.endpoint}/export`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to export contacts');
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `contacts_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  }

  // Health check
  async healthCheck() {
    return this.get(API_CONFIG.ENDPOINTS.HEALTH);
  }
}

// Create and export instances
export const contactAPI = new ContactAPI();
export const apiService = new ApiService();

// Export individual methods for convenience
export const {
  createContact,
  getContacts,
  getContactStats,
  getContact,
  updateContact,
  deleteContact,
  bulkDeleteContacts,
  exportContacts,
  healthCheck
} = contactAPI;
