<script lang="ts" setup>
/**
 * RoFormGroup — 表单折叠分组
 *
 * 封装了 pc-biz 规范的 Collapse 样式：
 *   - header 左侧 4px 主色边框
 *   - 字号 13px，字重 700，颜色 rgba(0,0,0,0.9)
 *   - 默认展开
 *   - form-item margin-bottom: 0，min-height: 39px
 *   - label 垂直居中
 *
 * 用法：
 *   <RoFormGroup title="基本信息">
 *     <Form />
 *   </RoFormGroup>
 *
 *   <!-- 多分组 -->
 *   <RoFormGroup title="基本信息" :default-open="true">
 *     <Form />
 *   </RoFormGroup>
 *   <RoFormGroup title="风险信息">
 *     <slot />
 *   </RoFormGroup>
 */

withDefaults(
  defineProps<{
    /** 分组标题 */
    title?: string;
    /** 默认是否展开，默认 true */
    defaultOpen?: boolean;
    /** 右上角附加内容区域 */
    extra?: boolean;
  }>(),
  {
    title: '',
    defaultOpen: true,
    extra: false,
  },
);
</script>

<template>
  <a-collapse
    :default-active-key="defaultOpen ? ['panel'] : []"
    :bordered="false"
    class="biz-form-group"
  >
    <a-collapse-panel key="panel">
      <!-- 分组标题 -->
      <template #header>
        <span class="biz-form-group__title">{{ title }}</span>
      </template>
      <!-- 右上角操作插槽（可选） -->
      <template v-if="extra" #extra>
        <slot name="extra" />
      </template>
      <!-- 表单内容 -->
      <div class="biz-form-group__body">
        <slot />
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<style>
/**
 * 非 scoped：写入全局，让 :deep 在任意子组件中生效
 * 命名空间 .biz-form-group 确保不污染其他组件
 */

/* ── 外层 collapse 重置 ── */
.biz-form-group.ant-collapse {
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 0;
  margin-bottom: 8px;
}

/* ── item 卡片样式 ── */
.biz-form-group .ant-collapse-item {
  background: #ffffff;
  border: none;
  border-radius: 2px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 0;
}

/* ── header：左侧主色边框 ── */
.biz-form-group .ant-collapse-item > .ant-collapse-header {
  border-left: 4px solid #0f56d5;
  border-radius: 2px 2px 0 0;
  min-height: 40px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
}

/* ── 标题文字 ── */
.biz-form-group__title {
  font-size: 13px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.9);
  font-family: "Microsoft YaHei", "Segoe UI", Arial, "Pingfang SC", sans-serif;
}

/* ── 展开/收起图标颜色 ── */
.biz-form-group .ant-collapse-expand-icon svg {
  color: #0f56d5;
}

/* ── 内容区 ── */
.biz-form-group .ant-collapse-content {
  border-top: none;
  border-radius: 0 0 2px 2px;
  overflow: visible;
}

.biz-form-group .ant-collapse-content-box {
  padding: 8px 16px 12px;
}

/* ── form-item 规范（pc-biz medium 模式） ── */
.biz-form-group__body .ant-form-item {
  margin-bottom: 4px;
  min-height: 39px;
}

/* label 垂直居中 */
.biz-form-group__body .ant-form-item-label {
  display: flex;
  align-items: center;
}

/* label 文字颜色 */
.biz-form-group__body .ant-form-item-label > label {
  color: rgba(0, 0, 0, 0.9);
  font-size: 13px;
}
</style>
