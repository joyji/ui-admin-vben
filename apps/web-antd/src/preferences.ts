import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    /** 后端路由模式 */
    accessMode:
      import.meta.env.DEV &&
      String(import.meta.env.VITE_OFFLINE_MOCK).toLowerCase() === 'true'
        ? 'frontend'
        : 'backend',
    name: import.meta.env.VITE_APP_TITLE,
    enableRefreshToken: true,
  },
  theme: {
    /** 默认白天模式 */
    mode: 'light',
    /**
     * 视觉规范 v1.0：主色 Brand1-6 #0F56D5
     * 悬浮 #4080FF，点击 #0E42D2
     */
    colorPrimary: 'hsl(218 88% 44%)',
    /** 视觉规范 v1.0：成功色 Success-6 #00B42A */
    colorSuccess: 'hsl(133 100% 35%)',
    /** 视觉规范 v1.0：警告色 Warning-6 #FF7D00 */
    colorWarning: 'hsl(30 100% 50%)',
    /** 视觉规范 v1.0：错误色 Error-6 #F53F3F */
    colorDestructive: 'hsl(0 90% 60%)',
    /**
     * pc-biz 圆角：通用 2px → 0.125rem
     * 弹窗 6px/按钮 3px 由 CSS 单独设置
     */
    radius: 0.125,
    /** pc-biz 基础字号 13px */
    fontSize: 13,
  },
  footer: {
    /** 默认关闭 footer 页脚，因为有一定遮挡 */
    enable: false,
    fixed: false,
  },
  copyright: {
    companyName: import.meta.env.VITE_APP_TITLE,
    companySiteLink: 'https://gitee.com/yudaocode/yudao-ui-admin-vben',
  },
});
