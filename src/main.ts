import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import WeatherWidget from './components/WeatherWidget.vue'

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light'
  }
})

// Define the custom element
class WeatherWidgetElement extends HTMLElement {
  private app: any

  connectedCallback() {
    // Set display and max-width for the web component itself
    this.style.display = 'block'
    this.style.width = '600px'
    this.style.maxWidth = '100%'

    // Create a mount point
    const mountPoint = document.createElement('div')
    this.appendChild(mountPoint)

    // Create and mount the Vue app with Vuetify
    this.app = createApp(WeatherWidget)
    this.app.use(vuetify)
    this.app.mount(mountPoint)
  }

  disconnectedCallback() {
    if (this.app) {
      this.app.unmount()
    }
  }
}

// Register the custom element
if (!customElements.get('weather-widget')) {
  customElements.define('weather-widget', WeatherWidgetElement)
}

// Export for UMD usage
export { default } from './components/WeatherWidget.vue'
