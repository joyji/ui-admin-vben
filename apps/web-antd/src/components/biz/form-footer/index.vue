<script lang="ts" setup>
/**
 * BizFormFooter — 表单底部操作栏
 *
 * sticky 定位，白底，顶部分割线，居中排布按钮。
 * 暴露具名插槽，按钮顺序从左到右：取消 → 弱操作 → 次级 → 主操作。
 *
 * 最简用法：
 *   <BizFormFooter @cancel="handleCancel" @submit="handleSubmit" />
 *
 * 完整用法（自定义按钮）：
 *   <BizFormFooter>
 *     <template #start>
 *       <a-button class="ant-btn-back">退回</a-button>
 *     </template>
 *     <a-button @click="handleSave">保存</a-button>
 *     <a-button type="primary" @click="handleSubmit">提交</a-button>
 *   </BizFormFooter>
 */

const emit = defineEmits<{
  /** 点击取消/返回 */
  cancel: [];
  /** 点击保存 */
  save: [];
  /** 点击提交 */
  submit: [];
}>();

withDefaults(
  defineProps<{
    /** 是否显示（v-if 语义糖） */
    visible?: boolean;
    /** 是否显示取消按钮（默认 true） */
    showCancel?: boolean;
    /** 是否显示保存按钮（默认 true） */
    showSave?: boolean;
    /** 是否显示提交按钮（默认 true） */
    showSubmit?: boolean;
    /** 提交按钮 loading */
    loading?: boolean;
    /** 提交按钮文案 */
    submitText?: string;
    /** 保存按钮文案 */
    saveText?: string;
    /** 取消按钮文案 */
    cancelText?: string;
  }>(),
  {
    visible: true,
    showCancel: true,
    showSave: true,
    showSubmit: true,
    loading: false,
    submitText: '提交',
    saveText: '保存',
    cancelText: '取消',
  },
);
</script>

<template>
  <div v-if="visible" class="biz-form-footer">
    <!-- 左侧附加插槽（如：征求意见、退回等弱操作） -->
    <div class="biz-form-footer__start">
      <slot name="start" />
    </div>

    <!-- 中央主操作区 -->
    <div class="biz-form-footer__center">
      <!-- 默认按钮（使用 emit 快捷方式） -->
      <template v-if="!$slots.default">
        <a-button v-if="showCancel" @click="emit('cancel')">
          {{ cancelText }}
        </a-button>
        <a-button v-if="showSave" @click="emit('save')">
          {{ saveText }}
        </a-button>
        <a-button
          v-if="showSubmit"
          :loading="loading"
          type="primary"
          @click="emit('submit')"
        >
          {{ submitText }}
        </a-button>
      </template>
      <!-- 自定义按钮插槽 -->
      <slot />
    </div>

    <!-- 右侧附加插槽（预留） -->
    <div class="biz-form-footer__end">
      <slot name="end" />
    </div>
  </div>
</template>

<style>
/* sticky 底部操作栏 */
.biz-form-footer {
  position: sticky;
  bottom: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 24px;
  background: #ffffff;
  border-top: 1px solid #e7e7e7;
  /* 基础投影（向上） */
  box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.04);
  border-radius: 0 0 4px 4px;
}

.biz-form-footer__start {
  display: flex;
  gap: 8px;
  margin-right: auto;
}

.biz-form-footer__center {
  display: flex;
  align-items: center;
  gap: 8px;
}

.biz-form-footer__end {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

/* 按钮间距收紧（footer 内） */
.biz-form-footer .ant-btn {
  min-width: 72px;
}
</style>
