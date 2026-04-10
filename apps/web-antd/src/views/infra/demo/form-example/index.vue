<script lang="ts" setup>
/**
 * 项目授信信息 — 表单示例页
 * 对应截图：详情页布局 + 折叠分组 + 3 列网格 + 页头按钮栏
 *
 * 核心规范（来自 pc-biz + 视觉手册 v1.0）：
 *   - 字号 13px，输入框高度 28px
 *   - Label 宽度 100px，右对齐，无冒号
 *   - 3 列网格（grid-cols-3），间距 col-gap-4 row-gap-0
 *   - 必填字段：label 前红星 *
 *   - 折叠区域：Collapse，左侧 4px 主色边框
 *   - 页头：title + 功能按钮组（弱/次/强）
 *   - 底部操作栏：居中，主/次按钮
 */

import type { ProjectCreditForm } from './data';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

import {
  getDefaultFormValues,
  useProjectCreditFormSchema,
} from './data';

defineOptions({ name: 'FormExample' });

// ─── 是否编辑模式（实际由路由参数控制） ───
const isEdit = ref(true);

// ─── 表单实例 ───
const [Form, formApi] = useVbenForm({
  // 布局：horizontal 水平，label 右对齐
  layout: 'horizontal',
  // 全局 label 宽度（px），与 pc-biz 一致
  commonConfig: {
    labelWidth: 100,
    // 统一 col-span-4（3 列中每列占 4/12）
    formItemClass: 'col-span-4',
    componentProps: {
      class: 'w-full',
    },
  },
  // 12 列网格
  wrapperClass: 'grid-cols-12',
  schema: useProjectCreditFormSchema(),
  showDefaultActions: false,
});

// ─── 初始化默认值 ───
formApi.setValues(getDefaultFormValues());

// ─── 提交 ───
const loading = ref(false);
async function handleSubmit() {
  const { valid } = await formApi.validate();
  if (!valid) return;
  loading.value = true;
  try {
    const values = (await formApi.getValues()) as ProjectCreditForm;
    // eslint-disable-next-line no-console
    console.log('[表单提交]', values);
    message.success('提交成功（示例）');
  } finally {
    loading.value = false;
  }
}

async function handleSave() {
  const values = (await formApi.getValues()) as ProjectCreditForm;
  // eslint-disable-next-line no-console
  console.log('[保存]', values);
  message.success('保存成功（示例）');
}

function handleCancel() {
  history.back();
}

function handleReset() {
  formApi.resetForm();
  formApi.setValues(getDefaultFormValues());
}
</script>

<template>
  <Page auto-content-height>
    <!-- ───────── 页头：标题 + 操作按钮 ───────── -->
    <template #extra>
      <div class="flex items-center gap-2">
        <!-- 弱按钮（次要操作） -->
        <a-button class="ant-btn-back" @click="handleReset">重置</a-button>
        <!-- 次级按钮（描边） -->
        <a-button @click="handleCancel">返回</a-button>
        <!-- 强按钮（保存） -->
        <a-button @click="handleSave">保存</a-button>
        <!-- 主按钮（提交） -->
        <a-button :loading="loading" type="primary" @click="handleSubmit">
          提交
        </a-button>
      </div>
    </template>

    <div class="flex flex-col gap-3 px-4 py-3">
      <!-- ───────── 基本信息分组 ───────── -->
      <a-collapse
        :default-active-key="['base', 'risk']"
        :border="false"
        class="form-collapse"
      >
        <a-collapse-panel key="base" header="基本信息">
          <!--
            useVbenForm 渲染的 Form 组件
            wrapperClass="grid-cols-12" 配合 formItemClass="col-span-4"
            实现截图中的 3 列网格
          -->
          <Form />
        </a-collapse-panel>
      </a-collapse>

      <!-- ───────── 底部操作按钮（表单内） ───────── -->
      <div
        v-if="isEdit"
        class="sticky bottom-0 flex items-center justify-center gap-3 border-t border-[#e7e7e7] bg-white py-3"
      >
        <a-button @click="handleCancel">取消</a-button>
        <a-button @click="handleSave">保存</a-button>
        <a-button :loading="loading" type="primary" @click="handleSubmit">
          提交
        </a-button>
      </div>
    </div>
  </Page>
</template>

<style scoped>
/**
 * 折叠组件内的表单整体微调
 * 还原 pc-biz medium 模式下：
 *   - form-item margin-bottom: 0
 *   - 行高 min-height: 39px
 *   - 折叠头：左侧 4px 主色边框
 */
.form-collapse :deep(.ant-collapse-item .ant-collapse-header) {
  font-weight: 700;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.9);
}

/* 让 Grid 中的 form-item 有统一的最小高度，避免内容高度不一致 */
.form-collapse :deep(.ant-form-item) {
  min-height: 39px;
  margin-bottom: 4px;
}

/* label 垂直居中 */
.form-collapse :deep(.ant-form-item-label) {
  display: flex;
  align-items: center;
}
</style>
