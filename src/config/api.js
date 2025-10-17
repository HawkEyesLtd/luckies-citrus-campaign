// Environment detection:
// 1. If REACT_APP_ENV is set (in .env.local), use that
// 2. Otherwise, use NODE_ENV
const envMode = process.env.REACT_APP_ENV || process.env.NODE_ENV;
const isDev = envMode === 'development';

const config = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'https://comm.hedigital.net/api/v1',

    // Pick campaign ID based on environment
    campaignId: isDev
        ? process.env.REACT_APP_CAMPAIGN_ID_DEV
        : process.env.REACT_APP_CAMPAIGN_ID_PROD,

    campaignType: process.env.REACT_APP_CAMPAIGN_TYPE || 'Tobacco',

    endpoints: {
        dashboardSecondary: '/dashboard/secondary',
        allCampaignwise: '/data-management/all-campaignwise',
    },

    getApiUrl(endpoint) {
        return `${this.apiBaseUrl}${endpoint}`;
    },
};

console.log('[Config] Environment:', isDev ? 'DEV' : 'PROD', '| Campaign ID:', config.campaignId);

export default config;
