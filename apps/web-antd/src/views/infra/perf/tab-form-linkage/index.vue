<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';

import { Card, Input, InputNumber, Tabs, Typography } from 'ant-design-vue';

type FormModel = Record<string, number | string>;

function createModel(prefix: string, count: number): FormModel {
  const model: FormModel = {};
  for (let i = 1; i <= count; i++) {
    model[`${prefix}Text${i}`] = `${prefix}-text-${i}`;
    model[`${prefix}Number${i}`] = i;
  }
  return model;
}

const fieldCount = ref(120);
const activeKey = ref('tabA');

const tabA = reactive(createModel('a', fieldCount.value));
const tabB = reactive(createModel('b', fieldCount.value));

const linkageText = ref('init');
const linkageNumber = ref(0);
const linkageCounter = ref(0);
const linkageLatencyMs = ref(0);

watch(
  () => tabA.aText1,
  (value) => {
    const start = performance.now();
    linkageText.value = String(value);
    tabB.bText1 = `linked:${value}`;
    linkageCounter.value++;
    linkageLatencyMs.value = Math.round((performance.now() - start) * 1000) / 1000;
  },
  { flush: 'sync' },
);

watch(
  () => tabA.aNumber1,
  (value) => {
    const start = performance.now();
    const num = Number(value || 0);
    linkageNumber.value = num;
    tabB.bNumber1 = num * 2;
    linkageCounter.value++;
    linkageLatencyMs.value = Math.round((performance.now() - start) * 1000) / 1000;
  },
  { flush: 'sync' },
);

const fields = computed(() => {
  return Array.from({ length: fieldCount.value }, (_, idx) => idx + 1);
});
</script>

<template>
  <div class="p-4">
    <Card title="多 Tab / 多表单联动压测页">
      <Typography.Paragraph>
        用途：用于压测“单页多 tab + 多表单 + 字段联动”场景。默认每个 tab 120 对字段，可在脚本中高频输入触发联动。
      </Typography.Paragraph>
      <div class="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div data-test="perf-linkage-text">linkageText: {{ linkageText }}</div>
        <div data-test="perf-linkage-number">linkageNumber: {{ linkageNumber }}</div>
        <div data-test="perf-linkage-counter">linkageCounter: {{ linkageCounter }}</div>
        <div data-test="perf-linkage-latency">linkageLatencyMs: {{ linkageLatencyMs }}</div>
      </div>
      <Tabs v-model:activeKey="activeKey" type="card">
        <Tabs.TabPane key="tabA" tab="表单A">
          <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div v-for="idx in fields" :key="`a-${idx}`" class="flex items-center gap-2">
              <Input
                v-model:value="tabA[`aText${idx}`]"
                :data-test="`a-text-${idx}`"
                :placeholder="`A文本${idx}`"
              />
              <InputNumber
                v-model:value="tabA[`aNumber${idx}`] as number"
                :data-test="`a-number-${idx}`"
                :placeholder="`A数字${idx}`"
                class="w-36"
              />
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane key="tabB" tab="表单B">
          <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div v-for="idx in fields" :key="`b-${idx}`" class="flex items-center gap-2">
              <Input
                v-model:value="tabB[`bText${idx}`]"
                :data-test="`b-text-${idx}`"
                :placeholder="`B文本${idx}`"
              />
              <InputNumber
                v-model:value="tabB[`bNumber${idx}`] as number"
                :data-test="`b-number-${idx}`"
                :placeholder="`B数字${idx}`"
                class="w-36"
              />
            </div>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Card>
  </div>
</template>
