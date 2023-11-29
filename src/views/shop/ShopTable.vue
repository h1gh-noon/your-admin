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
      </div>
      <TableTemplate :table-thead="tableList.thead">
        <template v-if="tableList.tbody.length">
          <BTr v-for="(item, index) in tableList.tbody" :key="item.id" :variant="index % 2 ? 'info' : ''">
            <BTd class="sticky-left">{{ item.name }}</BTd>
            <BTd>
              <BPopover v-if="item.imgUrl" :content="item.imgUrl">
                <BImg thumbnail fluid :src="item.imgUrl" alt="" />
              </BPopover>
              <span :style="{ cursor: item.imgUrl ? 'pointer' : '' }"> {{ item.imgUrl ? '查看' : '-' }} </span>
            </BTd>
            <BTd>{{ item.expressLimit }}</BTd>
            <BTd>{{ item.expressPrice }}</BTd>
            <BTd>{{ item.status === 1 ? '启用' : '禁用' }}</BTd>
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
            <BFormGroup description="Let us know your name." label="name" label-for="input-horizontal" label-cols-sm="4"
              label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback="">
              <BFormInput v-model="data.name" trim placeholder="" />
            </BFormGroup>
          </BCol>
        </BRow>
        <BRow>
          <BCol>
            <BFormGroup description="Let us know your cateId." label="cateId" label-for="input-horizontal"
              label-cols-sm="4" label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback="">
              <BFormInput v-model="data.cateId" trim placeholder="" />
            </BFormGroup>
          </BCol>
        </BRow>
        <BRow>
          <BCol>
            <BFormGroup description="Let us know your imgUrl." label="imgUrl" label-for="input-horizontal"
              label-cols-sm="4" label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback="">
              <BFormInput v-model="data.imgUrl" trim placeholder="" />
            </BFormGroup>
          </BCol>
        </BRow>
        <BRow>
          <BCol>
            <BFormGroup description="Let us know your expressLimit." label="expressLimit" label-for="input-horizontal"
              label-cols-sm="4" label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback="">
              <BFormInput v-model="data.expressLimit" trim placeholder="" />
            </BFormGroup>
          </BCol>
        </BRow>
        <BRow>
          <BCol>
            <BFormGroup description="Let us know your expressPrice." label="expressPrice" label-for="input-horizontal"
              label-cols-sm="4" label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback="">
              <BFormInput v-model="data.expressPrice" trim placeholder="" />
            </BFormGroup>
          </BCol>
        </BRow>
        <BRow>
          <BCol>
            <BFormGroup description="Let us know your descDetail." label="descDetail" label-for="input-horizontal" label-cols-sm="4"
              label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback="">
              <BFormInput v-model="data.descDetail" trim placeholder="" />
            </BFormGroup>
          </BCol>
        </BRow>
        <BRow>
          <BCol>
            <BFormGroup description="Let us know your state." label="state" label-for="input-horizontal" label-cols-sm="4"
              label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback="">
              <BFormInput v-model="data.state" trim placeholder="" />
            </BFormGroup>
          </BCol>
        </BRow>
        <BRow>
          <BCol>
            <BFormGroup description="Let us know your status." label="status" label-for="input-horizontal"
              label-cols-sm="4" label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback="">
              <BFormInput v-model="data.status" trim placeholder="" />
            </BFormGroup>
          </BCol>
        </BRow>
      </BContainer>
    </BModal>
    <BModal v-model="modalDialogDel" @hide.prevent title="删除确认" @cancel="dialogDelCancel" @close="dialogDelCancel"
      @ok="confirmDelHandler">
      确认删除 {{ delShop?.name }} ?
    </BModal>
  </div>
</template>
<script setup name="shop-table">
import TablePagination from "@/components/table/TablePagination.vue"
import TableTemplate from "@/components/table/TableTemplate.vue";
import { errorToast, successToast, infoToast } from "@/components/Toast";
import { reactive, ref, toRefs } from "vue";
import { getShopPageList, shopAdd, shopUpdate, shopDelete } from "@/api/shop";
import { deepClone, objectOverwrite } from "@/utils";

const showLoading = ref(false)
const paginationData = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 0
})
const tableList = reactive({
  thead: [
    { key: 'name', label: '用户名' },
    { key: 'imgUrl', label: '昵称' },
    { key: 'expressLimit', label: '微信头像' },
    { key: 'expressPrice', label: '用户状态' },
    { key: 'status', label: '用户状态' },
    { key: 'option', label: '操作' }
  ],
  tbody: []
})

const paginationChange = (currentPage, pageSize) => {
  paginationData.currentPage = currentPage ?? paginationData.currentPage
  paginationData.pageSize = pageSize ?? paginationData.pageSize
  getShopPageListHander()
}

const getShopPageListHander = (sort) => {
  showLoading.value = true
  const params = {
    currentPage: paginationData.currentPage,
    pageSize: paginationData.pageSize
  }
  // sortData.$slots为true时 为默认排序不传给后台
  if (sort) {
    params.sort = sort
  }
  getShopPageList(params).then(res => {
    if (res.success) {
      paginationData.total = res.data.total
      tableList.tbody = res.data.data
    }
  }).finally(() => {
    showLoading.value = false
  })
}
getShopPageListHander()

const modalDialog = ref(false)
const _data = {
  id: null,
  cateId: null,
  name: '',
  imgUrl: '',
  expressLimit: '',
  expressPrice: '',
  descDetail: '',
  state: '',
  status: 0
}
const shopData = reactive({ data: deepClone(_data) })

const dialogClose = () => {
  shopData.data = deepClone(_data)
}

const editDialog = (item) => {
  modalDialog.value = true
  objectOverwrite(shopData.data, item)
}
const { data } = toRefs(shopData)
const confirmHandler = async () => {

  try {
    let res = null
    const obj = deepClone(data.value)

    if (typeof (obj.id) === 'number') {
      res = await shopUpdate(obj)
    } else {
      delete obj.id
      res = await shopAdd(obj)
    }

    if (res.success) {
      successToast()
      modalDialog.value = false
    } else {
      errorToast()
    }
    getShopPageListHander()
  } catch (error) { } finally {
  }

}

// delete
const delShop = ref(null)
const modalDialogDel = ref(false)

const delHandler = (item) => {
  delShop.value = item
  modalDialogDel.value = true
}
const dialogDelCancel = () => {
  modalDialogDel.value = false
  infoToast('操作已取消！')
}

const confirmDelHandler = () => {
  shopDelete({ id: delShop.value.id }).then(res => {
    if (res.success) {
      successToast()
      modalDialogDel.value = false
    }
    getShopPageListHander()
  })
}
</script>

<style lang="scss" scoped>
@import url(@/components/table/table.scss);

.page-content {
  height: 100%;
}
</style>
