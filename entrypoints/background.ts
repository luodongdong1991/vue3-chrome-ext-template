export default defineBackground(() => {
  console.info('[WXT] Background service started')

  browser.runtime.onInstalled.addListener(async () => {
    const current = await browser.storage.local.get(['enabled', 'theme'])
    await browser.storage.local.set({
      enabled: current.enabled ?? true,
      theme: current.theme ?? 'light'
    })
  })

  browser.runtime.onMessage.addListener((message) => {
    if (message?.type !== 'get-status') return

    return Promise.resolve({
      success: true,
      version: browser.runtime.getManifest().version
    })
  })
})
