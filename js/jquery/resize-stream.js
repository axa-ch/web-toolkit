/* global window */

import $ from 'jquery'
import Bacon from 'baconjs'

export default Bacon.$.asEventStream.call($(window), 'resize')
