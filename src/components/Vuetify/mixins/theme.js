import { intToHex } from '../../../util/colorUtils'
import * as Theme from '../../../util/theme'

export default {
  data: () => ({
    style: null,
    theme: {
      primary: '#1976D2',   // blue.darken2
      secondary: '#424242', // grey.darken3
      accent: '#82B1FF',    // blue.accent1
      error: '#FF5252',     // red.accent2
      info: '#2196F3',      // blue.base
      success: '#4CAF50',   // green.base
      warning: '#FFC107'    // amber.base
    }
  }),

  computed: {
    parsedTheme () {
      return Theme.parse(this.theme)
    }
  },

  watch: {
    parsedTheme () {
      this.applyTheme()
    }
  },

  created () {
    if (typeof document === 'undefined' && this.$ssrContext) {
      if (!this.$ssrContext._styles) this.$ssrContext._styles = {}
      this.$ssrContext._styles['vuetify-theme-stylesheet'] = {
        ids: ['vuetify-theme-stylesheet'],
        css: this.genColors(this.parsedTheme),
        media: ''
      }
      return
    }
    this.genStyle()
    this.applyTheme()
  },

  methods: {
    applyTheme () {
      this.style.innerHTML = this.genColors(this.parsedTheme)
    },
    genColors (theme) {
      let css

      if (this.options.themeCache != null) {
        css = this.options.themeCache.get(theme)
        if (css != null) return css
      }

      const colors = Object.keys(theme)
      css = `a { color: ${intToHex(theme.primary)}; }`

      for (let i = 0; i < colors.length; ++i) {
        const name = colors[i]
        const value = theme[name]
        if (this.options.themeVariations.includes(name)) {
          css += Theme.genVariations(name, value).join('')
        } else {
          css += Theme.genBaseColor(name, value)
        }
      }

      if (this.options.minifyTheme != null) {
        css = this.options.minifyTheme(css)
      }

      if (this.options.themeCache != null) {
        this.options.themeCache.set(theme, css)
      }

      return css
    },
    genStyle () {
      let style = document.querySelector('[data-vue-ssr-id=vuetify-theme-stylesheet]') ||
        document.getElementById('vuetify-theme-stylesheet')

      if (!style) {
        style = document.createElement('style')
        style.type = 'text/css'
        style.id = 'vuetify-theme-stylesheet'
        document.head.appendChild(style)
      }

      this.style = style
    }
  }
}
