<script lang="ts" setup>
import { ref } from 'vue';
import type { TableColumnsType } from 'ant-design-vue';

defineOptions({ name: 'UiKitTable' });

interface RowData {
  key: string;
  name: string;
  age: number;
  address: string;
  status: string;
}

const columns: TableColumnsType = [
  { title: '#', dataIndex: 'index', width: 56, align: 'center',
    customRender: ({ index }) => index + 1 },
  { title: '姓名', dataIndex: 'name', sorter: true },
  { title: '年龄', dataIndex: 'age', sorter: true, align: 'right' },
  { title: '状态', dataIndex: 'status',
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
  onChange: (keys: string[]) => { selectedRowKeys.value = keys; },
};

const expandedData: RowData[] = data.slice(0, 5).map(r => ({
  ...r, name: `${r.name}（子）`, address: `${r.address} → 子行` }));
</script>

<template>
  <RoFormPage title="表格类组件" :show-footer="false">
    <RoFormGroup title="基础表格（排序 + 筛选 + 行选择）">
      <div style="margin-bottom: 8px; font-size: 12px; color: rgba(0,0,0,0.45)">
        已选 {{ selectedRowKeys.length }} 行
      </div>
      <a-table
        :columns="columns"
        :data-source="data"
        :row-selection="rowSelection"
        :scroll="{ x: 800 }"
        :pagination="{ pageSize: 5, showSizeChanger: true, pageSizeOptions: ['5','10','20'] }"
        size="small"
        bordered
        row-key="key"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'status'">
            <a-tag :color="record.status === '正常' ? 'success' : 'error'">{{ record.status }}</a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a>编辑</a>
              <a style="color: #f53f3f">删除</a>
            </a-space>
          </template>
        </template>
      </a-table>
    </RoFormGroup>

    <RoFormGroup title="展开子表格">
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
            :data-source="[{ ...record, name: record.name + ' 子', address: record.address + ' 子行' }]"
            :pagination="false"
            size="small"
          />
        </template>
      </a-table>
    </RoFormGroup>

    <RoFormGroup title="空数据 / Loading 状态">
      <a-space direction="vertical" style="width: 100%">
        <a-table :columns="columns.slice(0,4)" :data-source="[]" :pagination="false" size="small" />
        <a-table :columns="columns.slice(0,4)" :data-source="[]" :pagination="false" size="small" loading />
      </a-space>
    </RoFormGroup>
  </RoFormPage>
</template>
