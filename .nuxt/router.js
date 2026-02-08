import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _29fc2541 = () => interopDefault(import('../node_modules/@nuxtjs/svg-sprite/lib/pages/icons-list.vue' /* webpackChunkName: "" */))
const _4a86537e = () => interopDefault(import('../pages/cabinet/index.vue' /* webpackChunkName: "pages/cabinet/index" */))
const _6d4e4230 = () => interopDefault(import('../pages/docs.vue' /* webpackChunkName: "pages/docs" */))
const _c75ba67c = () => interopDefault(import('../pages/recovery.vue' /* webpackChunkName: "pages/recovery" */))
const _04ea65c1 = () => interopDefault(import('../pages/cabinet/friends.vue' /* webpackChunkName: "pages/cabinet/friends" */))
const _73c92d80 = () => interopDefault(import('../pages/cabinet/history.vue' /* webpackChunkName: "pages/cabinet/history" */))
const _20938185 = () => interopDefault(import('../pages/cabinet/lobby/index.vue' /* webpackChunkName: "pages/cabinet/lobby/index" */))
const _e769e2d0 = () => interopDefault(import('../pages/cabinet/profile/index.vue' /* webpackChunkName: "pages/cabinet/profile/index" */))
const _42c7eefb = () => interopDefault(import('../pages/cabinet/support.vue' /* webpackChunkName: "pages/cabinet/support" */))
const _37c2ef80 = () => interopDefault(import('../pages/cabinet/wallet/index.vue' /* webpackChunkName: "pages/cabinet/wallet/index" */))
const _1990f9d9 = () => interopDefault(import('../pages/cabinet/lobby/create.vue' /* webpackChunkName: "pages/cabinet/lobby/create" */))
const _2188224d = () => interopDefault(import('../pages/cabinet/profile/settings.vue' /* webpackChunkName: "pages/cabinet/profile/settings" */))
const _2f948b94 = () => interopDefault(import('../pages/cabinet/wallet/replenish.vue' /* webpackChunkName: "pages/cabinet/wallet/replenish" */))
const _cb7ec692 = () => interopDefault(import('../pages/cabinet/wallet/withdrawal.vue' /* webpackChunkName: "pages/cabinet/wallet/withdrawal" */))
const _002c7575 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _23ae212d = () => interopDefault(import('../pages/cabinet/lobby/_id.vue' /* webpackChunkName: "pages/cabinet/lobby/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/_icons",
    component: _29fc2541,
    name: "icons-list"
  }, {
    path: "/cabinet",
    component: _4a86537e,
    name: "cabinet"
  }, {
    path: "/docs",
    component: _6d4e4230,
    name: "docs"
  }, {
    path: "/recovery",
    component: _c75ba67c,
    name: "recovery"
  }, {
    path: "/cabinet/friends",
    component: _04ea65c1,
    name: "cabinet-friends"
  }, {
    path: "/cabinet/history",
    component: _73c92d80,
    name: "cabinet-history"
  }, {
    path: "/cabinet/lobby",
    component: _20938185,
    name: "cabinet-lobby"
  }, {
    path: "/cabinet/profile",
    component: _e769e2d0,
    name: "cabinet-profile"
  }, {
    path: "/cabinet/support",
    component: _42c7eefb,
    name: "cabinet-support"
  }, {
    path: "/cabinet/wallet",
    component: _37c2ef80,
    name: "cabinet-wallet"
  }, {
    path: "/cabinet/lobby/create",
    component: _1990f9d9,
    name: "cabinet-lobby-create"
  }, {
    path: "/cabinet/profile/settings",
    component: _2188224d,
    name: "cabinet-profile-settings"
  }, {
    path: "/cabinet/wallet/replenish",
    component: _2f948b94,
    name: "cabinet-wallet-replenish"
  }, {
    path: "/cabinet/wallet/withdrawal",
    component: _cb7ec692,
    name: "cabinet-wallet-withdrawal"
  }, {
    path: "/",
    component: _002c7575,
    name: "index"
  }, {
    path: "/cabinet/lobby/:id",
    component: _23ae212d,
    name: "cabinet-lobby-id"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
