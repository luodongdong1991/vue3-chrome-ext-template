import { defineConfig } from 'wxt'

export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    name: 'WXT Vue3 管理助手',
    description: '使用 WXT、Vue 3 和 Element Plus 构建的浏览器扩展后台管理项目',
    permissions: ['storage', 'activeTab'],
    host_permissions: ['http://*/*', 'https://*/*'],
    options_ui: {
      page: 'options.html',
      open_in_tab: true
    }
  }
})
