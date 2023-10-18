<template>
  <div class="table-pagination">
    <span class="table-total-text">
      共{{ props.total }} 条
    </span>
    <div class="d-flex mt-3 overflow-auto table-bPagination-box">
      <BPagination class="table-bPagination justify-content-end" v-model="currentPage" :total-rows="props.total"
        :per-page="props.pageSize" pills first-number last-number />
    </div>
    <div>
      <BDropdown dropup :text="props.pageSize" variant="primary" class="me-2 pagination-pageSize">
        <BDropdownItemButton v-for="item in pageSizeArr" :key="item" :active="props.pageSize === item"
          @click="setPageSize(item)">
          {{ item }}
        </BDropdownItemButton>
      </BDropdown>
      <span>
        条每页
      </span>
    </div>
  </div>
</template>
<script setup name="table-pagination">
import { computed } from "vue";
const pageSizeArr = [20, 30, 50, 100, 500]
const props = defineProps({
  total: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 20
  }
})
const emit = defineEmits(['paginationChange'])
const currentPage = computed({
  get: () => props.currentPage,
  set: (e) => {
    emit('paginationChange', e)
  }
})
const setPageSize = (val) => {
  emit('paginationChange', 1, val)
}
</script>
<style lang="scss" scoped>
.table-pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

@media (max-width: 720px) {
  .table-pagination {
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }

  .table-bPagination-box {
    width: 100%;
  }
  .table-bPagination {
    width: 100%;
    min-width: 420px;
  }
}

.table-total-text {
  margin-right: 25px;
}

.pagination-pageSize {
  margin: 0 25px;
}
</style>
