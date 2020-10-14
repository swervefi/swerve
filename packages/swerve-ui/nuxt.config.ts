
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Swerve Finance',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '100% community owned and governed' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/composition-api'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: ['@nuxt/typescript-build'],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
    build: {
      transpile: [],
    /*
    ** You can extend webpack config here
    */
    extend (_config, _ctx) {
    }
  },
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  }
}
