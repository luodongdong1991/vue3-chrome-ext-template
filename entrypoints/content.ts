export default defineContentScript({
  matches: ['http://*/*', 'https://*/*'],
  runAt: 'document_start',
  main () {
    console.info('[WXT] Content script loaded')
  }
})
