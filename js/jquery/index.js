import 'svg4everybody'
import $ from 'jquery';

import './affix'
import './autocomplete'
import './autogrow'
import './drawer'
import './dropdown'
import './dropzone'
import './fade'
import './footer'
import './ie9-spinner'
import './info'
import './menu-collapsing'
import './menu-main'
import './menu-sliding'
import './notification'
import './progress-bar'
import './reveal'
import './search'
import './stroke'
import './form-steps'

import './bootstrap/alert'
import './bootstrap/button'
import './bootstrap/carousel'
import './bootstrap/collapse'
import './bootstrap/dropdown'
import './bootstrap/modal'
import './bootstrap/popover'
import './bootstrap/scrollspy'
import './bootstrap/tab'
import './bootstrap/tooltip'
import './bootstrap/util'

// fixes bootstrap tooltips not triggered by Default
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

export default {}
