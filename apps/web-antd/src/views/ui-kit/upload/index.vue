<script lang="ts" setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import type { UploadProps, UploadFile } from 'ant-design-vue';

defineOptions({ name: 'UiKitUpload' });

const fileList = ref<UploadFile[]>([]);
const imageList = ref<UploadFile[]>([]);
const previewVisible = ref(false);
const previewImage = ref('');

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const isLt5M = file.size! / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('文件大小不能超过 5MB');
  }
  return false; // demo 中阻止实际上传
};

const handlePreview: UploadProps['onPreview'] = (file) => {
  previewImage.value = file.url || file.thumbUrl || '';
  previewVisible.value = true;
};
</script>

<template>
  <RoFormPage title="上传 / 下载组件" :show-footer="false">
    <RoFormGroup title="文件上传 Upload">
      <a-form layout="vertical" style="max-width: 640px">
        <a-form-item label="基础上传（点击选择）">
          <a-upload
            v-model:file-list="fileList"
            :before-upload="beforeUpload"
            :max-count="3"
          >
            <a-button>
              <span style="margin-right: 4px">📎</span>选择文件
            </a-button>
            <template #itemRender="{ file, actions }">
              <a-space>
                <span>{{ file.name }}</span>
                <a @click="actions.remove">删除</a>
              </a-space>
            </template>
          </a-upload>
        </a-form-item>

        <a-form-item label="拖拽上传">
          <a-upload-dragger
            :before-upload="beforeUpload"
            :max-count="5"
            multiple
          >
            <p style="font-size: 32px">📂</p>
            <p>点击或拖拽文件到此处上传</p>
            <p style="color: rgba(0,0,0,0.45); font-size: 12px">
              支持单次或批量上传，最多 5 个文件，每个不超过 5MB
            </p>
          </a-upload-dragger>
        </a-form-item>

        <a-form-item label="图片上传（卡片样式）">
          <a-upload
            v-model:file-list="imageList"
            list-type="picture-card"
            :before-upload="beforeUpload"
            :on-preview="handlePreview"
            accept="image/*"
          >
            <div v-if="imageList.length < 6">
              <div style="font-size: 18px">＋</div>
              <div style="font-size: 12px; color: rgba(0,0,0,0.45)">上传图片</div>
            </div>
          </a-upload>
          <a-modal v-model:open="previewVisible" :footer="null" title="图片预览">
            <img :src="previewImage" style="width: 100%" alt="预览" />
          </a-modal>
        </a-form-item>
      </a-form>
    </RoFormGroup>

    <RoFormGroup title="限制与禁用">
      <a-form layout="vertical" style="max-width: 640px">
        <a-form-item label="禁用状态">
          <a-upload disabled :before-upload="beforeUpload">
            <a-button disabled>选择文件（禁用）</a-button>
          </a-upload>
        </a-form-item>
        <a-form-item label="限制文件类型（仅 .pdf .xlsx）">
          <a-upload accept=".pdf,.xlsx" :before-upload="beforeUpload">
            <a-button>选择 PDF / Excel</a-button>
          </a-upload>
        </a-form-item>
      </a-form>
    </RoFormGroup>

    <RoFormGroup title="下载示例">
      <a-space>
        <a-button type="primary" href="javascript:void(0)" @click="message.info('触发下载（示例）')">
          下载报表（触发式）
        </a-button>
        <a :href="'data:text/plain;charset=utf-8,示例内容'" download="demo.txt">
          <a-button>导出 TXT（原生 a 标签）</a-button>
        </a>
      </a-space>
    </RoFormGroup>
  </RoFormPage>
</template>
