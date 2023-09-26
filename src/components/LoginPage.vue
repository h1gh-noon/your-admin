<template>
  <div class="login">
    login

    <BButton variant="success" @click="loginHandler">login in</BButton>
    <div style="height: 500px;">
      <div style="height: 2000px;"></div>
    </div>
  </div>
</template>

<script setup name="login">
import { useRoute } from "vue-router";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";

const route = useRoute()
const redirectPath = route.query.redirect ?? '/'

const loginHandler = () => {
  // login in
  useAuthStore().setToken('ss')
  
  router.replace(redirectPath)
}
</script>

<style scoped lang="scss"></style>
