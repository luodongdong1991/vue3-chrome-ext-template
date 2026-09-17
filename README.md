# WXT + Vue 3 + Element Plus 浏览器插件

一个面向后台管理场景的 Manifest V3 浏览器扩展模板。WXT 负责扩展入口、Manifest、热更新与打包，Vue 3 和 Element Plus 负责 Popup 与 Options 后台界面。

## 技术栈

- WXT 0.21
- Vue 3 + TypeScript
- Element Plus
- Chrome Manifest V3（同时支持 Firefox 构建）

## 开发

```bash
pnpm install
pnpm dev
```

WXT 会启动浏览器并加载开发扩展，源码变化后自动热更新。

## 检查与打包

```bash
pnpm compile
pnpm build
pnpm zip
```

- Chrome 构建产物：`.output/chrome-mv3/`
- ZIP 安装包：`.output/*-chrome.zip`
- Firefox：使用 `pnpm build:firefox` 或 `pnpm zip:firefox`

## 目录

```text
entrypoints/
├─ background.ts       # 后台 Service Worker
├─ content.ts          # 页面注入脚本
├─ popup/              # 工具栏弹窗
└─ options/            # Element Plus 后台管理页面
wxt.config.ts          # 扩展名称、权限与 WXT 配置
```

安装生产包时，在 `chrome://extensions` 打开开发者模式，选择“加载已解压的扩展程序”，然后选择 `.output/chrome-mv3`。
