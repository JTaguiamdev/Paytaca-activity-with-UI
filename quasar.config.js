import { defineConfig } from '#q-app/wrappers'

export default defineConfig(() => {
  return {
    boot: [],
    css: ['app.scss'],
    extras: ['roboto-font', 'material-icons'],

    build: {
      vueRouterMode: 'hash',
      minify: true,
      extractCSS: true,
      
      chainWebpack (chain) {
        chain.optimization.splitChunks({
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all'
            }
          }
        })
      }
    },

    devServer: {
      open: true
    },

    framework: {
      plugins: ['Notify', 'Dialog']
    },

    animations: ['fadeInUp', 'fadeInDown', 'bounceIn', 'zoomIn']
  }
})
