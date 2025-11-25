# 🧪 BCH Testnet Setup Guide

## 🎯 **Getting Free Testnet BCH**

### 1. **BCH Testnet Faucets** 💧

#### **Primary Faucets:**
1. **FullStack.cash Faucet** ⭐ (Most Reliable)
   - URL: https://testnet.fullstack.cash/
   - Amount: 0.1 tBCH per request
   - Rate: Every 24 hours

2. **Bitcoin.com Testnet Faucet**
   - URL: https://developer.bitcoin.com/faucets/bch/
   - Amount: 0.1 tBCH per request
   - Rate: Every 24 hours

3. **BCH Testnet Explorer Faucet**
   - URL: https://testnet.bch.ninja/faucet/
   - Amount: 0.01 tBCH per request
   - Rate: Multiple times per day

### 2. **Your Testnet Address**
```
bitcoincash:zq4rs39z9ywwzgj5qfzm4ewxce0ultgslcpwjxc076
```
✅ This address works on both mainnet and testnet!

### 3. **Step-by-Step Process**

#### **Step 1: Get Testnet BCH**
1. Go to https://testnet.fullstack.cash/
2. Enter your address: `bitcoincash:zq4rs39z9ywwzgj5qfzm4ewxce0ultgslcpwjxc076`
3. Complete any captcha/verification
4. Click "Send BCH"
5. Wait 1-2 minutes for confirmation

#### **Step 2: Verify Receipt**
- Check balance at: https://chipnet.bch.ninja/address/bitcoincash:zq4rs39z9ywwzgj5qfzm4ewxce0ultgslcpwjxc076
- You should see 0.1 tBCH (10,000,000 satoshis)

#### **Step 3: Use CashScript UI**
1. Set network to **Chipnet** in the UI
2. Create contract with seed `12345`
3. Send **0.01 tBCH** to the contract address
4. Test spending with password `87654`

### 4. **Testing Workflow** 🔄

```
You (0.1 tBCH) → Contract (0.01 tBCH) → You (0.01 tBCH - fees)
```

#### **Expected Steps:**
1. **Initial**: You have 0.1 tBCH from faucet
2. **Send to contract**: 0.01 tBCH → Contract balance: 0.01 tBCH
3. **Spend from contract**: 0.01 tBCH - 300 sats fee → You receive ~0.009997 tBCH
4. **Net cost**: Only the transaction fee (~300 sats = $0.000001)

### 5. **Testnet vs Mainnet** 📊

| Feature | Testnet (Chipnet) | Mainnet |
|---------|-------------------|---------|
| **Cost** | FREE ✅ | Real money 💰 |
| **Risk** | Zero risk ✅ | Financial risk ⚠️ |
| **BCH Value** | $0.00 | ~$300+ per BCH |
| **Explorer** | chipnet.bch.ninja | explorer.bch.ninja |
| **Faucets** | Available ✅ | None ❌ |
| **Speed** | Same as mainnet | Same |

### 6. **Troubleshooting** 🔧

#### **If Faucet Fails:**
- Try different faucet from list above
- Wait 24 hours and try again
- Check if you've used faucet recently
- Clear browser cache/cookies

#### **If No BCH Received:**
- Check correct network (Chipnet vs Mainnet)
- Verify address format is correct
- Wait up to 10 minutes for confirmation
- Check transaction on explorer

#### **If Contract Creation Fails:**
- Ensure you're on Chipnet network
- Check browser console for errors
- Refresh page and try again

### 7. **Quick Links** 🔗

- **Get Testnet BCH**: https://testnet.fullstack.cash/
- **Check Balance**: https://chipnet.bch.ninja/address/bitcoincash:zq4rs39z9ywwzgj5qfzm4ewxce0ultgslcpwjxc076
- **Chipnet Explorer**: https://chipnet.bch.ninja/
- **CashScript Docs**: https://cashscript.org/docs/

### 8. **Ready to Test?** 🚀

Once you have testnet BCH:

1. **Open your CashScript UI**
2. **Toggle to Chipnet** (purple network card at top)
3. **Create contract** (seed: 12345)
4. **Send 0.01 tBCH** to contract address
5. **Spend back** to your address (password: 87654)

**Total cost: Only transaction fees (~600 sats = virtually free!)**

---

💡 **Pro Tip**: Bookmark the testnet faucets - you can get more tBCH every 24 hours for unlimited testing!