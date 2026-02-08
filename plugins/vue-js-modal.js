// plugins/vue-js-modal.js
import Vue from 'vue'
import VModal from 'vue-js-modal/dist/ssr.nocss'

import 'vue-js-modal/dist/styles.css'

Vue.use(VModal, {
  dynamicDefaults: {
    adaptive: true,
    // resizable: true,
    clickToClose: true,
    classes: 'modal-dialog',
    height: 'auto',
    width: '100%'
  }
})

/*
export default function(_, inject) {
  inject('modal', VModal)
}
*/
