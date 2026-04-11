<script lang="ts" setup>
import { ref } from 'vue';

defineOptions({ name: 'UiKitFormSelect' });

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
</script>

<template>
  <RoFormPage title="选择类组件" :show-footer="false">
    <RoFormGroup title="下拉选择 Select">
      <a-form layout="vertical" style="max-width: 640px">
        <a-form-item label="单选">
          <a-select v-model:value="selectVal" :options="options" placeholder="请选择" style="width: 100%" />
        </a-form-item>
        <a-form-item label="多选">
          <a-select v-model:value="multiVal" :options="options" mode="multiple" placeholder="可多选" style="width: 100%" />
        </a-form-item>
        <a-form-item label="可搜索">
          <a-select v-model:value="selectVal" :options="options" show-search placeholder="输入关键词搜索" style="width: 100%" />
        </a-form-item>
        <a-form-item label="禁用状态">
          <a-select value="1" :options="options" disabled style="width: 100%" />
        </a-form-item>
      </a-form>
    </RoFormGroup>

    <RoFormGroup title="级联选择 Cascader">
      <a-form layout="vertical" style="max-width: 640px">
        <a-form-item label="级联">
          <a-cascader v-model:value="cascaderVal" :options="cascaderOptions" placeholder="请选择地区" style="width: 100%" />
        </a-form-item>
        <a-form-item label="多选级联">
          <a-cascader v-model:value="cascaderVal" :options="cascaderOptions" multiple placeholder="可多选" style="width: 100%" />
        </a-form-item>
      </a-form>
    </RoFormGroup>

    <RoFormGroup title="单选 / 多选框">
      <a-form layout="vertical" style="max-width: 640px">
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
    </RoFormGroup>
  </RoFormPage>
</template>
