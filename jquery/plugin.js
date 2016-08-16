import $ from 'jquery'

function Plugin(name, Constructor) {
  $.fn[name] = Wrapper
  $.fn[name].Constructor = Constructor

  $(domReady)

  function Wrapper(options) {
    this.each(function() {
      const $this = $(this)
      const namespace = `axa.${name}`
      let instance = $this.data(namespace)

      if (!instance) {
        instance = new Constructor(this, options)
        $this.data(namespace, instance)
      }

      if (typeof options === 'string' && options in instance) {
        instance[options]()
      }
    })
  }

  function domReady() {
    $(`[data-${name}]`).each(function() {
      const $this = $(this)
      const options = $this.data()

      Wrapper.call($this, options)
    })
  }
}

export default Plugin
