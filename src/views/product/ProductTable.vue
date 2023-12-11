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
                <BImg fluid :src="item.imgUrl" alt="" @error="() => item.imgUrl = ''" />
              </BPopover>
              <span :style="{ cursor: item.imgUrl ? 'pointer' : '' }"> {{ item.imgUrl ? '查看' : '-' }} </span>
            </BTd>
            <BTd>{{ item.sales }}</BTd>
            <BTd>{{ item.price }}</BTd>
            <BTd>{{ item.oldPrice }}</BTd>
            <BTd>{{ item.type }}</BTd>
            <BTd>{{ item.shopId }}</BTd>
            <BTd>{{ item.productStock }}</BTd>
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
            <BFormGroup description="Let us know your imgUrl." label="imgUrl" label-for="input-horizontal"
              label-cols-sm="4" label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback="">
              <BFormInput v-model="data.imgUrl" trim placeholder="" />
            </BFormGroup>
          </BCol>
        </BRow>
        <BRow>
          <BCol>
            <BFormGroup description="Let us know your sales." label="sales" label-for="input-horizontal" label-cols-sm="4"
              label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback="">
              <BFormInput v-model="data.sales" trim placeholder="" />
            </BFormGroup>
          </BCol>
        </BRow>
        <BRow>
          <BCol>
            <BFormGroup description="Let us know your price." label="price" label-for="input-horizontal" label-cols-sm="4"
              label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback="">
              <BFormInput v-model="data.price" trim placeholder="" />
            </BFormGroup>
          </BCol>
        </BRow>
        <BRow>
          <BCol>
            <BFormGroup description="Let us know your oldPrice." label="oldPrice" label-for="input-horizontal"
              label-cols-sm="4" label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback="">
              <BFormInput v-model="data.oldPrice" trim placeholder="" />
            </BFormGroup>
          </BCol>
        </BRow>
        <BRow>
          <BCol>

            <BFormGroup description="Let us know your type." label="type" label-for="input-horizontal" label-cols-sm="4"
              label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback="">
              <BFormSelect v-model="data.type" valueField="id" textField="name" :options="typeList" />
            </BFormGroup>
          </BCol>
        </BRow>
        <BRow>
          <BCol>
            <BFormGroup description="Let us know your shopId." label="shopId" label-for="input-horizontal"
              label-cols-sm="4" label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback="">
              <BFormInput v-model="data.shopId" trim placeholder="" />
            </BFormGroup>
          </BCol>
        </BRow>
        <BRow>
          <BCol>
            <BFormGroup description="Let us know your productStock." label="productStock" label-for="input-horizontal"
              label-cols-sm="4" label-cols-lg="3" content-cols-sm content-cols-lg="7" valid-feedback="">
              <BFormInput v-model="data.productStock" trim placeholder="" />
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
      确认删除 {{ delProduct?.name }} ?
    </BModal>
  </div>
</template>
<script setup name="product-table">
import TablePagination from "@/components/table/TablePagination.vue"
import TableTemplate from "@/components/table/TableTemplate.vue";
import { errorToast, successToast, infoToast } from "@/components/Toast";
import { reactive, ref, toRefs, onActivated } from "vue";
import { getProductPageList, productAdd, productUpdate, productDelete, getProductCategoryList } from "@/api/product";
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
    { key: 'sales', label: '昵称' },
    { key: 'price', label: '昵称' },
    { key: 'oldPrice', label: '昵称' },
    { key: 'type', label: '库存' },
    { key: 'shopId', label: 'shopId' },
    { key: 'productStock', label: '库存' },
    { key: 'status', label: '用户状态' },
    { key: 'option', label: '操作' }
  ],
  tbody: []
})

const paginationChange = (currentPage, pageSize) => {
  paginationData.currentPage = currentPage ?? paginationData.currentPage
  paginationData.pageSize = pageSize ?? paginationData.pageSize
  getProductPageListHander()
}

const getProductPageListHander = (sort) => {
  showLoading.value = true
  const params = {
    currentPage: paginationData.currentPage,
    pageSize: paginationData.pageSize
  }
  // sortData.$slots为true时 为默认排序不传给后台
  if (sort) {
    params.sort = sort
  }
  getProductPageList(params).then(res => {
    if (res.success) {
      paginationData.total = res.data.total
      tableList.tbody = res.data.data
    }
  }).finally(() => {
    showLoading.value = false
  })
}
getProductPageListHander()

const typeList = ref([])
const initProductCategoryList = () => {
  getProductCategoryList().then(res => {
    if (res.success) {
      typeList.value = res.data
    }
  })
}
onActivated(() => {
  initProductCategoryList()
})
const modalDialog = ref(false)
const _data = {
  id: null,
  name: '',
  imgUrl: '',
  sales: '',
  price: '',
  oldPrice: '',
  type: '',
  shopId: '',
  productStock: '',
  status: 0
}
const productData = reactive({ data: deepClone(_data) })

const dialogClose = () => {
  productData.data = deepClone(_data)
}

const editDialog = (item) => {
  modalDialog.value = true
  objectOverwrite(productData.data, item)
}
const { data } = toRefs(productData)
const confirmHandler = async () => {

  try {
    let res = null
    const obj = deepClone(data.value)

    if (typeof (obj.id) === 'number') {
      res = await productUpdate(obj)
    } else {
      delete obj.id
      res = await productAdd(obj)
    }

    if (res.success) {
      successToast()
      modalDialog.value = false
    } else {
      errorToast()
    }
    getProductPageListHander()
  } catch (error) { } finally {
  }

}

// delete
const delProduct = ref(null)
const modalDialogDel = ref(false)

const delHandler = (item) => {
  delProduct.value = item
  modalDialogDel.value = true
}
const dialogDelCancel = () => {
  modalDialogDel.value = false
  infoToast('操作已取消！')
}

const confirmDelHandler = () => {
  productDelete({ id: delProduct.value.id }).then(res => {
    if (res.success) {
      successToast()
      modalDialogDel.value = false
    }
    getProductPageListHander()
  })
}
</script>

<style lang="scss" scoped>
@import url(@/components/table/table.scss);

.page-content {
  height: 100%;
}
</style>
