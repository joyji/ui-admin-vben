/**
 * Ro 标准 UI 组件库
 * 固化了视觉手册 v1.0 + pc-biz 规范的所有页面级布局样式。
 *
 * 使用方式：
 *   import { RoFormPage, RoFormGroup, RoFormFooter, RoActionBar } from '#/components/ro';
 *
 * 或在 main.ts 全局注册后，直接在模板中使用无需 import：
 *   <RoFormPage> <RoFormGroup> <RoFormFooter> <RoActionBar>
 */

export { default as RoActionBar } from './action-bar/index.vue';
export { default as RoFormFooter } from './form-footer/index.vue';
export { default as RoFormGroup } from './form-group/index.vue';
export { default as RoFormPage } from './form-page/index.vue';
