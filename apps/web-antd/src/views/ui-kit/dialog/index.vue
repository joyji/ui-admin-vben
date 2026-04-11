<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';
import { message, Modal, notification } from 'ant-design-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import './ui-kit-demo.css';

defineOptions({ name: 'UiKitDialog' });

const router = useRouter();
const modalVisible = ref(false);
const drawerVisible = ref(false);
const formModalVisible = ref(false);
const fullscreenVisible = ref(false);

function goBack() {
  router.push('/ui-kit/index');
}

function showMessage() {
  message.success('操作成功');
  setTimeout(() => message.error('操作失败'), 600);
  setTimeout(() => message.warning('注意：此操作不可撤销'), 1200);
}

function showNotification() {
  notification.success({ message: '成功通知', description: '数据已保存，请查看列表。' });
  setTimeout(
    () =>
      notification.error({
        message: '错误通知',
        description: '服务连接超时，请重试。',
      }),
    600,
  );
}

function showConfirm() {
  Modal.confirm({
    title: '确认删除',
    content: '确定要删除该记录吗？删除后不可恢复。',
    okText: '确定',
    cancelText: '取消',
    okButtonProps: { danger: true },
    onOk() {
      message.success('已删除');
    },
  });
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
          <h1 class="ui-kit-page__title">弹窗与反馈</h1>
          <p class="ui-kit-page__sub">
            Modal、Drawer、Message、Notification、Popconfirm 与 Alert 等全局与局部反馈。
          </p>
        </header>

        <div class="ui-kit-stack">
          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">Modal 弹窗</h2>
            </header>
            <div class="ui-kit-section__body">
              <div class="ui-kit-row">
                <a-button type="primary" @click="modalVisible = true">普通弹窗</a-button>
                <a-button @click="formModalVisible = true">表单弹窗</a-button>
                <a-button @click="fullscreenVisible = true">大尺寸弹窗</a-button>
                <a-button danger @click="showConfirm">确认弹窗（Confirm）</a-button>
              </div>

              <a-modal v-model:open="modalVisible" title="普通弹窗" ok-text="确定" cancel-text="取消">
                <p>这是弹窗内容区域，可放任意内容。</p>
              </a-modal>

              <a-modal
                v-model:open="formModalVisible"
                title="新增法人客户"
                ok-text="确定"
                cancel-text="取消"
                width="560px"
              >
                <a-form layout="horizontal" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
                  <a-form-item label="客户名称" required>
                    <a-input placeholder="请输入" />
                  </a-form-item>
                  <a-form-item label="证件类型" required>
                    <a-select placeholder="请选择" style="width: 100%">
                      <a-select-option value="1">统一社会信用代码</a-select-option>
                      <a-select-option value="2">其他</a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="证件号码" required>
                    <a-input placeholder="请输入" />
                  </a-form-item>
                  <a-form-item label="归属人">
                    <a-input value="陈璐" disabled />
                  </a-form-item>
                  <a-form-item label="部门路径">
                    <a-input value="智造业务部/东南区" disabled />
                  </a-form-item>
                </a-form>
              </a-modal>

              <a-modal
                v-model:open="fullscreenVisible"
                title="大尺寸弹窗"
                width="800px"
                ok-text="确定"
                cancel-text="取消"
              >
                <p>宽 800px 的弹窗，适合复杂表单或详情页场景。</p>
                <p class="ui-kit-muted" style="margin-top: 8px; margin-bottom: 0">
                  业务中可配合表单分组或分步表单使用。
                </p>
              </a-modal>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">Drawer 抽屉</h2>
            </header>
            <div class="ui-kit-section__body">
              <div class="ui-kit-row">
                <a-button @click="drawerVisible = true">打开抽屉</a-button>
              </div>
              <a-drawer
                v-model:open="drawerVisible"
                title="侧边抽屉"
                width="480"
                :footer-style="{ textAlign: 'right' }"
              >
                <p>抽屉内容区，适合详情展示或分步骤表单。</p>
                <template #footer>
                  <a-space>
                    <a-button @click="drawerVisible = false">取消</a-button>
                    <a-button type="primary" @click="drawerVisible = false">确定</a-button>
                  </a-space>
                </template>
              </a-drawer>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">Message / Notification</h2>
            </header>
            <div class="ui-kit-section__body">
              <div class="ui-kit-row">
                <a-button type="primary" @click="showMessage">触发 Message</a-button>
                <a-button @click="showNotification">触发 Notification</a-button>
              </div>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">Popconfirm</h2>
            </header>
            <div class="ui-kit-section__body">
              <div class="ui-kit-row">
                <a-popconfirm
                  title="确定要执行此操作吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="() => message.success('已确认')"
                >
                  <a-button danger>气泡确认</a-button>
                </a-popconfirm>
              </div>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">Alert</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-space direction="vertical" style="width: 100%">
                <a-alert message="成功提示" type="success" show-icon />
                <a-alert message="信息提示" type="info" show-icon />
                <a-alert message="警告提示" description="这是一段详细说明文字。" type="warning" show-icon />
                <a-alert
                  message="错误提示"
                  description="操作失败，请联系管理员。"
                  type="error"
                  show-icon
                  closable
                />
              </a-space>
            </div>
          </section>
        </div>
      </div>
    </div>
  </Page>
</template>
