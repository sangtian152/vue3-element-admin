<template>
  <el-dialog
    v-model="dialogVisible"
    title="添加组织"
    width="30%"
    :before-close="doClose"
  >
    <el-form
      ref="formRef"
      label-width="100px"
      :model="nodeForm"
      :rules="rules"
    >
      <el-form-item label="节点名称" prop="label">
        <el-input v-model="nodeForm.label" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="doClose">取消</el-button>
        <el-button type="primary" @click="doSubmit(formRef)"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { ref, unref, reactive, watch } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  const formRef = ref<FormInstance>()
  const dialogVisible = ref<boolean>(false)
  const nodeForm = reactive({
    label:''
  })
  const rules = reactive<FormRules>({
    label: [
      { required: true, message: '请输入节点名称', trigger: 'blur' },
    ],
  })
  const props = defineProps({
    visible: Boolean
  })
  console.log(props)
  watch(() => props.visible, (val)=> {
    console.log(props.visible, 46)
    dialogVisible.value = val
  })

  const emit = defineEmits(['submit', 'close', 'update:visible'])
  const doSubmit = async (formEl:FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        emit('submit', nodeForm)
        doClose()
      } else {
        console.log('error submit!', fields)
      }
    })
  }
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields(['label'])
  }
  const doClose = () => {
    resetForm(unref(formRef))
    emit('close')
    emit('update:visible', false)
    dialogVisible.value = false
  }
</script>