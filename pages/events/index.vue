<script setup lang="ts">
definePageMeta({middleware: "authentication"});
import Sidebar from '~/layouts/Sidebar.vue';
</script>

<template>
  <div class="h-screen w-screen flex">
    <Sidebar/>
    <events/>
  </div>
</template>