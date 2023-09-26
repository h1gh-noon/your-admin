<template>
  <div class="layout">
    <SvgIcon iconClass="compass" class="show-menu-icon" :class="{ 'show-menu-icon-closed': !showMenuList }"
      @click="showMenuList = !showMenuList" />
    <Transition appear name="show-menu-transform">
      <div class="layout-left" v-show="showMenuList">
        <div class="left-menu">
          <div class="left-bar"></div>
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
  </div>
</template>
<script setup name="layout-index">
import MenuTree from "./components/MenuTree.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { debounce } from "@/utils";

// import { useAuthStore } from "@/stores/auth";
// const authStore = useAuthStore()
// const keepAliveArr = authStore.cacheRoutesComputed

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

.layout-left {
  height: 100vh;
  width: 230px;
  background-color: $style-bg-color;
}

.left-bar {
  height: 10vh;
}

.left-menu {
  height: calc(100% - 10px);
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
  transition: transform 1s ease-in-out, left 0.5s ease-in-out;

  background-color: $style-bg-color;
  border-radius: 50%;
}

.show-menu-icon:hover {
  transform: rotate(720deg);
}

.show-menu-icon-closed {
  left: 10px;
}

.layout-main {
  flex: 1;
  height: 100vh;
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
  transition: all 0.5s ease-in-out;
}

.show-menu-transform-enter-from {
  width: 0;
  transition: all 0.5s ease-in-out;
}

.show-menu-transform-leave-to {
  width: 0;
  transition: all 0.5s ease-in-out;
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

