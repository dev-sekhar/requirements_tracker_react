/**
 * Utility functions for handling tenant subdomains
 */

/**
 * Extracts tenant subdomain from current URL
 * @returns {string|null} subdomain or null if no subdomain
 */
export const getTenantFromSubdomain = () => {
    const host = window.location.host; // e.g., "tenant1.localhost:3001"
    const parts = host.split('.');
    
    // Check if we have a subdomain
    if (parts.length > 1 && parts[0] !== 'www') {
      return parts[0]; // Return the subdomain
    }
    
    return null; // No subdomain found
  };
  
  /**
   * Constructs full URL for a tenant subdomain
   * @param {string} subdomain - The tenant's subdomain
   * @returns {string} Full URL with subdomain
   */
  export const getFullTenantUrl = (subdomain) => {
    const protocol = window.location.protocol;
    const port = window.location.port;
    const domain = 'localhost';
    return `${protocol}//${subdomain}.${domain}${port ? `:${port}` : ''}`;
  };