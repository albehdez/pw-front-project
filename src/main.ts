import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import Toolbar from 'primevue/toolbar'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import FloatLabel from 'primevue/floatlabel'
import ToastService from 'primevue/toastservice'
import Textarea from 'primevue/textarea'
import Tag from 'primevue/tag'
import Dropdown from 'primevue/dropdown'
import RadioButton from 'primevue/radiobutton'
import InputNumber from 'primevue/inputnumber'
import PrimeVue from 'primevue/config'
import Rating from 'primevue/rating'
import Avatar from 'primevue/avatar'
import { ref } from 'vue'
import { createI18n } from 'vue-i18n'
import EN from '@/languages/en.json'
import ES from '@/languages/es.json'

import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primevue/resources/primevue.min.css'

const app = createApp(App)
let lan = ref(localStorage.getItem('language')).value
const i18n = createI18n({
  locale: lan == null ? 'ES' : lan,
  messages: {
    EN: EN,
    ES: ES
  }
})

app.use(router)
app.use(PrimeVue)
app.use(i18n)
app.use(ToastService)

app.component('FileUpload', FileUpload)
app.component('Toolbar', Toolbar)
app.component('InputIcon', InputIcon)
app.component('InputText', InputText)
app.component('IconField', IconField)
app.component('Column', Column)
app.component('DataTable', DataTable)
app.component('Dialog', Dialog)
app.component('FloatLabel', FloatLabel)
app.component('Button', Button)
app.component('Textarea', Textarea)
app.component('Tag', Tag)
app.component('Dropdown', Dropdown)
app.component('RadioButton', RadioButton)
app.component('InputNumber', InputNumber)
app.component('Rating', Rating)
app.component('Avatar', Avatar)

app.mount('#app')
