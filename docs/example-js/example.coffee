(($) ->
  $(window).trigger 'load'
#  $(window).resize () -> 

#    $('.example').animate( {
#      height: x
#    }
#    $('html').css('height', $('.example').height
#    x = $('.example').css 'height'
#    console.log 'x', x
#    $('html, body').css 'height', x
)(jQuery)
console.log 'example coffe has been executed'
window.onresize = (event) ->
  if window.parentIFrame
    h = parseInt $('.example').css 'height'
    w = parseInt $('.example').css 'width'
    window.parentIFrame.size h, w
  console.log 'resize!!!'

#! Copyright AXA Versicherungen AG 2015