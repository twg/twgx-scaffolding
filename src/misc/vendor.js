function init () {
  window.$ = window.jQuery = require('jquery')
  window.ScrollMagic = require('scrollmagic')
  require('scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js')
  require('gsap')
}

module.exports = window.twgx.vendor = init
