<template>
  <div class="layout">

    <SvgIcon iconClass="compass" class="show-menu-icon" :class="{ 'show-menu-icon-closed': !showMenuList }"
      @click="showMenuList = !showMenuList" />
    <Transition appear name="show-menu-transform">
      <div class="layout-left" v-show="showMenuList">
        <div class="left-menu">
          <div class="left-bar">
            <div class="user-info">
              <img class="avatar-img" src="" alt="" :onError="e => e.target.src = errorImg">
              <div>
                {{ userInfoComputed.username }}
              </div>
              <BButton pill size="sm" variant="outline-primary" @click="modalDialogLogout = true">
                <SvgIcon iconClass="logout" />
                退出登录
              </BButton>
            </div>
          </div>
          <MenuTree />
        </div>
      </div>
    </Transition>
    <div class="layout-main">

      <!-- 
        question: 
            not cache, why? 
      -->
      <!-- <RouterView v-slot="{ Component, route }">
        <Transition appear name="fade-transform" mode="out-in">
          <KeepAlive :include="keepAliveArr" :max="20">
            <component :is="Component" :key="route.name" />
          </KeepAlive>
        </Transition>
      </RouterView> -->

      <RouterView v-slot="{ Component, route }">
        <Transition appear name="fade-transform" mode="out-in">
          <KeepAlive>
            <component :is="Component" v-if="route.meta?.keepAlive" :key="route.fullPath" />
          </KeepAlive>
        </Transition>
        <Transition appear name="fade-transform" mode="out-in">
          <component :is="Component" v-if="!route.meta?.keepAlive" :key="route.fullPath" />
        </Transition>
      </RouterView>
    </div>
    <BModal v-model="modalDialogLogout" title="提示" @ok="logoutHandler">
      确认退出登录？
    </BModal>
  </div>
</template>
<script setup name="layout-index">
import MenuTree from "./components/MenuTree.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { debounce } from "@/utils";
import errorImg from "@/assets/avatar_1.jpg";
import { useAuthStore } from "@/stores/auth";
import { logoutApi } from "@/api/baseApi";
import { successToast } from "@/components/Toast";

const authStore = useAuthStore()

// const keepAliveArr = authStore.cacheRoutesComputed

const userInfoComputed = authStore.userInfoComputed
const showMenuList = ref(true)

// window 的宽度
const windowWidth = ref(1000)
// 判断小屏幕
const isSmallWindow = computed(() => windowWidth.value <= 992)
// 小屏幕跳转路由后自动隐藏菜单
const routeChangeResetMenu = () => {
  if (showMenuList.value && isSmallWindow.value) {
    showMenuList.value = false
  }
}
// 重设展示/隐藏菜单
const resetMenu = (innerWidth) => {
  windowWidth.value = innerWidth
  if (isSmallWindow.value) {
    showMenuList.value = false
  } else {
    showMenuList.value = true
  }
}

const logoutHandler = () => {
  logoutApi().then(res => {
    if (res.success) {
      authStore.removeToken()
      successToast()
      router.replace('/login')
    }
  })
}

const modalDialogLogout = ref(false)

onMounted(() => {
  // 初始化
  resetMenu(window.innerWidth)
  const d = debounce((e) => resetMenu(e), 200)
  window.onresize = (e) => {
    d(e.target.innerWidth)
  }
  // 监听路由变化 小屏幕跳转路由后自动隐藏菜单
  watch(useRoute(), routeChangeResetMenu)
})

</script>

<style scoped lang="scss">
.layout {
  display: flex;
  position: relative;
  overflow: hidden;
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 10px 0;

  .avatar-img {
    width: 25%;
    border-radius: 50%;
    transform: rotateY(180deg);
  }
}

.layout-left {
  height: 100vh;
  width: 230px;
  background-color: $style-bg-color;
}

.left-bar {
  min-height: 10vh;
}

.left-menu {
  height: calc(100% - 18px);
  width: 100%;
  margin: 5px 0;
  border-inline-end: 1px solid rgba(5, 5, 5, 0.06);

}

.show-menu-icon {
  position: absolute;
  left: 180px;
  top: 20px;
  z-index: 1000;
  color: $style-color-blue1;
  font-size: 30px;
  cursor: pointer;
  transition: left 0.5s ease, opacity 0.5s ease;

  background-color: $style-bg-color;
  border-radius: 50%;
}

.show-menu-icon-closed {
  left: -18px;
  opacity: 0.6;
}

.layout-main {
  flex: 1;
  height: 100vh;
  overflow: hidden;
}

/* fade-transform transition*/
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter-from {
  opacity: 0;
  transition: all 0.2s;
  transform: translateX(-30%);
}

.fade-transform-leave-to {
  opacity: 0;
  transition: all 0.2s;
  transform: translateX(30%);
}

/* show-menu-transform transition*/
.show-menu-transform-leave-active,
.show-menu-transform-enter-active {
  transition: all 0.5s ease;
}

.show-menu-transform-enter-from {
  width: 0;
  opacity: 0;
  transition: all 0.5s ease;
}

.show-menu-transform-leave-to {
  width: 0;
  opacity: 0;
  transition: all 0.5s ease;
}


/* 中等屏幕（桌面显示器，小于等于 992px） */
@media (max-width:992px) {
  .layout-left {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;

    background-color: $style-bg-color;
  }
}
</style>

