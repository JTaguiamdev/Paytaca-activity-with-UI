<template>
  <transition
    appear
    enter-active-class="animated fadeInUp"
    leave-active-class="animated fadeOutDown"
  >
    <q-card class="contract-details-card glass-card" v-if="contractAddress">
      <q-card-section class="bg-secondary text-white card-header">
        <div class="text-h6 flex items-center">
          <q-icon name="account_balance_wallet" size="md" class="q-mr-sm float" />
          Contract Details
        </div>
      </q-card-section>
      
      <q-card-section>
        <div class="column q-gutter-lg">
          <!-- Contract Address -->
          <div class="address-section">
            <div class="text-subtitle2 text-white q-mb-sm">Contract Address</div>
            <q-input
              :model-value="contractAddress"
              readonly
              outlined
              class="address-input"
            >
              <template v-slot:append>
                <q-btn
                  flat
                  round
                  icon="content_copy"
                  @click="copyAddress"
                  color="primary"
                  size="sm"
                />
              </template>
            </q-input>
          </div>
          
          <!-- QR Code -->
          <div class="qr-section text-center" v-if="qrCodeDataUrl">
            <div class="text-subtitle2 text-white q-mb-md">QR Code</div>
            <transition
              appear
              enter-active-class="animated zoomIn slow"
              leave-active-class="animated zoomOut"
            >
              <div class="qr-container pulse">
                <img :src="qrCodeDataUrl" alt="Contract Address QR Code" class="qr-image" />
              </div>
            </transition>
          </div>
          
          <!-- Balance -->
          <div class="balance-section">
            <div class="text-subtitle2 text-white q-mb-sm">Balance</div>
            <div class="balance-display">
              <div v-if="isLoadingBalance" class="flex items-center loading-shimmer">
                <q-spinner-dots color="primary" size="2em" class="q-mr-sm" />
                <span class="text-body1">Loading balance...</span>
              </div>
              <div v-else class="balance-text animated bounceIn">
                {{ formattedBalance }}
              </div>
            </div>
            <q-btn
              flat
              round
              icon="refresh"
              @click="loadBalance"
              color="primary"
              size="sm"
              class="refresh-btn"
              :loading="isLoadingBalance"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </transition>
</template>

<script setup>
import { copyToClipboard } from 'quasar'
import { Notify } from 'quasar'

const props = defineProps({
  contractAddress: String,
  qrCodeDataUrl: String,
  formattedBalance: String,
  isLoadingBalance: Boolean
})

const emit = defineEmits(['load-balance'])

const copyAddress = async () => {
  try {
    await copyToClipboard(props.contractAddress)
    Notify.create({
      type: 'positive',
      message: 'Address copied to clipboard!',
      position: 'top'
    })
  } catch (error) {
    Notify.create({
      type: 'negative',
      message: 'Failed to copy address',
      position: 'top'
    })
  }
}

const loadBalance = () => {
  emit('load-balance')
}
</script>

<style scoped>
/* Using custom animations from app.scss */

.contract-details-card {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  animation-delay: 0.4s;
  transform: translateY(0px) scale(1);
}

.contract-details-card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.card-header {
  background: linear-gradient(135deg, rgba(156, 39, 176, 0.9), rgba(233, 30, 99, 0.9)) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
}

.address-input {
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.qr-container {
  display: inline-block;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.25),
    inset 0 2px 0 0 rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
  transform: scale(1);
}

.qr-container:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 
    0 12px 40px 0 rgba(31, 38, 135, 0.35),
    inset 0 2px 0 0 rgba(255, 255, 255, 0.7);
}

.qr-image {
  max-width: 200px;
  height: auto;
  border-radius: 8px;
}

.balance-section {
  position: relative;
}

.balance-display {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(15px);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 6px 25px 0 rgba(31, 38, 135, 0.2),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
}

.balance-text {
  font-size: 1.1em;
  font-weight: 500;
  color: #1976D2;
}

.refresh-btn {
  position: absolute;
  top: -8px;
  right: -8px;
}

/* Shimmer animation for loading balance */
.balance-display:has(.q-spinner-dots) {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>