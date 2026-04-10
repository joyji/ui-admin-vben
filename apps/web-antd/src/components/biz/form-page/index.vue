<script lang="ts" setup>
/**
 * RoFormPage — 表单/详情页标准容器
 *
 * 将页面级布局规范完全固化：
 *   - <Page> + 页头标题 + 右上角 <RoActionBar>
 *   - 内容区：px-4 py-3，flex-col gap-3
 *   - 自动支持多个 <RoFormGroup> 分组
 *   - 底部 <RoFormFooter> sticky 操作栏
 *
 * 业务页面使用时 0 CSS：
 *
 *   <RoFormPage
 *     title="项目授信流程-江苏医疗器械有限公司"
 *     :loading="loading"
 *     :show-back="true"
 *     @back="handleBack"
 *     @save="handleSave"
 *     @submit="handleSubmit"
 *   >
 *     <!-- 页头右侧附加按钮（可选） -->
 *     <template #header-extra>
 *       <a-button @click="handleProcess">流程图</a-button>
 *     </template>
 *
 *     <!-- 表单分组（一个或多个） -->
 *     <RoFormGroup title="基本信息">
 *       <Form />
 *     </RoFormGroup>
 *     <RoFormGroup title="风险信息">
 *       <RiskForm />
 *     </RoFormGroup>
 *
 *     <!-- 底部操作栏附加按钮（可选） -->
 *     <template #footer-start>
 *       <a-button @click="handleReject">否决</a-button>
 *     </template>
 *   </RoFormPage>
 */

import { Page } from '@vben/common-ui';

import RoActionBar from '../action-bar/index.vue';
import RoFormFooter from '../form-footer/index.vue';

const emit = defineEmits<{
  back: [];
  reset: [];
  save: [];
  submit: [];
}>();

withDefaults(
  defineProps<{
    /** 页面标题 */
    title?: string;
    /** 提交 loading */
    loading?: boolean;
    /** 是否显示页头"返回"弱按钮 */
    showBack?: boolean;
    /** 是否显示页头"重置"弱按钮 */
    showReset?: boolean;
    /** 是否显示页头"保存"次级按钮（页头按钮组用） */
    showHeaderSave?: boolean;
    /** 是否显示页头"提交"主按钮（页头按钮组用） */
    showHeaderSubmit?: boolean;
    /** 是否显示底部操作栏 */
    showFooter?: boolean;
    /** 底部是否显示取消按钮 */
    showFooterCancel?: boolean;
    /** 底部是否显示保存按钮 */
    showFooterSave?: boolean;
    /** 底部是否显示提交按钮 */
    showFooterSubmit?: boolean;
    /** 提交按钮文案 */
    submitText?: string;
    /** 保存按钮文案 */
    saveText?: string;
  }>(),
  {
    title: '',
    loading: false,
    showBack: false,
    showReset: false,
    showHeaderSave: false,
    showHeaderSubmit: false,
    showFooter: true,
    showFooterCancel: true,
    showFooterSave: true,
    showFooterSubmit: true,
    submitText: '提交',
    saveText: '保存',
  },
);
</script>

<template>
  <Page auto-content-height>
    <!-- ───── 页头右侧按钮 ───── -->
    <template v-if="title || $slots['header-extra'] || showBack || showReset || showHeaderSave || showHeaderSubmit" #extra>
      <RoActionBar
        :show-back="showBack"
        :show-reset="showReset"
        :show-save="showHeaderSave"
        :show-submit="showHeaderSubmit"
        :loading="loading"
        :submit-text="submitText"
        :save-text="saveText"
        @back="emit('back')"
        @reset="emit('reset')"
        @save="emit('save')"
        @submit="emit('submit')"
      >
        <!-- 前置自定义按钮（流程图、征求意见等） -->
        <template v-if="$slots['header-prepend']" #prepend>
          <slot name="header-prepend" />
        </template>
        <!-- 页头中央自定义按钮 -->
        <slot name="header-extra" />
        <!-- 后置（危险操作等） -->
        <template v-if="$slots['header-append']" #append>
          <slot name="header-append" />
        </template>
      </RoActionBar>
    </template>

    <!-- ───── 主内容 ───── -->
    <div class="biz-form-page__body">
      <!-- 分组/表单内容（放 RoFormGroup 或直接放 Form） -->
      <slot />

      <!-- ───── 底部操作栏 ───── -->
      <RoFormFooter
        :visible="showFooter"
        :show-cancel="showFooterCancel"
        :show-save="showFooterSave"
        :show-submit="showFooterSubmit"
        :loading="loading"
        :submit-text="submitText"
        :save-text="saveText"
        @cancel="emit('back')"
        @save="emit('save')"
        @submit="emit('submit')"
      >
        <!-- 底部左侧自定义按钮（弱操作：否决、退回等） -->
        <template v-if="$slots['footer-start']" #start>
          <slot name="footer-start" />
        </template>
        <!-- 底部中央自定义按钮（完全接管） -->
        <slot v-if="$slots['footer']" name="footer" />
        <!-- 底部右侧自定义按钮 -->
        <template v-if="$slots['footer-end']" #end>
          <slot name="footer-end" />
        </template>
      </RoFormFooter>
    </div>
  </Page>
</template>

<style>
/* 主内容区：内边距、纵向排列、分组间距 */
.biz-form-page__body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px 0;
  /* 为 sticky footer 留出空间 */
  padding-bottom: 0;
}
</style>
