<template>
  <BTh v-for="item in thead" :key="item.key">{{ item.label }}</BTh>
</template>
<script setup name="table-head-sort">
import { reactive, ref } from "vue";

/** props
 * 
 * thead中 指定sort字段来展示排序按钮 desc降序/asc升序
 * @param Array thead: [
 *     { key: 'username', label: '姓名' }
 *     { key: 'age', label: '年龄', sort: 'desc' }
 * ]
 * 
 */

const props = defineProps({
  thead: {
    type: Array,
    required: true
  }
})



</script>
<style lang="scss" scoped>
.table-template-hasPagination {
  height: calc(100vh - 125px);
}
</style>
