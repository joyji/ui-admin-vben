<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';
import type { UploadFile, UploadProps } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import './ui-kit-demo.css';

defineOptions({ name: 'UiKitUpload' });

const router = useRouter();
const fileList = ref<UploadFile[]>([]);
const imageList = ref<UploadFile[]>([]);
const previewVisible = ref(false);
const previewImage = ref('');

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const isLt5M = file.size! / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('文件大小不能超过 5MB');
  }
  return false;
};

const handlePreview: UploadProps['onPreview'] = (file) => {
  previewImage.value = file.url || file.thumbUrl || '';
  previewVisible.value = true;
};

function goBack() {
  router.push('/ui-kit/index');
}
</script>

<template>
  <Page auto-content-height>
    <div class="ui-kit-page">
      <div class="ui-kit-page__inner">
        <header class="ui-kit-page__hero">
          <a-button type="link" class="ui-kit-page__back" @click="goBack">
            <IconifyIcon class="mr-1" icon="lucide:arrow-left" />
            返回组件导航
          </a-button>
          <h1 class="ui-kit-page__title">上传与下载</h1>
          <p class="ui-kit-page__sub">
            点击上传、拖拽上传、图片卡片与类型限制；下载为触发式示例。
          </p>
        </header>

        <div class="ui-kit-stack">
          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">文件上传</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-form class="ui-kit-form-wrap" layout="vertical">
                <a-form-item label="基础上传">
                  <a-upload v-model:file-list="fileList" :before-upload="beforeUpload" :max-count="3">
                    <a-button>
                      <IconifyIcon class="mr-1" icon="lucide:paperclip" />
                      选择文件
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
                  <a-upload-dragger :before-upload="beforeUpload" :max-count="5" multiple>
                    <p class="ant-upload-drag-icon">
                      <IconifyIcon icon="ant-design:inbox-outlined" style="font-size: 48px; color: #0f56d5" />
                    </p>
                    <p class="ant-upload-text">点击或拖拽文件到此处上传</p>
                    <p class="ant-upload-hint">最多 5 个文件，每个不超过 5MB</p>
                  </a-upload-dragger>
                </a-form-item>

                <a-form-item label="图片上传（卡片）">
                  <a-upload
                    v-model:file-list="imageList"
                    list-type="picture-card"
                    :before-upload="beforeUpload"
                    :on-preview="handlePreview"
                    accept="image/*"
                  >
                    <div v-if="imageList.length < 6">
                      <IconifyIcon icon="ant-design:plus-outlined" style="font-size: 20px" />
                      <div style="margin-top: 4px; font-size: 12px; color: rgba(0, 0, 0, 0.45)">
                        上传图片
                      </div>
                    </div>
                  </a-upload>
                  <a-modal v-model:open="previewVisible" :footer="null" title="图片预览">
                    <img :src="previewImage" style="width: 100%" alt="预览" />
                  </a-modal>
                </a-form-item>
              </a-form>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">限制与禁用</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-form class="ui-kit-form-wrap" layout="vertical">
                <a-form-item label="禁用">
                  <a-upload disabled :before-upload="beforeUpload">
                    <a-button disabled>选择文件（禁用）</a-button>
                  </a-upload>
                </a-form-item>
                <a-form-item label="仅 PDF / Excel">
                  <a-upload accept=".pdf,.xlsx" :before-upload="beforeUpload">
                    <a-button>选择 PDF / Excel</a-button>
                  </a-upload>
                </a-form-item>
              </a-form>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">下载示例</h2>
            </header>
            <div class="ui-kit-section__body">
              <div class="ui-kit-row">
                <a-button type="primary" @click="message.info('触发下载（示例）')">
                  <IconifyIcon class="mr-1" icon="ant-design:download-outlined" />
                  下载报表（触发式）
                </a-button>
                <a :href="'data:text/plain;charset=utf-8,示例内容'" download="demo.txt">
                  <a-button>导出 TXT</a-button>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </Page>
</template>
