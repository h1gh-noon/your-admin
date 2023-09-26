<template>
  <svg :class="svgClass" aria-hidden="true" v-if="iconClass">
    <use :xlink:href="iconName" />
  </svg>
  <div v-else :class="svgClass"></div>
</template>

<script setup name="svg-icon">
import { computed } from 'vue'

const props = defineProps({
  iconClass: String,
  className: String
})

const iconName = computed(() => `#icon-${props.iconClass}`)
const svgClass = computed(() => {
  if (props.className) {
    return 'svg-icon-' + props.className
  } else {
    return 'svg-icon'
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1.3em;
  height: 1.3em;
  vertical-align: -0.3em;
  fill: currentColor;
  overflow: hidden;
}
</style>