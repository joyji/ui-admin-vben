<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';
import dayjs from 'dayjs';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import './ui-kit-demo.css';

defineOptions({ name: 'UiKitDatetime' });

const router = useRouter();
const dateVal = ref(dayjs());
const dateRangeVal = ref<[dayjs.Dayjs, dayjs.Dayjs] | []>([]);
const timeVal = ref(dayjs());
const monthVal = ref(dayjs());
const yearVal = ref(dayjs());
const weekVal = ref(dayjs());

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
          <h1 class="ui-kit-page__title">时间类组件</h1>
          <p class="ui-kit-page__sub">
            日期、日期时间、范围选择与时间选择器常用组合。
          </p>
        </header>

        <div class="ui-kit-stack">
          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">日期选择 DatePicker</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-form class="ui-kit-form-wrap" layout="vertical">
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
                  <a-date-picker
                    v-model:value="dateVal"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-form>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">日期范围 RangePicker</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-form class="ui-kit-form-wrap" layout="vertical">
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
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">时间选择 TimePicker</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-form class="ui-kit-form-wrap" layout="vertical">
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
            </div>
          </section>
        </div>
      </div>
    </div>
  </Page>
</template>
