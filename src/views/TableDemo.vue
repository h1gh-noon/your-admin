<template>
  <div class="page-content">
    <div class="page-filter-group">
      <div class="page-filter-left">
        <div class="page-filter-item">
          <BButton pill variant="outline-primary">
            <div>
              <SvgIcon iconClass="add" />
              新增
            </div>
          </BButton>
        </div>
        <div class="page-filter-item">
          <BButton pill variant="outline-primary">
            <div>
              <SvgIcon iconClass="add" />
              批量删除
            </div>
          </BButton>
        </div>
        <div class="page-filter-item">
          <BButton pill variant="outline-primary">
            <div>
              <SvgIcon iconClass="add" />
              导出
            </div>
          </BButton>
        </div>
      </div>
      <div class="page-filter-right">
        <div class="page-filter-item">
          <BInputGroup prepend="姓名">
            <BFormInput />
          </BInputGroup>
        </div>
        <div class="page-filter-item">
          <BInputGroup prepend="地址">
            <BFormInput />
          </BInputGroup>
        </div>
        <div class="page-filter-item">
          <BButton variant="primary">搜索</BButton>
        </div>
      </div>
    </div>
    <TableTemplate :table-thead="tableList.thead" @sortChange="sortChange">
      <!-- <template #thead>
        <BTh>Clothes</BTh>
        <BTh>Accessories</BTh>
        <BTh>Accessories</BTh>
      </template> -->
      <template v-if="tableList.tbody.length">
        <BTr v-for="(item, index) in tableList.tbody" :key="item.id" :variant="index % 2 ? 'info' : ''">
          <BTd>{{ item.username }}</BTd>
          <BTd>{{ item.age }}</BTd>
          <BTd>{{ item.addr }}</BTd>
          <BTd style="width: 135px;">
            <BButton variant="primary" class="me-md-2">编辑</BButton>
            <BButton variant="danger">删除</BButton>
          </BTd>
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
    { key: 'age', label: '年龄', $sort: 'sort_down' },
    { key: 'addr', label: '地址' },
    { key: 'option', label: '操作' }
  ],
  tbody: [
    { id: 1, username: '李四', age: 18, addr: '成华区二仙桥' },
  ]
})
// 模拟数据
for (let index = 3; index < 100; index++) {
  tableList.tbody.push(
    { id: index, username: '张三', age: 20, addr: '成华区二仙桥' }
  )
}

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

<style lang="scss" scoped>
.page-content {
  height: 100%;
}

</style>
