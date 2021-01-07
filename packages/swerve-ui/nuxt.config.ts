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
      {
        hid: 'description',
        name: 'description',
        content: '100% community owned and governed'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~assets/styles/global.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/composition-api'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/svg'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // For global stylesheets
    '@nuxtjs/style-resources',
    // Localization
    'nuxt-i18n'
  ],
  /*
   ** Global stylesheets
   */
  styleResources: {
    scss: ['./assets/styles/*.scss']
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [],
    /*
     ** You can extend webpack config here
     */
    extend(_config, _ctx) {}
  },
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  },
  /**
   * i18n
   * @see https://i18n.nuxtjs.org/
   */
  i18n: {
    defaultLocale: 'en',
    langDir: 'i18n/',
    locales: [
      { code: 'de', iso: 'de_DE', file: 'de/index.ts' },
      { code: 'en', iso: 'en_GB', file: 'en/index.ts' },
      { code: 'fr', iso: 'fr_FR', file: 'fr/index.ts' },
      { code: 'ja', iso: 'ja', file: 'ja/index.ts' },
      { code: 'ko', iso: 'ko_KR', file: 'ko/index.ts' },
      { code: 'ru', iso: 'ru_RU', file: 'ru/index.ts' },
      { code: 'zh', iso: 'zh_CN', file: 'zh/index.ts' }
    ],
    lazy: true
  },
  /**
   * Storybook
   * @see https://storybook.nuxtjs.org/options/
   */
  storybook: {}
}
