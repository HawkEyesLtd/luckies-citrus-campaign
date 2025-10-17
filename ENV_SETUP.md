# Environment Setup - Easy Switch

## 🚀 Quick Switch Between DEV and PROD

Just edit `.env.local` and change ONE line:

```bash
# For DEVELOPMENT (DEV campaign)
REACT_APP_ENV=development

# For PRODUCTION (PROD campaign)  
REACT_APP_ENV=production
```

Then restart: `npm start`

---

## How It Works

**Campaign IDs:**
- DEV: `68f221b74e1de6ab87ae4911`
- PROD: `68f222ae4e1de6ab87ae4913`

**Priority:**
1. `.env.local` → `REACT_APP_ENV` (your manual override)
2. System → `NODE_ENV` (automatic)

---

## Usage Examples

### Test with DEV Data Locally
```bash
# In .env.local:
REACT_APP_ENV=development

# Run:
npm start
```

### Test with PROD Data Locally
```bash
# In .env.local:
REACT_APP_ENV=production

# Run:
npm start
```

### Production Build
```bash
npm run build
# Auto uses PROD campaign ID
```

---

## Deployment

**Vercel:**
- Preview → DEV campaign
- Production → PROD campaign
- ✅ No config needed!

**Other Platforms:**
- Set `NODE_ENV=production` for prod
- Set `NODE_ENV=development` for staging
