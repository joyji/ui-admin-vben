<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';
import { useRouter } from 'vue-router';

import './ui-kit-demo.css';

defineOptions({ name: 'UiKitButton' });

const router = useRouter();

function goBack() {
  router.push('/ui-kit/index');
}
</script>

<template>
  <Page auto-content-height>
    <div class="ui-kit-page">
      <div class="ui-kit-page__inner">
        <header class="ui-kit-page__hero">
          <a-button type="link" class="ui-kit-page__back" @click="goBack">
            <IconifyIcon class="mr-1" icon="lucide:arrow-left" />
            返回组件导航
          </a-button>
          <h1 class="ui-kit-page__title">按钮类组件</h1>
          <p class="ui-kit-page__sub">
            Ant Design Vue 按钮类型、尺寸、状态与组合方式，便于与业务工具栏规范对齐。
          </p>
        </header>

        <div class="ui-kit-stack">
          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">按钮类型</h2>
              <p class="ui-kit-section__hint">主 / 默认 / 虚线 / 文本 / 链接 / 危险 / 禁用</p>
            </header>
            <div class="ui-kit-section__body">
              <div class="ui-kit-row">
                <a-button type="primary">主按钮</a-button>
                <a-button>次级按钮</a-button>
                <a-button type="dashed">虚线按钮</a-button>
                <a-button type="text">文本按钮</a-button>
                <a-button type="link">链接按钮</a-button>
                <a-button danger>危险按钮</a-button>
                <a-button disabled>禁用按钮</a-button>
              </div>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">按钮尺寸</h2>
              <p class="ui-kit-section__hint">large / middle / small</p>
            </header>
            <div class="ui-kit-section__body">
              <div class="ui-kit-row">
                <a-button type="primary" size="large">大号</a-button>
                <a-button type="primary">中号（默认）</a-button>
                <a-button type="primary" size="small">小号</a-button>
              </div>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">带图标按钮</h2>
              <p class="ui-kit-section__hint">图标 + 文案</p>
            </header>
            <div class="ui-kit-section__body">
              <div class="ui-kit-row">
                <a-button type="primary">
                  <template #icon>
                    <IconifyIcon icon="ant-design:plus-outlined" />
                  </template>
                  新增
                </a-button>
                <a-button>
                  <template #icon>
                    <IconifyIcon icon="ant-design:edit-outlined" />
                  </template>
                  编辑
                </a-button>
                <a-button danger>
                  <template #icon>
                    <IconifyIcon icon="ant-design:delete-outlined" />
                  </template>
                  删除
                </a-button>
              </div>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">Loading 状态</h2>
            </header>
            <div class="ui-kit-section__body">
              <div class="ui-kit-row">
                <a-button type="primary" loading>提交中...</a-button>
                <a-button loading>加载中...</a-button>
              </div>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">按钮组</h2>
            </header>
            <div class="ui-kit-section__body">
              <div class="ui-kit-row">
                <a-button-group>
                  <a-button>左</a-button>
                  <a-button>中</a-button>
                  <a-button>右</a-button>
                </a-button-group>
                <a-button-group>
                  <a-button type="primary">保存</a-button>
                  <a-button>取消</a-button>
                </a-button-group>
              </div>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">列表页工具栏示例</h2>
              <p class="ui-kit-section__hint">主操作 + 次操作 + 弱按钮</p>
            </header>
            <div class="ui-kit-section__body">
              <div class="ui-kit-row">
                <a-button type="primary">新增</a-button>
                <a-button>修改</a-button>
                <a-button>权限申请</a-button>
                <a-button>权限移交</a-button>
                <a-button danger>删除</a-button>
                <a-button class="ant-btn-back">特殊事项</a-button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </Page>
</template>
