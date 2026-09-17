<template>
  <el-container class="admin-layout">
    <el-aside width="232px" class="sidebar">
      <div class="logo"><span>W</span><div>管理助手<small>EXTENSION ADMIN</small></div></div>
      <el-menu :default-active="activeMenu" class="nav" @select="activeMenu = $event">
        <el-menu-item index="dashboard"><span class="nav-icon">⌂</span>工作台</el-menu-item>
        <el-menu-item index="tasks"><span class="nav-icon">✓</span>任务管理</el-menu-item>
        <el-menu-item index="data"><span class="nav-icon">▦</span>数据记录</el-menu-item>
        <el-menu-item index="settings"><span class="nav-icon">⚙</span>系统设置</el-menu-item>
      </el-menu>
      <div class="sidebar-footer"><span class="online-dot"></span>扩展服务正常</div>
    </el-aside>

    <el-container>
      <el-header class="topbar">
        <div><h1>{{ pageTitle }}</h1><p>查看插件运行情况并管理核心配置</p></div>
        <div class="top-actions"><el-tag :type="online ? 'success' : 'danger'" round>{{ online ? `v${version} 在线` : '服务离线' }}</el-tag><div class="avatar">管</div></div>
      </el-header>

      <el-main class="content">
        <template v-if="activeMenu === 'dashboard'">
          <section class="hero">
            <div><span class="hero-label">WELCOME BACK</span><h2>早上好，管理员</h2><p>插件服务运行稳定，所有自动化任务均处于正常状态。</p></div>
            <el-switch v-model="enabled" active-text="插件已启用" inactive-text="插件已停用" @change="saveSettings" />
          </section>

          <section class="stats-grid">
            <article v-for="item in stats" :key="item.label" class="stat-card">
              <div :class="['stat-icon', item.tone]">{{ item.icon }}</div>
              <div><span>{{ item.label }}</span><strong>{{ item.value }}</strong><small>{{ item.note }}</small></div>
            </article>
          </section>

          <section class="panel">
            <div class="panel-header"><div><h3>最近任务</h3><p>插件最近执行的自动化记录</p></div><el-button type="primary" plain>查看全部</el-button></div>
            <el-table :data="tasks" style="width: 100%">
              <el-table-column prop="name" label="任务名称" min-width="220" />
              <el-table-column prop="site" label="目标站点" min-width="160" />
              <el-table-column prop="time" label="执行时间" min-width="160" />
              <el-table-column label="状态" width="110"><template #default><el-tag type="success" effect="light">已完成</el-tag></template></el-table-column>
            </el-table>
          </section>
        </template>

        <section v-else class="panel settings-panel">
          <div class="panel-header"><div><h3>{{ pageTitle }}</h3><p>在这里维护{{ pageTitle }}相关内容</p></div></div>
          <el-form label-position="top" class="settings-form">
            <el-form-item label="启用插件"><el-switch v-model="enabled" @change="saveSettings" /></el-form-item>
            <el-form-item label="界面主题"><el-radio-group v-model="theme" @change="saveSettings"><el-radio-button value="light">浅色</el-radio-button><el-radio-button value="dark">深色</el-radio-button></el-radio-group></el-form-item>
            <el-form-item label="数据同步"><el-button type="primary" @click="saveSettings">保存配置</el-button></el-form-item>
          </el-form>
        </section>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { browser } from 'wxt/browser'

const activeMenu = ref('dashboard')
const enabled = ref(true)
const theme = ref('light')
const online = ref(false)
const version = ref('1.0.0')
const titles: Record<string, string> = { dashboard: '工作台', tasks: '任务管理', data: '数据记录', settings: '系统设置' }
const pageTitle = computed(() => titles[activeMenu.value] ?? '工作台')
const stats = [
  { label: '累计执行', value: '1,284', note: '较上周 +12.5%', icon: '✓', tone: 'blue' },
  { label: '成功率', value: '99.8%', note: '服务状态优秀', icon: '↗', tone: 'green' },
  { label: '今日任务', value: '24', note: '还有 3 项待处理', icon: '◷', tone: 'orange' },
  { label: '运行时长', value: '36h', note: '持续稳定运行', icon: '⚡', tone: 'purple' }
]
const tasks = [
  { name: '采集商品信息', site: 'example.com', time: '今天 10:24' },
  { name: '同步用户配置', site: 'dashboard.local', time: '今天 09:48' },
  { name: '更新页面数据', site: 'example.com', time: '昨天 18:20' }
]

onMounted(async () => {
  const settings = await browser.storage.local.get(['enabled', 'theme'])
  enabled.value = settings.enabled ?? true
  theme.value = settings.theme ?? 'light'
  try {
    const response = await browser.runtime.sendMessage({ type: 'get-status' })
    online.value = Boolean(response?.success)
    version.value = response?.version ?? version.value
  } catch {
    online.value = false
  }
})

async function saveSettings () {
  await browser.storage.local.set({ enabled: enabled.value, theme: theme.value })
  ElMessage.success('配置已保存')
}
</script>
