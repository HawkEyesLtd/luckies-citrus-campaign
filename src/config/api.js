const isDev = process.env.NODE_ENV === 'development';

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

console.log('[Config]', isDev ? 'DEV' : 'PROD', 'Campaign ID:', config.campaignId);

export default config;
