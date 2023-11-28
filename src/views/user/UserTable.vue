<template>
  <div class="page-content">
    <BOverlay :show="showLoading" class="h-100" rounded="sm" opacity="0.8" variant="light" spinner-variant="primary">
      <div class="page-filter-group">
        <div class="page-filter-left">
          <div class="page-filter-item">
            <BButton pill variant="outline-primary" @click="modalDialog = true">
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
              <BFormInput v-model="searchField.username" @keyup.enter="searchHandler" />
            </BInputGroup>
          </div>
          <div class="page-filter-item">
            <BInputGroup prepend="昵称">
              <BFormInput v-model="searchField.nickname" @keyup.enter="searchHandler" />
            </BInputGroup>
          </div>
          <div class="page-filter-item">
            <BInputGroup prepend="手机号">
              <BFormInput v-model="searchField.phone" @keyup.enter="searchHandler" />
            </BInputGroup>
          </div>
          <div class="page-filter-item">
            <BButton variant="primary" @click="searchHandler">搜索</BButton>
          </div>
        </div>
      </div>
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
              <BButton variant="primary" class="me-md-2" size="sm" @click="editDialog(item)">编辑</BButton>
              <BButton variant="danger" size="sm" @click="delHandler(item)">删除</BButton>
            </BTd>
          </BTr>
        </template>
        <BTd v-else :colspan="tableList.thead && tableList.thead.length || 0">
          <div class="text-center">暂无数据...</div>
        </BTd>
      </TableTemplate>
      <TablePagination v-show="tableList.tbody.length" :total="paginationData.total"
        :current-page="paginationData.currentPage" :page-size="paginationData.pageSize"
        @paginationChange="paginationChange" />
    </BOverlay>

    <BModal v-model="modalDialog" scrollable @hide.prevent :title="typeof (data.id) === 'number' ? '修改' : '新增'"
      @hidden="dialogClose" @cancel="modalDialog = false" @close="modalDialog = false" @ok="confirmHandler">
      <BContainer class="form-fields">
        <BRow>
          <BCol>
            <BFormGroup description="Let us know your name." label="username" label-for="input-horizontal"
              label-cols-sm="4" label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback=""
              :invalid-feedback="validList.username.invalid" :state="validList.username.valid">
              <BFormInput v-model="data.username" :state="validList.username.valid" trim placeholder="" />
            </BFormGroup>
          </BCol>
        </BRow>
        <BRow>
          <BCol>
            <BFormGroup description="Let us know your password." label="password" label-for="input-horizontal"
              label-cols-sm="4" label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback=""
              :invalid-feedback="validList.password.invalid" :state="validList.password.valid">
              <BFormInput v-model="data.password" :state="validList.password.valid" trim placeholder="" />
            </BFormGroup>
          </BCol>
        </BRow>
        <BRow>
          <BCol>
            <BFormGroup description="Let us know your nickname." label="nickname" label-for="input-horizontal"
              label-cols-sm="4" label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback="">
              <BFormInput v-model="data.nickname" trim placeholder="" />
            </BFormGroup>
          </BCol>
        </BRow>
        <BRow>
          <BCol>
            <BFormGroup description="Let us know your phone." label="phone" label-for="input-horizontal" label-cols-sm="4"
              label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback="">
              <BFormInput v-model="data.phone" trim placeholder="" />
            </BFormGroup>
          </BCol>
        </BRow>
        <BRow>
          <BCol>
            <BFormGroup description="Let us know your permissions." label="permissions" label-for="input-horizontal"
              label-cols-sm="4" label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback="">
              <BFormInput v-model="data.permissions" trim placeholder="" />
            </BFormGroup>
          </BCol>
        </BRow>
      </BContainer>
    </BModal>
    <BModal v-model="modalDialogDel" @hide.prevent title="删除确认" @cancel="dialogDelCancel" @close="dialogDelCancel"
      @ok="confirmDelHandler">
      确认删除用户 {{ delUser?.username }} ?
    </BModal>
  </div>
</template>
<script setup name="user-table">
import md5 from "js-md5";
import TablePagination from "@/components/table/TablePagination.vue"
import TableTemplate from "@/components/table/TableTemplate.vue";
import { errorToast, successToast, infoToast } from "@/components/Toast";
import { reactive, ref, toRefs, computed } from "vue";
import { getUserPageList, userAdd, userUpdate, userDelete } from "@/api/user";
import { deepClone, objectOverwrite } from "@/utils";

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

const modalDialog = ref(false)
const _data = {
  id: null,
  username: '',
  password: '',
  nickname: '',
  headimgurl: '',
  phone: '',
  permissions: '',
}
const userData = reactive({ data: deepClone(_data) })

// 校验
const validList = reactive({
  username: {
    valid: computed(() => userData.data.username.length >= 4),
    invalid: computed(() =>
      userData.data.username.length > 0 ? 'Enter at least 4 characters.' : ''
    )
  },
  password: {
    valid: computed(() => userData.data.password.length >= 4),
    invalid: computed(() =>
      userData.data.password.length > 0 ? 'Enter at least 4 characters.' : ''
    )
  }
})
// 字段校验是否通过
const formValidFlag = computed(() => {
  return !Object.keys(validList).some(e => !validList[e].valid)
})


const dialogClose = () => {
  userData.data = deepClone(_data)
}

const editDialog = (item) => {
  modalDialog.value = true
  objectOverwrite(userData.data, item)
}
const { data } = toRefs(userData)
const confirmHandler = async () => {
  if (!formValidFlag) {
    errorToast('请检查表单!')
    return
  }

  try {
    let res = null
    const obj = deepClone(data.value)
    obj.password = md5(obj.password).toUpperCase()

    if (typeof (obj.id) === 'number') {
      res = await userUpdate(obj)
    } else {
      delete obj.id
      res = await userAdd(obj)
    }

    if (res.success) {
      successToast()
      modalDialog.value = false
    } else {
      errorToast()
    }
    getUserPageListHander()
  } catch (error) { } finally {
  }

}

// delete
const delUser = ref(null)
const modalDialogDel = ref(false)

const delHandler = (item) => {
  delUser.value = item
  modalDialogDel.value = true
}
const dialogDelCancel = () => {
  modalDialogDel.value = false
  infoToast('操作已取消！')
}

const confirmDelHandler = () => {
  userDelete({ id: delUser.value.id }).then(res => {
    if (res.success) {
      successToast()
      modalDialogDel.value = false
    }
    getUserPageListHander()
  })
}
</script>

<style lang="scss" scoped>
@import url(@/components/table/table.scss);

.page-content {
  height: 100%;
}
</style>
