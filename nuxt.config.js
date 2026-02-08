module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  server: {
    host: 'localhost',
    port: 3000
  },
  env: {
    dev: process.env.NODE_ENV === 'dev',
    baseUrl:
      process.env.NODE_ENV === 'dev'
        ? 'http://localhost:8000'
        : 'https://api.cybert.online',
    api2Url:
      process.env.NODE_ENV === 'dev'
        ? 'http://localhost:3001'
        : 'https://api2.cybert.online'
  },
  head: {
    title: 'Cybert',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        // Add Inter and Poppins for modern glassmorphism design
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Exo+2:wght@400;500;600;700;800&family=Baloo+2:wght@400;600&family=Montserrat:wght@900&display=swap'
      }
    ],
    script: [
      { src: '/js/bitrix.js' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'normalize.css/normalize.css',
    '@/assets/scss/main.scss'
  ],

  // styleResources: {
  //   scss: [
  //     '@/assets/scss/main.scss',
  //   ],
  //   // hoistUseStatements: true,
  // },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/vue-js-modal.js',
    '~plugins/vue-slick-carousel.js',
    '~plugins/vue-select.js',
    '~plugins/vue-the-mask.js',
    '~plugins/vue-scrollto.js',
    '~plugins/currencyFormatter.js'
    // '~plugins/v-scroll-lock.js'
    // '~plugins/vue-pincode-input.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/svg-sprite',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth',
    '@nuxtjs/yandex-metrika'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // proxy: true
    baseURL: process.env.NODE_ENV === 'dev' ? 'http://localhost:8000' : 'https://api.cybert.online'
  },

  proxy: {
    // '/social-api/': {
    //   // https://api2.beta-cybert.kz/
    //   // http://0.0.0.0:3001/ ???
    //   target: 'http://0.0.0.0:3001/',
    //   // pathRewrite: { '^/social-api/': '' },
    //   changeOrigin: true
    // }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'vee-validate/dist/rules'
    ],
    loaders: {
      scss: {
        implementation: require('sass'),
        sassOptions: {
          api: 'modern-compiler',
          silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions']
        }
      }
    }
  },
  auth: {
    strategies: {
      local: {
        // token: {
        //   // property: 'auth_token',
        //   global: true,
        //   // type: 'Token', // default: 'Bearer'
        //   name: 'Authorization'
        // },
        endpoints: {
          login: {
            // https://api.beta-cybert.kz
            // http://localhost:8000
            url: (process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/token/login' : 'https://api.cybert.online/token/login'),
            method: 'post',
            propertyName: 'auth_token'
          },
          logout: {
            url: (process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/token/logout/' : 'https://api.cybert.online/token/logout/'),
            method: 'post'
          },
          user: {
            url: (process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/auth/data/' : 'https://api.cybert.online/auth/data/'),
            method: 'get',
            propertyName: false
            // propertyName: 'auth_token'
          }
        },
        // token: {
        //   type: 'Token', // not working, /auth/data/ request set 'Bearer' in Authorization header
        //   name: 'Authorization'
        // }
        tokenType: 'Token',
        tokenName: 'Authorization'
      }
    },
    redirect: {
      login: '/',
      logout: '/',
      home: '/cabinet'
    }
  },
  router: {
    middleware: ['auth']
  },
  // For dev purposes
  serverMiddleware: {
    '/social-api': '~/api'
  }
}
