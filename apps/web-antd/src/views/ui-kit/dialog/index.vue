<script lang="ts" setup>
import { ref } from 'vue';
import { message, notification, Modal } from 'ant-design-vue';

defineOptions({ name: 'UiKitDialog' });

const modalVisible = ref(false);
const confirmVisible = ref(false);
const drawerVisible = ref(false);
const formModalVisible = ref(false);
const fullscreenVisible = ref(false);

function showMessage() {
  message.success('操作成功');
  setTimeout(() => message.error('操作失败'), 600);
  setTimeout(() => message.warning('注意：此操作不可撤销'), 1200);
}

function showNotification() {
  notification.success({ message: '成功通知', description: '数据已保存，请查看列表。' });
  setTimeout(() => notification.error({ message: '错误通知', description: '服务连接超时，请重试。' }), 600);
}

function showConfirm() {
  Modal.confirm({
    title: '确认删除',
    content: '确定要删除该记录吗？删除后不可恢复。',
    okText: '确定',
    cancelText: '取消',
    okButtonProps: { danger: true },
    onOk() { message.success('已删除'); },
  });
}
</script>

<template>
  <RoFormPage title="弹窗 / 反馈类组件" :show-footer="false">
    <RoFormGroup title="Modal 弹窗">
      <div class="demo-row">
        <a-button type="primary" @click="modalVisible = true">普通弹窗</a-button>
        <a-button @click="formModalVisible = true">表单弹窗</a-button>
        <a-button @click="fullscreenVisible = true">大尺寸弹窗</a-button>
        <a-button danger @click="showConfirm">确认弹窗（Confirm）</a-button>
      </div>

      <!-- 普通弹窗 -->
      <a-modal v-model:open="modalVisible" title="普通弹窗" ok-text="确定" cancel-text="取消">
        <p>这是弹窗内容区域，可放任意内容。</p>
      </a-modal>

      <!-- 表单弹窗 -->
      <a-modal v-model:open="formModalVisible" title="新增法人客户" ok-text="确定" cancel-text="取消" width="560px">
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

      <!-- 大尺寸弹窗 -->
      <a-modal v-model:open="fullscreenVisible" title="大尺寸弹窗" width="800px" ok-text="确定" cancel-text="取消">
        <p>宽 800px 的弹窗，适合复杂表单或详情页场景。</p>
        <p style="color: rgba(0,0,0,0.45); font-size: 12px">可配合 RoFormGroup 使用分组。</p>
      </a-modal>
    </RoFormGroup>

    <RoFormGroup title="Drawer 抽屉">
      <div class="demo-row">
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
    </RoFormGroup>

    <RoFormGroup title="全局提示 Message / Notification">
      <div class="demo-row">
        <a-button type="primary" @click="showMessage">触发 Message</a-button>
        <a-button @click="showNotification">触发 Notification</a-button>
      </div>
    </RoFormGroup>

    <RoFormGroup title="Popconfirm 气泡确认">
      <div class="demo-row">
        <a-popconfirm
          title="确定要执行此操作吗？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="() => message.success('已确认')"
        >
          <a-button danger>气泡确认（Popconfirm）</a-button>
        </a-popconfirm>
      </div>
    </RoFormGroup>

    <RoFormGroup title="Alert 警告提示">
      <a-space direction="vertical" style="width: 100%">
        <a-alert message="成功提示" type="success" show-icon />
        <a-alert message="信息提示" type="info" show-icon />
        <a-alert message="警告提示" description="这是一段详细说明文字。" type="warning" show-icon />
        <a-alert message="错误提示" description="操作失败，请联系管理员。" type="error" show-icon closable />
      </a-space>
    </RoFormGroup>
  </RoFormPage>
</template>

<style>
.demo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 4px 0 8px;
}
</style>
