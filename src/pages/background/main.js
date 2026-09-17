console.log('background is open')

if (process.env.NODE_ENV === 'development') {
  require('./hot-reload').startHotReload()
}
