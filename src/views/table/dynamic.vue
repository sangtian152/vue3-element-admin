<template>
  <el-container class="page-container">
    <el-header>
      <el-button type="primary" @click="doPdf">导出pdf</el-button>
    </el-header>
    <el-table :data="tableData" size="default" ref="tableRef" border style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </el-container>
</template>
<script lang="ts" setup>
import { ref, unref, reactive, onBeforeMount } from 'vue'
import { ElTable } from 'element-plus';
import html2pdf from '@sangtian152/html2pdf'
import { randomString } from '@/utils'
const tableRef = ref<InstanceType<typeof ElTable>>()
const doPdf = () => {
  const TableComponent = unref(tableRef)
  if (TableComponent) {
    html2pdf(TableComponent.$el, {
      title: '导出表格.pdf',
      minimumUnit: '.el-table__row'
    })
  }
  
}
const tableData = reactive<Array<object>>([])
const initData = () => {
  for(let i = 0; i < 500; i++) {
    tableData.push({
      id: randomString(8),
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    })
  }
}
onBeforeMount(() => {
  initData()
})
</script>