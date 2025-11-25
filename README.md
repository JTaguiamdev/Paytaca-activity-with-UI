# CashScript UI

A modern, responsive web interface for Bitcoin Cash smart contract interactions using CashScript. This application provides an intuitive user experience for creating, managing, and executing smart contracts on the Bitcoin Cash network.

## 🚀 Features

- **Smart Contract Integration**: Seamless interaction with CashScript smart contracts
- **Modern UI**: Built with Vue 3 + Quasar Framework for a premium user experience
- **QR Code Generation**: Generate QR codes for contract addresses
- **Transaction Management**: Create and broadcast transactions with visual feedback
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Updates**: Live balance and transaction status updates
- **Security First**: Built-in security measures and CSP headers

## 🛠️ Technology Stack

- **Frontend**: Vue 3 + Quasar Framework
- **Blockchain**: Bitcoin Cash (BCH) via CashScript
- **Styling**: SCSS with modern CSS animations
- **Build Tool**: Webpack + Babel
- **Deployment**: Vercel with optimized SPA configuration

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd cashscript-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏗️ Build & Deploy

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to Vercel
vercel --prod
```

## 🔧 Smart Contract

The application interacts with a PasswordHash smart contract:

```javascript
pragma cashscript ^0.12.0;

contract PasswordHash(int seed) {
    function spend(int password) {
        int hash = password + seed;
        require(hash == 99999);
    }
}
```

### Contract Features:
- **Parameter Input**: Create contract instances with custom seed values
- **Address Generation**: Display contract addresses with QR codes
- **Balance Display**: Show contract balance in BCH/satoshis
- **Transaction Creation**: Send funds from contract with password validation
- **Explorer Integration**: Direct links to blockchain explorers

## 🌐 Network Support

- **Mainnet**: Production Bitcoin Cash network
- **Chipnet**: Testing network for development
- **Explorer Links**: Automatic transaction explorer integration

## 📱 User Interface

### Main Features:
1. **Contract Creation Panel**: Input fields and controls for contract instantiation
2. **Contract Details Display**: Address, QR code, and balance information
3. **Transaction Form**: Recipient address and unlock parameter inputs
4. **Visual Feedback**: Animations and notifications for all actions
5. **Responsive Layout**: Optimized for all screen sizes

## 🔗 Useful Resources

- [CashScript Documentation](https://cashscript.org/docs/)
- [Vue 3 Guide](https://vuejs.org/guide/)
- [Quasar Framework](https://quasar.dev/)
- [Bitcoin Cash Explorer](https://explorer.bch.ninja/)
- [Chipnet Explorer](https://chipnet.bch.ninja/)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ for the Bitcoin Cash ecosystem**
