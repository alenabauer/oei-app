import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { Buffer } from 'buffer'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
    faUpload,
    faFileArrowDown,
    faXmark,
    faSpinner
} from '@fortawesome/free-solid-svg-icons'

import OpenLayersMap from "vue3-openlayers"
import "vue3-openlayers/dist/vue3-openlayers.css"

/* add icons to the library */
library.add(faUpload, faFileArrowDown, faXmark, faSpinner)

globalThis.Buffer = Buffer

const app = createApp(App)
app.use(OpenLayersMap)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount("#app")