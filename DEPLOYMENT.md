# 🚀 CashScript UI - Deployment Guide

## 📦 **Build for Production**

### 1. **Build the Project**
```bash
npm run build
```
This creates a `dist/spa` folder with optimized files.

### 2. **Deploy to Static Hosting**

#### **Option A: Netlify** ⭐ (Recommended)
1. **Drag & drop** the `dist/spa` folder to https://netlify.com/drop
2. **Or connect GitHub** for automatic deploys
3. **Free HTTPS** and custom domain included

#### **Option B: Vercel**
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Upload the `dist/spa` folder

#### **Option C: GitHub Pages**
1. Copy `dist/spa` contents to `docs/` folder
2. Enable GitHub Pages in repository settings
3. Set source to `docs/` folder

#### **Option D: IPFS** (Decentralized)
1. Upload `dist/spa` to https://pinata.cloud/
2. Get IPFS hash and access via: `https://gateway.pinata.cloud/ipfs/{hash}`

### 3. **Environment Configuration**

#### **Production Settings**
```javascript
// quasar.config.js
build: {
  publicPath: '/', // Change if not deploying to root
  vueRouterMode: 'hash', // Keeps current hash mode for SPA
}
```

#### **Network Configuration**
The app automatically detects network based on toggle:
- **Mainnet**: Real BCH transactions
- **Chipnet**: Testnet for safe testing

### 4. **Security Considerations**

#### **HTTPS Required**
- **CashScript SDK** requires HTTPS in production
- **Wallet connections** need secure context
- **All hosting options** above provide free HTTPS

#### **Content Security Policy**
Add to your hosting provider:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://*.fullstack.cash https://*.bch.ninja;
```

### 5. **Testing Deployed Version**

#### **Functional Tests:**
1. ✅ **Network toggle** works (Mainnet/Chipnet)
2. ✅ **Contract creation** generates address & QR code
3. ✅ **Form validation** shows proper errors
4. ✅ **Animations** trigger on hover only
5. ✅ **Responsive design** works on mobile
6. ✅ **Copy buttons** work for addresses/txids
7. ✅ **Explorer links** open correctly

#### **Performance Tests:**
- **Lighthouse score**: Should be 90+ for Performance
- **First Contentful Paint**: < 2 seconds
- **Largest Contentful Paint**: < 4 seconds
- **Bundle size**: ~2MB (including CashScript SDK)

### 6. **Custom Domain Setup**

#### **DNS Configuration:**
```
Type: CNAME
Name: cashscript (or @)
Value: your-netlify-app.netlify.app
```

#### **SSL Certificate:**
All hosting providers auto-provision Let's Encrypt certificates.

### 7. **Monitoring & Analytics**

#### **Error Tracking:**
Add to `index.html` if needed:
```javascript
// Sentry, LogRocket, etc.
```

#### **Usage Analytics:**
```javascript
// Google Analytics, Plausible, etc.
```

### 8. **Maintenance**

#### **Dependencies:**
- **CashScript**: Update quarterly for security
- **Quasar**: Update for UI improvements
- **Vue**: Follow stable releases

#### **Network Updates:**
- Monitor BCH network upgrades
- Test on Chipnet before mainnet deployments
- Update explorer URLs if they change

---

## 🌐 **Example Live Deployment**

Your CashScript UI will be accessible at:
```
https://your-domain.com/
```

**Features available:**
- ✨ **Modern animated interface**
- 🔄 **Real-time BCH transactions**
- 📱 **Mobile responsive design**
- 🔐 **Secure HTTPS connection**
- ⚡ **Fast loading times**
- 🧪 **Testnet support for safe testing**

**Ready to deploy your BCH smart contract UI! 🚀**