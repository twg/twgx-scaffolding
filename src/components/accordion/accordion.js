function init () {
  $('.accordion-label').click(function (e) {
    e.preventDefault()
    if ($(this).hasClass('accordion--open')) {
      $(this).removeClass('accordion--open')
      $(this).next().slideUp()
    } else {
      $(this).addClass('accordion--open')
      $(this).next().slideDown()
    }
  })
}

module.exports = window.twgx.accordion = init
