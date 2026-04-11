<script lang="ts" setup>
import { ref } from 'vue';

defineOptions({ name: 'UiKitFormInput' });

const inputVal = ref('');
const textareaVal = ref('');
const numVal = ref<number | undefined>(undefined);
const pwdVal = ref('');
const searchVal = ref('');
</script>

<template>
  <RoFormPage title="文本录入类组件" :show-footer="false">
    <RoFormGroup title="输入框 Input">
      <a-form layout="vertical" style="max-width: 640px">
        <a-form-item label="基础输入框">
          <a-input v-model:value="inputVal" placeholder="请输入内容" />
        </a-form-item>
        <a-form-item label="带前后缀">
          <a-input v-model:value="inputVal" placeholder="搜索">
            <template #prefix>🔍</template>
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
          <a-input-number v-model:value="numVal" :min="0" :max="999" style="width: 100%" placeholder="请输入数字" />
        </a-form-item>
        <a-form-item label="多行文本">
          <a-textarea v-model:value="textareaVal" placeholder="请输入描述" :rows="4" show-count :maxlength="500" />
        </a-form-item>
      </a-form>
    </RoFormGroup>

    <RoFormGroup title="校验示例">
      <a-form layout="vertical" style="max-width: 640px">
        <a-form-item label="必填项" required has-feedback validate-status="error" help="此项为必填">
          <a-input placeholder="请输入" />
        </a-form-item>
        <a-form-item label="校验通过" has-feedback validate-status="success">
          <a-input value="已填写正确" />
        </a-form-item>
        <a-form-item label="校验中" has-feedback validate-status="validating">
          <a-input placeholder="校验中..." />
        </a-form-item>
      </a-form>
    </RoFormGroup>
  </RoFormPage>
</template>
