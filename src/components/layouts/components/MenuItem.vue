
<template>
  <template v-if="showDropFlag">
    <div class="menu-title menu-title-dropdown" @click="itemRoute.visible = !itemRoute.visible">
      <SvgIcon :iconClass="itemRoute?.meta?.icon" />
      <div class="menu-title-text dropdown-title-text" :title="itemRoute.meta?.title ?? ''">
        {{ itemRoute.meta?.title ?? '' }}
      </div>
      <SvgIcon iconClass="down" style="transition: transform 0.2s;" :class="{ 'icon-down-actived': itemRoute.visible }" />
    </div>
    <BCollapse v-model="itemRoute.visible">
      <MenuItem v-for="child in itemRoute.children" :key="child.name" :itemRoute="child" :basePath="itemRoute.path"
        @showMenuGroup="itemRoute.visible = true" />
    </BCollapse>
  </template>
  <template v-else>
    <RouterLink :to="pathReslove" class="menu-link">
      <div class="menu-title" :class="{ 'menu-title-actived': isActivedRoute }">
        <SvgIcon :iconClass="showItem?.meta?.icon" />
        <div class="menu-title-text" :title="showItem.meta?.title ?? ''">
          {{ showItem.meta?.title ?? '' }}
        </div>
      </div>
    </RouterLink>
  </template>
</template>
<script setup name="menu-item">
import { computed, toRefs, watchEffect } from "vue";
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

// 有children并且不止一个(hidden为false的)
const showDropFlag = computed(() => !!itemRoute.value.children && itemRoute.value.children.length !== 1)
// 仅有一个children 直接展示
const onlyOneChildFlag = computed(() => !!itemRoute.value.children && itemRoute.value.children.length === 1)

const currentPath = computed(() => route.fullPath)
// 处理路径
const pathReslove = computed(
  () => {
    const path = onlyOneChildFlag.value
      ? (basePath.value + '/' + itemRoute.value.path + '/' + itemRoute.value.children?.[0].path)
      : (basePath.value + '/' + itemRoute.value.path)

    return path.replace(/\/\//g, '/').replace(/\/\//g, '/')
  }
)
// 展示的数据
const showItem = computed(() => onlyOneChildFlag.value ? itemRoute.value.children[0] : itemRoute.value)

// 是否为当前路由(高亮)
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

.dropdown-title-text {
  font-weight: bold;
}

.menu-title-dropdown {
  color: #15559a;
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
