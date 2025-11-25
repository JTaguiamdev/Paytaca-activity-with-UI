<template>
  <q-card class="spend-transaction-card animated fadeInUp glass-card" v-if="contractAddress">
    <q-card-section class="bg-accent text-white card-header">
      <div class="text-h6 flex items-center">
        <q-icon name="send" size="md" class="q-mr-sm float" />
        Spend Transaction
      </div>
    </q-card-section>
    
    <q-card-section>
      <q-form @submit="onSubmit" class="column q-gutter-md">
        <!-- Recipient Address -->
        <q-input
          v-model="recipientAddress"
          label="Recipient Address"
          outlined
          :rules="addressRules"
          hint="Enter the BCH address to send funds to"
          :disable="isSendingTransaction"
        >
          <template v-slot:prepend>
            <q-icon name="account_balance_wallet" />
          </template>
        </q-input>
        
        <!-- Password -->
        <q-input
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          outlined
          :rules="passwordRules"
          :hint="`Enter the password (hint: ${99999 - seed})`"
          :disable="isSendingTransaction"
          hide-spinner
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              @click="showPassword = !showPassword"
              color="white"
              size="sm"
              class="cursor-pointer password-toggle"
            />
          </template>
        </q-input>
        
        <!-- Send Button -->
        <q-btn
          type="submit"
          label="Send Transaction"
          color="accent"
          size="lg"
          :loading="isSendingTransaction"
          :disable="!recipientAddress || !password"
          class="send-btn pulse"
        >
          <template v-slot:loading>
            <q-spinner-clock class="on-left" />
            Sending...
          </template>
        </q-btn>
        
        <!-- Transaction Result -->
        <transition
          appear
          enter-active-class="animated bounceIn slow"
          leave-active-class="animated bounceOut"
        >
          <div v-if="lastTransactionId" class="transaction-result success-glow">
            <q-separator class="q-my-md" />
            <div class="text-subtitle2 text-green-8 q-mb-sm flex items-center">
              <q-icon name="check_circle" class="q-mr-sm" />
              Transaction Successful!
            </div>
            
            <q-input
              :model-value="lastTransactionId"
              label="Transaction ID"
              readonly
              outlined
              class="txid-input"
            >
              <template v-slot:append>
                <q-btn
                  flat
                  round
                  icon="content_copy"
                  @click="copyTxId"
                  color="primary"
                  size="sm"
                />
              </template>
            </q-input>
            
            <q-btn
              @click="openExplorer"
              label="View in Explorer"
              color="primary"
              outline
              class="full-width q-mt-md explorer-btn"
              icon="open_in_new"
            />
            
            <q-btn
              @click="resetForm"
              label="Send Another Transaction"
              color="secondary"
              flat
              class="full-width q-mt-sm"
              icon="refresh"
            />
          </div>
        </transition>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { copyToClipboard } from 'quasar'
import { Notify } from 'quasar'

// Password visibility state
const showPassword = ref(false)

const props = defineProps({
  contractAddress: String,
  seed: Number,
  recipientAddress: String,
  password: String,
  isSendingTransaction: Boolean,
  lastTransactionId: String
})

const emit = defineEmits([
  'update:recipientAddress',
  'update:password', 
  'send-transaction',
  'open-explorer',
  'reset-form'
])

// Form validation rules
const addressRules = [
  val => !!val || 'Recipient address is required',
  val => val.startsWith('bitcoincash:') || val.startsWith('bchtest:') || 'Address must start with bitcoincash: or bchtest:',
  val => val.length > 20 || 'Address appears too short',
  val => {
    // Basic BCH address validation
    const addressRegex = /^(bitcoincash:|bchtest:)[a-km-z02-9]{42,}$/i
    return addressRegex.test(val) || 'Invalid BCH address format'
  }
]

const passwordRules = [
  val => val !== null && val !== '' || 'Password is required',
  val => !isNaN(val) || 'Password must be a number',
  val => Number(val) >= 0 || 'Password must be positive',
  val => Number.isInteger(Number(val)) || 'Password must be a whole number'
]

// Form submission
const onSubmit = () => {
  emit('send-transaction')
}

// Copy transaction ID
const copyTxId = async () => {
  try {
    await copyToClipboard(props.lastTransactionId)
    Notify.create({
      type: 'positive',
      message: 'Transaction ID copied to clipboard!',
      position: 'top'
    })
  } catch (error) {
    Notify.create({
      type: 'negative',
      message: 'Failed to copy transaction ID',
      position: 'top'
    })
  }
}

// Open explorer
const openExplorer = () => {
  emit('open-explorer')
}

// Reset form
const resetForm = () => {
  emit('reset-form')
}

// Reactive bindings for v-model
const recipientAddress = computed({
  get: () => props.recipientAddress,
  set: (value) => emit('update:recipientAddress', value)
})

const password = computed({
  get: () => props.password,
  set: (value) => emit('update:password', value)
})
</script>

<style scoped>
/* Using custom animations from app.scss */

.spend-transaction-card {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  animation-delay: 0.6s;
  transform: translateY(0px) scale(1);
}

.spend-transaction-card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.card-header {
  background: linear-gradient(135deg, rgba(255, 87, 34, 0.9), rgba(255, 152, 0, 0.9)) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
}

.send-btn {
  border-radius: 12px;
  transition: all 0.3s ease;
  background: linear-gradient(45deg, #FF5722, #FF9800);
  transform: translateY(0px);
}

.send-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 87, 34, 0.4);
  animation: pulse 1.5s ease-in-out infinite;
}

.send-btn:active {
  transform: translateY(-1px);
}

.password-toggle {
  transition: opacity 0.2s ease;
  cursor: pointer;
}

.password-toggle:active {
  opacity: 0.7;
}

.transaction-result {
  background: linear-gradient(135deg, rgba(232, 245, 233, 0.9), rgba(240, 255, 240, 0.9));
  backdrop-filter: blur(25px);
  padding: 24px;
  border-radius: 20px;
  border: 2px solid rgba(76, 175, 80, 0.6);
  box-shadow: 
    0 8px 35px rgba(76, 175, 80, 0.4),
    inset 0 2px 0 0 rgba(255, 255, 255, 0.5);
}

.txid-input {
  font-family: 'Courier New', monospace;
  font-size: 0.85em;
}

.explorer-btn {
  transition: all 0.3s ease;
}

.explorer-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
}

/* Error shake animation */
.q-field--error .q-field__control {
  animation: shake 0.5s ease-in-out;
  border-color: #f44336 !important;
  box-shadow: 0 0 10px rgba(244, 67, 54, 0.3);
}

.q-field--error .q-field__label {
  color: #f44336 !important;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
}
</style>