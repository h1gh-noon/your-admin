
<template>
  <div class="menu-tree">
    <div class="menu-item" v-for="item in  routeList " :key="item.name">
      <MenuItem :itemRoute="item" />
    </div>
  </div>
</template>
<script setup name="menu-tree">
import MenuItem from "./MenuItem.vue";

import { useAuthStore } from "@/stores/auth";
import { reactive } from "vue";

const filterRouteHiddenHandler = (arr) => {
  return arr ? arr.reduce((acc, cur) => {
    if (!cur.hidden && cur.name) {
      if (cur.children) {
        const children = filterRouteHiddenHandler(cur.children)
        if (children.length) {
          cur.children = children
          cur.visible = false
        } else {
          delete cur.children
        }
      }
      if (cur.children && cur.children.length === 1) {
        const routeItem = cur.children[0]
        routeItem.path = cur.path + "/" + routeItem.path
        acc.push(routeItem)
      } else {
        acc.push(cur)
      }
    }
    return acc
  }, []) : []
}

const routeList = reactive(
  filterRouteHiddenHandler(useAuthStore().routeListComputed)
)

</script>

<style scoped lang="scss">
.menu-tree {
  height: 100%;
  padding-bottom: 10px;
  border-top: 1px solid rgba(5, 5, 5, 0.06);
  overflow-y: auto;

}

.menu-item {
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
}

.menu-title {
  padding-left: 6%;
  height: 6vh;
  line-height: 6vh;
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


.menu-child {
  // padding-left: 20px;
}
</style>
