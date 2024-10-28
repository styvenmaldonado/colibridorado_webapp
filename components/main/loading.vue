<script setup lang="ts">
defineProps<{
  isLoading: boolean;
}>();
</script>
<template>
  <Teleport to="body" v-if="isLoading">
    <div
      v-if="isLoading"
      style="z-index: 9999"
      class="fixed left-0 top-0 flex w-screen h-screen bg-slate-800 opacity-60"
    >
      <div class="m-auto">
        <v-progress-circular
          color="primary"
          indeterminate
          :size="110"
          :width="9"
        ></v-progress-circular>
      </div>
    </div>
  </Teleport>
</template>
