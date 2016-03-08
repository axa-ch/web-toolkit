import $ from 'jquery'

class BirthdayDatepicker {
  constructor(element) {
    this.$element = $(element)
    
    this.$day = $(element).find('.birthday--day select')
    this.$month = $(element).find('.birthday--month select')
    this.$year = $(element).find('.birthday--year select')
    this.$input = $(element).find('input')

    this.day = ''
    this.month = ''
    this.year = ''

    this.init()
  }

  init() {
    
    this.$day.on('change', () => this.handleChange() )
    this.$month.on('change', () => this.handleChange() )
    this.$year.on('change', () => this.handleChange() )

  }

  handleChange() {

    this.day = this.$day.val()
    this.month = this.$month.val()
    this.year = this.$year.val()

    if (this.day !== '' && this.month !== '' && this.year !== ''){
      this.$input.val(`${this.year}-${this.addLeadingZero(this.month)}-${this.addLeadingZero(this.day)}`)
    }

  }

  addLeadingZero(num) {
    if (num < 10) num = '0' + num;
    return num;
  }

}

function Plugin() {
  let params = arguments

  return this.each(function () {
    let $this = $(this)
    let data = $this.data('axa.datepicker-birthday')

    if (!data) {
      data = new BirthdayDatepicker(this)
      $this.data('axa.datepicker-birthday', data)
    }
  })
}

$.fn.birthdayDatepicker = Plugin
$.fn.birthdayDatepicker.Constructor = BirthdayDatepicker

$(function () {
  $('[data-datepicker-birthday]').each(function () {
    let $birthdayDatepicker = $(this)
    Plugin.call($birthdayDatepicker)
  })
})

// Copyright AXA Versicherungen AG 2015
