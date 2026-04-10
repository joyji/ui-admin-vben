<script lang="ts" setup>
/**
 * BizActionBar — 页头操作按钮组
 *
 * 封装了视觉手册的三级按钮规范：
 *   弱（返回/重置）→ 次级（保存）→ 强（提交）
 * 渲染在 <Page #extra> 插槽中。
 *
 * 最简用法（快捷 emit）：
 *   <Page>
 *     <template #extra>
 *       <BizActionBar
 *         :show-back="true"
 *         :loading="loading"
 *         @back="handleBack"
 *         @save="handleSave"
 *         @submit="handleSubmit"
 *       />
 *     </template>
 *   </Page>
 *
 * 自定义按钮：
 *   <BizActionBar>
 *     <a-button @click="handleProcess">征求意见</a-button>
 *     <a-button type="primary" @click="handleSubmit">提交</a-button>
 *   </BizActionBar>
 */

const emit = defineEmits<{
  back: [];
  reset: [];
  save: [];
  submit: [];
}>();

withDefaults(
  defineProps<{
    /** 是否显示"返回"弱按钮 */
    showBack?: boolean;
    /** 是否显示"重置"弱按钮 */
    showReset?: boolean;
    /** 是否显示"保存"次级按钮 */
    showSave?: boolean;
    /** 是否显示"提交"主按钮 */
    showSubmit?: boolean;
    /** 提交 loading */
    loading?: boolean;
    submitText?: string;
    saveText?: string;
    backText?: string;
    resetText?: string;
  }>(),
  {
    showBack: false,
    showReset: false,
    showSave: true,
    showSubmit: true,
    loading: false,
    submitText: '提交',
    saveText: '保存',
    backText: '返回',
    resetText: '重置',
  },
);
</script>

<template>
  <div class="biz-action-bar">
    <!-- 前置插槽（如：流程图、征求意见等功能按钮） -->
    <slot name="prepend" />

    <!-- 弱按钮（次要操作，灰底） -->
    <a-button
      v-if="showReset"
      class="ant-btn-back"
      @click="emit('reset')"
    >
      {{ resetText }}
    </a-button>
    <a-button
      v-if="showBack"
      class="ant-btn-back"
      @click="emit('back')"
    >
      {{ backText }}
    </a-button>

    <!-- 自定义插槽（主区域） -->
    <slot />

    <!-- 次级按钮（白底描边） -->
    <a-button v-if="showSave && !$slots.default" @click="emit('save')">
      {{ saveText }}
    </a-button>

    <!-- 主按钮（主色填充） -->
    <a-button
      v-if="showSubmit && !$slots.default"
      :loading="loading"
      type="primary"
      @click="emit('submit')"
    >
      {{ submitText }}
    </a-button>

    <!-- 后置插槽（如：作废等危险操作） -->
    <slot name="append" />
  </div>
</template>

<style>
.biz-action-bar {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
