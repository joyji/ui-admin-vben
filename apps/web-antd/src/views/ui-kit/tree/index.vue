<script lang="ts" setup>
import { ref } from 'vue';
import type { TreeProps } from 'ant-design-vue';

defineOptions({ name: 'UiKitTree' });

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
  { value: '0', title: '总公司', children: [
    { value: '0-0', title: '华东分部', children: [
      { value: '0-0-0', title: '浙江省区' },
      { value: '0-0-1', title: '江苏省区' },
    ]},
  ]},
];
</script>

<template>
  <RoFormPage title="树组件" :show-footer="false">
    <RoFormGroup title="基础树 Tree（可勾选）">
      <a-tree
        v-model:checked-keys="checkedKeys"
        v-model:selected-keys="selectedKeys"
        v-model:expanded-keys="expandedKeys"
        :tree-data="treeData"
        checkable
        show-icon
        show-line
      />
    </RoFormGroup>

    <RoFormGroup title="Tree 搜索过滤">
      <a-tree
        :tree-data="treeData"
        checkable
        show-line
        default-expand-all
        :filter-tree-node="(node) => node.title?.toString().includes('华')"
      />
    </RoFormGroup>

    <RoFormGroup title="TreeSelect 树形下拉选择">
      <a-form layout="vertical" style="max-width: 400px">
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
    </RoFormGroup>

    <RoFormGroup title="DirectoryTree 目录树">
      <a-directory-tree
        :tree-data="treeData"
        default-expand-all
        multiple
      />
    </RoFormGroup>
  </RoFormPage>
</template>
