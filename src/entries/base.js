import Headroom from 'headroom.js'
import App from '@/app/App.js'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'

const app = new App({
  plugins: {},

  components: {},

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

    this.initScrollBehavior()

    this.initVideoPlayers()

    this.initEquipmentSlider()
  },
})

// Объект приложения
window.$app = app 
