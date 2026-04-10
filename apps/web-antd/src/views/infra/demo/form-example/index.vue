<script lang="ts" setup>
/**
 * 项目授信信息 — 表单示例页（重写版）
 *
 * 使用 BizFormPage + BizFormGroup 后：
 *   - 0 行 CSS（无 <style> 块）
 *   - 无需写任何布局类名（sticky、padding、border 等全部在组件内）
 *   - 只关注业务逻辑：字段定义 + API 调用 + 事件处理
 */

import type { ProjectCreditForm } from './data';

import { ref } from 'vue';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

import { getDefaultFormValues, useProjectCreditFormSchema } from './data';

defineOptions({ name: 'FormExample' });

// ─── 表单实例：3 列网格，label 宽 100px ───
const [Form, formApi] = useVbenForm({
  layout: 'horizontal',
  commonConfig: {
    labelWidth: 100,
    formItemClass: 'col-span-4',
    componentProps: { class: 'w-full' },
  },
  wrapperClass: 'grid-cols-12',
  schema: useProjectCreditFormSchema(),
  showDefaultActions: false,
});

formApi.setValues(getDefaultFormValues());

const loading = ref(false);

async function handleSubmit() {
  const { valid } = await formApi.validate();
  if (!valid) return;
  loading.value = true;
  try {
    const values = (await formApi.getValues()) as ProjectCreditForm;
    // TODO: await submitProjectCredit(values)
    console.log('[提交]', values);
    message.success('提交成功（示例）');
  } finally {
    loading.value = false;
  }
}

async function handleSave() {
  const values = (await formApi.getValues()) as ProjectCreditForm;
  // TODO: await saveProjectCredit(values)
  console.log('[保存]', values);
  message.success('保存成功（示例）');
}

function handleBack() {
  history.back();
}
</script>

<template>
  <!--
    BizFormPage 全部搞定：
    - 页头标题 + 右上角按钮栏（showBack + showHeaderSubmit）
    - 主内容区 padding / flex / gap
    - 底部 sticky 操作栏（showFooter）
    无需写任何 CSS。
  -->
  <BizFormPage
    title="项目授信流程-江苏医疗器械有限公司"
    :loading="loading"
    :show-back="true"
    :show-footer-cancel="true"
    :show-footer-save="true"
    :show-footer-submit="true"
    submit-text="提交"
    save-text="保存"
    @back="handleBack"
    @save="handleSave"
    @submit="handleSubmit"
  >
    <!-- 页头附加按钮（流程图、征求意见等） -->
    <template #header-extra>
      <a-button>流程图</a-button>
      <a-button>征求他人意见</a-button>
      <a-button>转他人处理</a-button>
    </template>

    <!-- 页头危险操作（否决、作废） -->
    <template #header-append>
      <a-button danger>否决</a-button>
    </template>

    <!-- ── 基本信息分组 ── -->
    <BizFormGroup title="基本信息">
      <Form />
    </BizFormGroup>

    <!-- 底部左侧：弱操作按钮 -->
    <template #footer-start>
      <a-button class="ant-btn-back" @click="handleBack">退回修改</a-button>
    </template>
  </BizFormPage>
</template>
