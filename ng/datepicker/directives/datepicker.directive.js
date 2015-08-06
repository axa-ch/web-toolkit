(function () {

  'use strict';

  angular
    .module('axa-wsg.datepicker')
    .directive('axaWsgDatepicker', datepicker);

  function datepicker($timeout) {

    var directive = {
      restrict: 'EA',
      link: link,
      // TODO: relative URL
      templateUrl: '../../ng/datepicker/directives/datepicker.directive.html'
    };

    function link(scope, el, attr, ctrl) {
    }

    return directive;
  }

})();

/* Copyright AXA Versicherungen AG 2015 */
