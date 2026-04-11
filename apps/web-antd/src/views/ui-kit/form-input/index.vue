<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import './ui-kit-demo.css';

defineOptions({ name: 'UiKitFormInput' });

const router = useRouter();
const inputVal = ref('');
const textareaVal = ref('');
const numVal = ref<number | undefined>(undefined);
const pwdVal = ref('');
const searchVal = ref('');

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
          <h1 class="ui-kit-page__title">文本录入类组件</h1>
          <p class="ui-kit-page__sub">
            输入框、数字、密码、搜索与多行文本，以及表单项校验态展示。
          </p>
        </header>

        <div class="ui-kit-stack">
          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">输入框 Input</h2>
              <p class="ui-kit-section__hint">基础、前后缀、禁用、密码、搜索、数字、多行</p>
            </header>
            <div class="ui-kit-section__body">
              <a-form class="ui-kit-form-wrap" layout="vertical">
                <a-form-item label="基础输入框">
                  <a-input v-model:value="inputVal" placeholder="请输入内容" />
                </a-form-item>
                <a-form-item label="带前后缀">
                  <a-input v-model:value="inputVal" placeholder="搜索">
                    <template #prefix>
                      <IconifyIcon icon="ant-design:search-outlined" />
                    </template>
                    <template #suffix>.com</template>
                  </a-input>
                </a-form-item>
                <a-form-item label="禁用状态">
                  <a-input value="禁用内容" disabled />
                </a-form-item>
                <a-form-item label="密码框">
                  <a-input-password v-model:value="pwdVal" placeholder="请输入密码" />
                </a-form-item>
                <a-form-item label="搜索框">
                  <a-input-search v-model:value="searchVal" placeholder="按回车搜索" enter-button />
                </a-form-item>
                <a-form-item label="数字输入框">
                  <a-input-number
                    v-model:value="numVal"
                    :min="0"
                    :max="999"
                    style="width: 100%"
                    placeholder="请输入数字"
                  />
                </a-form-item>
                <a-form-item label="多行文本">
                  <a-textarea
                    v-model:value="textareaVal"
                    placeholder="请输入描述"
                    :rows="4"
                    show-count
                    :maxlength="500"
                  />
                </a-form-item>
              </a-form>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">校验状态</h2>
              <p class="ui-kit-section__hint">error / success / validating</p>
            </header>
            <div class="ui-kit-section__body">
              <a-form class="ui-kit-form-wrap" layout="vertical">
                <a-form-item
                  label="必填项"
                  required
                  has-feedback
                  validate-status="error"
                  help="此项为必填"
                >
                  <a-input placeholder="请输入" />
                </a-form-item>
                <a-form-item label="校验通过" has-feedback validate-status="success">
                  <a-input value="已填写正确" />
                </a-form-item>
                <a-form-item label="校验中" has-feedback validate-status="validating">
                  <a-input placeholder="校验中..." />
                </a-form-item>
              </a-form>
            </div>
          </section>
        </div>
      </div>
    </div>
  </Page>
</template>
