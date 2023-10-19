<template>
  <div class="page-content">
    <TableTemplate>
      <template #thead>
        <BTh>Clothes</BTh>
        <BTh>Accessories</BTh>
        <BTh>Accessories</BTh>
      </template>
    </TableTemplate>
    <TablePagination :total="paginationData.total" :current-page="paginationData.currentPage" :page-size="paginationData.pageSize"
      @paginationChange="paginationChange" />
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
const paginationChange = (currentPage, pageSize) => {
  paginationData.currentPage = currentPage ?? paginationData.currentPage
  paginationData.pageSize = pageSize ?? paginationData.pageSize
}
</script>
