/* global $ Barba */
// ref: https://codepen.io/JTParrett/pen/BkDie
// Note - I made minor changes to this codebase (Mark)

$.fn.moveIt = function () {
  var $window = $(window)
  var instances = []

  $(this).each(function () {
    instances.push(new MoveItItem($(this)))
  })

  window.addEventListener('scroll', function () {
    var scrollTop = $window.scrollTop()
    instances.forEach(function (inst) {
      inst.update(scrollTop)
    })
  }, {passive: true})
}

var MoveItItem = function (el) {
  this.el = $(el)
  this.el.addClass('effect--scroll')
  this.speed = parseInt(this.el.attr('data-scroll'))
  this.offsetTop = this.el.offset().top
}

MoveItItem.prototype.update = function (scrollTop) {
  var scrollPos = scrollTop + window.outerHeight / 2
  var elemPos = this.offsetTop + this.el.outerHeight() / 2
  var diff = (scrollPos - elemPos) * -1
  diff = diff * (this.speed / 10)
  this.el.css('transform', `translateY(${diff}px)`)
}

// Initialization
function init () {
  $('[data-scroll]').moveIt()
}

module.exports = window.twgx.scroll = init
