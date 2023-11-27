<template>
  <div class="page-content">
    <BOverlay :show="showLoading" class="overflow-hidden" rounded="sm" opacity="0.8" variant="light"
      spinner-variant="primary">
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
        </div>
        <div class="page-filter-right">
          <div class="page-filter-item">
            <BInputGroup prepend="用户名">
              <BFormInput v-model="searchField.username" />
            </BInputGroup>
          </div>
          <div class="page-filter-item">
            <BInputGroup prepend="昵称">
              <BFormInput v-model="searchField.nickname" />
            </BInputGroup>
          </div>
          <div class="page-filter-item">
            <BInputGroup prepend="手机号">
              <BFormInput v-model="searchField.phone" />
            </BInputGroup>
          </div>
          <div class="page-filter-item">
            <BButton variant="primary" @click="searchHandler">搜索</BButton>
          </div>
        </div>
      </div>
      <div class="overflow-auto">
        <TableTemplate :table-thead="tableList.thead" @sortChange="sortChange">
          <template v-if="tableList.tbody.length">
            <BTr v-for="(item, index) in tableList.tbody" :key="item.id" :variant="index % 2 ? 'info' : ''">
              <BTd class="sticky-left">{{ item.username }}</BTd>
              <BTd>{{ item.nickname }}</BTd>
              <BTd>
                <BPopover v-if="item.headimgurl" :content="item.headimgurl">
                  <BImg thumbnail fluid :src="item.headimgurl" alt="" />
                </BPopover>
                <span :style="{ cursor: item.headimgurl ? 'pointer' : '' }"> {{ item.headimgurl ? '查看' : '-' }} </span>
              </BTd>
              <BTd>{{ item.phone }}</BTd>
              <BTd>{{ item.permissions }}</BTd>
              <BTd>{{ item.status === 1 ? '启用' : '禁用' }}</BTd>
              <BTd>{{ item.createTime }}</BTd>
              <BTd style="width: 135px;" class="sticky-right">
                <BButton variant="primary" class="me-md-2" size="sm">编辑</BButton>
                <BButton variant="danger" size="sm">删除</BButton>
              </BTd>
            </BTr>
          </template>
          <BTd v-else :colspan="tableList.thead && tableList.thead.length || 0">
            <div class="text-center">暂无数据...</div>
          </BTd>
        </TableTemplate>
      </div>
      <TablePagination v-show="tableList.tbody.length" :total="paginationData.total"
        :current-page="paginationData.currentPage" :page-size="paginationData.pageSize"
        @paginationChange="paginationChange" />
    </BOverlay>
  </div>
</template>
<script setup name="user-table">
import TablePagination from "@/components/table/TablePagination.vue"
import TableTemplate from "@/components/table/TableTemplate.vue";
import { reactive, ref } from "vue";
import { getUserPageList } from "@/api/user";

const showLoading = ref(false)
const searchField = reactive({
  'username': '',
  'nickname': '',
  'phone': ''
})
const paginationData = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 0
})
const tableList = reactive({
  thead: [
    { key: 'username', label: '用户名', stickyColumn: 'sticky-left' },
    { key: 'nickname', label: '昵称' },
    { key: 'headimgurl', label: '微信头像' },
    { key: 'phone', label: '手机号' },
    { key: 'permissions', label: '权限' },
    { key: 'status', label: '用户状态' },
    { key: 'createTime', label: '用户创建时间', $sort: true },
    { key: 'option', label: '操作', stickyColumn: 'sticky-right' }
  ],
  tbody: []
})

const paginationChange = (currentPage, pageSize) => {
  paginationData.currentPage = currentPage ?? paginationData.currentPage
  paginationData.pageSize = pageSize ?? paginationData.pageSize
  getUserPageListHander()
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

  getUserPageListHander(typeof (e.$sort) === 'string' ? e.key + '-' + e.$sort : null)
}

const getUserPageListHander = (sort) => {
  showLoading.value = true
  const params = {
    currentPage: paginationData.currentPage,
    pageSize: paginationData.pageSize
  }
  // sortData.$slots为true时 为默认排序不传给后台
  if (sort) {
    params.sort = sort
  }
  const data = searchField
  getUserPageList(params, data).then(res => {
    if (res.success) {
      paginationData.total = res.data.total
      tableList.tbody = res.data.data
    }
  }).finally(() => {
    showLoading.value = false
  })
}
getUserPageListHander()

const searchHandler = () => {
  paginationData.currentPage = 1
  getUserPageListHander()
}
</script>

<style lang="scss" scoped>
@import url(@/components/table/table.scss);

.page-content {
  height: 100%;
}
</style>
