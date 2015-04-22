

(($) ->

  class Emitter
    constructor: ->
      @events = select: []
    on: (eventName, cb) =>
      @events[eventName].push(cb)
    emit: (eventName) =>
      for fx in @events[eventName]
        fx.apply(null, Array.prototype.slice.call(arguments, 1))

  append = (html, $parent) ->
    $el = $ html
    $parent.append $el
    return $el

  class Picker extends Emitter

    constructor: (@moment) ->
      super

      @date = @moment()

      @$element = $ '<div class="picker" ></div>'

      @$header = append '<div class="picker__header" ></div>', @$element

      @$prev = append '<a class="picker__prev"></a>', @$header
      @$prev.on 'click', @onPrevClick.bind(this)

      @$next = append '<a class="picker__next"></a>', @$header
      @$next.on 'click', @onNextClick.bind(this)

      @$headline = append '<div class="picker__headline" ></div>', @$header
      @$headline__month = append '<span class="picker__headline__month" ></span>', @$headline
      append '<span> </span>', @$headline
      @$headline__year = append '<span></span>', @$headline

      @$content = append '<div class="picker__content" ></div>', @$element

      @$month = append '<div class="picker__month" ></div>', @$content

      # TODO: i18n
      @weekHeadline = append '<div class="picker__week picker__week--headline"><div class="picker__day picker__day--headline">M</div><div class="picker__day picker__day--headline">D</div><div class="picker__day picker__day--headline">M</div><div class="picker__day picker__day--headline">D</div><div class="picker__day picker__day--headline">F</div><div class="picker__day picker__day--headline">S</div><div class="picker__day picker__day--headline">S</div></div>', @$month

      # @$weeks = append '<div class="picker__weeks" ></div>', @$month

      @updateDisplay()

    updateDisplay: ->
      # TODO: i18n
      @$headline__month.text @date.format('MMMM')
      @$headline__year.text @date.format('YYYY')

      @$month.empty()
      @$month.append @$weekHeadline

      # first week
      $week = append '<div class="picker__week" ></div>', @$month

      dateClone = @moment @date
      month = dateClone.get 'month'

      dateClone.set 'date', 1

      day = dateClone.get 'day'
      if day == 0
        day = 7

      while (day-=1)
        append '<div class="picker__day picker__day--empty" ></div>', $week

      while dateClone.get('day') != 1 # while not monday
        append @createDay(dateClone), $week
        dateClone.add 1, 'days'

      # other weeks
      while dateClone.get('month') == month
        $week = append '<div class="picker__week" ></div>', @$month

        while true
          append @createDay(dateClone), $week
          dateClone.add 1, 'days'
          if dateClone.get('month') != month or dateClone.get('day') == 1 # while same month and not monday
            break

    createDay: (d) ->
      date = @moment(d) # create a clone

      $day = $ '<div class="picker__day" ></div>'

      if @selectedDate? and date.format('DD.MM.YYYY') == @selectedDate.format('DD.MM.YYYY')
        $day.addClass('is-active')

      if date.format('DD.MM.YYYY') == @moment().format('DD.MM.YYYY')
        $day.addClass('picker__day--today')

      self = this

      $day.text date.get 'date'
      $day.on 'click', (e) ->
        e.preventDefault()

        self.setSelectedDate(date)
        self.emit 'select', date.format('DD.MM.YYYY')
        self.toggle()

      return $day

    getDOMNode: ->
      return @$element

    toggle: ->
      @$element.toggleClass 'is-active'

    setSelectedDate: (selectedDate) ->
      @date = selectedDate
      @selectedDate = @moment(selectedDate)
      @updateDisplay()

    onPrevClick: (e) ->
      e.preventDefault()

      @date.add -1, 'months'
      @updateDisplay()

    onNextClick: (e) ->
      e.preventDefault()

      @date.add 1, 'months'
      @updateDisplay()

  class Datepicker

    constructor: (element, @moment, input) ->
      @$element = $ element

      @picker = new Picker(@moment)

      if input?
        @$input = $ input

        @$input.on 'change', @onChange

        @onChange()

      @picker.on 'select', ((date) ->
        @$input.val(date)
        @$input.trigger 'change'
      ).bind(this)

      @$element.append @picker.getDOMNode()

    onChange: () =>
      dat = @moment(@$input.val(), 'DD.MM.YYYY')

      if dat.isValid()
        @picker.setSelectedDate dat

    toggle: () ->

      @picker.toggle()

  # Plugin definition
  Plugin = (options) ->
    opts = $.extend( {}, $.fn.datepicker.defaults, options )

    params = arguments

    return this.each () ->
      $this = $(this)
      data = $this.data('axa.datepicker')

      if not data
        if opts.moment?
          moment = opts.moment
        else if window.moment?
          moment = window.moment
        else
          $.error("Moment.js must either be passed as an option or be available globally")

        data = new Datepicker(this, moment, opts.input)
        $this.data('axa.datepicker', data)

      if opts.action?
        data[opts.action]()

  # Plugin registration
  $.fn.datepicker = Plugin
  $.fn.datepicker.Constructor = Datepicker

  # DATA-API
  $(document).on 'click.axa.datepicker.data-api', '[data-datepicker]', (e) ->
    e.preventDefault()

    $target = $ $(this).data('datepicker')

    $input = $ $target.data('datepicker-watch')

    Plugin.call($target, { input: $input, action: 'toggle' })

)(jQuery)

#! Copyright AXA Versicherungen AG 2015
