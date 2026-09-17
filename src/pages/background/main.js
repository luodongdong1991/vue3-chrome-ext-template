import { startHotReload } from './hot-reload'

console.log('background is open')

if (process.env.NODE_ENV === 'development') {
  startHotReload()
}
