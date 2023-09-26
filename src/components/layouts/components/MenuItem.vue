
<template>
  <template v-if="showDropFlag">
    <div class="menu-title" @click="itemRoute.visible = !itemRoute.visible">
      <SvgIcon :iconClass="itemRoute?.meta?.icon" />
      <div class="menu-title-text" :title="itemRoute.meta?.title ?? ''">
        {{ itemRoute.meta?.title ?? '' }}
      </div>
      <SvgIcon iconClass="down" style="transition: transform 0.5s;" :class="{ 'icon-down-actived': itemRoute.visible }" />
    </div>
    <BCollapse v-model="itemRoute.visible">
      <MenuItem v-for="child in itemRoute.children" :key="child.name" :itemRoute="child" :basePath="itemRoute.path"
        @showMenuGroup="itemRoute.visible = true" />
    </BCollapse>
  </template>
  <template v-else>
    <RouterLink :to="pathReslove" class="menu-link">
      <div class="menu-title" :class="{ 'menu-title-actived': isActivedRoute }">
        <SvgIcon :iconClass="itemRoute?.meta?.icon" />
        <div class="menu-title-text" :title="itemRoute.meta?.title ?? ''">
          {{ itemRoute.meta?.title ?? '' }}
        </div>
      </div>
    </RouterLink>
  </template>
</template>
<script setup name="menu-item">
import { computed, onMounted, toRefs, watchEffect } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  itemRoute: {
    type: Object,
    required: true
  },
  basePath: {
    type: String,
    default: ''
  },
  showMenuGroup: {
    type: Function,
    default: () => { }
  }
})
const { itemRoute, basePath } = toRefs(props)
const emit = defineEmits(['showMenuGroup'])
const route = useRoute()

// 有children并且不止一个hidden为false的
const showDropFlag = computed(() => !!itemRoute.value.children)

const currentPath = computed(() => route.fullPath)
const pathReslove = computed(() => showDropFlag.value ? '' : (basePath.value + "/" + itemRoute.value.path).replace(/\/\//, "/"))
const isActivedRoute = computed(() => currentPath.value === pathReslove.value)
watchEffect(() => {
  // 展开父级菜单
  isActivedRoute.value && emit('showMenuGroup')
})
</script>

<style scoped lang="scss">
.menu-title {
  padding-left: 6%;
  height: 40px;
  line-height: 40px;
  // margin: 0 2%;
  cursor: pointer;
  border-radius: 12px;

  display: flex;
  align-items: center;

}

.menu-title:hover {
  background-color: $style-color-blue1;
  color: $style-text-color-inverse;
}

.menu-title-actived {
  // background-color: $style-color-blue1;
  color: $style-color-blue2;
}

.menu-title-text {
  display: inline-block;
  margin-left: 2%;

  width: 75%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.icon-down-actived {
  transform: rotateX(180deg);
}

.menu-link {
  text-decoration: none;
  color: inherit;
}

.menu-child {
  // padding-left: 20px;
}
</style>
