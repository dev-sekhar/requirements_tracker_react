/**
 * Logger Configuration
 * 
 * This file configures Winston logger for application-wide logging.
 * It handles:
 * 
 * 1. Logger Setup
 *    - Creates a Winston logger instance
 *    - Configures log levels and formats
 *    - Sets up multiple transport destinations
 * 
 * 2. Log Formatting
 *    - Adds timestamps to all logs
 *    - Formats logs as JSON for better parsing
 *    - Includes contextual information (e.g., tenantId, operation)
 * 
 * 3. Transport Configuration
 *    - Console: Outputs logs to terminal
 *    - Error File: Stores error-level logs separately
 *    - Combined File: Stores all log levels
 * 
 * Log Levels:
 * - error: Error conditions
 * - warn: Warning conditions
 * - info: Informational messages
 * - debug: Debug messages
 * 
 * Usage:
 * logger.info('Message', { context: 'value' })
 * logger.error('Error message', { error: err, tenantId: id })
 */

const { createLogger, format, transports } = require('winston');

// Custom format to include additional context
const customFormat = format.printf(({ level, message, timestamp, ...metadata }) => {
  const extraInfo = metadata.tenantId ? ` [Tenant: ${metadata.tenantId}]` : '';
  return `${timestamp} ${level}:${extraInfo} ${message} ${Object.keys(metadata).length ? JSON.stringify(metadata) : ''}`;
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.metadata({ fillWith: ['tenantId', 'operation'] }),
    format.json(),
    customFormat
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        customFormat
      )
    }),
    new transports.File({ 
      filename: 'error.log', 
      level: 'error',
      format: format.combine(
        format.json(),
        customFormat
      )
    }),
    new transports.File({ 
      filename: 'combined.log',
      format: format.combine(
        format.json(),
        customFormat
      )
    }),
  ],
});

// Helper methods for consistent logging
logger.logOrganizationOperation = (operation, tenantId, details = {}) => {
  logger.info(`Organization ${operation}`, {
    tenantId,
    operation,
    ...details
  });
};

logger.logError = (message, error, tenantId = null) => {
  logger.error(message, {
    error: error.message,
    stack: error.stack,
    tenantId,
  });
};

module.exports = logger; 