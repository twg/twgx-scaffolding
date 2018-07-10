$(document).ready(function () {
  var navGroup = null

  $('[class^="sg-h"]').each(function () {
    var name = $(this).text()
    var href = $(this).attr('href')
    if ($(this).hasClass('sg-h1')) {
      navGroup = $('<div />')
      $('sg-nav').append(navGroup)
    } else {
      var dataRef = $(this).data('ref')
      if (dataRef) {
        var sourceURL = 'https://raw.githubusercontent.com/twg/twgx-scaffolding/master/src/components/' + dataRef + '/' + dataRef + '.html'
        $(this).append('<span class="sg-source" data-ref="' + sourceURL + '">View Source</span>')
      }
    }
    navGroup.append('<a href="' + href + '">' + name + '</a>')
  })

  $('.sg-source').click(function () {
    var url = $(this).data('ref')
    window.open(url, 'targetWindow', 'location=no,status=no,toolbar=no,menubar=no,width=800,height=400')
  })
})
