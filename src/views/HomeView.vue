<template>
  <main>
    <BButton variant="primary" @click="show = !show">Click me</BButton>
    <BModal v-model="show">Test</BModal>
    <BButton variant="primary" @click="visible = !visible">Click me</BButton>
    <BCollapse v-model="visible">
      ssssss
    </BCollapse>

    <BButton variant="link">Link</BButton>
    <BButton variant="primary" @click="sendRequest">send request</BButton>
  </main>
</template>
<script setup name="home-view">
import { ref } from "vue";
import { testApi } from "@/api/baseApi";

const show = ref(false)
const visible = ref(false)
const sendRequest = () => {
  testApi('testUrl')
}
</script>
