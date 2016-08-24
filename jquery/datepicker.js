/* global window, document */

import $ from 'jquery'
import moment from 'moment'
import registerPlugin from './register-plugin'
import isMobile from './is-mobile'

import Emitter from './emitter'

const append = (html, $parent) => {
  const $el = $(html)
  $parent.append($el)
  return $el
}

class Picker extends Emitter {
  constructor(moment1, displayWeek, icons, longDateFormat) {
    super()
    this.moment = moment1
    this.format = this.moment.localeData().longDateFormat(longDateFormat)
    this.displayWeek = displayWeek
    this.icons = icons

    this.date = this.moment()

    this.$element = $('<div class="picker" ></div>')

    if (this.displayWeek) {
      this.$element.addClass('picker--with-weeknumber')
    }

    this.$header = append('<div class="picker__header" ></div>', this.$element)

    this.$prev = append('<div class="picker__prev"></div>', this.$header)
    this.$prev.append(this.createIcon('prev'))
    this.$prev.on('click', this.onPrevClick.bind(this))

    this.$next = append('<div class="picker__next"></div>', this.$header)
    this.$next.append(this.createIcon('next'))
    this.$next.on('click', this.onNextClick.bind(this))

    this.$headline = append('<div class="picker__headline" ></div>', this.$header)
    this.$headline__month = append('<span class="picker__headline__month" ></span>', this.$headline)
    append('<span> </span>', this.$headline)
    this.$headline__year = append('<span></span>', this.$headline)

    this.$content = append('<div class="picker__content" ></div>', this.$element)

    this.$month = append('<div class="picker__month" ></div>', this.$content)

    // TODO: i18n
    const weekdays = moment.weekdaysMin()

    this.$weekHeadline = append(`<div class="picker__week picker__week--headline">
      <div class="picker__day picker__day--headline">${weekdays[1]}</div>
      <div class="picker__day picker__day--headline">${weekdays[2]}</div>
      <div class="picker__day picker__day--headline">${weekdays[3]}</div>
      <div class="picker__day picker__day--headline">${weekdays[4]}</div>
      <div class="picker__day picker__day--headline">${weekdays[5]}</div>
      <div class="picker__day picker__day--headline">${weekdays[6]}</div>
      <div class="picker__day picker__day--headline">${weekdays[0]}</div>
    </div>`, this.$month)

    // @$weeks = append '<div class="picker__weeks" ></div>', @$month

    if (this.displayWeek) {
      this.$weekHeadline.prepend('<div class="picker__weeknumber picker__weeknumber--headline" ></div>')
    }

    this.updateDisplay()
  }

  updateDisplay() {
    this.$headline__month.text(this.date.format('MMMM'))
    this.$headline__year.text(this.date.format('YYYY'))

    this.$month.empty()
    this.$month.append(this.$weekHeadline)

    const dateClone = this.moment(this.date)
    const month = dateClone.get('month')

    // start by the first day of the month
    dateClone.set('date', 1)

    // rewind to the first day of the week
    if (dateClone.get('day') === 0) {
      // if the current day is sunday (week start for moment.js) rewind to monday "last week"
      dateClone.set('day', -6)
    } else {
      dateClone.set('day', 1)
    }

    return (() => {
      const result = []

      do {
        const $week = append('<div class="picker__week" ></div>', this.$month)

        if (this.displayWeek) {
          const $weeknumber = $('<div class="picker__weeknumber" ></div>')
          $weeknumber.text(dateClone.get('week'))
          $week.prepend($weeknumber)
        }

        result.push((() => {
          const result1 = []

          do {
            let modifier = null
            const currentMonth = dateClone.get('month')

            if (currentMonth < month) {
              modifier = 'picker__day--prev-month'
            } else if (currentMonth > month) {
              modifier = 'picker__day--next-month'
            }

            append(this.createDay(dateClone, modifier), $week)

            result1.push(dateClone.add(1, 'days'))
          } while (dateClone.get('day') !== 1) // until monday

          return result1
        })())
      } while (dateClone.get('month') === month) // until another month

      return result
    })()
  }

