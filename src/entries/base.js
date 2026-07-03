import CBurgerButton from '@/components/c-burger-button/c-burger-button.js'
import CPopup from '@/components/c-popup/c-popup.js'

import Headroom from 'headroom.js'
import App from '@/app/App.js'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'

const app = new App({
  plugins: {},

  components: {
    CPopup,
    CBurgerButton,
  },

  methods: { 
    initScrollBehavior() {
      const html = document.querySelector('html')

      setTimeout(() => {
        html.style.scrollBehavior = 'smooth'
      }, 500)
    },

    initVideoPlayers() {
      document.querySelectorAll('.js-promo-video').forEach(section => {
        const button = section.querySelector('.js-promo-video__play')
        const video = section.querySelector('video')
        if (!button || !video) return

        button.addEventListener('click', () => {
          section.classList.add('is-playing')
          video.currentTime = 0
          video.play()
        })

        video.addEventListener('ended', () => {
          section.classList.remove('is-playing')
        })
      })
    },

    initHeadroom() {
      const header = document.querySelector('#header')
      const options = {
        offset: 10
      }

      this.headroom = new Headroom(header, options)
      this.headroom.init()

      requestAnimationFrame(() => {
        header.classList.remove('headroom--faded')
      })
    },

    initBurgerMenu() {
      const menu = document.querySelector('#mobile-menu'),
          burger = document.querySelector('#burger-button'),
          header = document.querySelector('#header'),
          solutionButton = document.querySelector('.js-form-solution-button')

      burger.addEventListener('click', () => {
        menu.toggle(burger.opened)

        header.classList.toggle('page-header--fixed', burger.opened)
      })

      menu.addEventListener('hide', () => {
        burger.toggle(false)

        header.classList.toggle('page-header--fixed', false)
      })


      solutionButton.addEventListener('click', () => {
        burger.toggle(false)
        menu.toggle(false)

        header.classList.toggle('page-header--fixed', false)
      })

      // requestButton.addEventListener('click', () => {
      //   burger.toggle(false)
      //   menu.toggle(false)

      //   header.classList.toggle('page-header--fixed', false)
      // })
    },

    initEquipmentSlider() {
      const el = document.querySelector('.js-equipment-swiper')
      if (!el) return

      new Swiper(el, {
        modules: [Navigation],
        speed: 400,
        initialSlide: 1,
        slidesPerView: 1,
        spaceBetween: 24,
        slideToClickedSlide: true,
        navigation: {
          nextEl: '.section-equipment__arrow--right',
          prevEl: '.section-equipment__arrow--left',
        },
        breakpoints: {
          1330: {
            slidesPerView: 'auto',
            spaceBetween: 32,
            centeredSlides: true,
          },
        },
      })
    },
  },

  created() {},

  onresize(oldScreen, newScreen) {},

  onload() {
    // Плавающая шапка
    this.initHeadroom()

    this.initBurgerMenu()

    this.initScrollBehavior()

    this.initVideoPlayers()

    this.initEquipmentSlider()
  },
})

// Объект приложения
window.$app = app 
