<template>
  <!-- <header>
  </header> -->
  <BToaster />
  <RouterView />
</template>
<script setup name="app">
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore()
const keepAliveArr = authStore.cacheRoutesComputed

</script>