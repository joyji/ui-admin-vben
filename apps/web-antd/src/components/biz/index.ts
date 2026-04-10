/**
 * Biz 标准 UI 组件库
 * 固化了视觉手册 v1.0 + pc-biz 规范的所有页面级布局样式。
 *
 * 使用方式：
 *   import { BizFormPage, BizFormGroup, BizFormFooter, BizActionBar } from '#/components/biz';
 *
 * 或在 main.ts 全局注册后，直接在模板中使用无需 import：
 *   <BizFormPage> <BizFormGroup> <BizFormFooter> <BizActionBar>
 */

export { default as BizActionBar } from './action-bar/index.vue';
export { default as BizFormFooter } from './form-footer/index.vue';
export { default as BizFormGroup } from './form-group/index.vue';
export { default as BizFormPage } from './form-page/index.vue';
