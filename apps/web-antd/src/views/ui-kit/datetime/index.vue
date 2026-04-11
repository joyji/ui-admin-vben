<script lang="ts" setup>
import { ref } from 'vue';
import dayjs from 'dayjs';

defineOptions({ name: 'UiKitDatetime' });

const dateVal = ref(dayjs());
const dateRangeVal = ref<[dayjs.Dayjs, dayjs.Dayjs] | []>([]);
const timeVal = ref(dayjs());
const monthVal = ref(dayjs());
const yearVal = ref(dayjs());
const weekVal = ref(dayjs());
</script>

<template>
  <RoFormPage title="时间类组件" :show-footer="false">
    <RoFormGroup title="日期选择 DatePicker">
      <a-form layout="vertical" style="max-width: 640px">
        <a-form-item label="日期">
          <a-date-picker v-model:value="dateVal" style="width: 100%" />
        </a-form-item>
        <a-form-item label="月份">
          <a-date-picker v-model:value="monthVal" picker="month" style="width: 100%" />
        </a-form-item>
        <a-form-item label="年份">
          <a-date-picker v-model:value="yearVal" picker="year" style="width: 100%" />
        </a-form-item>
        <a-form-item label="周">
          <a-date-picker v-model:value="weekVal" picker="week" style="width: 100%" />
        </a-form-item>
        <a-form-item label="日期 + 时间">
          <a-date-picker v-model:value="dateVal" show-time format="YYYY-MM-DD HH:mm:ss" style="width: 100%" />
        </a-form-item>
      </a-form>
    </RoFormGroup>

    <RoFormGroup title="日期范围 RangePicker">
      <a-form layout="vertical" style="max-width: 640px">
        <a-form-item label="日期范围">
          <a-range-picker v-model:value="dateRangeVal" style="width: 100%" />
        </a-form-item>
        <a-form-item label="日期时间范围">
          <a-range-picker v-model:value="dateRangeVal" show-time style="width: 100%" />
        </a-form-item>
        <a-form-item label="月份范围">
          <a-range-picker v-model:value="dateRangeVal" picker="month" style="width: 100%" />
        </a-form-item>
      </a-form>
    </RoFormGroup>

    <RoFormGroup title="时间选择 TimePicker">
      <a-form layout="vertical" style="max-width: 640px">
        <a-form-item label="时间">
          <a-time-picker v-model:value="timeVal" format="HH:mm:ss" style="width: 100%" />
        </a-form-item>
        <a-form-item label="时间范围">
          <a-time-range-picker style="width: 100%" />
        </a-form-item>
        <a-form-item label="禁用状态">
          <a-time-picker v-model:value="timeVal" format="HH:mm:ss" disabled style="width: 100%" />
        </a-form-item>
      </a-form>
    </RoFormGroup>
  </RoFormPage>
</template>
