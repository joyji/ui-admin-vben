<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';
import type { TreeProps } from 'ant-design-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import './ui-kit-demo.css';

defineOptions({ name: 'UiKitTree' });

const router = useRouter();

const treeData: TreeProps['treeData'] = [
  {
    title: '总公司',
    key: '0',
    children: [
      {
        title: '华东分部',
        key: '0-0',
        children: [
          { title: '浙江省区', key: '0-0-0' },
          { title: '江苏省区', key: '0-0-1' },
          { title: '上海区域', key: '0-0-2', disabled: true },
        ],
      },
      {
        title: '华南分部',
        key: '0-1',
        children: [
          { title: '广东省区', key: '0-1-0' },
          { title: '福建省区', key: '0-1-1' },
        ],
      },
      { title: '华北分部（叶节点）', key: '0-2', isLeaf: true },
    ],
  },
];

const checkedKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);
const expandedKeys = ref<string[]>(['0', '0-0']);

const selectTreeVal = ref<string | undefined>(undefined);
const selectTreeData = [
  {
    value: '0',
    title: '总公司',
    children: [
      {
        value: '0-0',
        title: '华东分部',
        children: [
          { value: '0-0-0', title: '浙江省区' },
          { value: '0-0-1', title: '江苏省区' },
        ],
      },
    ],
  },
];

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
          <h1 class="ui-kit-page__title">树组件</h1>
          <p class="ui-kit-page__sub">
            Tree、TreeSelect、DirectoryTree 与勾选、过滤等常见用法。
          </p>
        </header>

        <div class="ui-kit-stack">
          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">基础树（可勾选）</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-tree
                v-model:checked-keys="checkedKeys"
                v-model:selected-keys="selectedKeys"
                v-model:expanded-keys="expandedKeys"
                :tree-data="treeData"
                checkable
                show-icon
                show-line
              />
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">搜索过滤示例</h2>
              <p class="ui-kit-section__hint">演示按标题包含「华」过滤</p>
            </header>
            <div class="ui-kit-section__body">
              <a-tree
                :tree-data="treeData"
                checkable
                show-line
                default-expand-all
                :filter-tree-node="(node: { title?: unknown }) => node.title?.toString().includes('华')"
              />
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">TreeSelect</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-form class="ui-kit-form-wrap" layout="vertical">
                <a-form-item label="选择部门">
                  <a-tree-select
                    v-model:value="selectTreeVal"
                    :tree-data="selectTreeData"
                    tree-default-expand-all
                    placeholder="请选择部门"
                    style="width: 100%"
                  />
                </a-form-item>
                <a-form-item label="多选">
                  <a-tree-select
                    :tree-data="selectTreeData"
                    tree-default-expand-all
                    multiple
                    placeholder="可多选"
                    style="width: 100%"
                  />
                </a-form-item>
                <a-form-item label="可勾选">
                  <a-tree-select
                    :tree-data="selectTreeData"
                    tree-checkable
                    tree-default-expand-all
                    placeholder="勾选节点"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-form>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">DirectoryTree</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-directory-tree :tree-data="treeData" default-expand-all multiple />
            </div>
          </section>
        </div>
      </div>
    </div>
  </Page>
</template>
