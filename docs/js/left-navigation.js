import $ from 'jquery';

$(() =>
  $('.left__menu .menu__level').each(function(i, el) {
    let $el = $(el);

    let $headline = $el.siblings('.menu__link');

    return $headline.on('click', function(e) {
      e.preventDefault();

      $headline.children('.menu__dropdown__icon').toggleClass('is-open');
      return $el.slideToggle('fast', () => $el.toggleClass('is-open')
      );
    }
    );
  })
);

//! Copyright AXA Versicherungen AG 2015
