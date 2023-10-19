<template>
  <BTableSimple class="table-template" :class="'table-template-hasPagination'" bordered stickyHeader hover small
    caption-top responsive>
    <BThead variant="primary">
      <BTr>
        <slot v-if="slotThead" name="thead" />
        <TableHeadSort v-else-if="tableList && tableList.thead" :thead="tableList.thead" />
      </BTr>
    </BThead>
    <BTbody>
      <slot v-if="slotDefault" />
      <BTr v-else-if="tableList && tableList.thead && tableList.tbody" v-for="(item, index) in tableList.tbody" :variant="index % 2 === 0 ? 'info' : ''">
        <BTd>80</BTd>
        <BTd>12</BTd>
        <BTd>19</BTd>
      </BTr>
    </BTbody>
  </BTableSimple>
</template>
<script setup name="table-template">
import { reactive, ref, useSlots } from "vue";
import TableHeadSort from "./TableHeadSort.vue";

/** props
 * 
 * 无插槽模式
 * thead中 指定sort字段来展示排序按钮 desc降序/asc升序
 * @param Object tableList: {
 *    @param Array thead: [
 *          { key: 'username', label: '姓名' }
 *          { key: 'age', label: '年龄', sort: 'desc' }
 *    ],
 *    @param Array (必须指定thead) tbody: [
 *          { username: '张三', age: 20 }
 *    ]
 * }
 * 
 */

const props = defineProps({
  tableList: {
    type: Object,
    default: () => null
  }
})

const slotThead = !!useSlots().thead
const slotDefault = !!useSlots().default



const tableLoading = ref(true)


</script>
<style lang="scss" scoped>
.table-template-hasPagination {
  height: calc(100vh - 125px);
}
</style>
