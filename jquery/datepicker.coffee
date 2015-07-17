

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

    constructor: (@moment, @displayWeek, @icons) ->
      super

      @date = @moment()

      @$element = $ '<div class="picker" ></div>'

      if @displayWeek
        @$element.addClass 'picker--with-weeknumber'

      @$header = append '<div class="picker__header" ></div>', @$element

      @$prev = append '<div class="picker__prev"></div>', @$header
      @$prev.append @createIcon('prev')
      @$prev.on 'click', @onPrevClick.bind(this)

      @$next = append '<div class="picker__next"></div>', @$header
      @$next.append @createIcon('next')
      @$next.on 'click', @onNextClick.bind(this)

      @$headline = append '<div class="picker__headline" ></div>', @$header
      @$headline__month = append '<span class="picker__headline__month" ></span>', @$headline
      append '<span> </span>', @$headline
      @$headline__year = append '<span></span>', @$headline

      @$content = append '<div class="picker__content" ></div>', @$element

      @$month = append '<div class="picker__month" ></div>', @$content

      # TODO: i18n
      weekdays = moment.localeData()._weekdaysMin

      @$weekHeadline = append '<div class="picker__week picker__week--headline"><div class="picker__day picker__day--headline">'+weekdays[1]+'</div><div class="picker__day picker__day--headline">'+weekdays[2]+'</div><div class="picker__day picker__day--headline">'+weekdays[3]+'</div><div class="picker__day picker__day--headline">'+weekdays[4]+'</div><div class="picker__day picker__day--headline">'+weekdays[5]+'</div><div class="picker__day picker__day--headline">'+weekdays[6]+'</div><div class="picker__day picker__day--headline">'+weekdays[0]+'</div></div>', @$month

      # @$weeks = append '<div class="picker__weeks" ></div>', @$month

      if @displayWeek
        @$weekHeadline.prepend '<div class="picker__weeknumber picker__weeknumber--headline" ></div>'

      @updateDisplay()

    updateDisplay: ->
      @$headline__month.text @date.format('MMMM')
      @$headline__year.text @date.format('YYYY')

      @$month.empty()
      @$month.append @$weekHeadline

      dateClone = @moment @date
      month = dateClone.get 'month'

      # start by the first day of the month
      dateClone.set 'date', 1

      # rewind to the first day of the week
      if dateClone.get('day') == 0
        # if the current day is sunday (week start for moment.js) rewind to monday "last week"
        dateClone.set 'day', -6
      else
        dateClone.set 'day', 1

      loop
        $week = append '<div class="picker__week" ></div>', @$month

        if @displayWeek
          $weeknumber = $ '<div class="picker__weeknumber" ></div>'
          $weeknumber.text dateClone.get 'week'
          $week.prepend $weeknumber

        loop

          modifier = null

          currentMonth = dateClone.get('month')

          if currentMonth < month
            modifier = 'picker__day--prev-month'
          else if currentMonth > month
            modifier = 'picker__day--next-month'

          append @createDay(dateClone, modifier), $week

          dateClone.add 1, 'days'

          if dateClone.get('day') == 1 # until monday
            break

        if dateClone.get('month') != month # until another month
          break

    createIcon: (iconName) ->
      icon = @icons[iconName]

      if !icon?
        $.error "Please define the " + iconName + " icon"

      $icon = $ '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="'+icon+'" /></svg>'

      # can't use addClass here since $icon is svg
      $icon.attr 'class', 'picker__icon picker__icon--' + iconName

      return $icon

    createDay: (d, modifier) ->
      date = @moment(d) # create a clone

      $day = $ '<div class="picker__day" ></div>'

      if modifier?
        $day.addClass(modifier)

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

    constructor: (element, @moment, input, displayWeek, icons) ->
      @$element = $ element

      if navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/(iOS|iPhone|iPad|iPod)/i) || navigator.userAgent.match(/Windows Phone/i)

        @$input = $ input

        @$input.prop 'type', 'date'

        @$input.focus()

      else

        @picker = new Picker(@moment, displayWeek, icons)

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

        data = new Datepicker(this, moment, opts.input, opts.displayWeek, opts.icons)
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

    displayWeek = $target.data('datepicker-display-week')

    icons =
      prev: $target.data('datepicker-icon-prev')
      next: $target.data('datepicker-icon-next')

    displayWeek = displayWeek && displayWeek != 'false'

    Plugin.call($target, { input: $input, action: 'toggle', displayWeek: displayWeek, icons: icons })

)(jQuery)

#! Copyright AXA Versicherungen AG 2015
