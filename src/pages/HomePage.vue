<template>
  <q-page class="page-container">
    <!-- Cybersecurity Hero Section -->
    <div class="hero-section q-mb-xl">
      <!-- Hero Content -->
      <div class="hero-content row items-center q-gutter-xl">
        <!-- Left: Title and Content -->
        <div class="col-md-6 col-12 hero-left">
          <h1 class="hero-title animated fadeInDown">
            <span class="title-light floating-text">UI Exercise</span>
          </h1>
          <p class="hero-subtitle animated fadeInUp slow">
            Interact with Bitcoin Cash Smart Contracts through a premium 
            interface powered by advanced cryptography.
          </p>
        </div>

        <!-- Right: Floating Security Icons -->
        <div class="col-md-6 col-12 hero-right">
          <div class="floating-icons-container">
            <!-- Blockchain Icon -->
            <div class="floating-icon blockchain-icon">
              <q-icon name="link" size="2rem" color="white" />
            </div>
            <!-- Security Shield -->
            <div class="floating-icon shield-icon">
              <q-icon name="security" size="2.5rem" color="white" />
            </div>
            <!-- Encryption -->
            <div class="floating-icon encryption-icon">
              <q-icon name="enhanced_encryption" size="2rem" color="white" />
            </div>
            <!-- Wallet -->
            <div class="floating-icon wallet-icon">
              <q-icon name="account_balance_wallet" size="2rem" color="white" />
            </div>
            <!-- Network -->
            <div class="floating-icon network-icon">
              <q-icon name="hub" size="2rem" color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Network Selection -->
    <q-card class="network-card q-mb-lg animated fadeInUp fast glass-card cyber-glow">
      <q-card-section>
        <div class="flex items-center justify-between">
          <div class="text-h6 text-white">
            <q-icon name="network_check" class="q-mr-sm" />
            Network Protocol
          </div>
          <q-toggle
            v-model="isMainnet"
            @update:model-value="toggleNetwork"
            :label="network"
            color="purple-4"
            size="lg"
          />
        </div>
      </q-card-section>
    </q-card>

    <!-- Contract Creation Section -->
    <contract-creation
      :seed="seed"
      :isCreatingContract="isCreatingContract"
      @update:seed="(value) => seed = value"
      @create-contract="createContract"
      class="q-mb-lg animated fadeInUp"
    />

    <!-- Contract Details Section -->
    <contract-details
      v-if="contractAddress"
      :contractAddress="contractAddress"
      :qrCodeDataUrl="qrCodeDataUrl"
      :formattedBalance="formattedBalance"
      :isLoadingBalance="isLoadingBalance"
      @load-balance="loadBalance"
      class="q-mb-lg animated fadeInUp"
    />

    <!-- Spend Transaction Section -->
    <spend-transaction
      v-if="contractAddress"
      :contractAddress="contractAddress"
      :seed="seed"
      v-model:recipientAddress="recipientAddress"
      v-model:password="password"
      :isSendingTransaction="isSendingTransaction"
      :lastTransactionId="lastTransactionId"
      @send-transaction="sendTransaction"
      @open-explorer="openExplorer"
      @reset-form="resetForm"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useContract } from 'src/composables/useContract'

import ContractCreation from 'src/components/ContractCreation.vue'
import ContractDetails from 'src/components/ContractDetails.vue'
import SpendTransaction from 'src/components/SpendTransaction.vue'

// Use contract composable
const {
  seed,
  contractAddress,
  qrCodeDataUrl,
  balance,
  isCreatingContract,
  isLoadingBalance,
  isMainnet,
  network,
  explorerUrl,
  formattedBalance,
  createContract,
  loadBalance,
  sendTransaction: contractSendTransaction,
  toggleNetwork
} = useContract()

// Local state
const recipientAddress = ref('')
const password = ref('')
const isSendingTransaction = ref(false)
const lastTransactionId = ref('')

// Methods
const sendTransaction = async () => {
  try {
    isSendingTransaction.value = true
    const txid = await contractSendTransaction(recipientAddress.value, password.value)
    if (txid) {
      lastTransactionId.value = txid
    }
  } catch (error) {
    // Error handling is done in the composable
  } finally {
    isSendingTransaction.value = false
  }
}

