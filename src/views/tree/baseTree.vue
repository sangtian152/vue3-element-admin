<template>
  <el-container class="page-container">
    <el-header>
      <el-button type="primary" @click="reload">重置</el-button>
    </el-header>
    <div style="height: 400px;">
      <Vue3TreeOrg
        collapsable
        :data="treeData"
        :node-add="nodeAdd"
        :clone-node-drag="false"
        @on-node-blur="nodeBlur"
        @on-node-click="nodeClick"
      />
    </div>
    <addTreeNode v-model:visible="addVisible" @submit="doSubmit" />
  </el-container>
</template>
<script lang="ts" setup name="baseTree">
  import { ref, onMounted } from 'vue';
  import { getTreeData } from '@/api/tree'
  import { randomString } from '@/utils'
  import addTreeNode from './components/addTreeNode.vue';
  import { Vue3TreeOrg } from 'vue3-tree-org'
  import "vue3-tree-org/lib/vue3-tree-org.css"
  const treeData = ref({})
  const getTree = async () => {
    treeData.value = await getTreeData({})
  }
  const reload = () => {
    getTree()
  }
  onMounted(() => {
    getTree()
  })
  const addVisible = ref(false)
  let parentNode:Record<string, any>
  const nodeAdd = (node:Record<string, any>) => {
    addVisible.value = true
    parentNode = node
  }
  const doSubmit = (data: Record<string, string>) => {
    if (parentNode) {
      console.log(data)
      const node = { ...data, "id": randomString(8), "pid": parentNode.id}
      if (parentNode.children) {
        parentNode.children.push(node)
      } else {
        parentNode.children = [node]
      }
    }
  }
  const nodeClick = (e:FocusEvent, data:any) => {
    console.log(data)
  }
  const nodeBlur = (e:FocusEvent, data:any) => {
    console.log(data)
    data.id = '1529986245'
  }
</script>