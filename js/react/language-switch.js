/* global window */

import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import Bacon from 'baconjs'
import LanguageSwitch from './components/language-switch'

$(() => {
  $('[data-language-switch]').each(function initLanguageSwitch() {
    const $element = $(this)
    const invert = typeof $element.data('invert') !== 'undefined'
    const modifier = $element.data('modifier')
    const isMenuOpenBus = new Bacon.Bus()

    isMenuOpenBus.toProperty(false)
      .onValue((isMenuOpen) => {
        ReactDOM.render(
          <LanguageSwitch
            invert={invert}
            current={$element.data('current')}
            languages={['de', 'en', 'fr', 'it']}
            modifier={modifier}
            onLanguageSelect={lang => {
              window.location.href = $element.data(`link-${lang}`)
              isMenuOpenBus.push(false)
            }}
            isMenuOpen={isMenuOpen}
            onMenuToggle={toggle => {
              isMenuOpenBus.push(toggle)
            }} />,
          $element[0]
        )
      })
  })
})
