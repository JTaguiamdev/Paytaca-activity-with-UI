import { ref, computed } from 'vue'
import QRCode from 'qrcode'
import { Contract, ElectrumNetworkProvider, TransactionBuilder } from 'cashscript'
import Artifact from 'src/contracts/Artifact.json' with { type: 'json' }
import { Notify } from 'quasar'

export function useContract() {
  // State
  const seed = ref(null)
  const contract = ref(null)
  const contractAddress = ref('')
  const qrCodeDataUrl = ref('')
  const balance = ref(0n)
  const isCreatingContract = ref(false)
  const isLoadingBalance = ref(false)
  const isMainnet = ref(false)
  
  // Computed
  const network = computed(() => isMainnet.value ? 'mainnet' : 'chipnet')
  const provider = computed(() => new ElectrumNetworkProvider(network.value))
  
  const explorerUrl = computed(() => {
    if (isMainnet.value) {
      return 'https://explorer.bch.ninja/tx/'
    }
    return 'https://chipnet.bch.ninja/tx/'
  })
  
  const formattedBalance = computed(() => {
    if (balance.value === 0n) return '0 sats'
    const sats = Number(balance.value)
    const bch = sats / 100000000
    return `${sats.toLocaleString()} sats (${bch.toFixed(8)} BCH)`
  })
  
  // Methods
  const createContract = async () => {
    try {
      isCreatingContract.value = true
      
      const constructorArgs = [BigInt(seed.value)]
      
      contract.value = new Contract(
        Artifact,
        constructorArgs,
        { provider: provider.value, addressType: 'p2sh32' }
      )
      
      contractAddress.value = contract.value.address
      
      // Generate QR code with enhanced styling
      qrCodeDataUrl.value = await QRCode.toDataURL(contract.value.address, {
        width: 256,
        margin: 2,
        color: {
          dark: '#1976D2',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
      })
      
      // Load balance
      await loadBalance()
      
      Notify.create({
        type: 'positive',
        message: 'Contract instance created successfully! ✨',
        position: 'top',
        timeout: 3000,
        actions: [
          { icon: 'close', color: 'white', round: true, dense: true }
        ]
      })
      
    } catch (error) {
      console.error('Error creating contract:', error)
      Notify.create({
        type: 'negative',
        message: `Error creating contract: ${error.message}`,
        position: 'top',
        timeout: 5000,
        actions: [
          { icon: 'close', color: 'white', round: true, dense: true }
        ]
      })
    } finally {
      isCreatingContract.value = false
    }
  }
  
  const loadBalance = async () => {
    if (!contract.value) return
    
    try {
      isLoadingBalance.value = true
      const utxos = await contract.value.getUtxos()
      balance.value = utxos.reduce((total, utxo) => total + utxo.satoshis, 0n)
    } catch (error) {
      console.error('Error loading balance:', error)
      balance.value = 0n
    } finally {
      isLoadingBalance.value = false
    }
  }
  
  const sendTransaction = async (recipientAddress, password) => {
    if (!contract.value) {
      Notify.create({
        type: 'negative',
        message: 'Contract instance not created',
        position: 'top'
      })
      return null
    }

    try {
      const utxos = await contract.value.getUtxos()
      if (utxos.length === 0) {
        throw new Error('No UTXOs available. Please send some BCH to the contract first.')
      }

      const txBuilder = new TransactionBuilder({ provider: provider.value })
      
      const utxo = utxos[0]
      
      // Calculate the password that makes hash == 99999
      const requiredPassword = 99999 - seed.value
      
      // Check if provided password is correct
      if (parseInt(password) !== requiredPassword) {
        throw new Error(`Incorrect password. Expected: ${requiredPassword}`)
      }

      txBuilder.addInput(
        utxo,
        contract.value.unlock.spend(BigInt(password))
      )

      const TX_FEE = 300n
      const toSendAmount = utxo.satoshis - TX_FEE

      if (toSendAmount <= 0) {
        throw new Error('Insufficient funds for transaction fee')
      }

      txBuilder.addOutput({
        to: recipientAddress,
        amount: toSendAmount
      })

      const result = await txBuilder.send()
      
      // Reload balance
      await loadBalance()
      
      Notify.create({
        type: 'positive',
        message: 'Transaction sent successfully! 🎉',
        position: 'top',
        timeout: 5000,
        actions: [
          { icon: 'close', color: 'white', round: true, dense: true }
        ]
      })

      return result.txid

    } catch (error) {
      console.error('Error sending transaction:', error)
      Notify.create({
        type: 'negative',
        message: `Error sending transaction: ${error.message}`,
        position: 'top',
        timeout: 7000,
        actions: [
          { icon: 'close', color: 'white', round: true, dense: true }
        ]
      })
      throw error
    }
  }
  
  const toggleNetwork = () => {
    // Reset contract when network changes
    if (contract.value) {
      contract.value = null
      contractAddress.value = ''
      qrCodeDataUrl.value = ''
      balance.value = 0n
      
      Notify.create({
        type: 'info',
        message: `Switched to ${network.value}. Please recreate contract.`,
        position: 'top',
        timeout: 3000
      })
    }
  }
  
  return {
    // State
    seed,
    contract,
    contractAddress,
    qrCodeDataUrl,
    balance,
    isCreatingContract,
    isLoadingBalance,
    isMainnet,
    
    // Computed
    network,
    provider,
    explorerUrl,
    formattedBalance,
    
    // Methods
    createContract,
    loadBalance,
    sendTransaction,
    toggleNetwork
  }
}