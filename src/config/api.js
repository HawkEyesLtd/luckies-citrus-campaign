/**
 * API Configuration
 * Centralizes all API-related configuration using environment variables
 */

const config = {
    // API Base URL
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'https://comm.hedigital.net/api/v1',

    // Campaign Configuration
    campaignId: process.env.REACT_APP_CAMPAIGN_ID || '68303b455e6566abb896822d',
    campaignType: process.env.REACT_APP_CAMPAIGN_TYPE || 'Tobacco',

    // Environment
    environment: process.env.REACT_APP_ENV || 'development',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',

    // Debug mode
    debugMode: process.env.REACT_APP_DEBUG_MODE === 'true',

    // API Endpoints
    endpoints: {
        dashboardSecondary: '/dashboard/secondary',
        allCampaignwise: '/data-management/all-campaignwise',
    },

    // Helper method to get full API URL
    getApiUrl(endpoint) {
        return `${this.apiBaseUrl}${endpoint}`;
    },

    // Helper method to log in development only
    log(...args) {
        if (this.debugMode) {
            console.log('[App Config]', ...args);
        }
    },
};

// Log configuration in development
if (config.isDevelopment) {
    config.log('Configuration loaded:', {
        environment: config.environment,
        apiBaseUrl: config.apiBaseUrl,
        campaignId: config.campaignId,
    });
}

export default config;
