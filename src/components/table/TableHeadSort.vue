<template>
  <BTh v-for="item in tableThead" class="thead-item sticky-header-top" :sticky-column="item.stickyColumn"
    variant="primary" :key="item.key" :class="[{ 'cur-pointer': item.$sort }, item.stickyColumn]"
    @click="sortChange(item)">
    {{ item.label }}
    <SvgIcon v-if="item.$sort" :iconClass="typeof item.$sort === 'string' ? item.$sort : 'sort'"
      :class="item.$sort === 'sort_up' ? 'up-sort' : ''" />
  </BTh>
</template>
<script setup name="table-head-sort">
/** 
 * 
 * props
 * tableThead中 指定$sort字段来展示排序按钮 sort_down降序/sort_up升序
 * @param Array tableThead: [
 *     { key: 'username', label: '姓名' }
 *     { key: 'age', label: '年龄', $sort: 'sort_down' }
 * ]
 * $sort: true可排序字段(处于不参与排序状态) sort_down降序/sort_up升序
 * 
 * Event
 * sortChange: 点击排序按钮触发 return：{ key: '', $sort: '' }
 * 
 */

const props = defineProps({
  tableThead: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['sortChange'])

const sortChange = (e) => {
  if (e.$sort) {
    const data = {
      key: e.key
    }
    // 切换顺序
    if (e.$sort === 'sort_down') {
      // 降序改为升序
      data.$sort = 'sort_up'
    } else if (e.$sort === 'sort_up') {
      // 升序改为不参与排序
      data.$sort = true
    } else {
      // 不参与排序改为降序
      data.$sort = 'sort_down'
    }
    emit('sortChange', data)
  }
}


</script>
<style lang="scss" scoped>
@import url(./table.scss);

.table-template-hasPagination {
  height: calc(100vh - 125px);
}

.cur-pointer {
  cursor: pointer;
}
</style>
