<template>
  <div class="page-container">
    <el-upload
      class="upload-demo"
      action=""
      :show-file-list="false"
      :http-request="doUploadSource"
    >
      <el-button size="default" type="primary">上传原图</el-button>
    </el-upload>
    <div class="img-box">
      <img :src="sourceImage" class="source-image" alt="" />
      <div class="target-image">
        <div v-show="!imageUrl" class="placeholder">
          点击“立即下载”按钮<br />或鼠标右键单击图片，点"图片另存为"<br />即可保存到本地
        </div>
        <img :src="imageUrl || sourceImage" alt="" />
        <el-button type="primary" plain class="load-btn" @click="downloadImage">立即下载</el-button>
      </div>
    </div>
    <el-form
      label-width="110px"
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
          <img class="mark-img" :src="markImage" alt="">
          <el-upload
            class="upload-demo"
            action=""
            :show-file-list="false"
            :http-request="doUpload"
          >
            <el-button type="primary">上传水印</el-button>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500KB.
              </div>
            </template>
          </el-upload>
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
      <el-form-item label="不透明度（0-1）">
        <el-input v-model="options.globalAlpha" />
      </el-form-item>
      <el-form-item label="图片质量（0-1）">
        <el-input v-model="options.quality" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">生成水印</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, unref } from 'vue'
  import type { UploadRequestOptions } from 'element-plus'
  import watermark from '@sangtian152/watermark'
  import { parseTime } from '@/utils'
  import imageBase64 from '@/assets/demo.jpg'
  import mark from '@/assets/mark-white.png'
  const type = ref('text')
  const text = ref('文字水印')
  const markImage = ref(mark)
  const sourceImage = ref(imageBase64)
  const options = reactive({
    quality: 0.8,
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
  const doUploadSource = (options:UploadRequestOptions) => {
    getBase64(options.file).then(res => {
      sourceImage.value = res as string
    })
  }
  const doUpload = (options:UploadRequestOptions) => {
    getBase64(options.file).then(res => {
      markImage.value = res as string
    })
  }
  // 单张图片下载
  const downloadImage = () => {
    const link = document.createElement('a')
    link.setAttribute('download', '水印图片-' + parseTime(new Date(), '{y}{m}{d}_{h}{i}{s}') + '.jpg')
    link.href = imageUrl.value
    link.click()
  }
  // 将file文件上传转化为base64进行显示
  const getBase64 = (file:File) => {
      return new Promise((resolve, reject) => {
          ///FileReader类就是专门用来读文件的
          const reader = new FileReader()
          //开始读文件
          //readAsDataURL: dataurl它的本质就是图片的二进制数据， 进行base64加密后形成的一个字符串，
          reader.readAsDataURL(file)
          // 成功和失败返回对应的信息，reader.result一个base64，可以直接使用
          reader.onload = () => {
            resolve(reader.result)
          }
          // 失败返回失败的信息
          reader.onerror = (error) => {
            reject(error)
          }
      })
  }
  const onSubmit = () => {
    // options.fontSize = 
    const payload = { ...options }
    payload.fontSize = Number(payload.fontSize)
    payload.markHeight = Number(payload.markHeight)
    payload.lineSpacing = Number(payload.lineSpacing)
    const can = new watermark(sourceImage.value, payload);
    // unref(type) 等价于 type.value
    unref(type) === 'text' ? can.addText(text.value) : can.addImage(markImage.value)
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
    .source-image,
    .target-image {
      width: 49%;
      position: relative;
    }
    .target-image {
      img {
        width: 100%;
        vertical-align: middle;
      }
      .load-btn {
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
    .placeholder {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
      font-size: 16px;
      color: #666;
      background: #eee;
      border: 1px solid #ddd;
      z-index: 1;
    }
  }
  .mark-img {
    max-height: 42px;
    background: #eee;
  }
  .el-form {
    margin-top: 10px;
  }
  @media (max-width: 992px) {
    .img-box {
      flex-wrap: wrap;
      .source-image,
      .target-image {
        width: 100%;
      }
    }
  }
</style>