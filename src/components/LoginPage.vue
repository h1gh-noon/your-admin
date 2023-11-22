<template>
  <div class="login">
    <BContainer class="form-fields">
      <BRow>
        <BCol class="text-center">
          <BFormGroup description="Let us know your name." label="username" label-for="input-floating-1" valid-feedback=""
            :invalid-feedback="floatingInvalidUsername" :state="floatingStateUsername" floating>
            <BFormInput v-model="data.username" :state="floatingStateUsername" trim placeholder="" />
          </BFormGroup>
        </BCol>
      </BRow>
      <BRow>
        <BCol class="text-center">
          <BFormGroup description="Let us know your password." label="password" label-for="input-floating-1"
            valid-feedback="Thank you!" :invalid-feedback="floatingInvalidPasswd" :state="floatingStatePasswd" floating>
            <BFormInput v-model="data.password" type="password" :state="floatingStatePasswd" trim
              placeholder="Enter your password please" />
          </BFormGroup>
        </BCol>
      </BRow>
      <BRow>
        <BCol class="text-center">
          <BButton variant="primary" @click="loginHandler">Login in</BButton>
        </BCol>
      </BRow>

    </BContainer>
    <!-- <div class="h-100 container d-flex align-items-center justify-content-center">
    <div class="row g-1 text-center">
      <BFormGroup description="Let us know your name." label="username" label-for="input-floating-1" valid-feedback=""
        :invalid-feedback="floatingInvalidFeedback" :state="floatingState" floating>
        <BFormInput v-model="data.username" :state="floatingState" trim placeholder="Enter your name please" />
      </BFormGroup>
      <BFormGroup description="Let us know your password." label="password" label-for="input-floating-1"
        valid-feedback="Thank you!" :invalid-feedback="floatingInvalidFeedback" :state="floatingState" floating>
        <BFormInput v-model="data.username" :state="floatingState" trim placeholder="Enter your password please" />
      </BFormGroup>
      <div class="col-12 text-center">
        <BButton variant="primary" @click="loginHandler">Login in</BButton>
      </div>
    </div>
  </div> -->

  </div>
</template>

<script setup name="login">
import { useRoute } from "vue-router";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { ref, computed, reactive } from "vue";
import md5 from "js-md5";


const route = useRoute()
const redirectPath = route.query.redirect ?? '/'


const data = reactive({
  username: 'admin',
  password: 'admin'
})

const floatingStateUsername = computed(() => data.username.length >= 4)
const floatingStatePasswd = computed(() => data.password.length >= 4)
const floatingInvalidUsername = computed(() =>
  data.username.length > 0 ? 'Enter at least 4 characters.' : ''
)
const floatingInvalidPasswd = computed(() =>
  data.password.length > 0 ? 'Enter at least 4 characters.' : ''
)

const loginHandler = async () => {
  try {
    // login in
    const d = {
      username: data.username,
      password: md5(data.password).toUpperCase()
    }
    await useAuthStore().loginHandler(d)
    router.replace(redirectPath)
  } catch (error) {
    console.log(error)
  }

}
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-fields {
  width: 460px;
}
</style>
