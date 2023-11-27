<template>
  <BTableSimple class="table-template table-template-hasPagination" borderless stickyHeader hover small caption-top
    responsive>
    <BThead>
      <BTr>
        <slot v-if="slotThead" name="thead" />
        <TableHeadSort v-else-if="tableThead" :tableThead="tableThead" @sortChange="sortChange" />
      </BTr>
    </BThead>
    <BTbody>
      <slot />
    </BTbody>
  </BTableSimple>
</template>
<script setup name="table-template">
import { useSlots } from "vue";
import TableHeadSort from "./TableHeadSort.vue";

/** 
 * thead可选插槽注入
 * tbody须以插槽形式注入
 * 
 * props
 * thead中 指定$sort字段来展示排序按钮 sort_down降序/sort_up升序
 * @param Array thead: [
 *       { key: 'username', label: '姓名' },
 *       { key: 'age', label: '年龄', $sort: 'sort_down' }
 * ]
 * 
 * Event
 * sortChange: 点击排序按钮触发 return：{ key: '', $sort: '' }
 * 
 */

const props = defineProps({
  tableThead: {
    type: Array,
    default: null
  }
})
const emit = defineEmits(['sortChange'])

const slotThead = !!useSlots().thead

const sortChange = (e) => {
  emit('sortChange', e)
}


</script>
<style lang="scss" scoped>
.table-template-hasPagination {
  max-height: calc(100% - 120px);
}

.table-template {
  white-space: nowrap;
}
</style>
