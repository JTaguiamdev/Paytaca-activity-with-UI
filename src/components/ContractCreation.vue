<template>
  <q-card class="contract-creation-card animated fadeInUp">
    <q-card-section class="bg-primary text-white card-header">
      <div class="text-h6 flex items-center">
        <q-icon name="add_circle_outline" size="md" class="q-mr-sm pulse" />
        Create Contract Instance
      </div>
    </q-card-section>
    
    <q-card-section>
      <div class="column q-gutter-md">
        <q-input
          :model-value="seed"
          @update:model-value="$emit('update:seed', $event)"
          label="Seed Parameter"
          type="number"
          outlined
          :rules="[val => val !== null && val !== '' || 'Seed is required']"
          hint="Enter a number for the contract constructor"
          :disable="isCreatingContract"
          placeholder="Enter seed value"
          hide-spinner
        >
          <template v-slot:prepend>
            <q-icon name="vpn_key" />
          </template>
        </q-input>
        
        <q-btn
          @click="createContract"
          label="Create Contract Instance"
          color="primary"
          size="lg"
          :loading="isCreatingContract"
          :disable="!seed"
          class="create-btn pulse"
        >
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Creating...
          </template>
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
const props = defineProps({
  seed: Number,
  isCreatingContract: Boolean
})

const emit = defineEmits(['update:seed', 'create-contract'])

const createContract = () => {
  emit('create-contract')
}
</script>

<style scoped>
.contract-creation-card {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  animation-delay: 0.2s;
  transform: translateY(0px) scale(1);
}

.contract-creation-card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.card-header {
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.9), rgba(66, 165, 245, 0.9)) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
}

.create-btn {
  border-radius: 12px;
  transition: all 0.3s ease;
  background: linear-gradient(45deg, #1976D2, #42A5F5);
  transform: translateY(0px);
}

.create-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(25, 118, 210, 0.4);
  animation: pulse 1.5s ease-in-out infinite;
}

.create-btn:active {
  transform: translateY(-1px);
}

.q-icon.pulse:hover {
  animation: pulse 2s infinite;
}
</style>