const openExplorer = () => {
  if (lastTransactionId.value) {
    const url = explorerUrl.value + lastTransactionId.value
    window.open(url, '_blank')
  }
}

const resetForm = () => {
  recipientAddress.value = ''
  password.value = ''
  lastTransactionId.value = ''
}

// Remove auto-create - user must manually create contract
// onMounted(async () => {
//   await createContract()
// })
</script>

<style scoped>
.page-container {
  max-width: 900px;
  padding: 24px;
  margin: 0 auto;
}

.network-card {
  background: linear-gradient(135deg, rgba(187, 134, 252, 0.2) 0%, rgba(3, 218, 198, 0.15) 50%, rgba(15, 15, 35, 0.8) 100%);
  backdrop-filter: blur(30px);
  color: white;
  border: 2px solid rgba(187, 134, 252, 0.4);
  box-shadow: 
    0 10px 35px 0 rgba(187, 134, 252, 0.3),
    inset 0 2px 0 0 rgba(255, 255, 255, 0.2);
}

.network-card {
  transform: translateY(0px) scale(1);
}

.network-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
}

/* Enhanced card animations */
.q-card {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.q-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

/* Staggered animation delays */
/* Cybersecurity Hero Styles */
.hero-section {
  padding: 4rem 0 2rem 0;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-title {
  font-size: clamp(3rem, 8vw, 5rem);
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-weight: 800;
}

.title-light {
  font-weight: 300;
  background: linear-gradient(45deg, #ffffff, #bb86fc);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
}

.floating-text {
  animation: float 4s ease-in-out infinite;
  transform-origin: center;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  max-width: 500px;
}

.hero-cta {
  background: linear-gradient(45deg, #bb86fc, #03dac6);
  border: none;
  box-shadow: 0 8px 32px rgba(187, 134, 252, 0.4);
  transition: all 0.3s ease;
}

.hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(187, 134, 252, 0.6);
}

/* Floating Icons */
.floating-icons-container {
  position: relative;
  height: 400px;
  width: 100%;
}

.floating-icon {
  position: absolute;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(187, 134, 252, 0.3);
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.blockchain-icon {
  top: 10%;
  right: 20%;
  animation: orbit1 8s infinite;
  background: linear-gradient(45deg, rgba(187, 134, 252, 0.2), rgba(3, 218, 198, 0.2));
}

.shield-icon {
  top: 50%;
  right: 10%;
  animation: orbit2 10s infinite;
  background: linear-gradient(45deg, rgba(3, 218, 198, 0.2), rgba(187, 134, 252, 0.2));
  width: 100px;
  height: 100px;
}

.encryption-icon {
  bottom: 30%;
  right: 25%;
  animation: orbit3 7s infinite;
  background: linear-gradient(45deg, rgba(187, 134, 252, 0.15), rgba(255, 255, 255, 0.1));
}

.wallet-icon {
  top: 30%;
  right: 45%;
  animation: orbit4 9s infinite;
  background: linear-gradient(45deg, rgba(3, 218, 198, 0.15), rgba(187, 134, 252, 0.15));
}

.network-icon {
  bottom: 10%;
  right: 40%;
  animation: orbit5 6s infinite;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(3, 218, 198, 0.2));
}

/* Orbital Animations */
@keyframes orbit1 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(20px, -10px) rotate(90deg); }
  50% { transform: translate(0, -20px) rotate(180deg); }
  75% { transform: translate(-20px, -10px) rotate(270deg); }
}

@keyframes orbit2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-30px, 20px) scale(1.1); }
}

@keyframes orbit3 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(15px, -25px) rotate(120deg); }
  66% { transform: translate(-15px, -15px) rotate(240deg); }
}

@keyframes orbit4 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-10px, 15px); }
  50% { transform: translate(10px, 25px); }
  75% { transform: translate(20px, 5px); }
}

@keyframes orbit5 {
  0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
  50% { transform: translate(25px, -15px) rotate(180deg) scale(1.15); }
}

.contract-creation-card {
  animation-delay: 0.2s;
}

.contract-details-card {
  animation-delay: 0.4s;
}

.spend-transaction-card {
  animation-delay: 0.6s;
}
</style>