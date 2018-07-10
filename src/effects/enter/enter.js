/* global $ TimelineMax Power3 ScrollMagic Barba */
// ref: https://codepen.io/themarkappleby/pen/NYwKyr

// ---------------------------------
// How to Use
// ---------------------------------
/*
  Simply apply the `data-enter` attribute to any element.
  Ensure there is a corresponding tween defined. For example,
  `data-enter="fade"` will play the fade tween when the
  element enters the viewport. You can easily extend `tweens`
  by defining your own custom tweens, see the `card` tween
  below for an example of a more complex custom tween.
*/

var tweens = {}

// ---------------------------------
// Fade Tween
// ---------------------------------
tweens.fade = function (el) {
  var delay = parseInt($(el).data('enter-delay')) / 1000 || 0
  return new TimelineMax()
    .from(el, 0.5, {
      delay: delay,
      opacity: 0,
      y: 50,
      scale: 1.05
    })
}

// ---------------------------------
// Count Tween
// ---------------------------------
tweens.count = function (el) {
  var to = parseInt($(el).text())
  var cnt = {val: 0}
  return new TimelineMax()
    .to(cnt, 3, {
      val: to,
      ease: Power3.easeOut,
      onUpdate: function () {
        var val = Number(cnt.val).toLocaleString().split('.')[0]
        $(el).text(val)
      }
    })
}

// ---------------------------------
// Init
// Do not edit below this line.
// ---------------------------------
function init () {
  $('[data-enter]').each(function () {
    window.scrollController = window.scrollController || new ScrollMagic.Controller()
    var el = $(this)[0]
    var enter = $(this).data('enter')
    var tweenFn = tweens[enter]
    if (tweenFn) {
      var tween = tweenFn(el)
      new ScrollMagic.Scene({
        triggerElement: el,
        triggerHook: 0.85 // bottom of viewport
      })
        .setTween(tween)
        .addTo(window.scrollController)
    } else {
      console.error(`Tween "${enter}" not defined.`)
    }
  })
}

module.exports = window.twgx.enter = init
