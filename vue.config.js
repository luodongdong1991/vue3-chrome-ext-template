const path = require('node:path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

class HotReloadPlugin {
  apply (compiler) {
    compiler.hooks.thisCompilation.tap('HotReloadPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'HotReloadPlugin',
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
        },
        () => {
          compilation.emitAsset(
            'hot-reload.json',
            new webpack.sources.RawSource(JSON.stringify({ buildId: `${Date.now()}` }))
          )
        }
      )
    })
  }
}

const isDevelopment = process.env.NODE_ENV === 'development'

const pages = {}

const chromeName = ['popup', 'background', 'options', 'content']

chromeName.forEach((name) => {
  pages[name] = {
    entry: `src/pages/${name}/main.js`,
    template: 'public/index.html',
    filename: `${name}.html`
  }
})

module.exports = {
  pages,
  filenameHashing: false,
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{
          from: path.resolve('manifest.json'),
          to: `${path.resolve('dist')}/manifest.json`
        }]
      }),
      ...(isDevelopment ? [new HotReloadPlugin()] : [])
    ]
  }
}
