/**
 * @file
 * Forecast shadow bookings.
 */

 (function ($) {
  'use strict';
  /* Find all assignments & views. */
  function doShadow() {
    var forecastUrl = 'forecastapp.com';
    if (jQuery('body').hasClass('ember-application') && (window.location.href.indexOf(forecastUrl) > -1)) {
      $('.ember-view').each(function () {
        /* Gray the assignment if the assignment title contains our keyword. */
        if (
          jQuery(this).is('div') &&
          jQuery(this).hasClass('assignment') &&
          jQuery(this).hasClass('has-notes') &&
          jQuery(this).filter('[title*=\"shadow\"]')
        ) {
          jQuery(this).removeClass('gray orange red green aqua blue purple magenta');
          jQuery($(this)).addClass('gray');
        }
      });
    }
  }

  /**
   * Check for viewport navigation.
   *
   * Adding onClick handler only works when the element exists.
   * This function makes sure the handler is not set, before +
   * the control-button exists.
   */
  function viewportNavigationExists() {
    if (jQuery('.row-expand-icon').length == 0) {
      window.setTimeout(viewportNavigationExists, 800);
    }
    else {
      jQuery('.row-expand-icon').click(function () {
        doShadow();
      });
      doShadow();
    }
  }

  /* Add event handlers */
  $(document).ready(function () {
    viewportNavigationExists();
  });

  $(window).on('click scroll keydown keyup', function () {
    doShadow();
  });
})(jQuery);
