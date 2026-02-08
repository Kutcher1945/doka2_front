export const state = () => ({
  mobileMenuOpen: false,
  wallet: {},
  current_lobby: null
})

export const mutations = {
  SET_CURRENT_LOBBY (state, payload) {
    if (payload) {
      state.current_lobby = payload
    } else {
      state.current_lobby = null
    }
  },
  SET_USER_WALLET (state, data) {
    state.wallet = data
  },
  SET_TOGGLE_MOBILE_MENU (state, isOpen) {
    state.mobileMenuOpen = isOpen
  },
  SET_CLOSE_MOBILE_MENU (state, isOpen) {
    state.mobileMenuOpen = isOpen
  }
}

export const actions = {
  CHANGE_CURRENT_LOBBY (context, payload) {
    context.commit('SET_CURRENT_LOBBY', payload)
  },
  CHANGE_TOGGLE_MOBILE_MENU (context, payload) {
    context.commit('SET_TOGGLE_MOBILE_MENU', payload)
    if (payload) {
      document.body.classList.add('scroll-lock')
    }
    if (!payload) {
      document.body.classList.remove('scroll-lock')
    }
  },
  CHANGE_CLOSE_MOBILE_MENU (context, payload) {
    document.body.classList.remove('scroll-lock')
  }
}

export const getters = {
  GET_TOGGLE_MOBILE_MENU: state => state.mobileMenuOpen,
  GET_CURRENT_LOBBY: state => state.current_lobby,
  wallet: state => state.wallet,
  foo: state => state.foo
}
