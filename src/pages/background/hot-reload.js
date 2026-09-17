const RELOAD_PENDING_KEY = 'devHotReloadPending'
const POLL_INTERVAL = 1000

async function refreshActiveTabAfterReload () {
  const result = await chrome.storage.local.get(RELOAD_PENDING_KEY)

  if (!result[RELOAD_PENDING_KEY]) return

  await chrome.storage.local.remove(RELOAD_PENDING_KEY)
  const [activeTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })

  if (activeTab?.id) {
    await chrome.tabs.reload(activeTab.id)
  }
}

function startHotReload () {
  let currentBuildId
  let reloading = false

  refreshActiveTabAfterReload().catch(console.error)

  setInterval(async () => {
    if (reloading) return

    try {
      await chrome.runtime.getPlatformInfo()
      const response = await fetch(`${chrome.runtime.getURL('hot-reload.json')}?t=${Date.now()}`)
      const { buildId } = await response.json()

      if (currentBuildId === undefined) {
        currentBuildId = buildId
      } else if (currentBuildId !== buildId) {
        reloading = true
        await chrome.storage.local.set({ [RELOAD_PENDING_KEY]: true })
        chrome.runtime.reload()
      }
    } catch (error) {
      console.debug('[hot-reload] Waiting for the next build...', error)
    }
  }, POLL_INTERVAL)
}

module.exports = { startHotReload }
/* global chrome */