  createIcon(iconName) {
    const icon = this.icons[iconName]

    if (icon == null) {
      $.error(`Please define the ${iconName} icon`)
    }

    const $icon = $(`<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="${icon}" />
    </svg>`)

    // can't use addClass here since $icon is svg
    $icon.attr('class', `picker__icon picker__icon--${iconName}`)

    return $icon
  }

  createDay(d, modifier) {
    const date = this.moment(d) // create a clone
    const $day = $('<div class="picker__day" ></div>')

    if (modifier != null) {
      $day.addClass(modifier)
    }

    if ((this.selectedDate != null) && date.format(this.format) === this.selectedDate.format(this.format)) {
      $day.addClass('is-active')
    }

    if (date.format(this.format) === this.moment().format(this.format)) {
      $day.addClass('picker__day--today')
    }

    $day.text(date.get('date'))
    $day.on('click', (e) => {
      e.preventDefault()

      this.setSelectedDate(date)
      this.emit('select', date.format(this.format))
      this.toggle()
    })

    return $day
  }

  getDOMNode() {
    return this.$element
  }

  toggle() {
    this.$element.toggleClass('is-active')
  }

  setSelectedDate(selectedDate) {
    this.date = selectedDate
    this.selectedDate = this.moment(selectedDate)
    this.updateDisplay()
  }

  onPrevClick(e) {
    e.preventDefault()

    this.date.add(-1, 'months')
    this.updateDisplay()
  }

  onNextClick(e) {
    e.preventDefault()

    this.date.add(1, 'months')
    this.updateDisplay()
  }
}

class Datepicker {
  static DEFAULTS = {
    moment: window.moment,
    locale: document.documentElement.lang || 'en',
    longDateFormat: 'L',
  }

  constructor(element, options) {
    this.onChange = this.onChange.bind(this)
    this.options = options
    this.moment = options.moment
    this.moment.locale(options.locale)
    this.format = this.moment.localeData().longDateFormat(options.longDateFormat)
    this.$element = $(element)

    if (!this.moment) {
      $.error('Moment.js must either be passed as an option or be available globally')
    }

    if (isMobile) {
      this.$input = $(options.input)

      this.$input.prop('type', 'date')

      this.$input.focus()
    } else {
      this.picker = new Picker(this.moment, options.displayWeek, options.icons, options.longDateFormat)

      if (options.input != null) {
        this.$input = $(options.input)

        this.$input.on('change', this.onChange)

        this.onChange()
      }

      this.picker.on('select', date => {
        this.$input.val(date)
        this.$input.trigger('change')
      })

      this.$element.append(this.picker.getDOMNode())
    }
  }

  onChange() {
    const dat = this.moment(this.$input.val(), this.format)

    if (dat.isValid()) {
      this.picker.setSelectedDate(dat)
    }
  }

  toggle() {
    if (isMobile) {
      this.$input.focus()
    } else {
      this.picker.toggle()
    }
  }
}

// Plugin definition
registerPlugin('datepicker', Datepicker, (PluginWrapper) => {
  $(document).on('click.axa.datepicker.data-api', '[data-datepicker]', function (e) {
    e.preventDefault()

    const data = $(this).data()
    const $target = $(data.datepicker)
    const $input = $($target.data('datepicker-watch'))
    let displayWeek = $target.data('datepicker-display-week')
    const icons = {
      prev: $target.data('datepicker-icon-prev'),
      next: $target.data('datepicker-icon-next'),
    }

    displayWeek = displayWeek && displayWeek !== 'false'

    PluginWrapper.call($target, {
      ...data,
      input: $input,
      __action__: 'toggle',
      displayWeek,
      icons,
    })
  })
})

//! Copyright AXA Versicherungen AG 2015
