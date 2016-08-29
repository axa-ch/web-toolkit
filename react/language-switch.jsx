/* global window */

import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import Bacon from 'baconjs'
import classNames from 'classnames'

const LanguageSwitch = ({
  invert,
  current,
  languages,
  modifier,
  onLanguageSelect,
  isMenuOpen,
  onMenuToggle,
}) => {
  const blockClasses = classNames('meta-language2', { [`meta-language2--${modifier}`]: modifier })
  const menuClasses = classNames('meta-language2__menu', { 'meta-language2__menu--invert': invert }, { 'is-open': isMenuOpen })
  const svgClasses = classNames('meta-language2__icon', 'icon', { 'is-toggled': isMenuOpen })

  const isActive = lang => lang === current
  // const isInactive = lang => lang !== current
  // const getInactive = R.filter(isInactive)

  return (
    <div className={blockClasses}>
      <a className="meta-language2__button" onClick={() => onMenuToggle(!isMenuOpen)}>
        <span className="meta-language2__text">{current}</span>
        <svg className={svgClasses} viewBox="0 0 24 24">
          <path d="M24.003 6.81l-1.505-1.47L11.99 15.652 1.498 5.412.004 6.88l10.49 10.24-.004.004 1.506 1.47.004-.003.004.005 1.496-1.47-.004-.003" />
        </svg>
      </a>
      <div className={menuClasses}>
        <div className="meta-language2__menu__items">
          {languages.map(lang => (
            <a className={isActive(lang) ? 'meta-language2__menu__item is-active' : 'meta-language2__menu__item'}
              key={lang}
              onClick={() => onLanguageSelect(lang)}>{lang}</a>
          ))}
        </div>
      </div>
    </div>
  )
}

$(() => {
  $('[data-language-switch]').each(function () {
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

export default LanguageSwitch
