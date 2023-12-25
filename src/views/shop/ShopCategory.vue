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
            <BFormGroup description="Let us know your status." label="status" label-for="input-horizontal"
              label-cols-sm="4" content-cols-sm label-cols-lg="3" content-cols-lg="7">
              <BFormRadio v-model="data.status" name="sc-status-radios" :value="1">启用</BFormRadio>
              <BFormRadio v-model="data.status" name="sc-status-radios" :value="0">禁用</BFormRadio>
            </BFormGroup>
          </BCol>
        </BRow>
      </BContainer>
    </BModal>
    <BModal v-model="modalDialogDel" @hide.prevent title="删除确认" @cancel="dialogDelCancel" @close="dialogDelCancel"
      @ok="confirmDelHandler">
      确认删除 {{ delUser?.name }} ?
    </BModal>
  </div>
</template>
<script setup name="shop-category">
import TableTemplate from "@/components/table/TableTemplate.vue";
import { errorToast, successToast, infoToast } from "@/components/Toast";
import { reactive, ref, toRefs } from "vue";
import { getShopCategoryList, shopCategoryAdd, shopCategoryUpdate, shopCategoryDelete } from "@/api/shop";
import { deepClone, objectOverwrite } from "@/utils";

const showLoading = ref(false)
const tableList = reactive({
  thead: [
    { key: 'name', label: '名' },
    { key: 'imgUrl', label: '图' },
    { key: 'status', label: '状态' },
    { key: 'option', label: '操作' }
  ],
  tbody: []
})

const getPageListHander = (sort) => {
  showLoading.value = true
  getShopCategoryList().then(res => {
    if (res.success) {
      tableList.tbody = res.data
    }

  }).finally(() => {
    showLoading.value = false
  })
}
getPageListHander()

const modalDialog = ref(false)
const _data = {
  id: null,
  name: '',
  imgUrl: '',
  status: 1
}
const dataInfo = reactive({ data: deepClone(_data) })


const dialogClose = () => {
  dataInfo.data = deepClone(_data)
}

const editDialog = (item) => {
  modalDialog.value = true
  objectOverwrite(dataInfo.data, item)
}
const { data } = toRefs(dataInfo)
const confirmHandler = async () => {
  try {
    let res = null
    const obj = deepClone(data.value)

    if (typeof (obj.id) === 'number') {
      res = await shopCategoryUpdate(obj)
    } else {
      delete obj.id
      res = await shopCategoryAdd(obj)
    }

    if (res.success) {
      successToast()
      modalDialog.value = false
    } else {
      errorToast()
    }
    getPageListHander()
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
  shopCategoryDelete({ id: delUser.value.id }).then(res => {
    if (res.success) {
      successToast()
      modalDialogDel.value = false
    }
    getPageListHander()
  })
}
</script>

<style lang="scss" scoped>
@import url(@/components/table/table.scss);

.page-content {
  height: 100%;
}
</style>
