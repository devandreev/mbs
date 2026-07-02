import { html } from 'lit-html'
import { fadeIn } from '@/directives/fade.js'
import debounce from '@/utils/debounce.js'
import styles from './c-burger-button.css'

import CElement from '@/components/c-element/c-element.js'

export default class CBurgerButton extends CElement {
  constructor() {
    super()

    this.$render()
  }

  static get observedAttributes() {
    return ['opened']
  } 

  attributeChangedCallback(name, oldValue, newValue) {
    this._toggleClass(!!newValue)
  }

  connectedCallback() {
    const button = this.$find('.c-burger-button')

    button.addEventListener('click', debounce(() => {
      this.opened = !this.opened
    }))
  }

  _toggleClass(value) {
    const button = this.$find('.c-burger-button')
    button.classList.toggle('c-burger-button--active', value === true)
  }

  toggle(value) {
    if (typeof value === 'undefined') {
      this.opened = !this.opened
    } else {
      this.opened = value === true
    }
  }

  get opened() {
    return this.$get('opened', true)
  }

  set opened(value = false) {
    this.$set('opened', value, true)
  }

  get styles() {
    return styles
  }

  get template() {
    return html`
      <button class="c-burger-button">
        <svg 
          class="c-burger-button__burger" 
          height="24" 
          width="24" 
          viewBox="0 0 24 24"
          fill="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line class="c-burger-button__line" x1="2" y1="6" x2="22" y2="6" />
          <line class="c-burger-button__line" x1="2" y1="17" x2="22" y2="17" />
        </svg>

        <svg 
          class="c-burger-button__close" 
          height="24" 
          width="24" 
          viewBox="0 0 24 24"
          fill="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line class="c-burger-button__line" x1="2" y1="2" x2="21" y2="21" />
          <line class="c-burger-button__line" x1="2" y1="21" x2="21" y2="2" />
        </svg>
      </button>
    `
  }
}
