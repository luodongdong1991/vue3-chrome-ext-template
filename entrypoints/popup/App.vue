<template>
  <div class="popup-shell">
    <header class="brand">
      <div class="brand-mark">W</div>
      <div><strong>管理助手</strong><p>WXT · Vue 3</p></div>
      <el-tag type="success" effect="light" round>运行中</el-tag>
    </header>

    <section class="status-card">
      <div><span>插件服务</span><p>{{ enabled ? '已启用，页面功能正常运行' : '当前已暂停' }}</p></div>
      <el-switch v-model="enabled" @change="saveEnabled" />
    </section>

    <div class="metrics">
      <div><strong>24</strong><span>今日处理</span></div>
      <div><strong>99.9%</strong><span>运行状态</span></div>
    </div>

    <el-button type="primary" size="large" class="admin-button" @click="openAdmin">打开后台管理</el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { browser } from 'wxt/browser'

const enabled = ref(true)

onMounted(async () => {
  const value = await browser.storage.local.get('enabled')
  enabled.value = value.enabled ?? true
})

async function saveEnabled (value: string | number | boolean) {
  await browser.storage.local.set({ enabled: Boolean(value) })
}

function openAdmin () {
  browser.runtime.openOptionsPage()
}
</script>
