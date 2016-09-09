import React, { PropTypes } from 'react'
import classNames from 'classnames'

const LanguageSwitch = ({
  invert,
  current,
  languages,
  modifier,
  onLanguageSelect,
  isMenuOpen,
  onMenuToggle,
}) => (
  <div
    className={classNames({
      'meta-language2': true,
      [`meta-language2--${modifier}`]: modifier,
    })}>
    <a
      className="meta-language2__button"
      onClick={() => onMenuToggle(!isMenuOpen)}>
      <span
        className="meta-language2__text">
        {current}
      </span>
      <svg
        viewBox="0 0 24 24"
        className={classNames({
          'meta-language2__icon': true,
          'icon': true,
          'is-toggled': isMenuOpen,
        })}>
        {/* eslint-disable max-len */}
        <path d="M24.003 6.81l-1.505-1.47L11.99 15.652 1.498 5.412.004 6.88l10.49 10.24-.004.004 1.506 1.47.004-.003.004.005 1.496-1.47-.004-.003" />
        {/* eslint-enable */}
      </svg>
    </a>
    <div
      className={classNames({
        'meta-language2__menu': true,
        'meta-language2__menu--invert': invert,
        'is-open': isMenuOpen,
      })}>
      <div className="meta-language2__menu__items">
        {languages.map(lang => (
          <a
            className={classNames({
              'meta-language2__menu__item': true,
              'is-active': lang === current,
            })}
            key={lang}
            onClick={() => onLanguageSelect(lang)}>
            {lang}
          </a>
        ))}
      </div>
    </div>
  </div>
)

LanguageSwitch.propTypes = {
  invert: PropTypes.bool,
  current: PropTypes.string,
  languages: PropTypes.array,
  modifier: PropTypes.string,
  onLanguageSelect: PropTypes.func,
  isMenuOpen: PropTypes.bool,
  onMenuToggle: PropTypes.func,
}

export default LanguageSwitch
