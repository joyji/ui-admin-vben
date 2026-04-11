<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import './ui-kit-demo.css';

defineOptions({ name: 'UiKitFormSelect' });

const router = useRouter();
const selectVal = ref(undefined);
const multiVal = ref([]);
const cascaderVal = ref([]);
const radioVal = ref(1);
const checkVal = ref<number[]>([]);
const switchVal = ref(false);
const sliderVal = ref(30);
const rateVal = ref(3);

const options = [
  { value: 1, label: '选项一' },
  { value: 2, label: '选项二' },
  { value: 3, label: '选项三（禁用）', disabled: true },
];

const cascaderOptions = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      { value: 'hangzhou', label: '杭州', children: [{ value: 'xihu', label: '西湖' }] },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      { value: 'nanjing', label: '南京', children: [{ value: 'zhonghuamen', label: '中华门' }] },
    ],
  },
];

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
          <h1 class="ui-kit-page__title">选择类组件</h1>
          <p class="ui-kit-page__sub">
            下拉、级联、单选/多选、开关、滑块与评分等常用选择控件。
          </p>
        </header>

        <div class="ui-kit-stack">
          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">下拉选择 Select</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-form class="ui-kit-form-wrap" layout="vertical">
                <a-form-item label="单选">
                  <a-select
                    v-model:value="selectVal"
                    :options="options"
                    placeholder="请选择"
                    style="width: 100%"
                  />
                </a-form-item>
                <a-form-item label="多选">
                  <a-select
                    v-model:value="multiVal"
                    :options="options"
                    mode="multiple"
                    placeholder="可多选"
                    style="width: 100%"
                  />
                </a-form-item>
                <a-form-item label="可搜索">
                  <a-select
                    v-model:value="selectVal"
                    :options="options"
                    show-search
                    placeholder="输入关键词搜索"
                    style="width: 100%"
                  />
                </a-form-item>
                <a-form-item label="禁用状态">
                  <a-select value="1" :options="options" disabled style="width: 100%" />
                </a-form-item>
              </a-form>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">级联选择 Cascader</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-form class="ui-kit-form-wrap" layout="vertical">
                <a-form-item label="级联">
                  <a-cascader
                    v-model:value="cascaderVal"
                    :options="cascaderOptions"
                    placeholder="请选择地区"
                    style="width: 100%"
                  />
                </a-form-item>
                <a-form-item label="多选级联">
                  <a-cascader
                    v-model:value="cascaderVal"
                    :options="cascaderOptions"
                    multiple
                    placeholder="可多选"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-form>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">单选 / 多选 / 开关 / 滑块 / 评分</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-form class="ui-kit-form-wrap" layout="vertical">
                <a-form-item label="Radio 单选">
                  <a-radio-group v-model:value="radioVal">
                    <a-radio :value="1">选项一</a-radio>
                    <a-radio :value="2">选项二</a-radio>
                    <a-radio :value="3" disabled>禁用</a-radio>
                  </a-radio-group>
                </a-form-item>
                <a-form-item label="Radio 按钮组">
                  <a-radio-group v-model:value="radioVal" button-style="solid">
                    <a-radio-button :value="1">一</a-radio-button>
                    <a-radio-button :value="2">二</a-radio-button>
                    <a-radio-button :value="3">三</a-radio-button>
                  </a-radio-group>
                </a-form-item>
                <a-form-item label="Checkbox 多选">
                  <a-checkbox-group v-model:value="checkVal">
                    <a-checkbox :value="1">选项一</a-checkbox>
                    <a-checkbox :value="2">选项二</a-checkbox>
                    <a-checkbox :value="3" disabled>禁用</a-checkbox>
                  </a-checkbox-group>
                </a-form-item>
                <a-form-item label="Switch 开关">
                  <a-switch v-model:checked="switchVal" checked-children="开" un-checked-children="关" />
                </a-form-item>
                <a-form-item label="Slider 滑块">
                  <a-slider v-model:value="sliderVal" />
                </a-form-item>
                <a-form-item label="Rate 评分">
                  <a-rate v-model:value="rateVal" />
                </a-form-item>
              </a-form>
            </div>
          </section>
        </div>
      </div>
    </div>
  </Page>
</template>
