<template>
  <div class="page-content">
    <TableTemplate :table-thead="tableList.thead" @sortChange="sortChange">
      <!-- <template #thead>
        <BTh>Clothes</BTh>
        <BTh>Accessories</BTh>
        <BTh>Accessories</BTh>
      </template> -->
      <template v-if="tableList.tbody.length">
        <BTr v-for="(item, index) in tableList.tbody" :key="item.id" :variant="index % 2 ? 'info' : ''">
          <BTd v-for="theadItem in tableList.thead" :key="`${item.id}-${theadItem.key}`">{{ item[theadItem.key] }}</BTd>
        </BTr>
      </template>
      <BTd v-else :colspan="tableList.thead && tableList.thead.length || 0">
        <div class="text-center">暂无数据...</div>
      </BTd>
    </TableTemplate>
    <TablePagination :total="paginationData.total" :current-page="paginationData.currentPage"
      :page-size="paginationData.pageSize" @paginationChange="paginationChange" />
  </div>
</template>
<script setup name="table-demo">
import TablePagination from "@/components/table/TablePagination.vue"
import TableTemplate from "@/components/table/TableTemplate.vue";
import { reactive } from "vue";


const paginationData = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 500
})
const tableList = reactive({
  thead: [
    { key: 'username', label: '姓名' },
    { key: 'age', label: '年龄', $sort: 'sort_down' }
  ],
  tbody: [
    { id: 1, username: '张三', age: 20 }
  ]
})

const paginationChange = (currentPage, pageSize) => {
  paginationData.currentPage = currentPage ?? paginationData.currentPage
  paginationData.pageSize = pageSize ?? paginationData.pageSize
}

const sortChange = (e) => {
  tableList.thead.forEach(item => {
    if (item.$sort) {
      if (e.key === item.key) {
        item.$sort = e.$sort
      } else {
        item.$sort = true
      }
    }
  })
}
</script>
