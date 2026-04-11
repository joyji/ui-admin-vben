<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';
import type { TableColumnsType } from 'ant-design-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import './ui-kit-demo.css';

defineOptions({ name: 'UiKitTable' });

const router = useRouter();

interface RowData {
  key: string;
  name: string;
  age: number;
  address: string;
  status: string;
}

const columns: TableColumnsType = [
  {
    title: '#',
    dataIndex: 'index',
    width: 56,
    align: 'center',
    customRender: ({ index }) => index + 1,
  },
  { title: '姓名', dataIndex: 'name', sorter: true },
  { title: '年龄', dataIndex: 'age', sorter: true, align: 'right' },
  {
    title: '状态',
    dataIndex: 'status',
    filters: [
      { text: '正常', value: '正常' },
      { text: '禁用', value: '禁用' },
    ],
  },
  { title: '地址', dataIndex: 'address', ellipsis: true },
  { title: '操作', key: 'action', width: 120, fixed: 'right' },
];

const data: RowData[] = Array.from({ length: 20 }).map((_, i) => ({
  key: String(i),
  name: `用户 ${i + 1}`,
  age: 20 + (i % 10),
  address: `浙江省杭州市西湖区 ${i + 1} 号`,
  status: i % 3 === 0 ? '禁用' : '正常',
}));

const selectedRowKeys = ref<string[]>([]);

const rowSelection = {
  selectedRowKeys,
  onChange: (keys: string[]) => {
    selectedRowKeys.value = keys;
  },
};

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
          <h1 class="ui-kit-page__title">表格类组件</h1>
          <p class="ui-kit-page__sub">
            基于 Ant Design Vue Table：排序、筛选、行选择、固定列、展开子表与空态。
          </p>
        </header>

        <div class="ui-kit-stack">
          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">基础表格</h2>
              <p class="ui-kit-section__hint">排序、列筛选、多选、分页、固定操作列</p>
            </header>
            <div class="ui-kit-section__body ui-kit-section__body--flush">
              <div class="ui-kit-pad">
                <p class="ui-kit-table-hint">已选 {{ selectedRowKeys.length }} 行</p>
              </div>
              <a-table
                :columns="columns"
                :data-source="data"
                :row-selection="rowSelection"
                :scroll="{ x: 800 }"
                :pagination="{
                  pageSize: 5,
                  showSizeChanger: true,
                  pageSizeOptions: ['5', '10', '20'],
                  showTotal: (total: number) => `共 ${total} 条`,
                }"
                size="small"
                bordered
                row-key="key"
              >
                <template #bodyCell="{ column, record }">
                  <template v-if="column.dataIndex === 'status'">
                    <a-tag :color="record.status === '正常' ? 'success' : 'error'">
                      {{ record.status }}
                    </a-tag>
                  </template>
                  <template v-if="column.key === 'action'">
                    <a-space>
                      <a>编辑</a>
                      <a style="color: #f53f3f">删除</a>
                    </a-space>
                  </template>
                </template>
              </a-table>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">展开子表格</h2>
            </header>
            <div class="ui-kit-section__body ui-kit-section__body--flush">
              <a-table
                :columns="columns.slice(0, 5)"
                :data-source="data.slice(0, 5)"
                :pagination="false"
                size="small"
                row-key="key"
              >
                <template #expandedRowRender="{ record }">
                  <a-table
                    :columns="[
                      { title: '子姓名', dataIndex: 'name' },
                      { title: '子地址', dataIndex: 'address' },
                    ]"
                    :data-source="[
                      {
                        ...record,
                        name: `${record.name} 子`,
                        address: `${record.address} 子行`,
                      },
                    ]"
                    :pagination="false"
                    size="small"
                  />
                </template>
              </a-table>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">空数据与 Loading</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-space direction="vertical" style="width: 100%">
                <a-table :columns="columns.slice(0, 4)" :data-source="[]" :pagination="false" size="small" />
                <a-table
                  :columns="columns.slice(0, 4)"
                  :data-source="[]"
                  :pagination="false"
                  size="small"
                  loading
                />
              </a-space>
            </div>
          </section>
        </div>
      </div>
    </div>
  </Page>
</template>
