(($) ->
  $(window).trigger 'load'
)(jQuery)
console.log 'example coffe has been executed'
window.onresize = (event) ->
  console.log 'resize!!!'

#! Copyright AXA Versicherungen AG 2015