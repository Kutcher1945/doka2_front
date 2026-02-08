import Vue from 'vue'
import vSelect from 'vue-select'

import 'vue-select/dist/vue-select.css'

// vSelect.props.components.default = () => ({
//   Deselect: {
//     render: createElement => createElement('span', [
//       createElement('svg-icon', {
//         class: {
//           deselect: true
//         },
//         props: {
//           name: 'cross-1'
//         }
//       })
//     ])
//   },
//   OpenIndicator: {
//     render: createElement => createElement('span', [
//       createElement('svg-icon', {
//         class: {
//           'open-indicator': true
//         },
//         props: {
//           name: 'arrow-6'
//         }
//       })
//     ])
//   }
// })

Vue.component('VSelect', vSelect)
