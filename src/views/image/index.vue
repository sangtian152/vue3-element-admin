<template>
  <div class="page-container">
    <div class="img-box">
      <img src="@/assets/demo.jpg" alt="" />
      <img :src="imageUrl" alt="" />
    </div>
    <el-form
      label-width="100px"
      :model="options"
      style="max-width: 460px"
    >
      <el-form-item label="水印类型">
        <el-radio v-model="type" label="text">文字</el-radio>
        <el-radio v-model="type" label="img">图片</el-radio>
      </el-form-item>
      <template v-if="type === 'text'">
        <el-form-item label="水印文字">
          <el-input v-model="text" />
        </el-form-item>
        <el-form-item label="字号">
          <el-input v-model="options.fontSize" />
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="水印图片">
          <img class="mark-img" :src="mark" alt="">
        </el-form-item>
        <el-form-item label="水印高度">
          <el-input v-model="options.markHeight" />
        </el-form-item>
      </template>
      <el-form-item label="重复">
        <el-switch
          v-model="options.repeat"
        />
      </el-form-item>
      <template v-if="options.repeat">
        <el-form-item label="水印行距">
          <el-input v-model="options.lineSpacing" />
        </el-form-item>
        <el-form-item label="水印间距">
          <el-input v-model="options.markSpacing" />
        </el-form-item>
        <el-form-item label="旋转角度">
          <el-input v-model="options.rotate" />
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="距离右侧">
          <el-input v-model="options.position.right" />
        </el-form-item>
        <el-form-item label="距离底部">
          <el-input v-model="options.position.bottom" />
        </el-form-item>
        <el-form-item label="偏移">
          <el-input v-model="options.translate" />
        </el-form-item>
      </template>
      <el-form-item label="不透明度">
        <el-input v-model="options.globalAlpha" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">生成水印</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, unref } from 'vue'
  import watermark from '@sangtian152/watermark'
  import imageBase64 from '@/assets/demo.jpg'
  import mark from '@/assets/mark-white.png'
  const type = ref('text')
  const text = ref('文字水印')
  const options = reactive({
    fontSize: 36,
    markHeight: 26,
    repeat: true,
    rotate: '-45',
    position: {
      right: '50%',
      bottom: '50%',
    },
    translate: '50%,50%',
    lineSpacing: 146,
    markSpacing: '50%',
    globalAlpha: '0.2'
  })
  const imageUrl = ref('')
  const onSubmit = () => {
    const can = new watermark(imageBase64, options);
    // unref(type) 等价于 type.value
    unref(type) === 'text' ? can.addText(text.value) : can.addImage(mark)
    can.draw(function() {
        console.log('水印设置成功')
        imageUrl.value = can.getBase64()
    })
  }
</script>
<style lang="scss" scoped>
  .img-box {
    display: flex;
    justify-content: space-between;
    img {
      width: 48%;
    }
  }
  .mark-img {
    max-height: 42px;
    background: #eee;
  }
  .el-form {
    margin-top: 10px;
  }
</style>