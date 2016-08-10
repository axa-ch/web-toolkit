/* global window */

import $ from 'jquery'

// Public class definition
class Tab {
  constructor(element, options) {
    this.$element = $(element)
    // @options = $.extend {}, options

    this.$toggles = this.$element.find('[data-tab-toggle]')
    this.$toggles.on('click', this, event => event.data.toggle(event)
    )

    const defaultSelector = this.$element.data('tab-default')
    this.setActiveTab(defaultSelector)
  }

  toggle(event) {
    const $toggle = $(event.target)
    const selector = $toggle.data('tab-toggle')
    this.setActiveTab(selector)
  }

  setActiveTab(tabName) {
    if (this.activeTabName === tabName) {
      return
    }

    this.activeTabName = tabName

    if (this.$activeContentPanel != null) {
      // @$activeContentPanel.toggleClass 'is-active'
      this.$activeContentPanel.slideToggle('fast', function () {
        $(this).toggleClass('is-active')
      })
    }
    if (this.$activeToggle != null) {
      this.$activeToggle.toggleClass('is-active')
    }

    this.$activeContentPanel = this.$element.find(`[data-tab-content='${tabName}']`)
    this.$activeToggle = this.$element.find(`[data-tab-toggle='${tabName}']`)

    // @$activeContentPanel.toggleClass 'is-active'
    this.$activeContentPanel.slideToggle('fast', function () {
      $(this).toggleClass('is-active')
    })
    this.$activeToggle.toggleClass('is-active')
  }
}

// DATA-API
$(window).on('load', () =>
  $('[data-tab]').each((index, element) => new Tab(element))
)

//! Copyright AXA Versicherungen AG 2015
